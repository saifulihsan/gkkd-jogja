<?php

class PahBankTransController extends GxController {


//	public function actionView($id) {
//		$this->render('view', array(
//			'model' => $this->loadModel($id, 'PahBankTrans'),
//		));
//	}

    public function actionView() {
        require_once(Yii::app()->basePath. '/vendors/frontaccounting/ui.inc');
        $bfw = BankTransHelper::get_balance_before_for_bank_account($_POST['bank_act'], $_POST['from_date']);
        $arr['data'][] = array('type' => 'Saldo Awal - '.sql2date($_POST['from_date']),'ref' => '','tgl' => '',
            'debit'=>$bfw>=0?number_format($bfw,2):'','kredit'=>$bfw<0?number_format($bfw,2):'','neraca'=>'','person'=>'');
        $credit = $debit = 0;
        $running_total = $bfw;
        if ($bfw > 0 )
            $debit += $bfw;
        else
            $credit += $bfw;
        $result = BankTransHelper::get_bank_trans_for_bank_account($_POST['bank_act'], $_POST['from_date'], $_POST['to_date']);
        foreach($result as $myrow)
        {
            $running_total += $myrow->amount;
            $arr['data'][] = array('type' => $systypes_array[$myrow->type],'ref' => $myrow->ref,'tgl' => sql2date($myrow->trans_date),
                'debit'=>$myrow->amount>=0?number_format($myrow->amount,2):'',
                'kredit'=>$myrow->amount<0?number_format(-$myrow->amount,2):'',
                'neraca'=>number_format($running_total,2),'person'=>'');
            if ($myrow->amount > 0 )
                $debit += $myrow->amount;
            else
                $credit += $myrow->amount;
        }
        $arr['data'][] = array('type' => 'Saldo Akhir - '.sql2date($_POST['to_date']),'ref' => '','tgl' => '',
            'debit'=>number_format($debit,2),'kredit'=>number_format(-$credit,2),'neraca'=>number_format($debit+$credit,2),
            'person'=>'');
        echo CJSON::encode($arr);
        Yii::app()->end();
    }

	public function actionCreate() {
		$model = new PahBankTrans;

		
		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['PahBankTrans'][$k] = $v;
                        }
			$model->attributes = $_POST['PahBankTrans'];
			

			if ($model->save()) {
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->id
                                ));
                            Yii::app()->end();
                        } else
                        {
                            $this->redirect(array('view', 'id' => $model->id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'PahBankTrans');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['PahBankTrans'][$k] = $v;
                        }
			$model->attributes = $_POST['PahBankTrans'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->id
                                ));
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
			$this->loadModel($id, 'PahBankTrans')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('PahBankTrans');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new PahBankTrans('search');
		$model->unsetAttributes();

		if (isset($_GET['PahBankTrans']))
			$model->attributes = $_GET['PahBankTrans'];

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
		//$model = new PahBankTrans('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = PahBankTrans::model()->findAll($criteria);
                $total = PahBankTrans::model()->count($criteria);
                
		if (isset($_GET['PahBankTrans']))
			$model->attributes = $_GET['PahBankTrans'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new PahBankTrans('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

}