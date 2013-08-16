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
        $void = Mt::get_voided(PINJAM_KENDARAAN);
        $criteria = new CDbCriteria();
        $criteria->addNotInCondition('id_pinjam', $void);
        $criteria->limit = $limit;
        $criteria->offset = $start;
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
        $image = dirname(Yii::app()->getBasePath()) . '/images/mahkotrans.png';
        $start = 1;
        $file_name = 'PinjamKendaraan' . $pinjam->doc_ref;
        $worksheet_name = 'Pinjam Kendaraan ' . $pinjam->doc_ref;
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getDefaultStyle()->getFont()->setSize(9);
        $objPHPExcel->setActiveSheetIndex(0)->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::
                PAPERSIZE_A4);
        $objDrawing = new PHPExcel_Worksheet_Drawing();
        $objDrawing->setName('Logo');
        $objDrawing->setDescription('Logo');
        $objDrawing->setPath($image);
        $objDrawing->setHeight(30);
        $objDrawing1 = clone $objDrawing;
        $start_body = $start;
        $objPHPExcel->setActiveSheetIndex(0);
        $objDrawing1->setWorksheet($objPHPExcel->getActiveSheet());
        $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
        $objDrawing1->setCoordinates("A$start");
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "MAHKOTRANS")->getStyle("A$start")->getFont()->setSize(14);

        $start++;
        $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start",
                        "Villa Seturan Indah Blok D-10 Depok Sleman Yogyakarta 55281")
                ->getStyle("A$start")->getFont()->setSize(6);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start",
                        "Telp. (0274) 7439982, 085292750055, 087838488822")
                ->getStyle("A$start")->getFont()->setSize(6);
        $styleArray = array('borders' => array('bottom' => array('style' =>
                    PHPExcel_Style_Border::BORDER_THIN)));
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "PENYEWAAN")
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start")->getFont()->setSize(12);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Nomor")->setCellValue("B$start",
                        ": " . $pinjam->doc_ref)
                ->setCellValue("D$start", "Tanggal")->setCellValue("E$start",
                ": " . $pinjam->trans_date);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nama Konsumen")->setCellValue("B$start",
                        ": " . $pinjam->idPelanggan->nama)
                ->setCellValue("D$start", "Kelompok Konsumen")->setCellValue("E$start",
                ": " . $pinjam->idKelompok->nama);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Tanda Pengenal")->setCellValue("B$start",
                        ": " . $pinjam->tanda_pengenal)
                ->setCellValue("D$start", "No. Identitas")->setCellValue("E$start",
                ": " . $pinjam->no_identitas);
        $start++;
        $end = $start + 1;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Jaminan")->mergeCells("B$start:G$end")->setCellValue("B$start",
                ": " . $pinjam->jaminan . ", " . $pinjam->jaminan_desc);
        $start = $end;
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Pinjam")->setCellValue("B$start",
                        ": " . $pinjam->tgl_pinjam)
                ->setCellValue("D$start", "Rencana Kembali")->setCellValue("E$start",
                ": " . $pinjam->tgl_rencana_kembali);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nopol / Jenis Mobil")->setCellValue("B$start",
                        ": " . $pinjam->idMobil->nopol . " / " . $pinjam->idMobil->jenis)
                ->setCellValue("D$start", "Season")->setCellValue("E$start",
                $pinjam->season == 0 ? ": Low" : ": High");
        $start++;
        $styleArray = array('borders' => array('bottom' => array('style' =>
                    PHPExcel_Style_Border::BORDER_DASHED)));
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "PERHITUNGAN ONGKOS SEWA")
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start")->getFont()->setSize(12);
        $start++;
        $start_body = $start;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nama Item")->setCellValue("C$start", "Jumlah")
                ->setCellValue("D$start", "Tarif")->setCellValue("G$start",
                "Total")->getStyle("B$start:G$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Mobil")
                ->setCellValue("B$start", "Per Bulan")
                ->setCellValue("C$start", $pinjam->sewa_bln)->setCellValue("D$start",
                        $pinjam->trf_bulan)
                ->setCellValue("G$start", $pinjam->sewa_bln * $pinjam->trf_bulan);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $pinjam->sewa_hari)
                ->setCellValue("B$start", "Per Hari")
                ->setCellValue("D$start", $pinjam->trf_hari)
                ->setCellValue("G$start", $pinjam->sewa_hari * $pinjam->trf_hari);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $pinjam->sewa_jam)
                ->setCellValue("B$start", "Per 12 Jam")
                ->setCellValue("D$start", $pinjam->trf_jam)
                ->setCellValue("G$start", $pinjam->sewa_jam * $pinjam->trf_jam);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:B$start")->setCellValue("A$start",
                "Lembar 1 : Untuk Konsumen")->setCellValue("C$start",
                "Total Sewa")->setCellValue("G$start", $pinjam->ongkos_sewa);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start", "Driver")->setCellValue("G$start",
                $pinjam->ongkos_driver);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start", "Bensin")
                ->setCellValue("G$start", $pinjam->ongkos_bbm);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start", "Total")
                ->setCellValue("G$start", $pinjam->total_ongkos);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start", "Diskon")
                ->setCellValue("G$start", $pinjam->disc);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("C$start:F$start")
                ->setCellValue("C$start",
                        "DP " . $pinjam->trans_via . " / No. Bukti : " . $pinjam->no_bukti_bayar)
                ->setCellValue("G$start", $pinjam->dp);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        "Sisa Tagihan")
                ->setCellValue("G$start", $pinjam->sisa_tagihan);
