<?php

class PahKasKeluarController extends GxController
{


    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'PahKasKeluar'),
        ));
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

    public function actionDelete($id)
    {
        if (Yii::app()->request->isPostRequest) {
            $this->loadModel($id, 'PahKasKeluar')->delete();

            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
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

        $criteria = new CDbCriteria();
        $criteria->limit = $limit;
        $criteria->offset = $start;
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