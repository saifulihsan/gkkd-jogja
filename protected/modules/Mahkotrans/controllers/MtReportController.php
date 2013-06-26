<?php

/**
 * Created by novebeta.
 * Date: 10/2/12
 * Time: 10:29 AM
 */
class MtReportController extends GxController {

    protected function footer($objPHPExcel, $start, $file_name, $format, $html_title) {
        $start++;
        $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                ->setCellValue("A$start",
                        "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
            $header = str_replace("<body>", "<body onload='window.print();'>", $header);
            $header = str_replace("Untitled Spreadsheet", $html_title, $header);
            $html = $header . $objWriter->generateStyles(true) . $objWriter->generateSheetData() .
                    $objWriter->generateHTMLFooter();
            if ($format == 'pdf') {
                $mPDF1->WriteHTML($html);
                $mPDF1->Output('MutasiKasDitangan.pdf', 'D');
            } else {
                echo $html;
            }
        }
    }

    protected function header(&$objPHPExcel, &$start, $worksheet_name, $report_title) {
        $objPHPExcel->getDefaultStyle()->getFont()->setSize(10);
        $objPHPExcel->setActiveSheetIndex(0)->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
        $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
        $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")->setCellValue("A$start",
                        $report_title)
                ->getStyle("A$start")->getFont()->setSize(18)->setBold(true);
        $start++;
        $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "MAHKOTRANS")->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
        $start++;
        $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
    }

    public function actionMutasiKasDiTangan() {
        if (Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $start = 1;
            $file_name = 'MutasiKas';
            $worksheet_name = 'Mutasi Kas';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)->getPageSetup()
                    ->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start", "MUTASI KAS DI TANGAN")->getStyle("A$start")->getFont()->setSize(18)
                    ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start", "PONDOK ASUH HARAPAN")->getStyle("A$start")->getFont()->setSize(14)
                    ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start",
                            "PERIODE: " . sql2long_date($start_date) . " - " . sql2long_date($end_date))
                    ->getStyle("A$start")->getFont()->setSize(12)->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Doc. Ref")
                    ->setCellValue("B$start", "Tanggal")->setCellValue("C$start", "Payee/Payor")
                    ->setCellValue("D$start", "Nama Rekening")->setCellValue("E$start", "Kas Masuk")
                    ->setCellValue("F$start", "Kas Keluar")->setCellValue("G$start", "Saldo Kas")
                    ->getStyle("A$start:G$start")->getFont()->setBold(true);
            $start++;
            $rows = Mt::get_mutasi_kas_ditangan($start_date, $end_date);
            $nomer = 1;
            $saldo = 0;
            foreach ($rows as $row) {
                $saldo += $row['saldo'];
//                $kas_masuk = $row['kas_masuk'] == 0 ? '' : ($format == 'excel' ? $row['kas_masuk'] : number_format($row['kas_masuk']));
//                $kas_keluar = $row['kas_keluar'] == 0 ? '' : ($format == 'excel' ? -$row['kas_keluar'] : number_format(-$row['kas_keluar']));
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", $nomer)
                        ->setCellValue("B$start", sql2date($row['trans_date']))
                        ->setCellValue("C$start",
                                Mt::get_payee_payoor($row['type'], $row['trans_no']))
                        ->setCellValue("D$start", $row['nama_rekening'])->setCellValue("E$start",
                                $kas_masuk)
                        ->setCellValue("F$start", $kas_keluar)
                        ->setCellValue("G$start",
                                $format == 'excel' ? $saldo : number_format($saldo));
                $nomer++;
                $start++;
            }
            $end_body = $start - 1;
            $styleArray =
                    array('borders' => array('allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN)));
            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:G$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("E$start_row:G$end_body")->getNumberFormat()
                        ->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
            } else {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("E$start_body:G$end_body")->getAlignment()
                        ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("E")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("F")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("G")->setAutoSize(true);
            $start++;
            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start",
                            "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $header = str_replace("<body>", "<body onload='window.print();'>", $header);
                $header = str_replace("Untitled Spreadsheet", "Mutasi Kas di Tangan", $header);
                $html = $header . $objWriter->generateStyles(true) . $objWriter->generateSheetData() .
                        $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output('MutasiKasDitangan.pdf', 'D');
                } else {
                    echo $html;
                }
            }
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
            $this->header($objPHPExcel, $start, $worksheet_name, "PENJUALAN PER MOBIL");
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start", "Nopol " . $nopol)
                    ->getStyle("A$start")->getFont()->setSize(12)->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start",
                            "Dari tanggal " . sql2long_date($start_date) . " sampai tanggal " . sql2long_date($end_date))
                    ->getStyle("A$start")->getFont()->setSize(12)->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Tanggal Transaksi")
                    ->setCellValue("B$start", "Ref. Dokumen")->setCellValue("C$start",
                            "Total Ongkos Sewa")
                    ->setCellValue("D$start", "Diskon")->setCellValue("E$start", "Netto")
                    ->getStyle("A$start:E$start")
                    ->getFont()->setBold(true);
            $start++;
            $rows = Mt::get_lap_penjualam_per_mobil($id_mobil, $start_date, $end_date);
            $total = $total_disk = $total_netto = 0;
