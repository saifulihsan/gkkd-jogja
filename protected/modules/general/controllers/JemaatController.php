<?php
class JemaatController extends GxController {
    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'Jemaat'),
        ));
    }
    public function actionCreate() {
        $model = new Jemaat;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == 'real_name') {
                    $v = ucwords($v);
                }
                $_POST['Jemaat'][$k] = $v;
            }
            $model->attributes = $_POST['Jemaat'];
            $msg = "Data gagal disimpan";
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->nij;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->nij));
            }
        }
        $this->render('create', array('model' => $model));
    }
    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'Jemaat');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == 'real_name') {
                    $v = ucwords($v);
                }
                $_POST['Jemaat'][$k] = $v;
            }
            $model->attributes = $_POST['Jemaat'];
            $msg = "Data Jemaat dengan nomer induk " . $model->nij . " berhasil di ubah.";
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
                $msg = "Data Jemaat dengan nomer induk " . $model->nij . " gagal di ubah.";
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->nij));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }
    public function actionDelete($id) {
        if (Yii::app()->request->isPostRequest) {
            $this->loadModel($id, 'Jemaat')->delete();
            if (!Yii::app()->request->isAjaxRequest)
                    $this->redirect(array('admin'));
        }
        else
                throw new CHttpException(400,
            Yii::t('app',
                    'Invalid request. Please do not repeat this request again.'));
    }
    /*
      public function actionAdmin() {
      $dataProvider = new CActiveDataProvider('Jemaat');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */
    public function actionAdmin() {
        $model = new Jemaat('search');
        $model->unsetAttributes();
        if (isset($_GET['Jemaat'])) $model->attributes = $_GET['Jemaat'];
        $this->render('admin', array(
            'model' => $model,
        ));
    }
    public function actionIndex() {
        if (isset($_POST['mode']) && $_POST['mode'] == 'all') {
            $model = Jemaat::model()->findAll();
            $total = Jemaat::model()->count();
        } else {
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
            if (isset($_POST['nij'])) {
                $criteria->addCondition("nij like :nij");
                $param[':nij'] = "%" . $_POST['nij'] . "%";
            }
            if (isset($_POST['real_name'])) {
                $criteria->addCondition("real_name like :real_name");
                $param[':real_name'] = "%" . $_POST['real_name'] . "%";
            }
            if (isset($_POST['phone'])) {
                $criteria->addCondition("phone like :phone");
                $param[':phone'] = "%" . $_POST['phone'] . "%";
            }
            if (isset($_POST['email'])) {
                $criteria->addCondition("email like :email");
                $param[':email'] = "%" . $_POST['email'] . "%";
            }
            if (isset($_POST['alamat'])) {
                $criteria->addCondition("alamat like :alamat");
                $param[':alamat'] = "%" . $_POST['alamat'] . "%";
            }
            if (isset($_POST['inactive']) && $_POST['inactive'] != -1) {
                $criteria->addCondition("inactive = :inactive");
                $param[':inactive'] = $_POST['inactive'];
            }
            $criteria->params = $param;
            $criteria->limit = $limit;
            $criteria->offset = $start;
            $model = Jemaat::model()->findAll($criteria);
            $total = Jemaat::model()->count($criteria);
        }
        $this->renderJson($model, $total);
    }
}