<?php

class PahKasMasukController extends GxController
{


    public function actionView($id)
    {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'PahKasMasuk'),
        ));
    }

    public function actionCreate()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Kas masuk berhasil disimpan.';
            $date = Pah::get_date_today();
            $user = Yii::app()->user->getId();
            $id = -1;
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(KAS_MASUK);
                $kas_masuk = new PahKasMasuk;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount')
                        $v = Pah::get_number($v);
                    $_POST['PahKasMasuk'][$k] = $v;
                }
                $_POST['PahKasMasuk']['entry_time'] = $date;
                $_POST['PahKasMasuk']['users_id'] = $user;
                $_POST['PahKasMasuk']['doc_ref'] = $docref;
                $kas_masuk->attributes = $_POST['PahKasMasuk'];
                $kas_masuk->save();
                $id = $docref;
                $ref->save(KAS_MASUK,$kas_masuk->kas_masuk_id,$docref);
                $bank_account = Pah::get_act_code_from_bank_act($kas_masuk->pah_bank_accounts_id);
                //debet kode kas/bank - kredit pendapatan
                Pah::add_gl(KAS_MASUK,$kas_masuk->kas_masuk_id,$date,$docref,$bank_account,'-',$kas_masuk->amount,
                    $user);
                Pah::add_gl(KAS_MASUK,$kas_masuk->kas_masuk_id,$date,$docref,$kas_masuk->pah_chart_master_account_code,
                    '-',-$kas_masuk->amount,$user);
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
        $model = $this->loadModel($id, 'PahKasMasuk');


        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahKasMasuk'][$k] = $v;
            }
            $_POST['PahKasMasuk']['entry_time'] = Yii::app()->dateFormatter->format('yyyy-MM-dd', time());
            $_POST['PahKasMasuk']['users_id'] = Yii::app()->user->getId();
            $_POST['PahKasMasuk']['doc_ref'] = '';
            $model->attributes = $_POST['PahKasMasuk'];

            if ($model->save()) {

                $status = true;
            } else {
                $status = false;
            }

            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->kas_masuk_id));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->kas_masuk_id));
            }
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id)
    {
        if (Yii::app()->request->isPostRequest) {
            $this->loadModel($id, 'PahKasMasuk')->delete();

            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
     public function actionAdmin() {
         $dataProvider = new CActiveDataProvider('PahKasMasuk');
         $this->render('index', array(
             'dataProvider' => $dataProvider,
         ));
     }*/

    public function actionAdmin()
    {
        $model = new PahKasMasuk('search');
        $model->unsetAttributes();

        if (isset($_GET['PahKasMasuk']))
            $model->attributes = $_GET['PahKasMasuk'];

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
        //$model = new PahKasMasuk('search');
        //$model->unsetAttributes();

        $criteria = new CDbCriteria();
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $model = PahKasMasuk::model()->findAll($criteria);
        $total = PahKasMasuk::model()->count($criteria);

        if (isset($_GET['PahKasMasuk']))
            $model->attributes = $_GET['PahKasMasuk'];

        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PahKasMasuk('search');
            $model->unsetAttributes();

            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }

}