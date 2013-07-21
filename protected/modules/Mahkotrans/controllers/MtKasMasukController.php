<?php
class MtKasMasukController extends GxController {
    public function actionView() {
        if (!app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $id_mobil = $_POST['id_mobil'];
            $script = "SELECT
                mt_kas_masuk.doc_ref,
                    mt_kas_masuk.dari,
                    mt_kas_masuk.amount,
                    mt_kas_masuk.entry_time,
                    mt_kas_masuk.trans_date,
                    mt_kas_masuk.trans_via,";
            $script .= $id_mobil == NULL ? "''," : "mt_mobil.nopol,";
            $script .= " mt_bank_accounts.bank_account_name,
                    mt_chart_master.account_code,
                    mt_chart_master.description
                FROM mt_kas_masuk ";
            $script .= $id_mobil == NULL ? "" : "JOIN mt_mobil ON mt_kas_masuk.id_mobil = mt_mobil.id_mobil ";
            $script .= "JOIN mt_bank_accounts ON mt_kas_masuk.mt_bank_accounts_id = mt_bank_accounts.id
                JOIN mt_chart_master ON mt_kas_masuk.account_code = mt_chart_master.account_code
                WHERE mt_kas_masuk.kas_masuk_id = $id";
            $rows = app()->db->createCommand($script)->query();
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
            $msg = 'Kas masuk berhasil disimpan.';

            $user = app()->user->getId();
            $id = -1;
            //require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $transaction = app()->db->beginTransaction();
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(KAS_MASUK);
                $kas_masuk = new MtKasMasuk;
                foreach ($_POST as $k => $v) {
                    if ($k == 'amount') $v = get_number($v);
                    $_POST['MtKasMasuk'][$k] = $v;
                }
                $date = $_POST['MtKasMasuk']['trans_date'];
                $_POST['MtKasMasuk']['entry_time'] = Now();
                $_POST['MtKasMasuk']['users_id'] = $user;
                $_POST['MtKasMasuk']['doc_ref'] = $docref;
                $_POST['MtKasMasuk']['id_mobil'] =
                        $_POST['MtKasMasuk']['id_mobil'] != '' ?
                        $_POST['MtKasMasuk']['id_mobil'] : NULL;
                $kas_masuk->attributes = $_POST['MtKasMasuk'];
                $kas_masuk->save();
                $id = $docref;
                $ref->save(KAS_MASUK, $kas_masuk->kas_masuk_id, $docref);
                $bank_account = Mt::get_act_code_from_bank_act($kas_masuk->mt_bank_accounts_id);
                $act_donatur = $kas_masuk->account_code;
                //debet kode kas/bank - kredit pendapatan
                Mt::add_gl(KAS_MASUK, $kas_masuk->kas_masuk_id, $date, $docref,
                        $bank_account, '-', $kas_masuk->amount, $user,
                        $kas_masuk->id_mobil);
                Mt::add_gl(KAS_MASUK, $kas_masuk->kas_masuk_id, $date, $docref,
                        $act_donatur, $kas_masuk->note, -$kas_masuk->amount,
                        $user, $kas_masuk->id_mobil);
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
        $model = $this->loadModel($id, 'MtKasMasuk');


        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtKasMasuk'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtKasMasuk'];

            if ($model->save()) {

                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->kas_masuk_id;
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
                $this->redirect(array('view', 'id' => $model->kas_masuk_id));
            }
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }
    public function actionDelete() {
        if (!app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $id = $_POST['id'];
            $memo_ = $_POST['memo_'];
            $status = false;
            $msg = 'Kas masuk berhasil divoid.';
            $user = app()->user->getId();
            $transaction = app()->db->beginTransaction();
            try {
                $kas_masuk = MtKasMasuk::model()->findByPk($id);
                $date = $kas_masuk->trans_date;
                $docref = $kas_masuk->doc_ref;
                $void = new MtVoided;
                $void->type = KAS_MASUK;
                $void->id = $id;
                $void->date_ = $date;
                $void->memo_ = $memo_;
                $void->save();
                $bank = MtBankAccounts::model()->findByPk($kas_masuk->mt_bank_accounts_id);
                $act_donatur = $kas_masuk->account_code;
                //void gl
                Mt::add_gl(VOID, $void->id_voided, $date, $docref, $act_donatur,
                        "VOID Kas Masuk $docref", $kas_masuk->amount, $user,
                        $kas_masuk->id_mobil);
                Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                        $bank->account_code, "VOID Kas Masuk $docref",
                        -$kas_masuk->amount, $user, $kas_masuk->id_mobil);
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
      $dataProvider = new CActiveDataProvider('MtKasMasuk');
      $this->render('index', array(
      'dataProvider' => $dataProvider,
      ));
      } */
    public function actionAdmin() {
        $model = new MtKasMasuk('search');
        $model->unsetAttributes();

        if (isset($_GET['MtKasMasuk']))
                $model->attributes = $_GET['MtKasMasuk'];

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
        $void = Mt::get_voided(KAS_MASUK);
        $criteria = new CDbCriteria();
        $criteria->addNotInCondition('kas_masuk_id', $void);
        $model = MtKasMasuk::model()->findAll($criteria);
        $total = MtKasMasuk::model()->count($criteria);

        if (isset($_GET['MtKasMasuk']))
                $model->attributes = $_GET['MtKasMasuk'];

        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtKasMasuk('search');
            $model->unsetAttributes();

            $this->render('admin',
                    array(
                'model' => $model,
            ));
        }
    }
    public function actionPrint($id) {
        if (Yii::app()->request->isAjaxRequest) return;
//        if (isset($_POST) && !empty($_POST)) {
        $kas_masuk = $this->loadModel($id, 'MtKasMasuk');
//        $pinjam = new MtPinjamKendaraan;
        $start = 1;
        $file_name = 'KasMasuk' . $kas_masuk->doc_ref;
        $worksheet_name = 'Kas Masuk ' . $kas_masuk->doc_ref;
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getDefaultStyle()->getFont()->setSize(9);
        $objPHPExcel->setActiveSheetIndex(0)->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::
                PAPERSIZE_A4);
        $start_body = $start;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "MAHKOTRANS")->getStyle("A$start")->getFont()->setSize(14);
        $start++;
        $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start",
                        "Vila Seturan Indah Blok D 10 Yogyakarta")
                ->getStyle("A$start")->getFont()->setSize(11);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "Telp : 0274 487039 Fax : 0274 487370")
                ->getStyle("A$start")->getFont()->setSize(11);
        $styleArray = array('borders' => array('bottom' => array('style' =>
                    PHPExcel_Style_Border::BORDER_THIN)));
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "KUITANSI")
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start")->getFont()->setSize(12);
        $start++;        
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "No : " . $kas_masuk->doc_ref)
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$start:G$start")->
                setCellValue("B$start",
                "                                                                                          ")
                ->getStyle("B$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                "Telah terima dari");
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$start:G$start")->setCellValue("B$start",
                ': '.$kas_masuk->dari);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                "Sebagai pembayaran");
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$start:G$start")->setCellValue("B$start",
                ': '.$kas_masuk->note);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                "Uang sejumlah");
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$start:G$start")->setCellValue("B$start",
                ': Rp ' . number_format($kas_masuk->amount,2));
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("D$start:G$start")->
                setCellValue("D$start", "Yogyakarta, ".  get_date_today('dd MMMM yyyy'))->getStyle("D$start")->getAlignment()
                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("D$start:G$start")->
                setCellValue("D$start", "Staf Mahkotrans")->getStyle("D$start")->getAlignment()
                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        

