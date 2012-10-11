<?php

class PahGlTransController extends GxController
{
    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'PahGlTrans'),
        ));
    }

    public function actionCreate()
    {
        $model = new PahGlTrans;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahGlTrans'][$k] = $v;
            }
            $model->attributes = $_POST['PahGlTrans'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->counter));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->counter));
            }
        }
        $this->render('create', array('model' => $model));
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'PahGlTrans');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahGlTrans'][$k] = $v;
            }
            $model->attributes = $_POST['PahGlTrans'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->counter));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->counter));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id)
    {
        if (Yii::app()->request->isPostRequest) {
            $this->loadModel($id, 'PahGlTrans')->delete();
            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
        public function actionAdmin() {
            $dataProvider = new CActiveDataProvider('PahGlTrans');
            $this->render('index', array(
                'dataProvider' => $dataProvider,
            ));
        }*/
    public function actionAdmin()
    {
        $model = new PahGlTrans('search');
        $model->unsetAttributes();
        if (isset($_GET['PahGlTrans']))
            $model->attributes = $_GET['PahGlTrans'];
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
        //$model = new PahGlTrans('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $model = PahGlTrans::model()->findAll($criteria);
        $total = PahGlTrans::model()->count($criteria);
        if (isset($_GET['PahGlTrans']))
            $model->attributes = $_GET['PahGlTrans'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PahGlTrans('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}