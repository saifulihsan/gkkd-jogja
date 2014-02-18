<?php

class PeMemberController extends GxController
{
    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'PeMember'),
        ));
    }

    public function actionCreate()
    {
        $model = new PeMember;
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PeMember'][$k] = $v;
            }
            $model->attributes = $_POST['PeMember'];
            $msg = "Data gagal disimpan";
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id;
            } else {
                $msg .= " ".CHtml::errorSummary($model);
                $status = false;
            }
            echo CJSON::encode(array(
                'success' => $status,
                'msg' => $msg));
            Yii::app()->end();
        }
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'PeMember');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PeMember'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['PeMember'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id;
            } else {
                $msg .= " ".CHtml::errorSummary($model);
                $status = false;
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
            $msg = 'Data berhasil dihapus.';
            $status = true;
            try {
                $this->loadModel($id, 'PeMember')->delete();
            } catch (Exception $e) {
                $status = false;
                $msg = $e;
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
    $dataProvider = new CActiveDataProvider('PeMember');
    $this->render('index', array(
    'dataProvider' => $dataProvider,
    ));
    }*/
    public function actionAdmin()
    {
        $model = new PeMember('search');
        $model->unsetAttributes();
        if (isset($_GET['PeMember']))
            $model->attributes = $_GET['PeMember'];
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
//$model = new PeMember('search');
//$model->unsetAttributes();
        $criteria = new CDbCriteria();
//$criteria->limit = $limit;
//$criteria->offset = $start;
        $model = PeMember::model()->findAll($criteria);
        $total = PeMember::model()->count($criteria);
        if (isset($_GET['PeMember']))
            $model->attributes = $_GET['PeMember'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PeMember('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }

    public function actionIndexbyName()
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
        $model = new PeMember('search');
        //$model->unsetAttributes();
//        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
//        $model = PeMember::model()->findAll($criteria);
//        $total = PeMember::model()->count($criteria);
        $sql = "SELECT b.id, b.jemaat_nij, a.real_name, b.inactive
                FROM jemaat a
                inner join pe_member b ON a.nij = b.jemaat_nij
                ORDER BY a.real_name asc";
        $rows = Yii::app()->db->createCommand($sql)->queryAll();
        $result = array('total' => count($rows),
            'results' => $rows);
        //$this->renderJson($rows,1);
        echo CJSON::encode($result);
        Yii::app()->end();
//        if (isset($_GET['PeMember']))
//            $model->attributes = $_GET['PeMember'];
//        if (isset($_GET['output']) && $_GET['output'] == 'json') {
//            $this->renderJson($model, $total);
//        } else {
//            $model = new PeMember('search');
//            $model->unsetAttributes();
//            $this->render('admin', array(
//                'model' => $model,
//            ));
//        }
    }
}