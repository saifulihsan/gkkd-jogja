<?php

class UsersController extends GxController
{
    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'Users'),
        ));
    }

    public function actionCreate()
    {
        $model = new Users;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == "password") {
                    $crypt = new bCrypt();
                    $v = $crypt->hash($v);
                }
                $_POST['Users'][$k] = $v;
            }
            $model->attributes = $_POST['Users'];
            $msg = "User gagal disimpan";
            if ($model->save()) {
                $status = true;
                $msg = "User berhasil di simpan dengan id " . $model->id;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }
        $this->render('create', array('model' => $model));
    }

    public function actionUpdate($id)
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        $model = $this->loadModel($id, 'Users');
        $newpass = generatePassword();
        $crypt = new bCrypt();
        $v = $crypt->hash($newpass);
        $msg = "Password berhasil di reset. Info login yang baru.<br />Username : $model->user_id<br />
            Password : $newpass";
        $model->password = $v;
        if ($model->save()) {
            $status = true;
        } else {
            $status = false;
            $msg = "Password gagal di reset";
        }
        echo CJSON::encode(array(
            'success' => $status,
            'msg' => $msg));
        Yii::app()->end();
//        $model = $this->loadModel($id, 'Users');
//        if (isset($_POST) && !empty($_POST)) {
//            foreach ($_POST as $k => $v) {
//                $_POST['Users'][$k] = $v;
//            }
//            $model->attributes = $_POST['Users'];
//            $msg = "User dengan id " . $model->id . " berhasil di ubah.";
//            if ($model->save()) {
//                $status = true;
//            } else {
//                $status = false;
//                $msg = "User dengan id " . $model->id . " gagal di ubah.";
//            }
//            if (Yii::app()->request->isAjaxRequest) {
//                echo CJSON::encode(array(
//                    'success' => $status,
//                    'msg' => $msg));
//                Yii::app()->end();
//            } else {
//                $this->redirect(array('view', 'id' => $model->id));
//            }
//        }
//        $this->render('update', array(
//            'model' => $model,
//        ));
    }

    public function actionUpdatePass()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $passold = $_POST['passwordold'];
            $passnew = $_POST['password'];
            $model = $this->loadModel(Yii::app()->user->getId(), 'Users');
            $msg = "Password lama salah. Untuk mengganti password, password lama harus benar.";
            $status = false;
            if (bCrypt::verify($passold, $model->password)) {
                $crypt = new bCrypt();
                $pass = $crypt->hash($passnew);
                $model->password = $pass;
                if ($model->save()) {
                    $status = true;
                    $msg = "Password berhasil diganti.";
                } else {
                    $status = false;
                    $msg = "Password gagal diganti";
                }
            }
            echo CJSON::encode(array(
                'success' => $status,
                'msg' => $msg));
            Yii::app()->end();
        }
    }
    
    public function actionUpdateRole() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $role = $_POST['security_roles_id'];
            $model = $this->loadModel($id, 'Users');
            $msg = "Security role berhasil di ubah.";
            $status = true;
            $model->security_roles_id = $role;
            if (!$model->save()) {
                $status = false;
                $msg = "Security role gagal di ubah.";
            }
            echo CJSON::encode(array(
                'success' => $status,
                'msg' => $msg));
            Yii::app()->end();
        }
    }

    public function actionDelete($id)
    {
        $msg = "User dengan id " . $model->id . " berhasil di hapus.";
        $status = true;
        if (Yii::app()->request->isPostRequest) {
            try {
                $this->loadModel($id, 'Users')->delete();
            } catch (Exception $ex) {
                $msg = $ex;
                $status = false;
            }
            echo CJSON::encode(array(
                'success' => $status,
                'msg' => $msg));
            Yii::app()->end();
            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
        public function actionAdmin() {
            $dataProvider = new CActiveDataProvider('Users');
            $this->render('index', array(
                'dataProvider' => $dataProvider,
            ));
        }*/
    public function actionAdmin()
    {
        $model = new Users('search');
        $model->unsetAttributes();
        if (isset($_GET['Users']))
            $model->attributes = $_GET['Users'];
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
        //$model = new Users('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $model = Users::model()->findAll($criteria);
        $total = Users::model()->count($criteria);
        if (isset($_GET['Users']))
            $model->attributes = $_GET['Users'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new Users('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}