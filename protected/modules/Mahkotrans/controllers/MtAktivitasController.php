<?php

class MtAktivitasController extends GxController
{
    public function actionView()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                ->select("mt_aktivitas.doc_ref,
                    mt_aktivitas.no_bukti,
                    mt_aktivitas.amount,
                    mt_aktivitas.entry_time,
                    mt_aktivitas.trans_date,
                    mt_aktivitas.trans_via,
                    mt_suppliers.supp_name,
                    mt_chart_master.account_code,
                    mt_chart_master.description,
                    mt_bank_accounts.bank_account_name,
                    jemaat.real_name,
                    mt_sub_aktivitas.nama")
                ->from("mt_aktivitas")
                ->join("mt_suppliers", "mt_aktivitas.mt_suppliers_supplier_id = mt_suppliers.supplier_id")
                ->join("mt_bank_accounts", "mt_aktivitas.mt_bank_accounts_id = mt_bank_accounts.id")
                ->join("mt_member", "mt_aktivitas.mt_member_id = mt_member.id")
                ->join("jemaat", "mt_member.jemaat_nij = jemaat.nij")
                ->join("mt_sub_aktivitas", "mt_aktivitas.mt_sub_aktivitas_id = mt_sub_aktivitas.id")
                ->join("mt_chart_master", "mt_sub_aktivitas.account_code = mt_chart_master.account_code")
                ->where("mt_aktivitas.aktivitas_id = :id", array(':id' => $id))
                ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            Yii::app()->end();
        }
//        $this->render('view', array(
//            'model' => $this->loadModel($id, 'MtAktivitas'),
//        ));
    }

    public function actionCreate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Anggaran berhasil disimpan.';

            $user = Yii::app()->user->getId();
            $id = -1;
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(AKTIVITAS);
                $aktivitas = new MtAktivitas;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount')
                        $v = get_number($v);
                    $_POST['MtAktivitas'][$k] = $v;
                }
                $date = $_POST['MtAktivitas']['trans_date'];
                $_POST['MtAktivitas']['entry_time'] = Now();
                $_POST['MtAktivitas']['users_id'] = $user;
                $_POST['MtAktivitas']['doc_ref'] = $docref;
                $aktivitas->attributes = $_POST['MtAktivitas'];
                $aktivitas->save();
                $id = $docref;
                $ref->save(AKTIVITAS, $aktivitas->aktivitas_id, $docref);
                $bank_account = Mt::get_act_code_from_bank_act($aktivitas->mt_bank_accounts_id);
                $act_sub = $aktivitas->pahSubAktivitas->account_code;
                //debet kode beban - kredit kas bank
                Mt::add_gl(AKTIVITAS, $aktivitas->aktivitas_id, $date, $docref, $act_sub,
                    $aktivitas->note, $aktivitas->amount, $user);
                Mt::add_gl(AKTIVITAS, $aktivitas->aktivitas_id, $date, $docref, $bank_account,
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
        $model = $this->loadModel($id, 'MtAktivitas');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtAktivitas'][$k] = $v;
            }
            $model->attributes = $_POST['MtAktivitas'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->aktivitas_id));
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
            $msg = 'Aktivitas berhasil divoid.';
            $user = Yii::app()->user->getId();
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $aktivitas = MtAktivitas::model()->findByPk($id);
                $date = $aktivitas->trans_date;
                $docref = $aktivitas->doc_ref;
//                $bank_account = $kas_masuk->mt_bank_accounts_id;
                $void = new MtVoided;
                $void->type = AKTIVITAS;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = MtBankAccounts::model()->findByPk($aktivitas->mt_bank_accounts_id);
                $act_sub = $aktivitas->pahSubAktivitas->account_code;
                //void gl
                //beban kredit , kas debet karena pengeluaran
                Mt::add_gl(VOID, $void->id, $date, $docref, $bank->account_code, "VOID Aktivitas $docref",
                    $aktivitas->amount, $user);
                Mt::add_gl(VOID, $void->id, $date, $docref, $act_sub, "VOID Aktivitas $docref",
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
//        if (Yii::app()->request->isPostRequest) {
//            $this->loadModel($id, 'MtAktivitas')->delete();
//
//            if (!Yii::app()->request->isAjaxRequest)
//                $this->redirect(array('admin'));
//        } else
//            throw new CHttpException(400,
//                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
     public function actionAdmin() {
         $dataProvider = new CActiveDataProvider('MtAktivitas');
         $this->render('index', array(
             'dataProvider' => $dataProvider,
         ));
     }*/
    public function actionAdmin()
    {
        $model = new MtAktivitas('search');
        $model->unsetAttributes();
        if (isset($_GET['MtAktivitas']))
            $model->attributes = $_GET['MtAktivitas'];
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
        //$model = new MtAktivitas('search');
        //$model->unsetAttributes();
        //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
        $void = Mt::get_voided(AKTIVITAS);
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $criteria->addNotInCondition('aktivitas_id', $void);
        $model = MtAktivitas::model()->findAll($criteria);
        $total = MtAktivitas::model()->count($criteria);
        if (isset($_GET['MtAktivitas']))
            $model->attributes = $_GET['MtAktivitas'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtAktivitas('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}