<?php
class PahAnggaranController extends GxController {
    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'PahAnggaran'),
        ));
    }
    public function actionGetSaldo() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $bulan = $_POST['bulan'];
            $tahun = $_POST['tahun'];
            if ($bulan === '' || $tahun === '') {
                echo CJSON::encode(array(
                    'success' => false,
                    'msg' => 'Bulan atau Tahun periode tidak boleh kosong.'));
                Yii::app()->end();
            }
//            $bank_act = PahPrefs::BankOnHand();
            $periode = period2date($bulan, $tahun);
            $start_date = $periode['start'];
            $end_date = $periode['end'];
            $sisa_anggaran = Pah::get_balance_before_for_bank_account($tahun . "-" . $bulan . "-1");
            $total_saldo = Pah::get_total_pendapatan($start_date, $end_date); //Pah::get_balance_before_for_bank_account($tahun . "-" . ($bulan + 1) . "-1");
            $saldo_skrg = $total_saldo + $sisa_anggaran;
            echo CJSON::encode(array(
                'success' => true,
                'sisa' => $sisa_anggaran,
                'current' => $total_saldo,
                'total' => $saldo_skrg
            ));
            Yii::app()->end();
        }
    }
    public function actionIsPeriodeExist() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $bulan = $_POST['bulan'];
            $tahun = $_POST['tahun'];
            if ($bulan === '' || $tahun === '') {
                echo CJSON::encode(array(
                    'success' => false,
                    'msg' => 'Bulan atau Tahun periode tidak boleh kosong.'));
                Yii::app()->end();
            }
            if (Pah::is_periode_anggaran_exist($bulan, $tahun)) {
                echo CJSON::encode(array(
                    'success' => false,
                    'msg' => 'Anggaran dengan periode yang anda pilih sudah ada, silahkan gunakan menu ubah.'));
                Yii::app()->end();
            } else {
                echo CJSON::encode(array(
                    'success' => true,
                    'msg' => 'sukses'));
                Yii::app()->end();
            }
        }
    }
    public function actionCreate() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Anggaran berhasil disimpan.';
            $bulanStr = $_POST['bulanStr'];
            $bulan = $_POST['periode_bulan'];
            $tahun = $_POST['periode_tahun'];
            $detils = CJSON::decode($_POST['detil']);
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $anggaran = new PahAnggaran;
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(ANGGARAN);
                $_POST['PahAnggaran']['doc_ref'] = $docref;
                $_POST['PahAnggaran']['periode_bulan'] = $bulan;
                $_POST['PahAnggaran']['periode_tahun'] = $tahun;
                $_POST['PahAnggaran']['lock'] = 0;
                $_POST['PahAnggaran']['trans_date'] = Yii::app()->dateFormatter->format('yyyy-MM-dd',
                        time());
                $_POST['PahAnggaran']['users_id'] = Yii::app()->user->getId();
                $anggaran->attributes = $_POST['PahAnggaran'];
                $result = $anggaran->save();
                $err = $anggaran->getErrors();
                foreach ($detils as $detil) {
                    $anggaran_detil = new PahAnggaranDetil;
                    $_POST['PahAnggaranDetil']['pah_chart_master_account_code'] = $detil['pah_chart_master_account_code'];
                    $_POST['PahAnggaranDetil']['amount'] = $detil['amount'];
                    $_POST['PahAnggaranDetil']['pah_anggaran_id'] = $anggaran->id;
                    $anggaran_detil->attributes = $_POST['PahAnggaranDetil'];
                    //  $ag_detil[] = $anggaran_detil;
                    $anggaran_detil->save();
                    $err_ang = $anggaran_detil->getErrors();
                }
                //$anggaran->pahAnggaranDetils = $ag_detil;
                $ref->save(ANGGARAN, $anggaran->id, $docref);
                $transaction->commit();
                $status = true;
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
            echo CJSON::encode(array(
                'success' => $status,
                'bulan' => $bulanStr,
                'tahun' => $tahun,
                'id' => $docref,
                'msg' => $msg));
            Yii::app()->end();
        }
    }
    public function actionUpdate() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Anggaran berhasil disimpan.';
            $bulanStr = $_POST['bulanStr'];
            $bulan = $_POST['periode_bulan'];
            $tahun = $_POST['periode_tahun'];
            $detils = CJSON::decode($_POST['detil']);
            $id = $_POST['id'];
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $anggaran = PahAnggaran::model()->findByPk($id);
                PahAnggaranDetil::model()->deleteAll('pah_anggaran_id = ?',
                        array($id));
                $docref = $anggaran->doc_ref;
                $anggaran->trans_date = Yii::app()->dateFormatter->format('yyyy-MM-dd',
                        time());
                $anggaran->users_id = Yii::app()->user->getId();
                $result = $anggaran->save();
                $err = $anggaran->getErrors();
                foreach ($detils as $detil) {
                    $anggaran_detil = new PahAnggaranDetil;
                    $_POST['PahAnggaranDetil']['pah_chart_master_account_code'] = $detil['pah_chart_master_account_code'];
                    $_POST['PahAnggaranDetil']['amount'] = $detil['amount'];
                    $_POST['PahAnggaranDetil']['pah_anggaran_id'] = $anggaran->id;
                    $anggaran_detil->attributes = $_POST['PahAnggaranDetil'];
                    $anggaran_detil->save();
                    $err_ang = $anggaran_detil->getErrors();
                }
                $transaction->commit();
                $status = true;
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
//            $anggaran->withRelated->save(true,array('pahAnggaranDetils'));
            echo CJSON::encode(array(
                'success' => $status,
                'bulan' => $bulanStr,
                'tahun' => $tahun,
                'id' => $docref,
                'msg' => $msg));
            Yii::app()->end();
        }
        $model = $this->loadModel($id, 'PahAnggaran');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahAnggaran'][$k] = $v;
            }
            $model->attributes = $_POST['PahAnggaran'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->id));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }
    public function actionDelete() {
        if (Yii::app()->request->isPostRequest) {
            if (isset($_POST) && !empty($_POST)) {
                $id = $_POST['id_anggaran'];
                $this->loadModel($id, 'PahAnggaran')->delete();
//			if (!Yii::app()->request->isAjaxRequest)
//				$this->redirect(array('admin'));
            }
        }
        else
                throw new CHttpException(400,
            Yii::t('app',
                    'Invalid request. Please do not repeat this request again.'));
    }
    /*
      public function actionAdmin() {
      $dataProvider = new CActiveDataProvider('PahAnggaran');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */
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
        $param = array();
        $criteria = new CDbCriteria();
        if (isset($_POST['doc_ref'])) {
            $criteria->addCondition("doc_ref like :doc_ref");
            $param[':doc_ref'] = "%" . $_POST['doc_ref'] . "%";
        }
        if (isset($_POST['periode_bulan'])) {
            $criteria->addCondition("periode_bulan = :periode_bulan");
            $param[':periode_bulan'] = $_POST['periode_bulan'];
        }
        if (isset($_POST['periode_tahun'])) {
            $criteria->addCondition("periode_tahun = :periode_tahun");
            $param[':periode_tahun'] = $_POST['periode_tahun'];
        }
        if (isset($_POST['trans_date'])) {
            $criteria->addCondition("trans_date = :trans_date");
            $param[':trans_date'] = substr($_POST['trans_date'], 0, 10);
        }
        $criteria->params = $param;
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $model = PahAnggaran::model()->findAll($criteria);
        $total = PahAnggaran::model()->count($criteria);
        $this->renderJson($model, $total);
    }
}