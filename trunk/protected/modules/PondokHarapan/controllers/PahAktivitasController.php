<?php

class PahAktivitasController extends GxController
{
    public function actionView()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                ->select("pah_aktivitas.doc_ref,
                    pah_aktivitas.no_bukti,
                    pah_aktivitas.amount,
                    pah_aktivitas.entry_time,
                    pah_aktivitas.trans_date,
                    pah_aktivitas.trans_via,
                    pah_suppliers.supp_name,
                    pah_chart_master.account_code,
                    pah_chart_master.description,
                    pah_bank_accounts.bank_account_name,
                    jemaat.real_name,
                    pah_sub_aktivitas.nama")
                ->from("pah_aktivitas")
                ->join("pah_suppliers", "pah_aktivitas.pah_suppliers_supplier_id = pah_suppliers.supplier_id")
                ->join("pah_bank_accounts", "pah_aktivitas.pah_bank_accounts_id = pah_bank_accounts.id")
                ->join("pah_member", "pah_aktivitas.pah_member_id = pah_member.id")
                ->join("jemaat", "pah_member.jemaat_nij = jemaat.nij")
                ->join("pah_sub_aktivitas", "pah_aktivitas.pah_sub_aktivitas_id = pah_sub_aktivitas.id")
                ->join("pah_chart_master", "pah_sub_aktivitas.account_code = pah_chart_master.account_code")
                ->where("pah_aktivitas.aktivitas_id = :id", array(':id' => $id))
                ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            Yii::app()->end();
        }
//        $this->render('view', array(
//            'model' => $this->loadModel($id, 'PahAktivitas'),
//        ));
    }

    public function actionCreate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Anggaran berhasil disimpan.';

            $user = Yii::app()->user->getId();
            $id = -1;
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(AKTIVITAS);
                $aktivitas = new PahAktivitas;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount')
                        $v = get_number($v);
                    $_POST['PahAktivitas'][$k] = $v;
                }
                $date = $_POST['PahAktivitas']['trans_date'];
                $_POST['PahAktivitas']['entry_time'] = Now();
                $_POST['PahAktivitas']['users_id'] = $user;
                $_POST['PahAktivitas']['doc_ref'] = $docref;
                $aktivitas->attributes = $_POST['PahAktivitas'];
                $aktivitas->save();
                $id = $docref;
                $ref->save(AKTIVITAS, $aktivitas->aktivitas_id, $docref);
                $bank_account = Pah::get_act_code_from_bank_act($aktivitas->pah_bank_accounts_id);
                $act_sub = $aktivitas->pahSubAktivitas->account_code;
                //debet kode beban - kredit kas bank
                Pah::add_gl(AKTIVITAS, $aktivitas->aktivitas_id, $date, $docref, $act_sub,
                    '-', $aktivitas->amount, $user);
                Pah::add_gl(AKTIVITAS, $aktivitas->aktivitas_id, $date, $docref, $bank_account, '-', -$aktivitas->amount,
                    $user);
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

    /*public function actionCreate() {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)){
            $status = false;
            $msg = 'Aktifitas berhasil disimpan.';
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $model = new PahAktivitas;
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(ANGGARAN);
                $_POST['PahAktivitas']['doc_ref'] = $docref;
                $_POST['PahAktivitas']['periode_bulan'] = $bulan;
                $_POST['PahAktivitas']['periode_tahun'] = $tahun;
                $_POST['PahAktivitas']['lock'] = 0;
                $_POST['PahAktivitas']['trans_date'] = '2012-09-24';
                $_POST['PahAktivitas']['users_id'] = Yii::app()->user->getId();
                $model->attributes = $_POST['PahAktivitas'];
                $result = $model->save();
                $err = $model->getErrors();
                $transaction->commit();
                $status = true;
            }
            catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }




            echo CJSON::encode(array(
                'success'=>$status,
                'bulan'=>$bulanStr,
                'tahun'=>$tahun,
                'id'=>$docref,
                'msg'=>$msg));

            Yii::app()->end();

        }

    }*/
    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'PahAktivitas');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahAktivitas'][$k] = $v;
            }
            $model->attributes = $_POST['PahAktivitas'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->aktivitas_id));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->aktivitas_id));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $memo_ = $_POST['memo_'];
            $status = false;
            $msg = 'Aktivitas berhasil divoid.';
            $user = Yii::app()->user->getId();
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $aktivitas = PahAktivitas::model()->findByPk($id);
                $date = $aktivitas->trans_date;
                $docref = $aktivitas->doc_ref;
//                $bank_account = $kas_masuk->pah_bank_accounts_id;
                $void = new PahVoided;
                $void->type = AKTIVITAS;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = PahBankAccounts::model()->findByPk($aktivitas->pah_bank_accounts_id);
                $act_sub = $aktivitas->pahSubAktivitas->account_code;
                //void gl
                //beban kredit , kas debet karena pengeluaran
                Pah::add_gl(VOID, $void->id, $date, $docref, $bank->account_code, "VOID Aktivitas $docref",
                    $aktivitas->amount, $user);
                Pah::add_gl(VOID, $void->id, $date, $docref, $act_sub, "VOID Aktivitas $docref",
                    -$aktivitas->amount, $user);
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
            'msg' => $msg
        ));
        Yii::app()->end();
//        if (Yii::app()->request->isPostRequest) {
//            $this->loadModel($id, 'PahAktivitas')->delete();
//
//            if (!Yii::app()->request->isAjaxRequest)
//                $this->redirect(array('admin'));
//        } else
//            throw new CHttpException(400,
//                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
     public function actionAdmin() {
         $dataProvider = new CActiveDataProvider('PahAktivitas');
         $this->render('index', array(
             'dataProvider' => $dataProvider,
         ));
     }*/
    public function actionAdmin()
    {
        $model = new PahAktivitas('search');
        $model->unsetAttributes();
        if (isset($_GET['PahAktivitas']))
            $model->attributes = $_GET['PahAktivitas'];
        $this->render('admin', array(
            'model' => $model,
        ));
    }

    public function actionIndex()
    {
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
        //$model = new PahAktivitas('search');
        //$model->unsetAttributes();
        require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
        $void = Pah::get_voided(AKTIVITAS);
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $criteria->addNotInCondition('aktivitas_id', $void);
        $model = PahAktivitas::model()->findAll($criteria);
        $total = PahAktivitas::model()->count($criteria);
        if (isset($_GET['PahAktivitas']))
            $model->attributes = $_GET['PahAktivitas'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PahAktivitas('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}