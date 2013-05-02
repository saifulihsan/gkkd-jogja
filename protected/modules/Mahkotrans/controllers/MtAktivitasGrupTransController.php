<?php

class MtAktivitasGrupTransController extends GxController
{
    public function actionView()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                ->select("mt_aktivitas_grup_trans.doc_ref,
                    mt_aktivitas_grup_trans.no_bukti,
                    mt_aktivitas_grup_trans.amount,
                    mt_aktivitas_grup_trans.entry_time,
                    mt_aktivitas_grup_trans.trans_date,
                    mt_aktivitas_grup_trans.trans_via,
                    mt_suppliers.supp_name,
                    mt_chart_master.account_code,
                    mt_chart_master.description,
                    mt_bank_accounts.bank_account_name,
                    mt_sub_aktivitas.nama,
                    mt_aktivitas_grup.name")
                ->from("mt_aktivitas_grup_trans")
                ->join("mt_aktivitas_grup", "mt_aktivitas_grup_trans.mt_aktivitas_grup_id = mt_aktivitas_grup.id")
                ->join("mt_suppliers", "mt_aktivitas_grup_trans.mt_suppliers_supplier_id = mt_suppliers.supplier_id")
                ->join("mt_sub_aktivitas", "mt_aktivitas_grup_trans.mt_sub_aktivitas_id = mt_sub_aktivitas.id")
                ->join("mt_bank_accounts", "mt_aktivitas_grup_trans.mt_bank_accounts_id = mt_bank_accounts.id")
                ->join("mt_chart_master", "mt_sub_aktivitas.account_code = mt_chart_master.account_code")
                ->where("mt_aktivitas_grup_trans.aktivitas_id = :id", array(':id' => $id))
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
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(T_AKTIVITASGRUP);
                $aktivitas = new MtAktivitasGrupTrans;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount')
                        $v = get_number($v);
                    $_POST['MtAktivitasGrupTrans'][$k] = $v;
                }
                $date = $_POST['MtAktivitasGrupTrans']['trans_date'];
                $_POST['MtAktivitasGrupTrans']['entry_time'] = Now();
                $_POST['MtAktivitasGrupTrans']['users_id'] = $user;
                $_POST['MtAktivitasGrupTrans']['doc_ref'] = $docref;
                $aktivitas->attributes = $_POST['MtAktivitasGrupTrans'];
                $aktivitas->save();
                $id = $docref;
                $ref->save(T_AKTIVITASGRUP, $aktivitas->aktivitas_id, $docref);
                $bank_account = Mt::get_act_code_from_bank_act($aktivitas->mt_bank_accounts_id);
                $act_sub = $aktivitas->pahSubAktivitas->account_code;
                //debet kode beban - kredit kas bank
                Mt::add_gl(T_AKTIVITASGRUP, $aktivitas->aktivitas_id, $date, $docref, $act_sub,
                    $aktivitas->note, $aktivitas->amount, $user);
                Mt::add_gl(T_AKTIVITASGRUP, $aktivitas->aktivitas_id, $date, $docref, $bank_account,
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
        $model = $this->loadModel($id, 'MtAktivitasGrupTrans');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtAktivitasGrupTrans'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtAktivitasGrupTrans'];
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
                $aktivitas = MtAktivitasGrupTrans::model()->findByPk($id);
                $date = $aktivitas->trans_date;
                $docref = $aktivitas->doc_ref;
//                $bank_account = $kas_masuk->mt_bank_accounts_id;
                $void = new MtVoided;
                $void->type = T_AKTIVITASGRUP;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = MtBankAccounts::model()->findByPk($aktivitas->mt_bank_accounts_id);
                $act_sub = $aktivitas->pahSubAktivitas->account_code;
                //void gl
                //beban kredit , kas debet karena pengeluaran
                Mt::add_gl(VOID, $void->id, $date, $docref, $bank->account_code, "VOID Aktivitas Grup $docref",
                    $aktivitas->amount, $user);
                Mt::add_gl(VOID, $void->id, $date, $docref, $act_sub, "VOID Aktivitas Grup $docref",
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
    $dataProvider = new CActiveDataProvider('MtAktivitasGrupTrans');
    $this->render('index', array(
    'dataProvider' => $dataProvider,
    ));
    }*/
    public function actionAdmin()
    {
        $model = new MtAktivitasGrupTrans('search');
        $model->unsetAttributes();
        if (isset($_GET['MtAktivitasGrupTrans']))
            $model->attributes = $_GET['MtAktivitasGrupTrans'];
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
//$model = new MtAktivitasGrupTrans('search');
//$model->unsetAttributes();
        //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
        $void = Mt::get_voided(T_AKTIVITASGRUP);
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $criteria->addNotInCondition('aktivitas_id', $void);
        $model = MtAktivitasGrupTrans::model()->findAll($criteria);
        $total = MtAktivitasGrupTrans::model()->count($criteria);
        if (isset($_GET['MtAktivitasGrupTrans']))
            $model->attributes = $_GET['MtAktivitasGrupTrans'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtAktivitasGrupTrans('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}