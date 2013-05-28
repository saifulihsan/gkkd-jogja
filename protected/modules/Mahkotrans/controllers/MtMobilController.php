<?php

class MtMobilController extends GxController {

    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'MtMobil'),
        ));
    }

    public function actionCreate() {
        $model = new MtMobil;


        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == 'tarif_12' || $k == 'tarif_24' || $k == 'tarif_high_12' 
                        || $k == 'tarif_high_24' || $k == 'tarif_bulanan')
                        $v = get_number($v);
                $_POST['MtMobil'][$k] = $v;
            }
            $model->attributes = $_POST['MtMobil'];
            $msg = "Data gagal disimpan";

            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_mobil;
            } else {
                $status = false;
            }

            echo CJSON::encode(array(
                'success' => $status,
                'msg' => $msg));
            Yii::app()->end();
        }
    }

    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'MtMobil');


        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == 'tarif_12'  || $k == 'tarif_24'  || $k == 'tarif_high_12'  
                        || $k == 'tarif_high_24'  || $k == 'tarif_bulanan') 
                    $v = get_number($v);
                $_POST['MtMobil'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtMobil'];

            if ($model->save()) {

                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_mobil;
            } else {
                $status = false;
            }

            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id_mobil));
            }
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id) {
        if (Yii::app()->request->isPostRequest) {
            $msg = 'Data berhasil dihapus.';
            $status = true;
            try {
                $this->loadModel($id, 'MtMobil')->delete();
            } catch (Exception $e) {
                $status = false;
                $msg = $ex;
            }
            echo CJSON::encode(array(
                'success' => $status,
                'msg' => $msg));
            Yii::app()->end();
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
      $dataProvider = new CActiveDataProvider('MtMobil');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */

    public function actionAdmin() {
        $model = new MtMobil('search');
        $model->unsetAttributes();

        if (isset($_GET['MtMobil'])) $model->attributes = $_GET['MtMobil'];

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
//$model = new MtMobil('search');
//$model->unsetAttributes();

        $criteria = new CDbCriteria();
//$criteria->limit = $limit;
//$criteria->offset = $start;
        $model = MtMobil::model()->findAll($criteria);
        $total = MtMobil::model()->count($criteria);

        if (isset($_GET['MtMobil'])) $model->attributes = $_GET['MtMobil'];

        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtMobil('search');
            $model->unsetAttributes();

            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }

}