<?php

class PahAktivitasGrupTransController extends GxController
{
    public function actionView()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                ->select("pah_aktivitas_grup_trans.doc_ref,
                    pah_aktivitas_grup_trans.no_bukti,
                    pah_aktivitas_grup_trans.amount,
                    pah_aktivitas_grup_trans.entry_time,
                    pah_aktivitas_grup_trans.trans_date,
                    pah_aktivitas_grup_trans.trans_via,
                    pah_suppliers.supp_name,
                    pah_chart_master.account_code,
                    pah_chart_master.description,
                    pah_bank_accounts.bank_account_name,
                    pah_sub_aktivitas.nama,
                    pah_aktivitas_grup.name")
                ->from("pah_aktivitas_grup_trans")
                ->join("pah_aktivitas_grup", "pah_aktivitas_grup_trans.pah_aktivitas_grup_id = pah_aktivitas_grup.id")
                ->join("pah_suppliers", "pah_aktivitas_grup_trans.pah_suppliers_supplier_id = pah_suppliers.supplier_id")
                ->join("pah_sub_aktivitas", "pah_aktivitas_grup_trans.pah_sub_aktivitas_id = pah_sub_aktivitas.id")
                ->join("pah_bank_accounts", "pah_aktivitas_grup_trans.pah_bank_accounts_id = pah_bank_accounts.id")
                ->join("pah_chart_master", "pah_sub_aktivitas.account_code = pah_chart_master.account_code")
                ->where("pah_aktivitas_grup_trans.aktivitas_id = :id", array(':id' => $id))
                ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            Yii::app()->end();
        }
    }

    public function actionCreate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Transaksi berhasil disimpan.';
            $user = Yii::app()->user->getId();
            $id = -1;
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = dbTrans();
            try {
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(T_AKTIVITASGRUP);
                $aktivitas = new PahAktivitasGrupTrans;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount')
                        $v = get_number($v);
                    $_POST['PahAktivitasGrupTrans'][$k] = $v;
                }
                $date = $_POST['PahAktivitasGrupTrans']['trans_date'];
                $_POST['PahAktivitasGrupTrans']['entry_time'] = Now();
                $_POST['PahAktivitasGrupTrans']['users_id'] = $user;
                $_POST['PahAktivitasGrupTrans']['doc_ref'] = $docref;
                $aktivitas->attributes = $_POST['PahAktivitasGrupTrans'];
                $aktivitas->save();
                $id = $docref;
                $ref->save(T_AKTIVITASGRUP, $aktivitas->aktivitas_id, $docref);
                $bank_account = Pah::get_act_code_from_bank_act($aktivitas->pah_bank_accounts_id);
                $act_sub = $aktivitas->pahSubAktivitas->account_code;
                //debet kode beban - kredit kas bank
                Pah::add_gl(T_AKTIVITASGRUP, $aktivitas->aktivitas_id, $date, $docref, $act_sub,
                    $aktivitas->note, $aktivitas->amount, $user);
                Pah::add_gl(T_AKTIVITASGRUP, $aktivitas->aktivitas_id, $date, $docref, $bank_account,
                    '-', -$aktivitas->amount,$user);
                $transaction->commit();
                $status = true;
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
            echo CJSON::encode(array(
                'success' => $status,
                'id' => $id,
                'msg' => $msg
            ));
            Yii::app()->end();
        }
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'PahAktivitasGrupTrans');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahAktivitasGrupTrans'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['PahAktivitasGrupTrans'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->aktivitas_id;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'msg' => $msg
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->aktivitas_id));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $memo_ = $_POST['memo_'];
            $status = false;
            $msg = 'Transaksi berhasil divoid.';
            $user = Yii::app()->user->getId();
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $aktivitas = PahAktivitasGrupTrans::model()->findByPk($id);
                $date = $aktivitas->trans_date;
                $docref = $aktivitas->doc_ref;
//                $bank_account = $kas_masuk->pah_bank_accounts_id;
                $void = new PahVoided;
                $void->type = T_AKTIVITASGRUP;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = PahBankAccounts::model()->findByPk($aktivitas->pah_bank_accounts_id);
                $act_sub = $aktivitas->pahSubAktivitas->account_code;
                //void gl
                //beban kredit , kas debet karena pengeluaran
                Pah::add_gl(VOID, $void->id, $date, $docref, $bank->account_code, "VOID Aktivitas Grup $docref",
                    $aktivitas->amount, $user);
                Pah::add_gl(VOID, $void->id, $date, $docref, $act_sub, "VOID Aktivitas Grup $docref",
                    -$aktivitas->amount, $user);
                $transaction->commit();
                $status = true;
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
        }
        echo CJSON::encode(array(
            'success' => $status,
            'msg' => $msg
        ));
        Yii::app()->end();
    }

    /*
    public function actionAdmin() {
    $dataProvider = new CActiveDataProvider('PahAktivitasGrupTrans');
    $this->render('index', array(
    'dataProvider' => $dataProvider,
    ));
    }*/
    public function actionAdmin()
    {
        $model = new PahAktivitasGrupTrans('search');
        $model->unsetAttributes();
        if (isset($_GET['PahAktivitasGrupTrans']))
            $model->attributes = $_GET['PahAktivitasGrupTrans'];
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
//$model = new PahAktivitasGrupTrans('search');
//$model->unsetAttributes();
        //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
        $void = Pah::get_voided(T_AKTIVITASGRUP);
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $criteria->addNotInCondition('aktivitas_id', $void);
        $model = PahAktivitasGrupTrans::model()->findAll($criteria);
        $total = PahAktivitasGrupTrans::model()->count($criteria);
        if (isset($_GET['PahAktivitasGrupTrans']))
            $model->attributes = $_GET['PahAktivitasGrupTrans'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PahAktivitasGrupTrans('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}