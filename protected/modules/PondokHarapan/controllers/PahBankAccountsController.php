<?php

class PahBankAccountsController extends GxController
{
    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'PahBankAccounts'),
        ));
    }

    public function actionCreate()
    {

        //TODO: pengecekan jika no rekening sudah dipake transaksi
        $model = new PahBankAccounts;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['account_code'];
            $status = true;
            $msg = "Akun bank berhasil dibuat";
            if (Pah::account_in_gl_trans($id)) {
                $status = false;
                $msg = "Akun bank gagal dibuat, karena account sudah dipakai transaksi.";
            }
            if (Pah::account_used_bank($id) && $status) {
                $status = false;
                $msg = "Akun bank gagal dibuat, karena account dipakai akun bank lain.";
            }
            if (!$status) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg
                ));
                Yii::app()->end();
            }
            foreach ($_POST as $k => $v) {
                $_POST['PahBankAccounts'][$k] = $v;
            }
            $model->attributes = $_POST['PahBankAccounts'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
                $msg = "Bank account gagal dibuat.";
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->id,
                    'msg' => $msg
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }
        $this->render('create', array('model' => $model));
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'PahBankAccounts');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahBankAccounts'][$k] = $v;
            }
            $model->attributes = $_POST['PahBankAccounts'];
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
            $status = true;
            $msg = "Akun bank berhasil dibuat";
            if (Pah::account_in_gl_trans($id)) {
                $status = false;
                $msg = "Akun bank gagal dibuat, karena account sudah dipakai transaksi.";
            }
            if (Pah::account_used_bank($id) && $status) {
                $status = false;
                $msg = "Akun bank gagal dibuat, karena account dipakai akun bank lain.";
            }
            if ($status) {
                $this->loadModel($id, 'PahBankAccounts')->delete();
            }
            echo CJSON::encode(array(
                'success' => $status,
                'msg' => $msg
            ));
            Yii::app()->end();
            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
        public function actionAdmin() {
            $dataProvider = new CActiveDataProvider('PahBankAccounts');
            $this->render('index', array(
                'dataProvider' => $dataProvider,
            ));
        }*/
    public function actionAdmin()
    {
        $model = new PahBankAccounts('search');
        $model->unsetAttributes();
        if (isset($_GET['PahBankAccounts']))
            $model->attributes = $_GET['PahBankAccounts'];
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
        //$model = new PahBankAccounts('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $model = PahBankAccounts::model()->findAll($criteria);
        $total = PahBankAccounts::model()->count($criteria);
        if (isset($_GET['PahBankAccounts']))
            $model->attributes = $_GET['PahBankAccounts'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PahBankAccounts('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}