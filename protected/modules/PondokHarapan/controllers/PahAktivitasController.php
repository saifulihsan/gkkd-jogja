<?php

class PahAktivitasController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'PahAktivitas'),
		));
	}

	public function actionCreate() {
		$model = new PahAktivitas;

		
		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){

                        $_POST['PahAktivitas'][$k] = $v;

                        }

           $_POST['PahAktivitas']['entry_time']=Yii::app()->dateFormatter->format('yyyy-MM-dd',time());
           $_POST['PahAktivitas']['users_id']=Yii::app()->user->getId();
           $_POST['PahAktivitas']['doc_ref']='';
			$model->attributes = $_POST['PahAktivitas'];


			if ($model->save()) {
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->aktivitas_id));
                            Yii::app()->end();
                        } else
                        {
                            $this->redirect(array('view', 'id' => $model->aktivitas_id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

    /*public function actionCreate() {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)){
            $status = false;
            $msg = 'Aktifitas berhasil disimpan.';
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $model = new PahAktivitas;
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(ANGGARAN);
                $_POST['PahAktivitas']['doc_ref'] = $docref;
                $_POST['PahAktivitas']['periode_bulan'] = $bulan;
                $_POST['PahAktivitas']['periode_tahun'] = $tahun;
                $_POST['PahAktivitas']['lock'] = 0;
                $_POST['PahAktivitas']['trans_date'] = '2012-09-24';
                $_POST['PahAktivitas']['users_id'] = Yii::app()->user->getId();
                $model->attributes = $_POST['PahAktivitas'];
                $result = $model->save();
                $err = $model->getErrors();
                $transaction->commit();
                $status = true;
            }
            catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }




            echo CJSON::encode(array(
                'success'=>$status,
                'bulan'=>$bulanStr,
                'tahun'=>$tahun,
                'id'=>$docref,
                'msg'=>$msg));

            Yii::app()->end();

        }

    }*/



	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'PahAktivitas');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['PahAktivitas'][$k] = $v;
                        }
			$model->attributes = $_POST['PahAktivitas'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->aktivitas_id                                ));
                            Yii::app()->end();
                        } else
                        {
				$this->redirect(array('view', 'id' => $model->aktivitas_id));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->request->isPostRequest) {
			$this->loadModel($id, 'PahAktivitas')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('PahAktivitas');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new PahAktivitas('search');
		$model->unsetAttributes();

		if (isset($_GET['PahAktivitas']))
			$model->attributes = $_GET['PahAktivitas'];

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
		//$model = new PahAktivitas('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = PahAktivitas::model()->findAll($criteria);
                $total = PahAktivitas::model()->count($criteria);
                
		if (isset($_GET['PahAktivitas']))
			$model->attributes = $_GET['PahAktivitas'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new PahAktivitas('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

}