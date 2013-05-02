<?php

class MtKasMasukController extends GxController
{
    public function actionView()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                ->select("mt_kas_masuk.doc_ref,
                    mt_kas_masuk.no_bukti,
                    mt_kas_masuk.amount,
                    mt_kas_masuk.entry_time,
                    mt_kas_masuk.trans_date,
                    mt_kas_masuk.trans_via,
                    mt_donatur.name,
                    mt_bank_accounts.bank_account_name,
                    mt_chart_master.account_code,
                    mt_chart_master.description")
                ->from("mt_kas_masuk")
                ->join("mt_donatur", "mt_kas_masuk.mt_donatur_id = mt_donatur.id")
                ->join("mt_bank_accounts", "mt_kas_masuk.mt_bank_accounts_id = mt_bank_accounts.id")
                ->join("mt_chart_master", "mt_donatur.mt_chart_master_account_code = mt_chart_master.account_code")
                ->where("mt_kas_masuk.kas_masuk_id = :id", array(':id' => $id))
                ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            Yii::app()->end();
        }
//        $this->render('view', array(
//            'model' => $this->loadModel($id, 'MtKasMasuk'),
//        ));
    }

    public function actionCreate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Kas masuk berhasil disimpan.';

            $user = Yii::app()->user->getId();
            $id = -1;
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(KAS_MASUK);
                $kas_masuk = new MtKasMasuk;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount')
                        $v = get_number($v);
                    $_POST['MtKasMasuk'][$k] = $v;
                }
                $date = $_POST['MtKasMasuk']['trans_date'];
                $_POST['MtKasMasuk']['entry_time'] = Now();
                $_POST['MtKasMasuk']['users_id'] = $user;
                $_POST['MtKasMasuk']['doc_ref'] = $docref;
                $kas_masuk->attributes = $_POST['MtKasMasuk'];
                $kas_masuk->save();
                $id = $docref;
                $ref->save(KAS_MASUK, $kas_masuk->kas_masuk_id, $docref);
                $bank_account = Mt::get_act_code_from_bank_act($kas_masuk->mt_bank_accounts_id);
                $act_donatur = $kas_masuk->pahDonatur->mt_chart_master_account_code;
                //debet kode kas/bank - kredit pendapatan
                Mt::add_gl(KAS_MASUK, $kas_masuk->kas_masuk_id, $date, $docref, $bank_account,
                    '-', $kas_masuk->amount,$user);
                Mt::add_gl(KAS_MASUK, $kas_masuk->kas_masuk_id, $date, $docref, $act_donatur,
                    $kas_masuk->note, -$kas_masuk->amount, $user);
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

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'MtKasMasuk');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtKasMasuk'][$k] = $v;
            }
            $_POST['MtKasMasuk']['entry_time'] = Yii::app()->dateFormatter->format('yyyy-MM-dd', time());
            $_POST['MtKasMasuk']['users_id'] = Yii::app()->user->getId();
            $_POST['MtKasMasuk']['doc_ref'] = '';
            $model->attributes = $_POST['MtKasMasuk'];
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

    public function actionDelete()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $memo_ = $_POST['memo_'];
            $status = false;
            $msg = 'Kas masuk berhasil divoid.';
            $user = Yii::app()->user->getId();
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $kas_masuk = MtKasMasuk::model()->findByPk($id);
                $date = $kas_masuk->trans_date;
                $docref = $kas_masuk->doc_ref;
//                $bank_account = $kas_masuk->mt_bank_accounts_id;
                $void = new MtVoided;
                $void->type = KAS_MASUK;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = MtBankAccounts::model()->findByPk($kas_masuk->mt_bank_accounts_id);
                $act_donatur = $kas_masuk->pahDonatur->mt_chart_master_account_code;
                //void gl
                Mt::add_gl(VOID, $void->id, $date, $docref,
                    $act_donatur,
                    "VOID Kas Masuk $docref", $kas_masuk->amount, $user);
                Mt::add_gl(VOID, $void->id, $date, $docref, $bank->account_code, "VOID Kas Masuk $docref",
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
            'msg' => $msg
        ));
        Yii::app()->end();
//        if (Yii::app()->request->isPostRequest) {
//            $this->loadModel($id, 'MtKasMasuk')->delete();
//            if (!Yii::app()->request->isAjaxRequest)
//                $this->redirect(array('admin'));
//        } else
//            throw new CHttpException(400,
//                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
     public function actionAdmin() {
         $dataProvider = new CActiveDataProvider('MtKasMasuk');
         $this->render('index', array(
             'dataProvider' => $dataProvider,
         ));
     }*/
    public function actionAdmin()
    {
        $model = new MtKasMasuk('search');
        $model->unsetAttributes();
        if (isset($_GET['MtKasMasuk']))
            $model->attributes = $_GET['MtKasMasuk'];
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
        //$model = new MtKasMasuk('search');
        //$model->unsetAttributes();
        //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
        $void = Mt::get_voided(KAS_MASUK);
        //$arr = array(1,2);
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $criteria->addNotInCondition('kas_masuk_id', $void);
        $model = MtKasMasuk::model()->findAll($criteria);
        $total = MtKasMasuk::model()->count($criteria);
        if (isset($_GET['MtKasMasuk']))
            $model->attributes = $_GET['MtKasMasuk'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtKasMasuk('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}