//=================================================================================================================
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "MAHKOTRANS")->getStyle("A$start")->getFont()->setSize(14);
        $start++;
        $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start",
                        "Vila Seturan Indah Blok D 10 Yogyakarta")
                ->getStyle("A$start")->getFont()->setSize(11);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "Telp : 0274 487039 Fax : 0274 487370")
                ->getStyle("A$start")->getFont()->setSize(11);
        $styleArray = array('borders' => array('bottom' => array('style' =>
                    PHPExcel_Style_Border::BORDER_THIN)));
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "KUITANSI")
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start")->getFont()->setSize(12);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "No : " . $kas_masuk->doc_ref)
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$start:G$start")->
                setCellValue("B$start",
                        "                                                                                          ")
                ->getStyle("B$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                "Telah terima dari");
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$start:G$start")->setCellValue("B$start",
                ': ' . $kas_masuk->dari);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                "Sebagai pembayaran");
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$start:G$start")->setCellValue("B$start",
                ': ' . $kas_masuk->note);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                "Uang sejumlah");
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$start:G$start")->setCellValue("B$start",
                ': Rp ' . number_format($kas_masuk->amount, 2));
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("D$start:G$start")->
                setCellValue("D$start", "Yogyakarta, "  . get_date_today('dd MMMM yyyy'))->getStyle("D$start")->getAlignment()
                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("D$start:G$start")->
                setCellValue("D$start", "Staf Mahkotrans")->getStyle("D$start")->getAlignment()
                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        
        ob_end_clean();
        ob_start();
        $objPHPExcel->getActiveSheet()->setShowGridlines(false);
        $mPDF1 = Yii::app()->ePdf->mpdf('', 'A4', 0, '', 10, 10, 5, 0, 0, 0, 'P');
        $objWriter = new PHPExcel_Writer_HTML($objPHPExcel);
        $html = $objWriter->generateStyles(true) . $objWriter->
                        generateSheetData();
        $mPDF1->WriteHTML($html);
        $mPDF1->Output($file_name, 'D');
        Yii::app()->end();
    }
}