//            $total_persen = 0;
            foreach ($rows as $row) {
//                $total_persen += $row['total_beban'] / $total;
//                $total_beban = $format == 'excel' ? $row['total_beban'] : acc_format($row['total_beban']);
//                $persen =
//                        $format == 'excel' ? $row['total_beban'] / $total : percent_format($row['total_beban'] / $total,
//                                2);
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                                sql2date($row['trans_date']))
                        ->setCellValue("B$start", $row['doc_ref'])
                        ->setCellValue("C$start",
                                $format == 'excel' ? $row['total'] : number_format($row['total']))
                        ->setCellValue("D$start",
                                $format == 'excel' ? $row['disc'] : number_format($row['disc']))
                        ->setCellValue("E$start",
                                $format == 'excel' ? $row['netto'] : number_format($row['netto']));
                $total += $row['total'];
                $total_disk += $row['disc'];
                $total_netto += $row['netto'];
                $start++;
            }
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start", 'Total')
                    ->setCellValue("C$start", $format == 'excel' ? $total : number_format($total))
                    ->setCellValue("D$start",
                            $format == 'excel' ? $total_disk : number_format($total_disk))
                    ->setCellValue("E$start",
                            $format == 'excel' ? $total_netto : number_format($total_netto));
            $start++;
            $end_body = $start - 1;
            $styleArray =
                    array('borders' => array('allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN)));
            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:E$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_row:E$end_body")->getNumberFormat()
                        ->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
            } else {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_body:E$end_body")->getAlignment()
                        ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("E")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format, "Penjualan per Mobil");
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
            $this->header($objPHPExcel, $start, $worksheet_name, "PENJUALAN PER KELOMPOK KONSUMEN");
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start", "Kelompok konsumen " . $nama)
                    ->getStyle("A$start")->getFont()->setSize(12)->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
                    ->setCellValue("A$start",
                            "Dari tanggal " . sql2long_date($start_date) . " sampai tanggal " . sql2long_date($end_date))
                    ->getStyle("A$start")->getFont()->setSize(12)->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Tanggal Transaksi")
                    ->setCellValue("B$start", "Ref. Dokumen")->setCellValue("C$start",
                            "Total Ongkos Sewa")
                    ->setCellValue("D$start", "Diskon")->setCellValue("E$start", "Netto")
                    ->getStyle("A$start:E$start")
                    ->getFont()->setBold(true);
            $start++;
            $rows = Mt::get_lap_penjualam_per_kelompok_konsumen($id_kelompok, $start_date, $end_date);
            $total = $total_disk = $total_netto = 0;
//            $total_persen = 0;
            foreach ($rows as $row) {
//                $total_persen += $row['total_beban'] / $total;
//                $total_beban = $format == 'excel' ? $row['total_beban'] : acc_format($row['total_beban']);
//                $persen =
//                        $format == 'excel' ? $row['total_beban'] / $total : percent_format($row['total_beban'] / $total,
//                                2);
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start",
                                sql2date($row['trans_date']))
                        ->setCellValue("B$start", $row['doc_ref'])
                        ->setCellValue("C$start",
                                $format == 'excel' ? $row['total'] : number_format($row['total']))
                        ->setCellValue("D$start",
                                $format == 'excel' ? $row['disc'] : number_format($row['disc']))
                        ->setCellValue("E$start",
                                $format == 'excel' ? $row['netto'] : number_format($row['netto']));
                $total += $row['total'];
                $total_disk += $row['disc'];
                $total_netto += $row['netto'];
                $start++;
            }
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B$start", 'Total')
                    ->setCellValue("C$start", $format == 'excel' ? $total : number_format($total))
                    ->setCellValue("D$start",
                            $format == 'excel' ? $total_disk : number_format($total_disk))
                    ->setCellValue("E$start",
                            $format == 'excel' ? $total_netto : number_format($total_netto));
            $start++;
            $end_body = $start - 1;
            $styleArray =
                    array('borders' => array('allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN)));
            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:E$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_row:E$end_body")->getNumberFormat()
                        ->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
            } else {
                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_body:E$end_body")->getAlignment()
                        ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("E")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format, "Penjualan per Kelompok Konsumen");
            Yii::app()->end();
        }
    }

    public function actionLabaRugiPerMobil() {
        if (Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $start = 1;
            $file_name = 'PenjualanPerMobil';
            $worksheet_name = 'Penjualan per Mobil';
            $objPHPExcel = new PHPExcel();
            $this->header($objPHPExcel, $start, $worksheet_name, "PENJUALAN PER MOBIL");
//            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
//                    ->setCellValue("A$start",
//                            "PERIODE: " . sql2long_date($start_date) . " - " . sql2long_date($end_date))
//                    ->getStyle("A$start")->getFont()->setSize(12)->setBold(true);
//            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
//            $start++;
//            $start++;
//            $start_body = $start;
//            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Nama Rekening")
//                    ->setCellValue("B$start", "Total Beban")->setCellValue("C$start", "%")->getStyle("A$start:C$start")
//                    ->getFont()->setBold(true);
//            $start++;
//            $rows = Pah::get_pengeluaran_per_kode_rekening($start_date, $end_date);
//            $total = Pah::get_total_pengeluaran($start_date, $end_date);
//            $total_persen = 0;
//            foreach ($rows as $row) {
//                $total_persen += $row['total_beban'] / $total;
//                $total_beban = $format == 'excel' ? $row['total_beban'] : acc_format($row['total_beban']);
//                $persen =
//                        $format == 'excel' ? $row['total_beban'] / $total : percent_format($row['total_beban'] / $total,
//                                2);
//                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", $row['nama_rekening'])
//                        ->setCellValue("B$start", $total_beban)->setCellValue("C$start", $persen);
//                $start++;
//            }
//            $total_format = $format == 'excel' ? $total : acc_format($total);
//            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", 'Total')
//                    ->setCellValue("B$start", $total_format)
//                    ->setCellValue("C$start",
//                            $format == 'excel' ? $total_persen : percent_format($total_persen, 2));
//            $start++;
//            $end_body = $start - 1;
//            $styleArray =
//                    array('borders' => array('allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN)));
//            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:C$end_body")->applyFromArray($styleArray);
//            $start_row = $start_body + 1;
//            if ($format == 'excel') {
//                $objPHPExcel->setActiveSheetIndex(0)->getStyle("B$start_row:B$end_body")->getNumberFormat()
//                        ->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
//                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_row:C$end_body")->getNumberFormat()
//                        ->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE_00);
//            } else {
//                $objPHPExcel->setActiveSheetIndex(0)->getStyle("B$start_body:C$end_body")->getAlignment()
//                        ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
//            }
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format, "Penjualan per Mobil");
            Yii::app()->end();
        }
    }

    public function actionLabaRugiMahkotrans() {
        if (Yii::app()->request->isAjaxRequest) return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $start = 1;
            $file_name = 'PenjualanPerMobil';
            $worksheet_name = 'Penjualan per Mobil';
            $objPHPExcel = new PHPExcel();
            $this->header($objPHPExcel, $start, $worksheet_name, "PENJUALAN PER MOBIL");
//            $objPHPExcel->setActiveSheetIndex(0)->mergeCells("A$start:G$start")
//                    ->setCellValue("A$start",
//                            "PERIODE: " . sql2long_date($start_date) . " - " . sql2long_date($end_date))
//                    ->getStyle("A$start")->getFont()->setSize(12)->setBold(true);
//            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
//            $start++;
//            $start++;
//            $start_body = $start;
//            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", "Nama Rekening")
//                    ->setCellValue("B$start", "Total Beban")->setCellValue("C$start", "%")->getStyle("A$start:C$start")
//                    ->getFont()->setBold(true);
//            $start++;
//            $rows = Pah::get_pengeluaran_per_kode_rekening($start_date, $end_date);
//            $total = Pah::get_total_pengeluaran($start_date, $end_date);
//            $total_persen = 0;
//            foreach ($rows as $row) {
//                $total_persen += $row['total_beban'] / $total;
//                $total_beban = $format == 'excel' ? $row['total_beban'] : acc_format($row['total_beban']);
//                $persen =
//                        $format == 'excel' ? $row['total_beban'] / $total : percent_format($row['total_beban'] / $total,
//                                2);
//                $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", $row['nama_rekening'])
//                        ->setCellValue("B$start", $total_beban)->setCellValue("C$start", $persen);
//                $start++;
//            }
//            $total_format = $format == 'excel' ? $total : acc_format($total);
//            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("A$start", 'Total')
//                    ->setCellValue("B$start", $total_format)
//                    ->setCellValue("C$start",
//                            $format == 'excel' ? $total_persen : percent_format($total_persen, 2));
//            $start++;
//            $end_body = $start - 1;
//            $styleArray =
//                    array('borders' => array('allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN)));
//            $objPHPExcel->setActiveSheetIndex(0)->getStyle("A$start_body:C$end_body")->applyFromArray($styleArray);
//            $start_row = $start_body + 1;
//            if ($format == 'excel') {
//                $objPHPExcel->setActiveSheetIndex(0)->getStyle("B$start_row:B$end_body")->getNumberFormat()
//                        ->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_ACCOUNTING);
//                $objPHPExcel->setActiveSheetIndex(0)->getStyle("C$start_row:C$end_body")->getNumberFormat()
//                        ->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE_00);
//            } else {
//                $objPHPExcel->setActiveSheetIndex(0)->getStyle("B$start_body:C$end_body")->getAlignment()
//                        ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
//            }
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
//            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $this->footer($objPHPExcel, $start, $file_name, $format, "Penjualan per Mobil");
            Yii::app()->end();
        }
    }

}

