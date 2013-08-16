<?php
class PahLampiranController extends GxController {
    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'PahLampiran'),
        ));
    }
    public function actionCreate() {
        $model = new PahLampiran;
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahLampiran'][$k] = $v;
            }
            $_POST['PahLampiran']['entry_time'] = Now();
            $model->attributes = $_POST['PahLampiran'];
            $msg = "Data gagal disimpan";
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_lampiran;
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
        $model = $this->loadModel($id, 'PahLampiran');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahLampiran'][$k] = $v;
            }
            $model->attributes = $_POST['PahLampiran'];
            $msg = "Data gagal disimpan";
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_lampiran;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id_lampiran));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }
    public function actionDelete($id) {
        if (Yii::app()->request->isPostRequest) {
            $msg = 'Lampiran berhasil dihapus.';
            $status = true;
            try {
                $this->loadModel($id, 'PahLampiran')->delete();
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
      $dataProvider = new CActiveDataProvider('PahLampiran');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */
    public function actionAdmin() {
        $model = new PahLampiran('search');
        $model->unsetAttributes();
        if (isset($_GET['PahLampiran']))
                $model->attributes = $_GET['PahLampiran'];
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
        if (isset($_POST['nama'])) {
            $criteria->addCondition("nama like :nama");
            $param[':nama'] = "%" . $_POST['nama'] . "%";
        }
        if (isset($_POST['keterangan'])) {
            $criteria->addCondition("keterangan like :keterangan");
            $param[':keterangan'] = "%" . $_POST['keterangan'] . "%";
        }
        if (isset($_POST['satuan'])) {
            $criteria->addCondition("satuan like :satuan");
            $param[':satuan'] = "%" . $_POST['satuan'] . "%";
        }
        if (isset($_POST['qty'])) {
            $criteria->addCondition("qty = :qty");
            $param[':qty'] = $_POST['qty'];
        }
        if (isset($_POST['trans_date'])) {
            $criteria->addCondition("trans_date = :trans_date");
            $param[':trans_date'] = substr($_POST['trans_date'], 0, 10);
        }
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $criteria->params = $param;
        $model = PahLampiran::model()->findAll($criteria);
        $total = PahLampiran::model()->count($criteria);
        $this->renderJson($model, $total);
    }
}