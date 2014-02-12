<?php

class PahMemberController extends GxController
{
    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'PahMember'),
        ));
    }

    public function actionCreate()
    {
        $model = new PahMember;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahMember'][$k] = $v;
            }
            $model->attributes = $_POST['PahMember'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan ";
            } else {
                $msg = CHtml::errorSummary($model);
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg,
                    'id' => $model->id));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }
        $this->render('create', array('model' => $model));
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'PahMember');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahMember'][$k] = $v;
            }
            $model->attributes = $_POST['PahMember'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan ";
            } else {
                $msg = CHtml::errorSummary($model);
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg,
                    'id' => $model->id));
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
            $this->loadModel($id, 'PahMember')->delete();
            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
        public function actionAdmin() {
            $dataProvider = new CActiveDataProvider('PahMember');
            $this->render('index', array(
                'dataProvider' => $dataProvider,
            ));
        }*/
    public function actionAdmin()
    {
        $model = new PahMember('search');
        $model->unsetAttributes();
        if (isset($_GET['PahMember']))
            $model->attributes = $_GET['PahMember'];
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
        //$model = new PahMember('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $model = PahMember::model()->findAll($criteria);
        $total = PahMember::model()->count($criteria);
        if (isset($_GET['PahMember']))
            $model->attributes = $_GET['PahMember'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PahMember('search');
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
        //$model = new PahMember('search');
        //$model->unsetAttributes();
//        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
//        $model = PahMember::model()->findAll($criteria);
//        $total = PahMember::model()->count($criteria);
        $sql = "SELECT b.id, b.jemaat_nij, a.real_name, b.inactive
                FROM jemaat a
                inner join pah_member b ON a.nij = b.jemaat_nij
                ORDER BY a.real_name asc";
        $rows = Yii::app()->db->createCommand($sql)->queryAll();
        $result = array('total' => count($rows),
            'results' => $rows);
        //$this->renderJson($rows,1);
        echo CJSON::encode($result);
        Yii::app()->end();
//        if (isset($_GET['PahMember']))
//            $model->attributes = $_GET['PahMember'];
//        if (isset($_GET['output']) && $_GET['output'] == 'json') {
//            $this->renderJson($model, $total);
//        } else {
//            $model = new PahMember('search');
//            $model->unsetAttributes();
//            $this->render('admin', array(
//                'model' => $model,
//            ));
//        }
    }
}