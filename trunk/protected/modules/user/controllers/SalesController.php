<?php

class SalesController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'Sales'),
		));
	}

	public function actionCreate() {
		$model = new Sales;

		
		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['Sales'][$k] = $v;
                        }
			$model->attributes = $_POST['Sales'];
			

			if ($model->save()) {
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->sales_id
                                ));
                            Yii::app()->end();
                        } else
                        {
                            $this->redirect(array('view', 'id' => $model->sales_id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'Sales');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['Sales'][$k] = $v;
                        }
			$model->attributes = $_POST['Sales'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->sales_id
                                ));
                            Yii::app()->end();
                        } else
                        {
				$this->redirect(array('view', 'id' => $model->sales_id));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->request->isPostRequest) {
			$this->loadModel($id, 'Sales')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('Sales');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new Sales('search');
		$model->unsetAttributes();

		if (isset($_GET['Sales']))
			$model->attributes = $_GET['Sales'];

		$this->render('admin', array(
			'model' => $model,
		));
	}

	public function actionIndex() {
                if(isset($_POST['limit'])) {
                        $limit = $_POST['limit'];
                } else {
                    $limit = 20;
                }

                if(isset($_POST['start'])){
                    $start = $_POST['start'];

                } else {
                    $start = 0;
                }
		//$model = new Sales('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = Sales::model()->findAll($criteria);
                $total = Sales::model()->count($criteria);
                
		if (isset($_GET['Sales']))
			$model->attributes = $_GET['Sales'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new Sales('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

}