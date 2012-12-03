<?php

class PeKasKeluarController extends GxController
{
    public function actionView()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                ->select("pe_kas_keluar.doc_ref,
                    pe_kas_keluar.no_bukti,
                    pe_kas_keluar.amount,
                    pe_kas_keluar.entry_time,
                    pe_kas_keluar.trans_date,
                    pe_kas_keluar.trans_via,
                    pe_suppliers.supp_name,
                    pe_bank_accounts.bank_account_name,
                    pe_chart_master.account_code,
                    pe_chart_master.description")
                ->from("pe_kas_keluar")
                ->join("pe_suppliers", "pe_kas_keluar.pe_supplier_id = pe_suppliers.supplier_id")
                ->join("pe_bank_accounts", "pe_kas_keluar.pe_bank_accounts_id = pe_bank_accounts.id")
                ->join("pe_chart_master", "pe_kas_keluar.pe_account_code = pe_chart_master.account_code")
                ->where("pe_kas_keluar.kas_keluar_id = :id", array(':id' => $id))
                ->query();
            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
        ));
            Yii::app()->end();
    }
//        $this->render('view', array(
//            'model' => $this->loadModel($id, 'PeKasKeluar'),
//        ));
    }

    public function actionCreate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Kas keluar berhasil disimpan.';

            $user = Yii::app()->user->getId();
            $id = -1;
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new PeReferenceCom();
                $docref = $ref->get_next_reference(KAS_KELUAR);
                $kas_keluar = new PeKasKeluar;
            foreach ($_POST as $k => $v) {
                    if ($k == 'amount')
                        $v = get_number($v);
                    $_POST['PeKasKeluar'][$k] = $v;
            }
                $date = $_POST['PeKasKeluar']['trans_date'];
                $_POST['PeKasKeluar']['entry_time'] = Now();
                $_POST['PeKasKeluar']['users_id'] = $user;
                $_POST['PeKasKeluar']['doc_ref'] = $docref;
                $kas_keluar->attributes = $_POST['PeKasKeluar'];
                $kas_keluar->save();
                $id = $docref;
                $ref->save(KAS_KELUAR, $kas_keluar->kas_keluar_id, $docref);
                $bank_account = Pe::get_act_code_from_bank_act($kas_keluar->pe_bank_accounts_id);
                //debet kode beban - kredit kas/bank
                Pe::add_gl(KAS_KELUAR, $kas_keluar->kas_keluar_id, $date, $docref,
                    $kas_keluar->pe_account_code, $kas_keluar->note, $kas_keluar->amount, $user);
                Pe::add_gl(KAS_KELUAR, $kas_keluar->kas_keluar_id, $date, $docref, $bank_account,
                    '-', -$kas_keluar->amount, $user);
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
            Yii::app()->end();
        }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'PeKasKeluar');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PeKasKeluar'][$k] = $v;
            }
            $_POST['PeKasKeluar']['entry_time'] = Yii::app()->dateFormatter->format('yyyy-MM-dd', time());
            $_POST['PeKasKeluar']['users_id'] = Yii::app()->user->getId();
            $_POST['PeKasKeluar']['doc_ref'] = '';
            $model->attributes = $_POST['PeKasKeluar'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->kas_keluar_id));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->kas_keluar_id));
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
            $msg = 'Kas keluar berhasil divoid.';
            $user = Yii::app()->user->getId();
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $kas_keluar = PeKasKeluar::model()->findByPk($id);
                $date = $kas_keluar->trans_date;
                $docref = $kas_keluar->doc_ref;
//                $bank_account = $kas_masuk->pe_bank_accounts_id;
                $void = new PeVoided;
                $void->type = KAS_KELUAR;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = PeBankAccounts::model()->findByPk($kas_keluar->pe_bank_accounts_id);
                //void gl
                Pe::add_gl(VOID, $void->id, $date, $docref,
                    $bank->account_code,
                    "VOID Kas Keluar $docref", $kas_keluar->amount, $user);
                Pe::add_gl(VOID, $void->id, $date, $docref, $kas_keluar->pe_account_code, "VOID Kas Keluar $docref",
                    -$kas_keluar->amount, $user);
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
                'msg' => $msg));
            Yii::app()->end();
//        if (Yii::app()->request->isPostRequest) {
//            $this->loadModel($id, 'PeKasKeluar')->delete();
//
//            if (!Yii::app()->request->isAjaxRequest)
//                $this->redirect(array('admin'));
//        } else
//            throw new CHttpException(400,
//                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
    public function actionAdmin() {
         $dataProvider = new CActiveDataProvider('PeKasKeluar');
    $this->render('index', array(
    'dataProvider' => $dataProvider,
    ));
    }*/
    public function actionAdmin()
    {
        $model = new PeKasKeluar('search');
        $model->unsetAttributes();
        if (isset($_GET['PeKasKeluar']))
            $model->attributes = $_GET['PeKasKeluar'];
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
//$model = new PeKasKeluar('search');
//$model->unsetAttributes();
        //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
        $void = Pe::get_voided(KAS_KELUAR);
        $criteria = new CDbCriteria();
//$criteria->limit = $limit;
//$criteria->offset = $start;
        $criteria->addNotInCondition('kas_keluar_id', $void);
        $model = PeKasKeluar::model()->findAll($criteria);
        $total = PeKasKeluar::model()->count($criteria);
        if (isset($_GET['PeKasKeluar']))
            $model->attributes = $_GET['PeKasKeluar'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PeKasKeluar('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }
}