<?php

class MtChartTypesController extends GxController
{
    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'MtChartTypes'),
        ));
    }

    public function actionCreate()
    {
        $model = new MtChartTypes;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtChartTypes'][$k] = $v;
            }
            $model->attributes = $_POST['MtChartTypes'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->id
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }
        $this->render('create', array('model' => $model));
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'MtChartTypes');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtChartTypes'][$k] = $v;
            }
            $model->attributes = $_POST['MtChartTypes'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->id
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
            $this->loadModel($id, 'MtChartTypes')->delete();
            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
        public function actionAdmin() {
            $dataProvider = new CActiveDataProvider('MtChartTypes');
            $this->render('index', array(
                'dataProvider' => $dataProvider,
            ));
        }*/
    public function actionAdmin()
    {
        $model = new MtChartTypes('search');
        $model->unsetAttributes();
        if (isset($_GET['MtChartTypes']))
            $model->attributes = $_GET['MtChartTypes'];
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
        //$model = new MtChartTypes('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $model = MtChartTypes::model()->findAll($criteria);
        $total = MtChartTypes::model()->count($criteria);
        if (isset($_GET['MtChartTypes']))
            $model->attributes = $_GET['MtChartTypes'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtChartTypes('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}