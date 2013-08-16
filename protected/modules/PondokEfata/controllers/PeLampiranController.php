<?php
class PeLampiranController extends GxController {
    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'PeLampiran'),
        ));
    }
    public function actionCreate() {
        $model = new PeLampiran;
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == 'qty') $v = get_number($v);
                $_POST['PeLampiran'][$k] = $v;
            }
            $model->attributes = $_POST['PeLampiran'];
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
        $model = $this->loadModel($id, 'PeLampiran');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == 'qty') $v = get_number($v);
                $_POST['PeLampiran'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['PeLampiran'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_lampiran;
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
                $this->redirect(array('view', 'id' => $model->id_lampiran));
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
                $this->loadModel($id, 'PeLampiran')->delete();
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
      $dataProvider = new CActiveDataProvider('PeLampiran');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */
    public function actionAdmin() {
        $model = new PeLampiran('search');
        $model->unsetAttributes();
        if (isset($_GET['PeLampiran']))
                $model->attributes = $_GET['PeLampiran'];
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
        $model = PeLampiran::model()->findAll($criteria);
        $total = PeLampiran::model()->count($criteria);
        $this->renderJson($model, $total);
    }
}