<?php

class NotaDtlController extends GxController {


	public function actionView($id) {
            $criteria = new CDbCriteria();
            $criteria->condition = 'nota_id ='.$id;
            $model = NotaDtl::model()->findAll($criteria);
            $total = NotaDtl::model()->count($criteria);
            if (isset($_GET['output']) && $_GET['output']=='json') {
                $this->renderJson($model, $total);
                //$this->renderPartial("_form",array('model'=>$model),false,true);
            }
//        }
        //return;
		$this->render('view', array(
			'model' => $this->loadModel($id, 'NotaDtl'),
		));
	}

	public function actionCreate() {
        if (isset($_POST) && !empty($_POST)){
            $nota_json = $_POST['data'];
            $datas = CJSON::decode($nota_json, true);
            foreach($datas as $data){
                $model = new NotaDtl;                
                $model->attributes = $data;
                if ($model->save()) {
                    $status = true;
                } else {
                    $status = false;
                }
            }
            if (Yii::app()->request->isAjaxRequest)
            {
                echo CJSON::encode(array(
                    'success'=>$status,
                    'id'=>'0'
                ));
                Yii::app()->end();
            }
        }
//        return;
//		$model = new NotaDtl;
//
//		if (isset($_POST) && !empty($_POST)) {
//                        foreach($_POST as $k=>$v){
//                            $_POST['NotaDtl'][$k] = $v;
//                        }
//			$model->attributes = $_POST['NotaDtl'];
//
//
//			if ($model->save()) {
//                            $status = true;
//                        } else {
//                            $status = false;
//                        }
//
//                        if (Yii::app()->request->isAjaxRequest)
//                        {
//                            echo CJSON::encode(array(
//                                'success'=>$status,
//                                'id'=>$model->nota_dtl_id
//                                ));
//                            Yii::app()->end();
//                        } else
//                        {
//                            $this->redirect(array('view', 'id' => $model->nota_dtl_id));
//			}
//		}
//
//		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'NotaDtl');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['NotaDtl'][$k] = $v;
                        }
			$model->attributes = $_POST['NotaDtl'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->nota_dtl_id
                                ));
                            Yii::app()->end();
                        } else
                        {
				$this->redirect(array('view', 'id' => $model->nota_dtl_id));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->request->isPostRequest) {
			$this->loadModel($id, 'NotaDtl')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('NotaDtl');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new NotaDtl('search');
		$model->unsetAttributes();

		if (isset($_GET['NotaDtl']))
			$model->attributes = $_GET['NotaDtl'];

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
		//$model = new NotaDtl('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = NotaDtl::model()->findAll($criteria);
                $total = NotaDtl::model()->count($criteria);
                
		if (isset($_GET['NotaDtl']))
			$model->attributes = $_GET['NotaDtl'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new NotaDtl('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

}