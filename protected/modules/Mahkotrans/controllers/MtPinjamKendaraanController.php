<?php
class MtPinjamKendaraanController extends GxController{
	public function actionView($id){
		$this->render('view',
				array(
						'model'=>$this->loadModel($id,'MtPinjamKendaraan')
				));
	}
	public function actionCreate(){
		// return;
		$model=new MtPinjamKendaraan();
		if(!Yii::app()->request->isAjaxRequest)
			return;
		if(isset($_POST)&&!empty($_POST)){
			$status=false;
			$msg='Peminjaman kendaraan berhasil disimpan.';
			$transaction=app()->db->beginTransaction();
			$id=-1;
			try{
				$ref=new MtReferenceCom();
				$docref=$ref->get_next_reference(PINJAM_KENDARAAN);
				$user=app()->user->getId();
				foreach($_POST as $k=>$v){
					if($k=='ongkos_sewa'||$k=='ongkos_driver'||$k=='ongkos_bbm'||$k=='total_ongkos'||$k=='dp'||$k=='sisa_tagihan'||$k=='disc'||$k=='total'){
						$v=get_number($v);
					}
					$_POST['MtPinjamKendaraan'][$k]=$v;
				}
				$_POST['MtPinjamKendaraan']['entry_time']=Now();
				$_POST['MtPinjamKendaraan']['id_driver']=is_integer(
						$_POST['MtPinjamKendaraan']['id_driver'])?$_POST['MtPinjamKendaraan']['id_driver']:NULL;
				$_POST['MtPinjamKendaraan']['users_id']=$user;
				$_POST['MtPinjamKendaraan']['doc_ref']=$docref;
				$model->attributes=$_POST['MtPinjamKendaraan'];
				$msg="Data gagal disimpan";
				if($model->save()){
					$status=true;
					$msg="Data berhasil di simpan dengan id ".$model->id_pinjam;
				}else{
					$status=false;
				}
				$id=$docref;
				$date=$model->trans_date;
				$ref->save(PINJAM_KENDARAAN,$model->id_pinjam,$docref);
				if($model->dp>0){
					$bank_account=Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_ditangan'));
					// debet kas - kredit pendapatan
					Mt::add_gl(PINJAM_KENDARAAN,$model->id_pinjam,$date,$docref,$bank_account,'-',
							$model->dp,$user,$model->id_mobil);
					Mt::add_gl(PINJAM_KENDARAAN,$model->id_pinjam,$date,$docref,
							Mt::get_prefs('akun_penjualan'),'-',-$model->dp,$user,$model->id_mobil);
				}
				$transaction->commit();
			}catch(Exception $ex){
				$transaction->rollback();
				$status=false;
				$msg=$ex;
			}
			echo CJSON::encode(
					array(
							'success'=>$status,
							'msg'=>$msg,
							'id'=>$id
					));
			Yii::app()->end();
		}
	}
	public function actionUpdate($id){
		$model=$this->loadModel($id,'MtPinjamKendaraan');
		if(isset($_POST)&&!empty($_POST)){
			foreach($_POST as $k=>$v){
				$_POST['MtPinjamKendaraan'][$k]=$v;
			}
			$msg="Data gagal disimpan";
			$model->attributes=$_POST['MtPinjamKendaraan'];
			if($model->save()){
				$status=true;
				$msg="Data berhasil di simpan dengan id ".$model->id_pinjam;
			}else{
				$status=false;
			}
			if(Yii::app()->request->isAjaxRequest){
				echo CJSON::encode(
						array(
								'success'=>$status,
								'msg'=>$msg
						));
				Yii::app()->end();
			}else{
				$this->redirect(array(
						'view',
						'id'=>$model->id_pinjam
				));
			}
		}
		$this->render('update',array(
				'model'=>$model
		));
	}
	public function actionDelete(){
		if(Yii::app()->request->isPostRequest){
			if(isset($_POST)&&!empty($_POST)){
				$msg='Data berhasil divoid.';
				$status=true;
				$id=$_POST['id'];
				$memo_=$_POST['memo_'];
				$transaction=app()->db->beginTransaction();
				try{
					$user=app()->user->getId();
					$model=$this->loadModel($id,'MtPinjamKendaraan');
					$date=$model->trans_date;
					$docref=$model->doc_ref;
					$msg="Peminjaman kendaraan dengan referensi $docref berhasil divoid.";
					$void=new MtVoided();
					$void->type=PINJAM_KENDARAAN;
					$void->id=$id;
					$void->date_=$date;
					$void->memo_=$memo_;
					$void->save();
					if($model->dp>0){
						$bank_account=Mt::get_act_code_from_bank_act(
								Mt::get_prefs('akun_kas_ditangan'));
						// void gl
						// debit penjualan , kredit kas
						Mt::add_gl(VOID,$void->id_voided,$date,$docref,
								Mt::get_prefs('akun_penjualan'),"VOID Peminjaman Kendaraan $docref",
								$model->dp,$user,$model->id_mobil);
						Mt::add_gl(VOID,$void->id_voided,$date,$docref,$bank_account,
								"VOID Peminjaman Kendaraan $docref",-$model->dp,$user,
								$model->id_mobil);
					}
					$status=true;
					$transaction->commit();
				}catch(Exception $e){
					$transaction->rollback();
					$status=false;
					$msg=$ex;
				}
				echo CJSON::encode(
						array(
								'success'=>$status,
								'msg'=>$msg
						));
				Yii::app()->end();
			}
		}else
			throw new CHttpException(400,Yii::t('app',
					'Invalid request. Please do not repeat this request again.'));
	}
	/*
	 * public function actionAdmin() { $dataProvider = new CActiveDataProvider('MtPinjamKendaraan'); $this->render('index', array( 'dataProvider' => $dataProvider, )); }
	 */
	public function actionAdmin(){
		$model=new MtPinjamKendaraan('search');
		$model->unsetAttributes();
		if(isset($_GET['MtPinjamKendaraan']))
			$model->attributes=$_GET['MtPinjamKendaraan'];
		$this->render('admin',array(
				'model'=>$model
		));
	}
	public function actionIndex(){
		if(isset($_POST['limit'])){
			$limit=$_POST['limit'];
		}else{
			$limit=20;
		}
		if(isset($_POST['start'])){
			$start=$_POST['start'];
		}else{
			$start=0;
		}
		// $model = new MtPinjamKendaraan('search');
		// $model->unsetAttributes();
		$void=Mt::get_voided(PINJAM_KENDARAAN);
		$criteria=new CDbCriteria();
		$criteria->addNotInCondition('id_pinjam',$void);
		$model=MtPinjamKendaraan::model()->findAll($criteria);
		$total=MtPinjamKendaraan::model()->count($criteria);
		if(isset($_GET['MtPinjamKendaraan']))
			$model->attributes=$_GET['MtPinjamKendaraan'];
		if(isset($_GET['output'])&&$_GET['output']=='json'){
			$this->renderJson($model,$total);
		}else{
			$model=new MtPinjamKendaraan('search');
			$model->unsetAttributes();
			$this->render('admin',array(
					'model'=>$model
			));
		}
	}
}