<?php
class MtPelangganController extends GxController {
    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'MtPelanggan'),
        ));
    }
    public function actionCreate() {
        $model = new MtPelanggan;


        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtPelanggan'][$k] = $v;
            }
            $model->attributes = $_POST['MtPelanggan'];
            $msg = "Data gagal disimpan";

            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_pelanggan;
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
        $model = $this->loadModel($id, 'MtPelanggan');


        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtPelanggan'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtPelanggan'];

            if ($model->save()) {

                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_pelanggan;
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
                $this->redirect(array('view', 'id' => $model->id_pelanggan));
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
                $this->loadModel($id, 'MtPelanggan')->delete();
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
      $dataProvider = new CActiveDataProvider('MtPelanggan');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */
    public function actionAdmin() {
        $model = new MtPelanggan('search');
        $model->unsetAttributes();

        if (isset($_GET['MtPelanggan']))
                $model->attributes = $_GET['MtPelanggan'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }
    public function actionIndex() {
        if (isset($_POST['mode']) && $_POST['mode'] == 'all') {
            $model = MtPelanggan::model()->findAll();
            $total = MtPelanggan::model()->count();
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
            if (isset($_POST['nama'])) {
                $criteria->addCondition("nama like :nama");
                $param[':nama'] = "%" . $_POST['nama'] . "%";
            }
            if (isset($_POST['no_tlp'])) {
                $criteria->addCondition("no_tlp like :no_tlp");
                $param[':no_tlp'] = "%" . $_POST['no_tlp'] . "%";
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

            $model = MtPelanggan::model()->findAll($criteria);
            $total = MtPelanggan::model()->count($criteria);
        }
        $this->renderJson($model, $total);
    }
}