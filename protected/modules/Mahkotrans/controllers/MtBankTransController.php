<?php

class MtBankTransController extends GxController
{
    public function actionView()
    {        
        echo CJSON::encode(Mt::get_bank_trans_view());
        Yii::app()->end();
    }

    public function actionGetBalance()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            //$id = $_POST['id'];
            $amt = Mt::get_balance_before_for_bank_account(get_date_tomorrow(), $_POST['id']);
            echo CJSON::encode(array(
                'success' => true,
                'id' => $amt,
            ));
            Yii::app()->end();
        }
    }

    public function actionCreateTransfer()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $status = false;
            $msg = 'Transfer antar kas berhasil diproses.';
            $id = -1;
            $bank_asal = $_POST['bank_act_asal'];
            $bank_tujuan = $_POST['bank_act_tujuan'];
            $trans_date = $_POST['trans_date'];
            $memo = $_POST['memo'];
            $amount = get_number($_POST['amount']);
            if ($bank_asal == $bank_tujuan) {
                echo CJSON::encode(array(
                    'success' => false,
                    'id' => -1,
                    'msg' => 'Bank asal dan bank tujuan tidak boleh sama.'
                ));
                Yii::app()->end();
            }
            if ($amount <= 0) {
                echo CJSON::encode(array(
                    'success' => false,
                    'id' => -1,
                    'msg' => 'Jumlah yang akan ditransfer harus lebih dari nol.'
                ));
                Yii::app()->end();
            }
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(BANKTRANSFER);
                $bank_account_asal = Mt::get_act_code_from_bank_act($bank_asal);
                $bank_account_tujuan = Mt::get_act_code_from_bank_act($bank_tujuan);
                $trans_no = Mt::get_next_trans_no_bank_trans();
                $user = Yii::app()->user->getId();
                //debet kode bank tujuan - kredit kode bank asal
                Mt::add_gl(BANKTRANSFER, $trans_no, $trans_date, $docref, $bank_account_tujuan,
                    $memo, $amount, $user);
                Mt::add_gl(BANKTRANSFER, $trans_no, $trans_date, $docref, $bank_account_asal, $memo, -$amount,
                    $user);
                $ref->save(BANKTRANSFER, $trans_no, $docref);
                $id = $docref;
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

//    public function actionPrint(){
//        echo "<html><head></head>
//        <body onLoad='alert();'>
//        Teeeeeeeeeeesstttt
//        </body></html>";
//    }
    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'MtBankTrans');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtBankTrans'][$k] = $v;
            }
            $model->attributes = $_POST['MtBankTrans'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->id
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id)
    {
        if (Yii::app()->request->isPostRequest) {
            $this->loadModel($id, 'MtBankTrans')->delete();
            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
     public function actionAdmin() {
         $dataProvider = new CActiveDataProvider('MtBankTrans');
         $this->render('index', array(
             'dataProvider' => $dataProvider,
         ));
     }*/
    public function actionAdmin()
    {
        $model = new MtBankTrans('search');
        $model->unsetAttributes();
        if (isset($_GET['MtBankTrans']))
            $model->attributes = $_GET['MtBankTrans'];
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
        //$model = new MtBankTrans('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $model = MtBankTrans::model()->findAll($criteria);
        $total = MtBankTrans::model()->count($criteria);
        if (isset($_GET['MtBankTrans']))
            $model->attributes = $_GET['MtBankTrans'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtBankTrans('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}