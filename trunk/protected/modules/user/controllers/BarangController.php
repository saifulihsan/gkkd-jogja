<?php

class BarangController extends GxController {


	public function actionView($id) {
        if (!isset($_POST['format'])) {
            $this->render('view', array(
                'model' => $this->loadModel($id, 'Barang'),
            ));
//            $res = array('success' => false, 'msg' => 'Missing parameters');
//            echo json_encode($res);
            return;
        }
        $model = $this->loadModel($id, 'Barang');
        if($model == null)
        {
            $res = array('success' => false, 'msg' => 'Missing parameters');
            echo json_encode($res);
        }else{
            $res = array('success' => true, 'harga' => $model->harga,'desc' => $model->desc);
            echo json_encode($res);
        }
	}

	public function actionCreate() {
		$model = new Barang;

		
		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['Barang'][$k] = $v;
                        }
			$model->attributes = $_POST['Barang'];
			

			if ($model->save()) {
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->barang_id
                                ));
                            Yii::app()->end();
                        } else
                        {
                            $this->redirect(array('view', 'id' => $model->barang_id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'Barang');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['Barang'][$k] = $v;
                        }
			$model->attributes = $_POST['Barang'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->barang_id
                                ));
                            Yii::app()->end();
                        } else
                        {
				$this->redirect(array('view', 'id' => $model->barang_id));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->request->isPostRequest) {
			$this->loadModel($id, 'Barang')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('Barang');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new Barang('search');
		$model->unsetAttributes();

		if (isset($_GET['Barang']))
			$model->attributes = $_GET['Barang'];

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
		//$model = new Barang('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = Barang::model()->findAll($criteria);
                $total = Barang::model()->count($criteria);
                
		if (isset($_GET['Barang']))
			$model->attributes = $_GET['Barang'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new Barang('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

}