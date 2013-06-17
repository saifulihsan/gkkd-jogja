<?php

class MtGlTransController extends GxController {

    public function actionView() {
        global $systypes_array;
        $from = $_POST['from_date'];
        $to = $_POST['to_date'];
        $row = Mt::get_ledger_trans($from, $to);
        foreach ($row as $myrow) {
            $arr['data'][] = array('tgl' => sql2date($myrow['tran_date']), 'type' => $systypes_array[$myrow['type']],
                'type_no' => $myrow['type_no'],'ref' => $myrow['reference'], 'amount' => number_format($myrow['amount'],
                        2), 'person' => $myrow['user_id']);
        }
        
        echo CJSON::encode($arr);
        Yii::app()->end();        
    }
    
    public function actionViewJurnalUmum() {
        global $systypes_array;
        $from = $_POST['from_date'];
        $to = $_POST['to_date'];
        $row = Mt::get_general_ledger_trans($from, $to);
        foreach ($row as $myrow) {
            $arr['data'][] = array('type' => $systypes_array[$myrow['type']],
                'type_no' => $myrow['type_no'], 'tgl' => sql2date($myrow['tran_date']),
                'account' => $myrow['account'],
                'debit' => $myrow['amount'] >= 0 ? number_format($myrow['amount'],2) : '',
                'kredit' => $myrow['amount'] < 0 ? number_format(-$myrow['amount'],2) : ''
                );
        }

        echo CJSON::encode($arr);
        Yii::app()->end();
    }

    public function actionCreateJurnalUmum() {
//        return;
        if (!app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Jurnal umum berhasil disimpan.';
            $user = app()->user->getId();
            $detils = CJSON::decode($_POST['detil']);
            $transaction = app()->db->beginTransaction();
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(JURNAL_UMUM);
                $jurnal_umum_id = Mt::get_max_type_no(JURNAL_UMUM);
                $jurnal_umum_id++;
                foreach ($detils as $detil) {
                    $amount = $detil['debit'] > 0 ? $detil['debit'] : -$detil['kredit'];
                    Mt::add_gl(JURNAL_UMUM, $jurnal_umum_id, $_POST['tran_date'], $docref,
                            $detil['account'], "-", $amount, $user);
                }
                $ref->save(JURNAL_UMUM, $jurnal_umum_id, $docref);
                $transaction->commit();
                $status = true;
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
            echo CJSON::encode(array(
                'success' => $status,
                'id' => $docref,
                'msg' => $msg));
            app()->end();
        }
    }

    public function actionCreate() {
        $model = new MtGlTrans;
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtGlTrans'][$k] = $v;
            }
            $model->attributes = $_POST['MtGlTrans'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->counter));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->counter));
            }
        }
        $this->render('create', array('model' => $model));
    }

    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'MtGlTrans');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtGlTrans'][$k] = $v;
            }
            $model->attributes = $_POST['MtGlTrans'];
            if ($model->save()) {
                $status = true;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->counter));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->counter));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id) {
        if (Yii::app()->request->isPostRequest) {
            $this->loadModel($id, 'MtGlTrans')->delete();
            if (!Yii::app()->request->isAjaxRequest) $this->redirect(array('admin'));
        }
        else
                throw new CHttpException(400,
            Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    public function actionAdmin() {
        $model = new MtGlTrans('search');
        $model->unsetAttributes();
        if (isset($_GET['MtGlTrans'])) $model->attributes = $_GET['MtGlTrans'];
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
        //$model = new MtGlTrans('search');
        //$model->unsetAttributes();
        $criteria = new CDbCriteria();
//        $criteria->limit = $limit;
//        $criteria->offset = $start;
        $model = MtGlTrans::model()->findAll($criteria);
        $total = MtGlTrans::model()->count($criteria);
        if (isset($_GET['MtGlTrans'])) $model->attributes = $_GET['MtGlTrans'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtGlTrans('search');
            $model->unsetAttributes();
            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }

}