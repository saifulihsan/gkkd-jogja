<?php

class PahKasKeluarController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'PahKasKeluar'),
		));
	}

	public function actionCreate() {
		$model = new PahKasKeluar;

		
		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['PahKasKeluar'][$k] = $v;
                        }
            $_POST['PahKasKeluar']['entry_time']=Yii::app()->dateFormatter->format('yyyy-MM-dd',time());
            $_POST['PahKasKeluar']['users_id']=Yii::app()->user->getId();
            $_POST['PahKasKeluar']['doc_ref']='';
			$model->attributes = $_POST['PahKasKeluar'];
			

			if ($model->save()) {
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
            $err=$model->getErrors();
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->kas_keluar_id                                ));
                            Yii::app()->end();
                        } else
                        {
                            $this->redirect(array('view', 'id' => $model->kas_keluar_id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'PahKasKeluar');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['PahKasKeluar'][$k] = $v;
                        }
            $_POST['PahKasKeluar']['entry_time']=Yii::app()->dateFormatter->format('yyyy-MM-dd',time());
            $_POST['PahKasKeluar']['users_id']=Yii::app()->user->getId();
            $_POST['PahKasKeluar']['doc_ref']='';
			$model->attributes = $_POST['PahKasKeluar'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->kas_keluar_id                                ));
                            Yii::app()->end();
                        } else
                        {
				$this->redirect(array('view', 'id' => $model->kas_keluar_id));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->request->isPostRequest) {
			$this->loadModel($id, 'PahKasKeluar')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('PahKasKeluar');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new PahKasKeluar('search');
		$model->unsetAttributes();

		if (isset($_GET['PahKasKeluar']))
			$model->attributes = $_GET['PahKasKeluar'];

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
		//$model = new PahKasKeluar('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = PahKasKeluar::model()->findAll($criteria);
                $total = PahKasKeluar::model()->count($criteria);
                
		if (isset($_GET['PahKasKeluar']))
			$model->attributes = $_GET['PahKasKeluar'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new PahKasKeluar('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

}