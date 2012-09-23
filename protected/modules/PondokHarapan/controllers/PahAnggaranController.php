<?php

class PahAnggaranController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'PahAnggaran'),
		));
	}

    public function actionIsPeriodeExist(){
        if (!Yii::app()->request->isAjaxRequest)
            return;

        if (isset($_POST) && !empty($_POST)){
            $bulan = $_POST['bulan'];
            $tahun = $_POST['tahun'];
            if($bulan === '' || $tahun === '')
            {
                echo CJSON::encode(array(
                    'success'=>false,
                    'msg'=>'Bulan atau Tahun periode tidak boleh kosong.'));
                Yii::app()->end();
            }

            if(PahAnggaranCom::is_periode_anggaran_exist($bulan,$tahun)){
                echo CJSON::encode(array(
                    'success'=>false,
                    'msg'=>'Anggaran dengan periode yang anda pilih sudah ada, silahkan gunakan menu ubah.'));
                Yii::app()->end();
            }else{
                echo CJSON::encode(array(
                    'success'=>true,
                    'msg'=>'sukses'));
                Yii::app()->end();
            }

        }
    }

	public function actionCreate() {
        require_once(Yii::app()->basePath. '/vendors/frontaccounting/ui.inc');

        return;
		$model = new PahAnggaran;
		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['PahAnggaran'][$k] = $v;
                        }
			$model->attributes = $_POST['PahAnggaran'];
			

			if ($model->save()) {
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->id));
                            Yii::app()->end();
                        } else
                        {
                            $this->redirect(array('view', 'id' => $model->id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'PahAnggaran');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['PahAnggaran'][$k] = $v;
                        }
			$model->attributes = $_POST['PahAnggaran'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->id                                ));
                            Yii::app()->end();
                        } else
                        {
				$this->redirect(array('view', 'id' => $model->id));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->request->isPostRequest) {
			$this->loadModel($id, 'PahAnggaran')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('PahAnggaran');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new PahAnggaran('search');
		$model->unsetAttributes();

		if (isset($_GET['PahAnggaran']))
			$model->attributes = $_GET['PahAnggaran'];

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
		//$model = new PahAnggaran('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = PahAnggaran::model()->findAll($criteria);
                $total = PahAnggaran::model()->count($criteria);
                
		if (isset($_GET['PahAnggaran']))
			$model->attributes = $_GET['PahAnggaran'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new PahAnggaran('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

}