//        $start++;
//        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
//                setCellValue("A$start", "  ");
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:B$start")->
                setCellValue("A$start", "Penyewa,")->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("D$start:G$start")->
                setCellValue("D$start", "Managemen Mahkotrans,")->getStyle("D$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:B$start")->getStyle("A$start")->
                applyFromArray($styleArray);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("D$start:G$start")->getStyle("D$start")->
                applyFromArray($styleArray);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_body:G$start")->
                getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);

//=================================================================================================================

        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(14)->
                setBold(true);
        $start++;
        $objDrawing->setCoordinates("A$start");
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "MAHKOTRANS")->getStyle("A$start")->getFont()->setSize(14);

        $start++;
        $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start",
                        "Villa Seturan Indah Blok D-10 Depok Sleman Yogyakarta 55281")
                ->getStyle("A$start")->getFont()->setSize(6);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start",
                        "Telp. (0274) 7439982, 085292750055, 087838488822")
                ->getStyle("A$start")->getFont()->setSize(6);
        $styleArray = array('borders' => array('bottom' => array('style' =>
                    PHPExcel_Style_Border::BORDER_THIN)));
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "PENYEWAAN")
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start")->getFont()->setSize(12);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Nomor")->setCellValue("B$start",
                        ": " . $pinjam->doc_ref)
                ->setCellValue("D$start", "Tanggal")->setCellValue("E$start",
                ": " . $pinjam->trans_date);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nama Konsumen")->setCellValue("B$start",
                        ": " . $pinjam->idPelanggan->nama)
                ->setCellValue("D$start", "Kelompok Konsumen")->setCellValue("E$start",
                ": " . $pinjam->idKelompok->nama);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Tanda Pengenal")->setCellValue("B$start",
                        ": " . $pinjam->tanda_pengenal)
                ->setCellValue("D$start", "No. Identitas")->setCellValue("E$start",
                ": " . $pinjam->no_identitas);
        $start++;
        $end = $start + 1;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Jaminan")->mergeCells("B$start:G$end")->setCellValue("B$start",
                ": " . $pinjam->jaminan . ", " . $pinjam->jaminan_desc);
        $start = $end;
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Pinjam")->setCellValue("B$start",
                        ": " . $pinjam->tgl_pinjam)
                ->setCellValue("D$start", "Rencana Kembali")->setCellValue("E$start",
                ": " . $pinjam->tgl_rencana_kembali);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nopol / Jenis Mobil")->setCellValue("B$start",
                        ": " . $pinjam->idMobil->nopol . " / " . $pinjam->idMobil->jenis)
                ->setCellValue("D$start", "Season")->setCellValue("E$start",
                $pinjam->season == 0 ? ": Low" : ": High");
        $start++;
        $styleArray = array('borders' => array('bottom' => array('style' =>
                    PHPExcel_Style_Border::BORDER_DASHED)));
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "PERHITUNGAN ONGKOS SEWA")
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start")->getFont()->setSize(12);
        $start++;
        $start_body = $start;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nama Item")->setCellValue("C$start", "Jumlah")
                ->setCellValue("D$start", "Tarif")->setCellValue("G$start",
                "Total")->getStyle("B$start:G$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Mobil")
                ->setCellValue("B$start", "Per Bulan")
                ->setCellValue("C$start", $pinjam->sewa_bln)->setCellValue("D$start",
                        $pinjam->trf_bulan)
                ->setCellValue("G$start", $pinjam->sewa_bln * $pinjam->trf_bulan);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $pinjam->sewa_hari)
                ->setCellValue("B$start", "Per Hari")
                ->setCellValue("D$start", $pinjam->trf_hari)
                ->setCellValue("G$start", $pinjam->sewa_hari * $pinjam->trf_hari);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $pinjam->sewa_jam)
                ->setCellValue("B$start", "Per 12 Jam")
                ->setCellValue("D$start", $pinjam->trf_jam)
                ->setCellValue("G$start", $pinjam->sewa_jam * $pinjam->trf_jam);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                "Lembar 2 : Untuk Arsip")->mergeCells("A$start:B$start")->setCellValue("C$start",
                "Total Sewa")->setCellValue("G$start", $pinjam->ongkos_sewa);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start", "Driver")->setCellValue("G$start",
                $pinjam->ongkos_driver);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start", "Bensin")
                ->setCellValue("G$start", $pinjam->ongkos_bbm);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start", "Total")
                ->setCellValue("G$start", $pinjam->total_ongkos);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start", "Diskon")
                ->setCellValue("G$start", $pinjam->disc);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("C$start:F$start")
                ->setCellValue("C$start",
                        "DP " . $pinjam->trans_via . " / No. Bukti : " . $pinjam->no_bukti_bayar)
                ->setCellValue("G$start", $pinjam->dp);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        "Sisa Tagihan")
                ->setCellValue("G$start", $pinjam->sisa_tagihan);
//        $start++;
//        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
//                setCellValue("A$start", "  ");
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:B$start")->
                setCellValue("A$start", "Penyewa,")->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("D$start:G$start")->
                setCellValue("D$start", "Managemen Mahkotrans,")->getStyle("D$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:B$start")->getStyle("A$start")->
                applyFromArray($styleArray);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("D$start:G$start")->getStyle("D$start")->
                applyFromArray($styleArray);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_body:G$start")->
                getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
        ob_end_clean();
        ob_start();
        $objPHPExcel->getActiveSheet()->setShowGridlines(false);
        $mPDF1 = Yii::app()->ePdf->mpdf('', 'A4', 0, '', 10, 10, 5, 0, 0, 0, 'P');
        $objWriter = new PHPExcel_Writer_HTML($objPHPExcel);
        $html = $objWriter->generateStyles(true) . $objWriter->
                        generateSheetData();
        $html = str_replace('.' . $image,
                app()->getBaseUrl(true) . '/images/mahkotrans.png', $html);
//        echo $html;
        $mPDF1->WriteHTML($html);
        $mPDF1->Output($file_name, 'D');
        Yii::app()->end();
    }
}