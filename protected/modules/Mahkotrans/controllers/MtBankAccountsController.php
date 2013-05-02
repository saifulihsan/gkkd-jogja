<?php

class MtBankAccountsController extends GxController
{
    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'MtBankAccounts'),
        ));
    }

    public function actionCreate()
    {

        //TODO: pengecekan jika no rekening sudah dipake transaksi
        $model = new MtBankAccounts;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['account_code'];
            $status = true;
            $msg = "Akun bank berhasil dibuat";
            if (Mt::account_in_gl_trans($id)) {
                $status = false;
                $msg = "Akun bank gagal dibuat, karena account sudah dipakai transaksi.";
            }
            if (Mt::account_used_bank($id) && $status) {
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
                $_POST['MtBankAccounts'][$k] = $v;
            }
            $model->attributes = $_POST['MtBankAccounts'];
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
        $model = $this->loadModel($id, 'MtBankAccounts');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtBankAccounts'][$k] = $v;
            }
            $model->attributes = $_POST['MtBankAccounts'];
            $msg = "Data Jemaat dengan nomer induk " . $model->id . " berhasil di ubah.";
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
                $msg = "Data Jemaat dengan nomer induk " . $model->id . " gagal di ubah.";
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg
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
            if (Mt::account_in_gl_trans($id)) {
                $status = false;
                $msg = "Akun bank gagal dibuat, karena account sudah dipakai transaksi.";
            }
            if (Mt::account_used_bank($id) && $status) {
                $status = false;
                $msg = "Akun bank gagal dibuat, karena account dipakai akun bank lain.";
            }
            if ($status) {
                $this->loadModel($id, 'MtBankAccounts')->delete();
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
            $dataProvider = new CActiveDataProvider('MtBankAccounts');
            $this->render('index', array(
                'dataProvider' => $dataProvider,
            ));
        }*/
    public function actionAdmin()
    {
        $model = new MtBankAccounts('search');
        $model->unsetAttributes();
        if (isset($_GET['MtBankAccounts']))
            $model->attributes = $_GET['MtBankAccounts'];
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
        //$model = new MtBankAccounts('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $model = MtBankAccounts::model()->findAll($criteria);
        $total = MtBankAccounts::model()->count($criteria);
        if (isset($_GET['MtBankAccounts']))
            $model->attributes = $_GET['MtBankAccounts'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtBankAccounts('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}