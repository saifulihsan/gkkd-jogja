<?php
class PeKasMasukController extends GxController {
    public function actionView() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                    ->select("pe_kas_masuk.doc_ref,
                    pe_kas_masuk.no_bukti,
                    pe_kas_masuk.amount,
                    pe_kas_masuk.entry_time,
                    pe_kas_masuk.trans_date,
                    pe_kas_masuk.trans_via,
                    pe_donatur.name,
                    pe_bank_accounts.bank_account_name,
                    pe_chart_master.account_code,
                    pe_chart_master.description")
                    ->from("pe_kas_masuk")
                    ->join("pe_donatur",
                            "pe_kas_masuk.pe_donatur_id = pe_donatur.id")
                    ->join("pe_bank_accounts",
                            "pe_kas_masuk.pe_bank_accounts_id = pe_bank_accounts.id")
                    ->join("pe_chart_master",
                            "pe_donatur.account_code = pe_chart_master.account_code")
                    ->where("pe_kas_masuk.kas_masuk_id = :id",
                            array(':id' => $id))
                    ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            Yii::app()->end();
        }
//        $this->render('view', array(
//            'model' => $this->loadModel($id, 'PeKasMasuk'),
//        ));
    }
    public function actionCreate() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Kas masuk berhasil disimpan.';

            $user = Yii::app()->user->getId();
            $id = -1;
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new PeReferenceCom();
                $docref = $ref->get_next_reference(KAS_MASUK);
                $kas_masuk = new PeKasMasuk;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount') $v = get_number($v);
                    $_POST['PeKasMasuk'][$k] = $v;
                }
                $date = $_POST['PeKasMasuk']['trans_date'];
                $_POST['PeKasMasuk']['entry_time'] = Now();
                $_POST['PeKasMasuk']['users_id'] = $user;
                $_POST['PeKasMasuk']['doc_ref'] = $docref;
                $kas_masuk->attributes = $_POST['PeKasMasuk'];
                $kas_masuk->save();
                $id = $docref;
                $ref->save(KAS_MASUK, $kas_masuk->kas_masuk_id, $docref);
                $bank_account = Pe::get_act_code_from_bank_act($kas_masuk->pe_bank_accounts_id);
                $act_donatur = $kas_masuk->peDonatur->account_code;
                //debet kode kas/bank - kredit pendapatan
                Pe::add_gl(KAS_MASUK, $kas_masuk->kas_masuk_id, $date, $docref,
                        $bank_account, '-', $kas_masuk->amount, $user);
                Pe::add_gl(KAS_MASUK, $kas_masuk->kas_masuk_id, $date, $docref,
                        $act_donatur, $kas_masuk->note, -$kas_masuk->amount,
                        $user);
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
            'id' => $id,
            'msg' => $msg
        ));
        Yii::app()->end();
    }
    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'PeKasMasuk');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PeKasMasuk'][$k] = $v;
            }
            $_POST['PeKasMasuk']['entry_time'] = Yii::app()->dateFormatter->format('yyyy-MM-dd',
                    time());
            $_POST['PeKasMasuk']['users_id'] = Yii::app()->user->getId();
            $_POST['PeKasMasuk']['doc_ref'] = '';
            $model->attributes = $_POST['PeKasMasuk'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->kas_masuk_id));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->kas_masuk_id));
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
            $msg = 'Kas masuk berhasil divoid.';
            $user = Yii::app()->user->getId();
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $kas_masuk = PeKasMasuk::model()->findByPk($id);
                $date = $kas_masuk->trans_date;
                $docref = $kas_masuk->doc_ref;
//                $bank_account = $kas_masuk->pe_bank_accounts_id;
                $void = new PeVoided;
                $void->type = KAS_MASUK;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = PeBankAccounts::model()->findByPk($kas_masuk->pe_bank_accounts_id);
                $act_donatur = $kas_masuk->peDonatur->account_code;
                //void gl
                Pe::add_gl(VOID, $void->id_voided, $date, $docref, $act_donatur,
                        "VOID Kas Masuk $docref", $kas_masuk->amount, $user);
                Pe::add_gl(VOID, $void->id_voided, $date, $docref,
                        $bank->account_code, "VOID Kas Masuk $docref",
                        -$kas_masuk->amount, $user);
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
//            $this->loadModel($id, 'PeKasMasuk')->delete();
//            if (!Yii::app()->request->isAjaxRequest)
//                $this->redirect(array('admin'));
//        } else
//            throw new CHttpException(400,
//                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }
    /*
      public function actionAdmin() {
      $dataProvider = new CActiveDataProvider('PeKasMasuk');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */
    public function actionAdmin() {
        $model = new PeKasMasuk('search');
        $model->unsetAttributes();
        if (isset($_GET['PeKasMasuk']))
                $model->attributes = $_GET['PeKasMasuk'];
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
        $void = Pe::get_voided(KAS_MASUK);
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $criteria->params = $param;
        $criteria->addNotInCondition('kas_masuk_id', $void);
        $model = PeKasMasuk::model()->findAll($criteria);
        $total = PeKasMasuk::model()->count($criteria);
        $this->renderJson($model, $total);
    }
}