<?php

class MtKasKeluarController extends GxController {

    public function actionView() {
        if (!app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = app()->db->createCommand()
                    ->select("mt_kas_keluar.doc_ref,
                    mt_kas_keluar.no_bukti,
                    mt_kas_keluar.amount,
                    mt_kas_keluar.entry_time,
                    mt_kas_keluar.trans_date,
                    mt_kas_keluar.trans_via,
                    mt_mobil.nopol,
                    mt_bank_accounts.bank_account_name,
                    mt_chart_master.account_code,
                    mt_chart_master.description")
                    ->from("mt_kas_keluar")
                    ->join("mt_mobil",
                            "mt_kas_keluar.id_mobil = mt_mobil.id_mobil")
                    ->join("mt_bank_accounts",
                            "mt_kas_keluar.mt_bank_accounts_id = mt_bank_accounts.id")
                    ->join("mt_chart_master",
                            "mt_kas_keluar.mt_account_code = mt_chart_master.account_code")
                    ->where("mt_kas_keluar.kas_keluar_id = :id",
                            array(':id' => $id))
                    ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            app()->end();
        }
    }

    public function actionCreate() {
        if (!app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Kas keluar berhasil disimpan.';

            $user = app()->user->getId();
            $id = -1;
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = app()->db->beginTransaction();
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(KAS_KELUAR);
                $kas_keluar = new MtKasKeluar;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount') $v = get_number($v);
                    $_POST['MtKasKeluar'][$k] = $v;
                }
                $date = $_POST['MtKasKeluar']['trans_date'];
                $_POST['MtKasKeluar']['entry_time'] = Now();
                $_POST['MtKasKeluar']['users_id'] = $user;
                $_POST['MtKasKeluar']['doc_ref'] = $docref;
                $kas_keluar->attributes = $_POST['MtKasKeluar'];
                $kas_keluar->save();
                $id = $docref;
                $ref->save(KAS_KELUAR, $kas_keluar->kas_keluar_id, $docref);
                $bank_account = Mt::get_act_code_from_bank_act($kas_keluar->mt_bank_accounts_id);
                //debet kode beban - kredit kas/bank
                Mt::add_gl(KAS_KELUAR, $kas_keluar->kas_keluar_id, $date,
                        $docref, $kas_keluar->mt_account_code,
                        $kas_keluar->note, $kas_keluar->amount, $user);
                Mt::add_gl(KAS_KELUAR, $kas_keluar->kas_keluar_id, $date,
                        $docref, $bank_account, '-', -$kas_keluar->amount, $user);
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
            'id' => $id,
            'msg' => $msg
        ));
        app()->end();
    }

    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'MtKasKeluar');


        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtKasKeluar'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtKasKeluar'];

            if ($model->save()) {

                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->kas_keluar_id;
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
                $this->redirect(array('view', 'id' => $model->kas_keluar_id));
            }
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id) {
        if (!app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $memo_ = $_POST['memo_'];
            $status = false;
            $msg = 'Kas keluar berhasil divoid.';
            $user = app()->user->getId();
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = app()->db->beginTransaction();
            try {
                $kas_keluar = MtKasKeluar::model()->findByPk($id);
                $date = $kas_keluar->trans_date;
                $docref = $kas_keluar->doc_ref;
//                $bank_account = $kas_masuk->pah_bank_accounts_id;
                $void = new MtVoided;
                $void->type = KAS_KELUAR;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = MtBankAccounts::model()->findByPk($kas_keluar->mt_bank_accounts_id);
                //void gl
                Mt::add_gl(VOID, $void->id, $date, $docref,
                        $bank->account_code, "VOID Kas Keluar $docref",
                        $kas_keluar->amount, $user);
                Mt::add_gl(VOID, $void->id, $date, $docref,
                        $kas_keluar->mt_account_code,
                        "VOID Kas Keluar $docref", -$kas_keluar->amount, $user);
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
        app()->end();
    }

    /*
      public function actionAdmin() {
      $dataProvider = new CActiveDataProvider('MtKasKeluar');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */

    public function actionAdmin() {
        $model = new MtKasKeluar('search');
        $model->unsetAttributes();

        if (isset($_GET['MtKasKeluar']))
                $model->attributes = $_GET['MtKasKeluar'];

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
//$model = new MtKasKeluar('search');
//$model->unsetAttributes();

        $void = Mt::get_voided(KAS_KELUAR);
        $criteria = new CDbCriteria();
        $criteria->addNotInCondition('kas_keluar_id', $void);
        $model = MtKasKeluar::model()->findAll($criteria);
        $total = MtKasKeluar::model()->count($criteria);

        if (isset($_GET['MtKasKeluar']))
                $model->attributes = $_GET['MtKasKeluar'];

        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtKasKeluar('search');
            $model->unsetAttributes();

            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }

}