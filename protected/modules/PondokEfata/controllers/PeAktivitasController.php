<?php
class PeAktivitasController extends GxController {
    public function actionView() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                    ->select("pe_aktivitas.doc_ref,
                    pe_aktivitas.no_bukti,
                    pe_aktivitas.amount,
                    pe_aktivitas.entry_time,
                    pe_aktivitas.trans_date,
                    pe_aktivitas.trans_via,
                    pe_suppliers.supp_name,
                    pe_chart_master.account_code,
                    pe_chart_master.description,
                    pe_bank_accounts.bank_account_name,
                    jemaat.real_name,
                    pe_sub_aktivitas.nama")
                    ->from("pe_aktivitas")
                    ->join("pe_suppliers",
                            "pe_aktivitas.pe_supplier_id = pe_suppliers.supplier_id")
                    ->join("pe_bank_accounts",
                            "pe_aktivitas.pe_bank_accounts_id = pe_bank_accounts.id")
                    ->join("pe_member",
                            "pe_aktivitas.pe_member_id = pe_member.id")
                    ->join("jemaat", "pe_member.jemaat_nij = jemaat.nij")
                    ->join("pe_sub_aktivitas",
                            "pe_aktivitas.pe_sub_aktivitas_id = pe_sub_aktivitas.id")
                    ->join("pe_chart_master",
                            "pe_sub_aktivitas.account_code = pe_chart_master.account_code")
                    ->where("pe_aktivitas.aktivitas_id = :id",
                            array(':id' => $id))
                    ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            Yii::app()->end();
        }
//        $this->render('view', array(
//            'model' => $this->loadModel($id, 'PeAktivitas'),
//        ));
    }
    public function actionCreate() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Anggaran berhasil disimpan.';
            $user = Yii::app()->user->getId();
            $id = -1;
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
             app()->db->autoCommit = false;
            $transaction = app()->db->beginTransaction();
            try {
                $ref = new PeReferenceCom();
                $docref = $ref->get_next_reference(AKTIVITAS);
                $aktivitas = new PeAktivitas;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount') $v = get_number($v);
                    $_POST['PeAktivitas'][$k] = $v;
                }
                $date = $_POST['PeAktivitas']['trans_date'];
                $_POST['PeAktivitas']['entry_time'] = Now();
                $_POST['PeAktivitas']['users_id'] = $user;
                $_POST['PeAktivitas']['doc_ref'] = $docref;
                $aktivitas->attributes = $_POST['PeAktivitas'];
                if (!$aktivitas->save())
                    throw new Exception("Gagal menyimpan aktivitas.");
                $id = $docref;
                $ref->save(AKTIVITAS, $aktivitas->aktivitas_id, $docref);
                $bank_account = Pe::get_act_code_from_bank_act($aktivitas->pe_bank_accounts_id);
                $act_sub = $aktivitas->peSubAktivitas->account_code;
                //debet kode beban - kredit kas bank
                Pe::add_gl(AKTIVITAS, $aktivitas->aktivitas_id, $date, $docref,
                        $act_sub, $aktivitas->note, $aktivitas->amount, $user);
                Pe::add_gl(AKTIVITAS, $aktivitas->aktivitas_id, $date, $docref,
                        $bank_account, '-', -$aktivitas->amount, $user);
                $transaction->commit();
                $status = true;
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
            echo CJSON::encode(array(
                'success' => $status,
                'id' => $id,
                'msg' => $msg
            ));
            Yii::app()->end();
        }
    }
    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'PeAktivitas');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PeAktivitas'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['PeAktivitas'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->aktivitas_id;
            } else {
                $msg .= " ".CHtml::errorSummary($model);
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->aktivitas_id));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }
    public function actionDelete() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $memo_ = $_POST['memo_'];
            $status = false;
            $msg = 'Aktivitas berhasil divoid.';
            $user = Yii::app()->user->getId();
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
             app()->db->autoCommit = false;
            $transaction = app()->db->beginTransaction();
            try {
                $aktivitas = PeAktivitas::model()->findByPk($id);
                $date = $aktivitas->trans_date;
                $docref = $aktivitas->doc_ref;
                $void = new PeVoided;
                $void->type = AKTIVITAS;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                if (!$void->save())
                    throw new Exception("Gagal menyimpan void.");
                $bank = PeBankAccounts::model()->findByPk($aktivitas->pe_bank_accounts_id);
                $act_sub = $aktivitas->peSubAktivitas->account_code;
                //void gl
                //beban kredit , kas debet karena pengeluaran
                Pe::add_gl(VOID, $void->id_voided, $date, $docref,
                        $bank->account_code, "VOID Aktivitas $docref",
                        $aktivitas->amount, $user);
                Pe::add_gl(VOID, $void->id_voided, $date, $docref, $act_sub,
                        "VOID Aktivitas $docref", -$aktivitas->amount, $user);
                $transaction->commit();
                $status = true;
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
        }
        echo CJSON::encode(array(
            'success' => $status,
            'msg' => $msg));
        Yii::app()->end();
//        if (Yii::app()->request->isPostRequest) {
//            $this->loadModel($id, 'PeAktivitas')->delete();
//
//            if (!Yii::app()->request->isAjaxRequest)
//                $this->redirect(array('admin'));
//        } else
//            throw new CHttpException(400,
//                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }
    /*
      public function actionAdmin() {
      $dataProvider = new CActiveDataProvider('PeAktivitas');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */
    public function actionAdmin() {
        $model = new PeAktivitas('search');
        $model->unsetAttributes();
        if (isset($_GET['PeAktivitas']))
                $model->attributes = $_GET['PeAktivitas'];
        $this->render('admin', array(
            'model' => $model,
        ));
    }
    public function actionIndex() {
        if (isset($_POST['limit'])) {
            $limit = $_POST['limit'];
        } else {
            $limit = 20;
        }
        if (isset($_POST['start'])) {
            $start = $_POST['start'];
        } else {
            $start = 0;
        }
        $param = array();
        $void = Pe::get_voided(AKTIVITAS);
        $criteria = new CDbCriteria();
        if (isset($_POST['doc_ref'])) {
            $criteria->addCondition("doc_ref like :doc_ref");
            $param[':doc_ref'] = "%" . $_POST['doc_ref'] . "%";
        }
        if (isset($_POST['no_bukti'])) {
            $criteria->addCondition("no_bukti like :no_bukti");
            $param[':no_bukti'] = "%" . $_POST['no_bukti'] . "%";
        }
        if (isset($_POST['amount'])) {
            $criteria->addCondition("amount = :amount");
            $param[':amount'] = $_POST['amount'];
        }
        if (isset($_POST['trans_date'])) {
            $criteria->addCondition("trans_date = :trans_date");
            $param[':trans_date'] = substr($_POST['trans_date'], 0, 10);
        }
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $criteria->params = $param;
        $criteria->addNotInCondition('aktivitas_id', $void);
        $model = PeAktivitas::model()->findAll($criteria);
        $total = PeAktivitas::model()->count($criteria);
        $this->renderJson($model, $total);
    }
}