<?php

class JemaatController extends GxController
{
    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'Jemaat'),
        ));
    }

    public function actionCreate()
    {
        $model = new Jemaat;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == 'real_name') {
                    $v = ucwords($v);
                }
                $_POST['Jemaat'][$k] = $v;
            }
            $model->attributes = $_POST['Jemaat'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->nij));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->nij));
            }
        }
        $this->render('create', array('model' => $model));
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'Jemaat');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                if ($k == 'real_name') {
                    $v = ucwords($v);
                }
                $_POST['Jemaat'][$k] = $v;
            }
            $model->attributes = $_POST['Jemaat'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->nij));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->nij));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id)
    {
        if (Yii::app()->request->isPostRequest) {
            $this->loadModel($id, 'Jemaat')->delete();
            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
        public function actionAdmin() {
            $dataProvider = new CActiveDataProvider('Jemaat');
            $this->render('index', array(
                'dataProvider' => $dataProvider,
            ));
        }*/
    public function actionAdmin()
    {
        $model = new Jemaat('search');
        $model->unsetAttributes();
        if (isset($_GET['Jemaat']))
            $model->attributes = $_GET['Jemaat'];
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
        //$model = new Jemaat('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $model = Jemaat::model()->findAll($criteria);
        $total = Jemaat::model()->count($criteria);
        if (isset($_GET['Jemaat']))
            $model->attributes = $_GET['Jemaat'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new Jemaat('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}