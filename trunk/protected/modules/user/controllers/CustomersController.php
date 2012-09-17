<?php

class CustomersController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'Customers'),
		));
	}

	public function actionCreate() {
		$model = new Customers;

		
		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['Customers'][$k] = $v;
                        }
			$model->attributes = $_POST['Customers'];
			

			if ($model->save()) {
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->customer_id
                                ));
                            Yii::app()->end();
                        } else
                        {
                            $this->redirect(array('view', 'id' => $model->customer_id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'Customers');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['Customers'][$k] = $v;
                        }
			$model->attributes = $_POST['Customers'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->customer_id
                                ));
                            Yii::app()->end();
                        } else
                        {
				$this->redirect(array('view', 'id' => $model->customer_id));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->request->isPostRequest) {
			$this->loadModel($id, 'Customers')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('Customers');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new Customers('search');
		$model->unsetAttributes();

		if (isset($_GET['Customers']))
			$model->attributes = $_GET['Customers'];

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
		//$model = new Customers('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = Customers::model()->findAll($criteria);
                $total = Customers::model()->count($criteria);
                
		if (isset($_GET['Customers']))
			$model->attributes = $_GET['Customers'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new Customers('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

}