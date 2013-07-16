<?php
class MtPinjamKendaraanController extends GxController {
    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'MtPinjamKendaraan')
        ));
    }
    public function actionCreate() {
        // return;
        $model = new MtPinjamKendaraan();
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Peminjaman kendaraan berhasil disimpan.';
            $transaction = app()->db->beginTransaction();
            $id = -1;
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(PINJAM_KENDARAAN);
                $user = app()->user->getId();
                foreach ($_POST as $k => $v) {
                    if ($k == 'ongkos_sewa' || $k == 'ongkos_driver' || $k == 'ongkos_bbm'
                            || $k == 'total_ongkos' || $k == 'dp' || $k == 'sisa_tagihan'
                            || $k == 'disc' || $k == 'total') {
                        $v = get_number($v);
                    }
                    $_POST['MtPinjamKendaraan'][$k] = $v;
                }
                $_POST['MtPinjamKendaraan']['entry_time'] = Now();
                $_POST['MtPinjamKendaraan']['id_driver'] = is_integer(
                                $_POST['MtPinjamKendaraan']['id_driver']) ? $_POST['MtPinjamKendaraan']['id_driver']
                            : NULL;
                $_POST['MtPinjamKendaraan']['users_id'] = $user;
                $_POST['MtPinjamKendaraan']['doc_ref'] = $docref;
                $model->attributes = $_POST['MtPinjamKendaraan'];
                $msg = "Data gagal disimpan";
                if ($model->save()) {
                    $status = true;
                    $msg = "Data berhasil di simpan dengan id " . $model->id_pinjam;
                } else {
                    $status = false;
                }
                $id = $docref;
                $date = $model->trans_date;
                $ref->save(PINJAM_KENDARAAN, $model->id_pinjam, $docref);
                if ($model->dp > 0) {
                    $bank_account = '0';
                    if ($model->trans_via == "Tunai")
                            $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_ditangan'));
                    else
                            $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_dibank'));
                    // debet kas - kredit pendapatan
                    Mt::add_gl(PINJAM_KENDARAAN, $model->id_pinjam, $date,
                            $docref, $bank_account, '-', $model->dp, $user,
                            $model->id_mobil);
                    Mt::add_gl(PINJAM_KENDARAAN, $model->id_pinjam, $date,
                            $docref, Mt::get_prefs('akun_uang_muka'), '-',
                            -$model->dp, $user, $model->id_mobil);
                }
                $transaction->commit();
            } catch (Exception $ex) {
                $transaction->rollback();
                $status = false;
                $msg = $ex;
            }
            echo CJSON::encode(
                    array(
                        'success' => $status,
                        'msg' => $msg,
                        'id' => $id
            ));
            Yii::app()->end();
        }
    }
    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'MtPinjamKendaraan');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtPinjamKendaraan'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtPinjamKendaraan'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_pinjam;
            } else {
                $status = false;
            }
            if (Yii::app()->request->isAjaxRequest) {
                echo CJSON::encode(
                        array(
                            'success' => $status,
                            'msg' => $msg
                ));
                Yii::app()->end();
            } else {
                $this->redirect(array(
                    'view',
                    'id' => $model->id_pinjam
                ));
            }
        }
        $this->render('update', array(
            'model' => $model
        ));
    }
    public function actionDelete() {
        if (Yii::app()->request->isPostRequest) {
            if (isset($_POST) && !empty($_POST)) {
                $msg = 'Data berhasil divoid.';
                $status = true;
                $id = $_POST['id'];
                $memo_ = $_POST['memo_'];
                $transaction = app()->db->beginTransaction();
                try {
                    $user = app()->user->getId();
                    $model = $this->loadModel($id, 'MtPinjamKendaraan');
                    $date = $model->trans_date;
                    $docref = $model->doc_ref;
                    $msg = "Peminjaman kendaraan dengan referensi $docref berhasil divoid.";
                    $void = new MtVoided();
                    $void->type = PINJAM_KENDARAAN;
                    $void->id = $id;
                    $void->date_ = $date;
                    $void->memo_ = $memo_;
                    $void->save();
                    if ($model->dp > 0) {
                        $bank_account = '0';
                        if ($model->trans_via == "Tunai")
                                $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_ditangan'));
                        else
                                $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_dibank'));
                        // void gl
                        // debit penjualan , kredit kas
                        Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                                Mt::get_prefs('akun_uang_muka'),
                                "VOID Peminjaman Kendaraan $docref", $model->dp,
                                $user, $model->id_mobil);
                        Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                                $bank_account,
                                "VOID Peminjaman Kendaraan $docref",
                                -$model->dp, $user, $model->id_mobil);
                    }
                    $status = true;
                    $transaction->commit();
                } catch (Exception $e) {
                    $transaction->rollback();
                    $status = false;
                    $msg = $ex;
                }
                echo CJSON::encode(
                        array(
                            'success' => $status,
                            'msg' => $msg
                ));
                Yii::app()->end();
            }
        }
        else
                throw new CHttpException(400,
            Yii::t('app',
                    'Invalid request. Please do not repeat this request again.'));
    }
    /*
     * public function actionAdmin() { $dataProvider = new CActiveDataProvider('MtPinjamKendaraan'); $this->render('index', array( 'dataProvider' => $dataProvider, )); }
     */
    public function actionAdmin() {
        $model = new MtPinjamKendaraan('search');
        $model->unsetAttributes();
        if (isset($_GET['MtPinjamKendaraan']))
                $model->attributes = $_GET['MtPinjamKendaraan'];
        $this->render('admin', array(
            'model' => $model
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
        // $model = new MtPinjamKendaraan('search');
        // $model->unsetAttributes();
        $void = Mt::get_voided(PINJAM_KENDARAAN);
        $criteria = new CDbCriteria();
        $criteria->addNotInCondition('id_pinjam', $void);
        $model = MtPinjamKendaraan::model()->findAll($criteria);
        $total = MtPinjamKendaraan::model()->count($criteria);
        if (isset($_GET['MtPinjamKendaraan']))
                $model->attributes = $_GET['MtPinjamKendaraan'];
        if (isset($_GET['output']) && $_GET['output'] == 'json') {
            $this->renderJson($model, $total);
        } else {
            $model = new MtPinjamKendaraan('search');
            $model->unsetAttributes();
            $this->render('admin',
                    array(
                'model' => $model
            ));
        }
    }
    public function actionPrint($id) {
        if (Yii::app()->request->isAjaxRequest) return;
//        if (isset($_POST) && !empty($_POST)) {
        $pinjam = $this->loadModel($id, 'MtPinjamKendaraan');
//        $pinjam = new MtPinjamKendaraan;
        $start = 1;
        $file_name = 'PinjamKendaraan' . $pinjam->doc_ref;
        $worksheet_name = 'Pinjam Kendaraan ' . $pinjam->doc_ref;
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getDefaultStyle()->getFont()->setSize(10);
        $objPHPExcel->setActiveSheetIndex(0)->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::
                PAPERSIZE_A4);
        $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
        $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
//            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
//                    setCellValue("A$start", $report_title)->getStyle("A$start")->getFont()->setSize(18)->
//                    setBold(true);
//            $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "MAHKOTRANS")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start",
                        "Vila Seturan Indah Blok D 10 Yogyakarta")
                ->getStyle("A$start")->getFont()->setSize(11)->setBold(true);
        $start++;

        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "Telp : 0274 487039 Fax : 0274 487370")
                ->getStyle("A$start")->getFont()->setSize(11)->setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "PENYEWAAN")
                ->getStyle("A$start")->getFont()->setSize(14)->setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Nomor")->setCellValue("B$start",
                        $pinjam->doc_ref)
                ->setCellValue("D$start", "Tanggal")->setCellValue("E$start",
                        $pinjam->trans_date);
        $start++;
         $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Nama Konsumen")->setCellValue("B$start",
                        $pinjam->idPelanggan->nama)
                ->setCellValue("D$start", "Kelompok Konsumen")->setCellValue("E$start",
                        $pinjam->idKelompok->nama);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Tanda Pengenal")->setCellValue("B$start",
                        $pinjam->tanda_pengenal)
                ->setCellValue("D$start", "No. Identitas")->setCellValue("E$start",
                        $pinjam->no_identitas);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Jaminan")->mergeCells("B$start:G$start")->setCellValue("B$start",
                        $pinjam->jaminan.", ".$pinjam->jaminan_desc) ;
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Tanggal/Jam Pinjam")->setCellValue("B$start",
                        $pinjam->tgl_pinjam)
                ->setCellValue("D$start", "Tanggal/Jam Selesai")->setCellValue("E$start",
                        $pinjam->tgl_rencana_kembali);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nopol/Jenis Mobil")->setCellValue("B$start",
                        $pinjam->tanda_pengenal)
                ->setCellValue("D$start", "Season")->setCellValue("E$start",
                        $pinjam->season == 0 ? "Low" : "High");
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "PERHITUNGAN ONGKOS SEWA")
                ->getStyle("A$start")->getFont()->setSize(14)->setBold(true);
