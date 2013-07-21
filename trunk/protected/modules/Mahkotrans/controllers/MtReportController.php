<?php
/**
 * Created by novebeta.
 * Date: 10/2/12
 * Time: 10:29 AM
 */
class MtReportController extends GxController {
    protected function footer($objPHPExcel, $start, $file_name, $format,
            $html_title) {
        $start++;
        $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start",
                        "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " .
                        get_time_now());
        ob_end_clean();
        ob_start();
        if ($format == 'excel') {
            header('Content-Type: application/vnd.ms-excel');
            header("Content-Disposition: attachment;filename=$file_name.xls");
            header('Cache-Control: max-age=0');
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
            $objWriter->save('php://output');
        } else {
            $objPHPExcel->getActiveSheet()->setShowGridlines(false);
            $mPDF1 = Yii::app()->ePdf->mpdf();
            $mPDF1 = Yii::app()->ePdf->mpdf('', 'A4');
            $objWriter = new PHPExcel_Writer_HTML($objPHPExcel);
            $header = $objWriter->generateHTMLHeader(true);
            $header = str_replace("<body>", "<body onload='window.print();'>",
                    $header);
            $header = str_replace("Untitled Spreadsheet", $html_title, $header);
            $html = $header . $objWriter->generateStyles(true) . $objWriter->
                            generateSheetData() . $objWriter->generateHTMLFooter();
            if ($format == 'pdf') {
                $mPDF1->WriteHTML($html);
                $mPDF1->Output('MutasiKasDitangan.pdf', 'D');
            } else {
                echo $html;
            }
        }
    }
    protected function header(&$objPHPExcel, &$start, $worksheet_name,
            $report_title) {
        $objPHPExcel->getDefaultStyle()->getFont()->setSize(10);
        $objPHPExcel->setActiveSheetIndex(0)->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::
                PAPERSIZE_A4);
        $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
        $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", $report_title)->getStyle("A$start")->getFont()->setSize(18)->
                setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                setCellValue("A$start", "MAHKOTRANS")->getStyle("A$start")->getFont()->setSize(14)->
                setBold(true);
        $start++;
        $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
    }
    public function actionMutasiKasPerBank() {
        if (Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $bank = $this->loadModel($_POST['bank_act'], 'MtBankAccounts');
            $nama_bank = $bank->bank_account_name;
            $start = 1;
            $file_name = 'MutasiKasPerBank';
            $worksheet_name = 'Mutasi Kas Per Bank';
            $objPHPExcel = new PHPExcel();
            $this->header($objPHPExcel, $start, $worksheet_name,
                    "MUTASI KAS PER BANK");
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:F$start")->
                    setCellValue("A$start", "Kas/Bank : " . $nama_bank)->getStyle("A$start")->getFont()->
                    setSize(12)->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:F$start")->
                    setCellValue("A$start",
                            "Dari tanggal " . sql2long_date($start_date) .
                            " sampai tanggal " . sql2long_date($end_date))->getStyle("A$start")->getFont()->
                    setSize(12)->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Type")->setCellValue("B$start",
                            "Ref. Dokumen")->setCellValue("C$start", "Tanggal")->setCellValue("D$start",
                            "Debit")->setCellValue("E$start", "Kredit")->setCellValue("F$start",
                            "Saldo")->getStyle("A$start:F$start")
                    ->getFont()->setBold(true);
            $start++;
            $arr = Mt::get_bank_trans_view();
            foreach ($arr['data'] as $row) {
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                                $row['type'])->
                        setCellValue("B$start", $row['ref'])->setCellValue("C$start",
                                sql2date($row['tgl']))->
                        setCellValue("D$start", $row['debit'])->setCellValue("E$start",
                                $row['kredit'])->
                        setCellValue("F$start", $row['neraca']);
                $start++;
            }
            $end_body = $start - 1;
            $styleArray = array('borders' => array('allborders' => array('style' =>
                        PHPExcel_Style_Border::BORDER_THIN)));
            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:F$end_body")->
                    applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("D$start_row:F$end_body")->
                        getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
            } else {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("D$start_body:F$end_body")->
                        getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("E")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("F")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format,
                    "Mutasi Kas Per Bank");
            Yii::app()->end();
        }
    }
    public function actionPenjualanPerMobil() {
        if (Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $id_mobil = $_POST['id_mobil'];
            $mobil = $this->loadModel($id_mobil, 'MtMobil');
            $nopol = $mobil->nopol;
            $start = 1;
            $file_name = 'PenjualanPerMobil';
            $worksheet_name = 'Penjualan per Mobil';
            $objPHPExcel = new PHPExcel();
            $this->header($objPHPExcel, $start, $worksheet_name,
                    "PENJUALAN PER MOBIL");
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                    setCellValue("A$start", "Nopol " . $nopol)->getStyle("A$start")->getFont()->
                    setSize(12)->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                    setCellValue("A$start",
                            "Dari tanggal " . sql2long_date($start_date) .
                            " sampai tanggal " . sql2long_date($end_date))->getStyle("A$start")->getFont()->
                    setSize(12)->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    "Tanggal Transaksi")->setCellValue("B$start", "Ref. Dokumen")->setCellValue("C$start",
                    "Total Ongkos Sewa")->setCellValue("D$start", "Diskon")->setCellValue("E$start",
                    "Netto")->getStyle("A$start:E$start")->getFont()->setBold(true);
            $start++;
            $rows = Mt::get_lap_penjualam_per_mobil($id_mobil, $start_date,
                            $end_date);
            $total = $total_disk = $total_netto = 0;
            //            $total_persen = 0;
            foreach ($rows as $row) {
                //                $total_persen += $row['total_beban'] / $total;
                //                $total_beban = $format == 'excel' ? $row['total_beban'] : acc_format($row['total_beban']);
                //                $persen =
                //                        $format == 'excel' ? $row['total_beban'] / $total : percent_format($row['total_beban'] / $total,
                //                                2);
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                                sql2date($row['trans_date']))->
                        setCellValue("B$start", $row['doc_ref'])->setCellValue("C$start",
                        $format ==
                        'excel' ? $row['total'] : number_format($row['total']))->setCellValue("D$start",
                        $format == 'excel' ? $row['disc'] : number_format($row['disc']))->setCellValue("E$start",
                        $format == 'excel' ? $row['netto'] : number_format($row['netto']));
                $total += $row['total'];
                $total_disk += $row['disc'];
                $total_netto += $row['netto'];
                $start++;
            }
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start",
                            'Total')->
                    setCellValue("C$start",
                            $format == 'excel' ? $total : number_format($total))->
                    setCellValue("D$start",
                            $format == 'excel' ? $total_disk : number_format($total_disk))->
                    setCellValue("E$start",
                            $format == 'excel' ? $total_netto : number_format($total_netto));
            $start++;
            $end_body = $start - 1;
            $styleArray = array('borders' => array('allborders' => array('style' =>
                        PHPExcel_Style_Border::BORDER_THIN)));
            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:E$end_body")->
                    applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_row:E$end_body")->
                        getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
            } else {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_body:E$end_body")->
                        getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("E")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format,
                    "Penjualan per Mobil");
            Yii::app()->end();
        }
    }
    public function actionPenjualanPerKelompokKonsumen() {
        if (Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $id_kelompok = $_POST['id_kelompok'];
            $kelompok = $this->loadModel($id_kelompok, 'MtKelompokPelanggan');
            $nama = $kelompok->nama;
            $start = 1;
            $file_name = 'PenjualanPerKelompokKonsumen';
            $worksheet_name = 'Penjualan per Kelompok Konsumen';
            $objPHPExcel = new PHPExcel();
            $this->header($objPHPExcel, $start, $worksheet_name,
                    "PENJUALAN PER KELOMPOK KONSUMEN");
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                    setCellValue("A$start", "Kelompok konsumen " . $nama)->getStyle("A$start")->
                    getFont()->setSize(12)->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->
                    setCellValue("A$start",
                            "Dari tanggal " . sql2long_date($start_date) .
                            " sampai tanggal " . sql2long_date($end_date))->getStyle("A$start")->getFont()->
                    setSize(12)->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    "Tanggal Transaksi")->setCellValue("B$start", "Ref. Dokumen")->setCellValue("C$start",
                    "Total Ongkos Sewa")->setCellValue("D$start", "Diskon")->setCellValue("E$start",
                    "Netto")->getStyle("A$start:E$start")->getFont()->setBold(true);
            $start++;
            $rows = Mt::get_lap_penjualam_per_kelompok_konsumen($id_kelompok,
                            $start_date, $end_date);
            $total = $total_disk = $total_netto = 0;
            //            $total_persen = 0;
            foreach ($rows as $row) {
                //                $total_persen += $row['total_beban'] / $total;
                //                $total_beban = $format == 'excel' ? $row['total_beban'] : acc_format($row['total_beban']);
                //                $persen =
                //                        $format == 'excel' ? $row['total_beban'] / $total : percent_format($row['total_beban'] / $total,
                //                                2);
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                                sql2date($row['trans_date']))->
                        setCellValue("B$start", $row['doc_ref'])->setCellValue("C$start",
                        $format ==
                        'excel' ? $row['total'] : number_format($row['total']))->setCellValue("D$start",
                        $format == 'excel' ? $row['disc'] : number_format($row['disc']))->setCellValue("E$start",
                        $format == 'excel' ? $row['netto'] : number_format($row['netto']));
                $total += $row['total'];
                $total_disk += $row['disc'];
                $total_netto += $row['netto'];
                $start++;
            }
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start",
                            'Total')->
                    setCellValue("C$start",
                            $format == 'excel' ? $total : number_format($total))->
                    setCellValue("D$start",
                            $format == 'excel' ? $total_disk : number_format($total_disk))->
                    setCellValue("E$start",
                            $format == 'excel' ? $total_netto : number_format($total_netto));
            $start++;
            $end_body = $start - 1;
            $styleArray = array('borders' => array('allborders' => array('style' =>
                        PHPExcel_Style_Border::BORDER_THIN)));
            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:E$end_body")->
                    applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_row:E$end_body")->
                        getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
            } else {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_body:E$end_body")->
                        getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("E")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format,
                    "Penjualan per Kelompok Konsumen");
            Yii::app()->end();
        }
    }
    public function actionLabaRugiPerMobil() {
        if (Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $is_excel = $format == 'excel';
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $id_mobil = $_POST['id_mobil'];
            $mobil = $this->loadModel($id_mobil, 'MtMobil');
            $nopol = $mobil->nopol;
            $start = 1;
            $file_name = 'LabaRugiMobil';
            $worksheet_name = 'Laba Rugi per Mobil';
            $objPHPExcel = new PHPExcel();
            $this->header($objPHPExcel, $start, $worksheet_name,
                    "LABA RUGI PER MOBIL");
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:C$start")->
                    setCellValue("A$start", "Nopol " . $nopol)->getStyle("A$start")->getFont()->
                    setSize(12)->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:C$start")->
                    setCellValue("A$start",
                            "Dari tanggal " . sql2long_date($start_date) .
                            " sampai tanggal " . sql2long_date($end_date))->getStyle("A$start")->getFont()->
                    setSize(12)->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            // 4100 Pendapatan Sewa
            $pen_sewa = $this->loadModel('4100', 'MtChartMaster');
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_sewa->account_name);
            $tot_pen_sewa = -Mt::get_sum_account_trans($pen_sewa->account_code,
                            $mobil->id_mobil, $start_date, $end_date);
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start",
                    $is_excel ? $tot_pen_sewa : number_format($tot_pen_sewa));
            $start++;
            // 4200 Potongan atau Diskon
            $pen_diskon = $this->loadModel('4200', 'MtChartMaster');
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_diskon->account_name);
            $tot_pen_diskon = -Mt::get_sum_account_trans($pen_diskon->account_code,
                            $mobil->id_mobil, $start_date, $end_date);
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start",
                    $is_excel ? $tot_pen_diskon : number_format($tot_pen_diskon));
            $start++;
            // Netto
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_sewa->account_name . ' (Netto)');
            $tot_pen_sewa_netto = $tot_pen_sewa - $tot_pen_diskon;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                    $is_excel ? $tot_pen_sewa_netto : number_format($tot_pen_sewa_netto));
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    '                                       ');
            $start++;
            // 4300 Pendapatan Denda
            $pen_denda = $this->loadModel('4300', 'MtChartMaster');
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_denda->account_name);
            $tot_pen_denda = -Mt::get_sum_account_trans($pen_denda->account_code,
                            $mobil->id_mobil, $start_date, $end_date);
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                    $is_excel ? $tot_pen_denda : number_format($tot_pen_denda));
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    'Beban-beban Terkait');
            $start++;
            $acc_beban = Mt::get_beban_per_mobil();
            $total_beban_terkait = 0;
            foreach ($acc_beban as $row) {
                $beban = $this->loadModel($row['account_code'], 'MtChartMaster');
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        '   ---   ' . $beban->account_name);
                $tot_beban = -Mt::get_sum_account_trans($beban->account_code,
                                $mobil->id_mobil, $start_date, $end_date);
                $total_beban_terkait += $tot_beban;
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start",
                        $is_excel ? $tot_beban : number_format($tot_beban));
                $start++;
            }
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    '   ---   Total')->setCellValue("C$start",
                    $is_excel ? $total_beban_terkait : number_format($total_beban_terkait));
            $start++;
            $total = $tot_pen_sewa_netto + $tot_pen_denda - $total_beban_terkait;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    'Laba per Mobil')->setCellValue("C$start",
                    $is_excel ? $total : number_format($total));
            $start++;
            $end_body = $start - 1;
            $styleArray = array('borders' => array('allborders' => array('style' =>
                        PHPExcel_Style_Border::BORDER_THIN)));
            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:C$end_body")->
                    applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($is_excel) {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("B$start_body:C$end_body")->
                        getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
            } else {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("B$start_body:C$end_body")->
                        getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format,
                    $worksheet_name);
            Yii::app()->end();
        }
    }
    public function actionLabaRugiMahkotrans() {
        if (Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $is_excel = $format == 'excel';
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $start = 1;
            $file_name = 'LabaRugiMahkotrans';
            $worksheet_name = 'Laba Rugi Mahkotrans';
            $objPHPExcel = new PHPExcel();
            $this->header($objPHPExcel, $start, $worksheet_name,
                    "LABA RUGI");
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:C$start")->
                    setCellValue("A$start",
                            "Dari tanggal " . sql2long_date($start_date) .
                            " sampai tanggal " . sql2long_date($end_date))->getStyle("A$start")->getFont()->
                    setSize(12)->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            // 4100 Pendapatan Sewa
            $pen_sewa = $this->loadModel('4100', 'MtChartMaster');
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_sewa->account_name);
            $tot_pen_sewa = -Mt::get_sum_account_trans($pen_sewa->account_code,
                            NULL, $start_date, $end_date);
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start",
                    $is_excel ? $tot_pen_sewa : number_format($tot_pen_sewa));
            $start++;
            // 4200 Potongan atau Diskon
            $pen_diskon = $this->loadModel('4200', 'MtChartMaster');
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_diskon->account_name);
            $tot_pen_diskon = -Mt::get_sum_account_trans($pen_diskon->account_code,
                            NULL, $start_date, $end_date);
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start",
                    $is_excel ? $tot_pen_diskon : number_format($tot_pen_diskon));
            $start++;
            // Netto
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_sewa->account_name . ' (Netto)');
            $tot_pen_sewa_netto = $tot_pen_sewa - $tot_pen_diskon;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                    $is_excel ? $tot_pen_sewa_netto : number_format($tot_pen_sewa_netto));
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    '                                       ');
            $start++;
            // 4300 Pendapatan Denda
            $pen_denda = $this->loadModel('4300', 'MtChartMaster');
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_denda->account_name);
            $tot_pen_denda = -Mt::get_sum_account_trans($pen_denda->account_code,
                            NULL, $start_date, $end_date);
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                    $is_excel ? $tot_pen_denda : number_format($tot_pen_denda));
            $start++;
            // 4400 Pendapatan Lain-lain
            $pen_lain = $this->loadModel('4400', 'MtChartMaster');
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    $pen_lain->account_name);
            $tot_pen_lain = -Mt::get_sum_account_trans($pen_lain->account_code,
                            NULL, $start_date, $end_date);
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("C$start",
                    $is_excel ? $tot_pen_lain : number_format($tot_pen_lain));
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    'Beban-beban Terkait');
            $start++;
            $acc_beban = Mt::get_beban();
            $total_beban_terkait = 0;
            foreach ($acc_beban as $row) {
                $beban = $this->loadModel($row['account_code'], 'MtChartMaster');
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                        '   ---   ' . $beban->account_name);
                $tot_beban = -Mt::get_sum_account_trans($beban->account_code,
                                NULL, $start_date, $end_date);
                $total_beban_terkait += $tot_beban;
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start",
                        $is_excel ? $tot_beban : number_format($tot_beban));
                $start++;
            }
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    '   ---   Total')->setCellValue("C$start",
                    $is_excel ? $total_beban_terkait : number_format($total_beban_terkait));
            $start++;
            $total = $tot_pen_sewa_netto + $tot_pen_denda + $tot_pen_lain - $total_beban_terkait;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                    'Laba')->setCellValue("C$start",
                    $is_excel ? $total : number_format($total));
            $start++;
            $end_body = $start - 1;
            $styleArray = array('borders' => array('allborders' => array('style' =>
                        PHPExcel_Style_Border::BORDER_THIN)));
            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:C$end_body")->
                    applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($is_excel) {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("B$start_body:C$end_body")->
                        getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
            } else {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("B$start_body:C$end_body")->
                        getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format,
                    $worksheet_name);
            Yii::app()->end();
        }
    }
}
