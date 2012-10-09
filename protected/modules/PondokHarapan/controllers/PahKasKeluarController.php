<?php

class PahKasKeluarController extends GxController
{


    public function actionView()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $rows = Yii::app()->db->createCommand()
                ->select("pah_kas_keluar.doc_ref,
                    pah_kas_keluar.no_bukti,
                    pah_kas_keluar.amount,
                    pah_kas_keluar.entry_time,
                    pah_kas_keluar.trans_date,
                    pah_kas_keluar.trans_via,
                    pah_suppliers.supp_name,
                    pah_bank_accounts.bank_account_name,
                    pah_chart_master.account_name,
                    pah_chart_master.description")
                ->from("pah_kas_keluar")
                ->join("pah_suppliers", "pah_kas_keluar.pah_suppliers_supplier_id = pah_suppliers.supplier_id")
                ->join("pah_bank_accounts", "pah_kas_keluar.pah_bank_accounts_id = pah_bank_accounts.id")
                ->join("pah_chart_master", "pah_kas_keluar.pah_chart_master_account_code = pah_chart_master.account_code")
                ->where("pah_kas_keluar.kas_keluar_id = :id",array(':id'=>$id))
                ->query();

            echo CJSON::encode(array(
                'success' => true,
                'data' => $rows
            ));
            Yii::app()->end();
        }
//        $this->render('view', array(
//            'model' => $this->loadModel($id, 'PahKasKeluar'),
//        ));
    }

    public function actionCreate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Kas keluar berhasil disimpan.';
            $date = Site::get_date_today();
            $user = Yii::app()->user->getId();
            $id = -1;
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(KAS_KELUAR);
                $kas_keluar = new PahKasKeluar;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount')
                        $v = Site::get_number($v);
                    $_POST['PahKasKeluar'][$k] = $v;
                }
                $_POST['PahKasKeluar']['entry_time'] = $date;
                $_POST['PahKasKeluar']['users_id'] = $user;
                $_POST['PahKasKeluar']['doc_ref'] = $docref;
                $kas_keluar->attributes = $_POST['PahKasKeluar'];
                $kas_keluar->save();
                $id = $docref;
                $ref->save(KAS_KELUAR,$kas_keluar->kas_keluar_id,$docref);
                $bank_account = Pah::get_act_code_from_bank_act($kas_keluar->pah_bank_accounts_id);
                //debet kode beban - kredit kas/bank
                Pah::add_gl(KAS_KELUAR,$kas_keluar->kas_keluar_id,$date,$docref,
                    $kas_keluar->pah_chart_master_account_code,'-',$kas_keluar->amount,$user);
                Pah::add_gl(KAS_KELUAR,$kas_keluar->kas_keluar_id,$date,$docref,$bank_account,
                    '-',-$kas_keluar->amount,$user);
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
        $model = $this->loadModel($id, 'PahKasKeluar');


        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahKasKeluar'][$k] = $v;
            }
            $_POST['PahKasKeluar']['entry_time'] = Yii::app()->dateFormatter->format('yyyy-MM-dd', time());
            $_POST['PahKasKeluar']['users_id'] = Yii::app()->user->getId();
            $_POST['PahKasKeluar']['doc_ref'] = '';
            $model->attributes = $_POST['PahKasKeluar'];

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
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $kas_keluar = PahKasKeluar::model()->findByPk($id);
                $date = $kas_keluar->trans_date;
                $docref = $kas_keluar->doc_ref;
//                $bank_account = $kas_masuk->pah_bank_accounts_id;
                $void = new PahVoided;
                $void->type = KAS_KELUAR;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = PahBankAccounts::model()->findByPk($kas_keluar->pah_bank_accounts_id);
                //void gl
                Pah::add_gl(VOID, $void->id, $date, $docref,
                    $kas_keluar->pah_chart_master_account_code,
                    "VOID Kas Keluar $docref", $kas_keluar->amount, $user);
                Pah::add_gl(VOID, $void->id, $date, $docref, $bank->account_code, "VOID Kas Keluar $docref",
                    -$kas_keluar->amount, $user);
                $transaction->commit();
                $status = true;
            }catch (Exception $ex) {
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
//            $this->loadModel($id, 'PahKasKeluar')->delete();
//
//            if (!Yii::app()->request->isAjaxRequest)
//                $this->redirect(array('admin'));
//        } else
//            throw new CHttpException(400,
//                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
     public function actionAdmin() {
         $dataProvider = new CActiveDataProvider('PahKasKeluar');
         $this->render('index', array(
             'dataProvider' => $dataProvider,
         ));
     }*/

    public function actionAdmin()
    {
        $model = new PahKasKeluar('search');
        $model->unsetAttributes();

        if (isset($_GET['PahKasKeluar']))
            $model->attributes = $_GET['PahKasKeluar'];

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
        //$model = new PahKasKeluar('search');
        //$model->unsetAttributes();
        require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
        $void = Pah::get_voided(KAS_KELUAR);

        $criteria = new CDbCriteria();
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $criteria->addNotInCondition('kas_keluar_id',$void);
        $model = PahKasKeluar::model()->findAll($criteria);
        $total = PahKasKeluar::model()->count($criteria);

        if (isset($_GET['PahKasKeluar']))
            $model->attributes = $_GET['PahKasKeluar'];

        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PahKasKeluar('search');
            $model->unsetAttributes();

            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }

}