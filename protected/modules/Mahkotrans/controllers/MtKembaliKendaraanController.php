<?php
class MtKembaliKendaraanController extends GxController {
    public function actionView($id) {
        $this->render('view',
                array(
            'model' => $this->loadModel($id, 'MtKembaliKendaraan')
        ));
    }
    public function actionDateDiff() {
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $date_rencana = $_POST['tgl_rencana'];
            $date_kembali = $_POST['tgl_kembali'];
            $res = $this->otherDiffDate($date_rencana, $date_kembali, true);
            echo CJSON::encode(
                    array(
                        'status' => true,
                        'msg' => $res
            ));
            Yii::app()->end();
        }
    }
    public function actionCreate() {
        $model = new MtKembaliKendaraan();
        if (!Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $status = false;
            $msg = 'Peminjaman kendaraan berhasil disimpan.';
            $transaction = app()->db->beginTransaction();
            $id = -1;
            try {
                $ref = new MtReferenceCom();
                $docref = $ref->get_next_reference(KEMBALI_KENDARAAN);
                $user = app()->user->getId();
                foreach ($_POST as $k => $v) {
                    if ($k == 'ongkos_sewa' || $k == 'ongkos_driver' || $k == 'ongkos_bbm'
                            || $k == 'total_ongkos' || $k == 'dp' || $k == 'ongkos_extend'
                            || $k == 'disc' || $k == 'total' || $k == 'pelunasan') {
                        $v = get_number($v);
                    }
                    $_POST['MtKembaliKendaraan'][$k] = $v;
                }
                $_POST['MtKembaliKendaraan']['entry_time'] = Now();
                $_POST['MtKembaliKendaraan']['users_id'] = $user;
                $_POST['MtKembaliKendaraan']['doc_ref_kembali'] = $docref;
                $model->attributes = $_POST['MtKembaliKendaraan'];
                $msg = "Data gagal disimpan";
                if ($model->save()) {
                    $status = true;
                    $msg = "Data berhasil di simpan dengan id " . $model->id_kembali;
                } else {
                    $status = false;
                }
                $id = $docref;
                $date = $model->trans_date;
                $ref->save(KEMBALI_KENDARAAN, $model->id_kembali, $docref);
                if ($model->pelunasan > 0) {
                    $bank_account = '0';
                    if ($model->trans_via == "Tunai")
                            $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_ditangan'));
                    else
                            $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_dibank'));

                    Mt::add_gl(KEMBALI_KENDARAAN, $model->id_kembali, $date,
                            $docref, $bank_account, '-', $model->pelunasan,
                            $user, $model->idPinjam->id_mobil);
                    Mt::add_gl(KEMBALI_KENDARAAN, $model->id_kembali, $date,
                            $docref, Mt::get_prefs('akun_uang_muka'), "-",
                            $model->dp, $user, $model->idPinjam->id_mobil);
                    Mt::add_gl(KEMBALI_KENDARAAN, $model->id_kembali, $date,
                            $docref, Mt::get_prefs('akun_pendapatan_sewa'), '-',
                            -$model->total, $user, $model->idPinjam->id_mobil);
                    if ($model->disc > 0) {
                        Mt::add_gl(KEMBALI_KENDARAAN, $model->id_kembali, $date,
                                $docref, Mt::get_prefs('akun_diskon'), "-",
                                $model->disc, $user, $model->idPinjam->id_mobil);
                    }
                }
                $pinjam = $this->loadModel($model->id_pinjam,
                        'MtPinjamKendaraan');
                $pinjam->is_back = 1;
                $pinjam->id_driver = $_POST['MtKembaliKendaraan']['id_driver'];
                $pinjam->save();
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
        $model = $this->loadModel($id, 'MtKembaliKendaraan');
        if (isset($_POST) && !empty($_POST)) {
            foreach ($_POST as $k => $v) {
                $_POST['MtKembaliKendaraan'][$k] = $v;
            }
            $msg = "Data gagal disimpan";
            $model->attributes = $_POST['MtKembaliKendaraan'];
            if ($model->save()) {
                $status = true;
                $msg = "Data berhasil di simpan dengan id " . $model->id_kembali;
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
                    'id' => $model->id_kembali
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
                    $model = $this->loadModel($id, 'MtKembaliKendaraan');
                    $date = $model->trans_date;
                    $docref = $model->doc_ref_kembali;
                    $msg = "Pengembalian kendaraan dengan referensi $docref berhasil divoid.";
                    $void = new MtVoided();
                    $void->type = KEMBALI_KENDARAAN;
                    $void->id = $id;
                    $void->date_ = $date;
                    $void->memo_ = $memo_;
                    $void->save();
                    if ($model->pelunasan > 0) {
                        if ($model->trans_via == "Tunai")
                                $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_ditangan'));
                        else
                                $bank_account = Mt::get_act_code_from_bank_act(Mt::get_prefs('akun_kas_dibank'));
                        // void gl
                        // debit penjualan , kredit kas
                        Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                                $bank_account,
                                "VOID Pengembalian Kendaraan $docref",
                                -$model->pelunasan, $user,
                                $model->idPinjam->id_mobil);
                        Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                                Mt::get_prefs('akun_uang_muka'),
                                "VOID Pengembalian Kendaraan $docref",
                                -$model->dp, $user, $model->idPinjam->id_mobil);
                        Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                                Mt::get_prefs('akun_pendapatan_sewa'),
                                "VOID Pengembalian Kendaraan $docref",
                                $model->total, $user, $model->idPinjam->id_mobil);
                        if ($model->disc > 0) {
                            Mt::add_gl(VOID, $void->id_voided, $date, $docref,
                                    Mt::get_prefs('akun_diskon'),
                                    "VOID Pengembalian Kendaraan $docref",
                                    -$model->disc, $user,
                                    $model->idPinjam->id_mobil);
                        }
                    }
                    $pinjam = $this->loadModel($model->id_pinjam,
                            'MtPinjamKendaraan');
                    $pinjam->is_back = 0;
                    $pinjam->id_driver = null;
                    $pinjam->save();
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
     * public function actionAdmin() { $dataProvider = new CActiveDataProvider('MtKembaliKendaraan'); $this->render('index', array( 'dataProvider' => $dataProvider, )); }
     */
    public function actionAdmin() {
        $model = new MtKembaliKendaraan('search');
        $model->unsetAttributes();
        if (isset($_GET['MtKembaliKendaraan']))
                $model->attributes = $_GET['MtKembaliKendaraan'];
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
        $void = Mt::get_voided(KEMBALI_KENDARAAN);
        $criteria = new CDbCriteria();
        $param = array();
        $criteria = new CDbCriteria();
        if (isset($_POST['doc_ref_kembali'])) {
            $criteria->addCondition("doc_ref_kembali like :doc_ref_kembali");
            $param[':doc_ref_kembali'] = "%" . $_POST['doc_ref_kembali'] . "%";
        }
        $criteria->addNotInCondition('id_kembali', $void);
        $criteria->limit = $limit;
        $criteria->offset = $start;
        $criteria->params = $param;
        $model = MtKembaliKendaraan::model()->findAll($criteria);
        $total = MtKembaliKendaraan::model()->count($criteria);
        $this->renderJson($model, $total);        
    }
    private function otherDiffDate($begin, $end, $out_in_array = false) {
        $intervalo = date_diff(date_create($begin), date_create($end));
        $out = $intervalo->format("Years:%Y,Months:%M,Days:%d,Hours:%H,Minutes:%i,Seconds:%s");
        if (!$out_in_array) return $out;
        $a_out = array();
        $explode = explode(',', $out);
        array_walk($explode,
                function ($val, $key) use(&$a_out) {
                    $v = explode(':', $val);
                    $a_out[$v[0]] = $v[1];
                });
        return $a_out;
    }
    public function actionPrint($id) {
        if (Yii::app()->request->isAjaxRequest) return;
//        if (isset($_POST) && !empty($_POST)) {
        $pinjam = $this->loadModel($id, 'MtKembaliKendaraan');
//        $pinjam = new MtKembaliKendaraan;
        $image = dirname(Yii::app()->getBasePath()) . '/images/mahkotrans.png';
        $start = 1;
        $file_name = 'KembaliKendaraan' . $pinjam->doc_ref_kembali;
        $worksheet_name = 'Kembali Kendaraan ' . $pinjam->doc_ref_kembali;
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
                setCellValue("A$start", "PENGEMBALIAN KENDARAAN")
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start")->getFont()->setSize(12);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nomor Sewa / Kembali")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->doc_ref . " / " . $pinjam->doc_ref_kembali)
                ->setCellValue("D$start", "Tanggal")->setCellValue("E$start",
                ": " . $pinjam->trans_date);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nama Konsumen")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->idPelanggan->nama)
                ->setCellValue("D$start", "Kelompok Konsumen")->setCellValue("E$start",
                ": " . $pinjam->idPinjam->idKelompok->nama);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Tanda Pengenal")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->tanda_pengenal)
                ->setCellValue("D$start", "No. Identitas")->setCellValue("E$start",
                ": " . $pinjam->idPinjam->no_identitas);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Jaminan")->mergeCells("B$start:G$start")->setCellValue("B$start",
                ": " . $pinjam->idPinjam->jaminan . ", " . $pinjam->idPinjam->jaminan_desc);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Rencana Kembali")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->tgl_rencana_kembali)
                ->setCellValue("D$start", "Kembali")->setCellValue("E$start",
                ": " . $pinjam->tgl_kembali);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nopol / Jenis Mobil")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->idMobil->nopol . " / " . $pinjam->idPinjam->idMobil->jenis)
                ->setCellValue("D$start", "Season")->setCellValue("E$start",
                $pinjam->idPinjam->season == 0 ? ": Low" : ": High");
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
                ->setCellValue("B$start", "Extend Per Bulan")
                ->setCellValue("C$start", $pinjam->extend_bln)->setCellValue("D$start",
                        $pinjam->idPinjam->trf_bulan)
                ->setCellValue("G$start",
                        $pinjam->extend_bln * $pinjam->idPinjam->trf_bulan);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $pinjam->extend_hari)
                ->setCellValue("B$start", "Extend Per Hari")
                ->setCellValue("D$start", $pinjam->idPinjam->trf_hari)
                ->setCellValue("G$start",
                        $pinjam->extend_hari * $pinjam->idPinjam->trf_hari);
        $start++;
        $extend_jam = $pinjam->extend_jam > 0 ? 1 : 0;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $extend_jam)
                ->setCellValue("B$start", "Extend Per 12 Jam")
                ->setCellValue("D$start", $pinjam->idPinjam->trf_jam)
                ->setCellValue("G$start",
                        $extend_jam * $pinjam->idPinjam->trf_jam);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $pinjam->overtime_jam)
                ->setCellValue("B$start", "Overtime Per Jam")
                ->setCellValue("D$start", $pinjam->idPinjam->trf_over_persen)
                ->setCellValue("G$start",
                        $pinjam->overtime_jam * $pinjam->idPinjam->trf_over_persen);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:B$start")->setCellValue("A$start",
                "Lembar 1 : Untuk Konsumen")->setCellValue("C$start",
                "Total Extend")->setCellValue("G$start", $pinjam->ongkos_extend);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
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
                ->setCellValue("G$start", $pinjam->idPinjam->dp);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        "Pelunasan")
                ->setCellValue("G$start", $pinjam->pelunasan);
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
                setCellValue("A$start", "  ")->getStyle("A$start")->getFont()->setSize(16)->
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
                setCellValue("A$start", "PENGEMBALIAN KENDARAAN")
                ->getStyle("A$start")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start")->getFont()->setSize(12);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nomor Sewa / Kembali")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->doc_ref . " / " . $pinjam->doc_ref_kembali)
                ->setCellValue("D$start", "Tanggal")->setCellValue("E$start",
                ": " . $pinjam->trans_date);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nama Konsumen")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->idPelanggan->nama)
                ->setCellValue("D$start", "Kelompok Konsumen")->setCellValue("E$start",
                ": " . $pinjam->idPinjam->idKelompok->nama);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Tanda Pengenal")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->tanda_pengenal)
                ->setCellValue("D$start", "No. Identitas")->setCellValue("E$start",
                ": " . $pinjam->idPinjam->no_identitas);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Jaminan")->mergeCells("B$start:G$start")->setCellValue("B$start",
                ": " . $pinjam->idPinjam->jaminan . ", " . $pinjam->idPinjam->jaminan_desc);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Rencana Kembali")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->tgl_rencana_kembali)
                ->setCellValue("D$start", "Kembali")->setCellValue("E$start",
                ": " . $pinjam->tgl_kembali);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        "Nopol / Jenis Mobil")->setCellValue("B$start",
                        ": " . $pinjam->idPinjam->idMobil->nopol . " / " . $pinjam->idPinjam->idMobil->jenis)
                ->setCellValue("D$start", "Season")->setCellValue("E$start",
                $pinjam->idPinjam->season == 0 ? ": Low" : ": High");
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
                ->setCellValue("B$start", "Extend Per Bulan")
                ->setCellValue("C$start", $pinjam->extend_bln)->setCellValue("D$start",
                        $pinjam->idPinjam->trf_bulan)
                ->setCellValue("G$start",
                        $pinjam->extend_bln * $pinjam->idPinjam->trf_bulan);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $pinjam->extend_hari)
                ->setCellValue("B$start", "Extend Per Hari")
                ->setCellValue("D$start", $pinjam->idPinjam->trf_hari)
                ->setCellValue("G$start",
                        $pinjam->extend_hari * $pinjam->idPinjam->trf_hari);
        $start++;
        $extend_jam = $pinjam->extend_jam > 0 ? 1 : 0;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $extend_jam)
                ->setCellValue("B$start", "Extend Per 12 Jam")
                ->setCellValue("D$start", $pinjam->idPinjam->trf_jam)
                ->setCellValue("G$start",
                        $extend_jam * $pinjam->idPinjam->trf_jam);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        $pinjam->overtime_jam)
                ->setCellValue("B$start", "Overtime Per Jam")
                ->setCellValue("D$start", $pinjam->idPinjam->trf_over_persen)
                ->setCellValue("G$start",
                        $pinjam->overtime_jam * $pinjam->idPinjam->trf_over_persen);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start:G$start")->
                applyFromArray($styleArray);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:B$start")->setCellValue("A$start",
                "Lembar 2 : Untuk Arsip")->setCellValue("C$start",
                "Total Extend")->setCellValue("G$start", $pinjam->ongkos_extend);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
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
                ->setCellValue("G$start", $pinjam->idPinjam->dp);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                        "Pelunasan")
                ->setCellValue("G$start", $pinjam->pelunasan);
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
        $mPDF1 = Yii::app()->ePdf->mpdf('', 'A4', 0, '', 5, 5, 6, 0, 0, 0, 'P');
        $objWriter = new PHPExcel_Writer_HTML($objPHPExcel);
        $html = $objWriter->generateStyles(true) . $objWriter->
                        generateSheetData();
        $html = str_replace('.' . $image,
                app()->getBaseUrl(true) . '/images/mahkotrans.png', $html);
        $mPDF1->WriteHTML($html);
        $mPDF1->Output($file_name, 'D');
        Yii::app()->end();
    }
}