//            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
//            $start++;
//            $start++;
        $start_body = $start;
//            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Type")->setCellValue("B$start",
//                            "Ref. Dokumen")->setCellValue("C$start", "Tanggal")->setCellValue("D$start",
//                            "Debit")->setCellValue("E$start", "Kredit")->setCellValue("F$start",
//                            "Saldo")->getStyle("A$start:F$start")
//                    ->getFont()->setBold(true);
//            $start++;
//            $arr = Mt::get_bank_trans_view();
//            foreach ($arr['data'] as $row) {
//                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
//                                $row['type'])->
//                        setCellValue("B$start", $row['ref'])->setCellValue("C$start",
//                                sql2date($row['tgl']))->
//                        setCellValue("D$start", $row['debit'])->setCellValue("E$start",
//                                $row['kredit'])->
//                        setCellValue("F$start", $row['neraca']);
//                $start++;
//            }
        $end_body = $start - 1;
//            $styleArray = array('borders' => array('allborders' => array('style' =>
//                        PHPExcel_Style_Border::BORDER_THIN)));
//            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:F$end_body")->
//                    applyFromArray($styleArray);
        $start_row = $start_body + 1;
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("D$start_body:F$end_body")->
                getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("E")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("F")->setAutoSize(true);
        $start++;
//            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
//            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
//                    setCellValue("A$start",
//                            "Dicetak oleh: " . $jemaat->real_name);
//            $start++;
//            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
//                    setCellValue("A$start",
//                            "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " .
//                            get_time_now());
        ob_end_clean();
        ob_start();
        $objPHPExcel->getActiveSheet()->setShowGridlines(false);
        $mPDF1 = Yii::app()->ePdf->mpdf();
        $mPDF1 = Yii::app()->ePdf->mpdf('', 'A4');
        $objWriter = new PHPExcel_Writer_HTML($objPHPExcel);
        $header = $objWriter->generateHTMLHeader(true);
        $html = $header . $objWriter->generateStyles(true) . $objWriter->
                        generateSheetData() . $objWriter->generateHTMLFooter();

        $mPDF1->WriteHTML($html);
        $mPDF1->Output('MutasiKasDitangan.pdf', 'D');
        Yii::app()->end();
//        }
    }
}