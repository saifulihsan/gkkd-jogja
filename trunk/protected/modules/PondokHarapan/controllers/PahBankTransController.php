<?php

class PahBankTransController extends GxController
{

    public function actionView()
    {
        require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
        $bfw = Pah::get_balance_before_for_bank_account($_POST['bank_act'], $_POST['from_date']);
        $arr['data'][] = array('type' => 'Saldo Awal - ' . sql2date($_POST['from_date']), 'ref' => '', 'tgl' => '',
            'debit' => $bfw >= 0 ? number_format($bfw, 2) : '', 'kredit' => $bfw < 0 ? number_format($bfw, 2) : '', 'neraca' => '', 'person' => '');
        $credit = $debit = 0;
        $running_total = $bfw;
        if ($bfw > 0)
            $debit += $bfw;
        else
            $credit += $bfw;
        $result = Pah::get_bank_trans_for_bank_account($_POST['bank_act'], $_POST['from_date'], $_POST['to_date']);
        foreach ($result as $myrow) {
            $running_total += $myrow->amount;
            $arr['data'][] = array('type' => $systypes_array[$myrow->type], 'ref' => $myrow->ref, 'tgl' => sql2date($myrow->trans_date),
                'debit' => $myrow->amount >= 0 ? number_format($myrow->amount, 2) : '',
                'kredit' => $myrow->amount < 0 ? number_format(-$myrow->amount, 2) : '',
                'neraca' => number_format($running_total, 2), 'person' => '');
            if ($myrow->amount > 0)
                $debit += $myrow->amount;
            else
                $credit += $myrow->amount;
        }
        $arr['data'][] = array('type' => 'Saldo Akhir - ' . sql2date($_POST['to_date']), 'ref' => '', 'tgl' => '',
            'debit' => number_format($debit, 2), 'kredit' => number_format(-$credit, 2), 'neraca' => number_format($debit + $credit, 2),
            'person' => '');
        echo CJSON::encode($arr);
        Yii::app()->end();
    }

    public function actionGetBalance()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            //$id = $_POST['id'];
            $amt = Pah::get_balance_before_for_bank_account($_POST['id'], Pah::get_date_tomorrow());
            echo CJSON::encode(array(
                'success' => true,
                'id' => $amt,
            ));
            Yii::app()->end();
        }
    }

    public function actionCreateTransfer()
    {
        if (!Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $status = false;
            $msg = 'Transfer antar kas berhasil diproses.';
            $id = -1;
            $bank_asal = $_POST['bank_act_asal'];
            $bank_tujuan = $_POST['bank_act_tujuan'];
            $trans_date = $_POST['trans_date'];
            $memo = $_POST['memo'];
            $amount = Pah::get_number($_POST['amount']);
            if ($bank_asal == $bank_tujuan) {
                echo CJSON::encode(array(
                    'success' => false,
                    'id' => -1,
                    'msg' => 'Bank asal dan bank tujuan tidak boleh sama.'
                ));
                Yii::app()->end();
            }
            if ($amount <= 0) {
                echo CJSON::encode(array(
                    'success' => false,
                    'id' => -1,
                    'msg' => 'Jumlah yang akan ditransfer harus lebih dari nol.'
                ));
                Yii::app()->end();
            }
            $transaction = Yii::app()->db->beginTransaction();
            try {
                $ref = new PahReferenceCom();
                $docref = $ref->get_next_reference(BANKTRANSFER);
                $bank_account_asal = Pah::get_act_code_from_bank_act($bank_asal);
                $bank_account_tujuan = Pah::get_act_code_from_bank_act($bank_tujuan);
                $trans_no = Pah::get_next_trans_no_bank_trans();
                $user = Yii::app()->user->getId();
                //debet kode bank tujuan - kredit kode bank asal
                Pah::add_gl(BANKTRANSFER, $trans_no, $trans_date, $docref, $bank_account_tujuan,
                    $memo, $amount, $user);
                Pah::add_gl(BANKTRANSFER, $trans_no, $trans_date, $docref, $bank_account_asal, $memo, -$amount,
                    $user);
                $ref->save(BANKTRANSFER, $trans_no, $docref);
                $id = $docref;
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

    public function actionPrint()
    {
//        if (!Yii::app()->request->isAjaxRequest)
//            return;
//        if (isset($_POST) && !empty($_POST)) {
        $type = Yii::app()->request->isAjaxRequest;
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('A1', 'Hello')
                ->setCellValue('B2', 'world!')
                ->setCellValue('C1', 'Hello')
                ->setCellValue('D2', 'world!');

            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('A4', 'Miscellaneous glyphs')
                ->setCellValue('A5', 'eaeuaeioueiuyaouc');

            $objPHPExcel->getActiveSheet()->setTitle('Mutasi Kas');

            ob_end_clean();
            ob_start();

            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="test.xls"');
            header('Cache-Control: max-age=0');
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
            $objWriter->save('php://output');
            //die();
//            echo CJSON::encode(array(
//                'success' => true,
//                'id' => 0,
//            ));
            Yii::app()->end();
//            $this->render('view');
//        }
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id, 'PahBankTrans');


        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['PahBankTrans'][$k] = $v;
            }
            $model->attributes = $_POST['PahBankTrans'];

            if ($model->save()) {

                $status = true;
            } else {
                $status = false;
            }

            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(array(
                    'success' => $status,
                    'id' => $model->id
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id)
    {
        if (Yii::app()->request->isPostRequest) {
            $this->loadModel($id, 'PahBankTrans')->delete();

            if (!Yii::app()->request->isAjaxRequest)
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400,
                Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
    }

    /*
     public function actionAdmin() {
         $dataProvider = new CActiveDataProvider('PahBankTrans');
         $this->render('index', array(
             'dataProvider' => $dataProvider,
         ));
     }*/

    public function actionAdmin()
    {
        $model = new PahBankTrans('search');
        $model->unsetAttributes();

        if (isset($_GET['PahBankTrans']))
            $model->attributes = $_GET['PahBankTrans'];

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
        //$model = new PahBankTrans('search');
        //$model->unsetAttributes();

        $criteria = new CDbCriteria();
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $model = PahBankTrans::model()->findAll($criteria);
        $total = PahBankTrans::model()->count($criteria);

        if (isset($_GET['PahBankTrans']))
            $model->attributes = $_GET['PahBankTrans'];

        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new PahBankTrans('search');
            $model->unsetAttributes();

            $this->render('admin', array(
                'model' => $model,
            ));
        }
    }

}