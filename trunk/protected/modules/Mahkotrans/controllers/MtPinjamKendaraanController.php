<?php

class MtPinjamKendaraanController extends GxController {

    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'MtPinjamKendaraan'),
        ));
    }

    public function actionCreate() {
        //return;
        $model = new MtPinjamKendaraan;
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Peminjaman kendaraan berhasil disimpan.';
            $transaction = app()->db->beginTransaction();
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(PINJAM_KENDARAAN);
                $user = app()->user->getId();
                foreach ($_POST as $k => $v) {
                    if ($k == 'ongkos_sewa' || $k == 'ongkos_driver' || $k == 'ongkos_bbm' || $k == 'total_ongkos' || $k == 'dp' || $k == 'sisa_tagihan' || $k == 'disc' || $k == 'total') {
                        $v = get_number($v);
                    }
//                else if ($k == 'jam_kembali' || $k == 'jam_pinjam') {
//                    $v = $v.":00";
//                }
                    $_POST['MtPinjamKendaraan'][$k] = $v;
                }
                $_POST['MtPinjamKendaraan']['entry_time'] = Now();
                $_POST['MtPinjamKendaraan']['users_id'] = $user;
                $_POST['MtPinjamKendaraan']['doc_ref'] = $docref;
                $model->attributes = $_POST['MtPinjamKendaraan'];
                $msg = "Data gagal disimpan";

                if ($model->save()) {
                    $status = true;
                    $msg = "Data berhasil di simpan dengan id " . $model->id_pinjam;
                } else {
                    $status = false;
                }
                $id = $docref;
                $ref->save(PINJAM_KENDARAAN, $model->id_pinjam, $docref);
                $transaction->commit();
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
            echo CJSON::encode(array(
                'success' => $status,
                'msg' => $msg));
            Yii::app()->end();
        }
    }

    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'MtPinjamKendaraan');


        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtPinjamKendaraan'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtPinjamKendaraan'];

            if ($model->save()) {

                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_pinjam;
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
                $this->redirect(array('view', 'id' => $model->id_pinjam));
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
                $this->loadModel($id, 'MtPinjamKendaraan')->delete();
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
      $dataProvider = new CActiveDataProvider('MtPinjamKendaraan');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */

    public function actionAdmin() {
        $model = new MtPinjamKendaraan('search');
        $model->unsetAttributes();

        if (isset($_GET['MtPinjamKendaraan']))
                $model->attributes = $_GET['MtPinjamKendaraan'];

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
//$model = new MtPinjamKendaraan('search');
//$model->unsetAttributes();

        $criteria = new CDbCriteria();
//$criteria->limit = $limit;
//$criteria->offset = $start;
        $model = MtPinjamKendaraan::model()->findAll($criteria);
        $total = MtPinjamKendaraan::model()->count($criteria);

        if (isset($_GET['MtPinjamKendaraan']))
                $model->attributes = $_GET['MtPinjamKendaraan'];

        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtPinjamKendaraan('search');
            $model->unsetAttributes();

            $this->render('admin',
                    array(
                'model' => $model,
            ));
        }
    }

}