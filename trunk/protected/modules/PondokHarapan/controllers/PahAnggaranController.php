<?php

class PahAnggaranController extends GxController
{
    public function actionView()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                ->select("pah_aktivitas.doc_ref,
                    pah_aktivitas.no_bukti,
                    pah_aktivitas.amount,
                    pah_aktivitas.entry_time,
                    pah_aktivitas.trans_date,
                    pah_aktivitas.trans_via,
                    pah_suppliers.supp_name,
                    pah_chart_master.account_code,
                    pah_chart_master.description,
                    pah_bank_accounts.bank_account_name,
                    jemaat.real_name,
                    pah_sub_aktivitas.nama")
                ->from("pah_aktivitas")
                ->join("pah_suppliers", "pah_aktivitas.pah_suppliers_supplier_id = pah_suppliers.supplier_id")
                ->join("pah_chart_master", "pah_aktivitas.pah_chart_master_account_code = pah_chart_master.account_code")
                ->join("pah_bank_accounts", "pah_aktivitas.pah_bank_accounts_id = pah_bank_accounts.id")
                ->join("pah_member", "pah_aktivitas.pah_member_id = pah_member.id")
                ->join("jemaat", "pah_member.jemaat_nij = jemaat.nij")
                ->join("pah_sub_aktivitas", "pah_aktivitas.pah_sub_aktivitas_id = pah_sub_aktivitas.id")
                ->where("pah_aktivitas.aktivitas_id = :id", array(':id' => $id))
                ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            Yii::app()->end();
        }
//		$this->render('view', array(
//			'model' => $this->loadModel($id, 'PahAnggaran'),
//		));
    }

    public function actionGetSaldo()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
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
            $sisa_anggaran = Pah::get_balance_before_for_bank_account($tahun . "-" . $bulan . "-1");
            $total_saldo = Pah::get_balance_before_for_bank_account($tahun . "-" . ($bulan + 1) . "-1");
            $saldo_skrg = $total_saldo - $sisa_anggaran;
            echo CJSON::encode(array(
                'success' => true,
                'sisa' => $sisa_anggaran,
                'current' => $saldo_skrg,
                'total' => $total_saldo
            ));
            Yii::app()->end();
        }
    }

    public function actionIsPeriodeExist()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
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

    public function actionCreate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Anggaran berhasil disimpan.';
            $bulanStr = $_POST['bulanStr'];
            $bulan = $_POST['periode_bulan'];
            $tahun = $_POST['periode_tahun'];
            $detils = CJSON::decode($_POST['detil']);
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $anggaran = new PahAnggaran;
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(ANGGARAN);
                $_POST['PahAnggaran']['doc_ref'] = $docref;
                $_POST['PahAnggaran']['periode_bulan'] = $bulan;
                $_POST['PahAnggaran']['periode_tahun'] = $tahun;
                $_POST['PahAnggaran']['lock'] = 0;
                $_POST['PahAnggaran']['trans_date'] = Yii::app()->dateFormatter->format('yyyy-MM-dd', time());
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
//            $anggaran->withRelated->save(true,array('pahAnggaranDetils'));
            echo CJSON::encode(array(
                'success' => $status,
                'bulan' => $bulanStr,
                'tahun' => $tahun,
                'id' => $docref,
                'msg' => $msg));
            Yii::app()->end();
        }
    }

    public function actionUpdate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Anggaran berhasil disimpan.';
            $bulanStr = $_POST['bulanStr'];
            $bulan = $_POST['periode_bulan'];
            $tahun = $_POST['periode_tahun'];
            $detils = CJSON::decode($_POST['detil']);
            $id = $_POST['id'];
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $anggaran = PahAnggaran::model()->findByPk($id);
                PahAnggaranDetil::model()->deleteAll('pah_anggaran_id = ?', array($id));
                $docref = $anggaran->doc_ref;
                $anggaran->trans_date = Yii::app()->dateFormatter->format('yyyy-MM-dd', time());
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

    public function actionDelete()
    {
        if (Yii::app()->request->isPostRequest) {
            if (isset($_POST) && !empty($_POST)) {
                $id = $_POST['id_anggaran'];
                $this->loadModel($id, 'PahAnggaran')->delete();
//			if (!Yii::app()->request->isAjaxRequest)
//				$this->redirect(array('admin'));
            }
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
    public function actionAdmin()
    {
        $model = new PahAnggaran('search');
        $model->unsetAttributes();
        if (isset($_GET['PahAnggaran']))
            $model->attributes = $_GET['PahAnggaran'];
        $this->render('admin', array(
            'model' => $model,
        ));
    }

    public function actionIndex()
    {
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
        $criteria = new CDbCriteria();
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $model = PahAnggaran::model()->findAll($criteria);
        $total = PahAnggaran::model()->count($criteria);
        if (isset($_GET['PahAnggaran']))
            $model->attributes = $_GET['PahAnggaran'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
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