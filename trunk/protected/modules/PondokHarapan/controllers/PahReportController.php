<?php
/**
 * Created by novebeta.
 * Date: 10/2/12
 * Time: 10:29 AM
 */
class PahReportController extends GxController
{
    public function actionMutasiKasDiTangan()
    {
        if (Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            require_once(Yii::app()->basePath . '/vendors/frontaccounting/ui.inc');
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $start = 1;
            $file_name = 'MutasiKas';
            $worksheet_name = 'Mutasi Kas';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()
                ->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)
                ->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "MUTASI KAS DI TANGAN")
                ->getStyle("A$start")->getFont()->setSize(18)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PONDOK ASUH HARAPAN")
                ->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PERIODE: " . sql2long_date($start_date) . " - " .
                sql2long_date($end_date))
                ->getStyle("A$start")->getFont()->setSize(12)
                ->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue("A$start", "Doc. Ref")
                ->setCellValue("B$start", "Tanggal")
                ->setCellValue("C$start", "Payee/Payor")
                ->setCellValue("D$start", "Nama Rekening")
                ->setCellValue("E$start", "Kas Masuk")
                ->setCellValue("F$start", "Kas Keluar")
                ->setCellValue("G$start", "Saldo Kas")
                ->getStyle("A$start:G$start")->getFont()->setBold(true);
            $start++;
            $rows = Pah::get_mutasi_kas_ditangan($start_date, $end_date);
            $nomer = 1;
            $saldo = 0;
            foreach ($rows as $row) {
                $saldo += $row['saldo'];
//                $kas_masuk = $row['kas_masuk'] == 0 ? '' : ($format == 'excel' ? $row['kas_masuk'] : number_format($row['kas_masuk']));
//                $kas_keluar = $row['kas_keluar'] == 0 ? '' : ($format == 'excel' ? -$row['kas_keluar'] : number_format(-$row['kas_keluar']));
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue("A$start", $nomer)
                    ->setCellValue("B$start", sql2date($row['trans_date']))
                    ->setCellValue("C$start", Pah::get_payee_payoor($row['type'],$row['trans_no']))
                    ->setCellValue("D$start", $row['nama_rekening'])
                    ->setCellValue("E$start", $kas_masuk)
                    ->setCellValue("F$start", $kas_keluar)
                    ->setCellValue("G$start", $format == 'excel' ? $saldo : number_format($saldo));
                $nomer++;
                $start++;
            }
            $end_body = $start - 1;
            $styleArray = array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            $objPHPExcel->setActiveSheetIndex(0)
                ->getStyle("A$start_body:G$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("E$start_row:G$end_body")->getNumberFormat()
                    ->setFormatCode('#,##0');
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("E$start_body:G$end_body")->getAlignment()
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
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $html = $header . $objWriter->generateStyles(true) .
                    $objWriter->generateSheetData() . $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output('MutasiKasDitangan.pdf', 'D');
                } else {
                    echo $html;
                }
//                header('Content-Type: application/pdf');
//                header("Content-Disposition: attachment;filename='$file_name.pdf'");
//                header('Cache-Control: max-age=0');
//                $objPHPExcel->getActiveSheet()->setShowGridlines(false);
//                $rendererName = PHPExcel_Settings::PDF_RENDERER_MPDF;
//                $rendererLibraryPath = Yii::app()->basePath . '/vendors/mpdf';
//                if (!PHPExcel_Settings::setPdfRenderer($rendererName,$rendererLibraryPath)) {
//                    die(
//                        'Please set the $rendererName and $rendererLibraryPath values' .
//                            PHP_EOL .
//                            ' as appropriate for your directory structure'
//                    );
//                }
//
//                $objWriter = new PHPExcel_Writer_PDF($objPHPExcel);
//                $objWriter->save('php://output');
            }
            Yii::app()->end();
        }
    }

    public function actionPengeluaranPerKodeRekening()
    {
        if (Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $start = 1;
            $file_name = 'PengeluaranPerKodeRekening';
            $worksheet_name = 'Pengeluaran';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()
                ->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)
                ->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PENGELUARAN PER KODE REKENING")
                ->getStyle("A$start")->getFont()->setSize(18)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PONDOK ASUH HARAPAN")
                ->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PERIODE: " . sql2long_date($start_date) . " - " .
                sql2long_date($end_date))
                ->getStyle("A$start")->getFont()->setSize(12)
                ->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue("A$start", "Nama Rekening")
                ->setCellValue("B$start", "Total Beban")
                ->getStyle("A$start:B$start")->getFont()->setBold(true);
            $start++;
            $rows = Pah::get_pengeluaran_per_kode_rekening($start_date, $end_date);
            foreach ($rows as $row) {
                $total_beban = $format == 'excel' ? $row['total_beban'] : number_format($row['total_beban']);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue("A$start", $row['nama_rekening'])
                    ->setCellValue("B$start", $total_beban);
                $start++;
            }
            $end_body = $start - 1;
            $styleArray = array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            $objPHPExcel->setActiveSheetIndex(0)
                ->getStyle("A$start_body:B$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_row:B$end_body")->getNumberFormat()
                    ->setFormatCode('#,##0');
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_body:B$end_body")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $start++;
            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $header = str_replace("Untitled Spreadsheet", "Pengeluaran per Kode Rekening", $header);
                $html = $header . $objWriter->generateStyles(true) .
                    $objWriter->generateSheetData() . $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output("$file_name.pdf", 'D');
                } else {
                    echo $html;
                }
            }
            Yii::app()->end();
        }
    }

    public function actionPendapatan()
    {
        if (Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $start = 1;
            $file_name = 'Pendapatan';
            $worksheet_name = 'Pendapatan';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()
                ->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)
                ->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "LAPORAN PENDAPATAN")
                ->getStyle("A$start")->getFont()->setSize(18)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PONDOK ASUH HARAPAN")
                ->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PERIODE: " . sql2long_date($start_date) . " - " .
                sql2long_date($end_date))
                ->getStyle("A$start")->getFont()->setSize(12)
                ->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue("A$start", "Nama Rekening")
                ->setCellValue("B$start", "Total Kas Masuk")
                ->getStyle("A$start:B$start")->getFont()->setBold(true);
            $start++;
            $rows = Pah::get_detil_pendapatan($start_date, $end_date);
            foreach ($rows as $row) {
                $total_pendapatan = $format == 'excel' ? $row['total_pendapatan'] : number_format($row['total_pendapatan']);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue("A$start", $row['nama_rekening'])
                    ->setCellValue("B$start", $total_pendapatan);
                $start++;
            }
            $end_body = $start - 1;
            $styleArray = array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            $objPHPExcel->setActiveSheetIndex(0)
                ->getStyle("A$start_body:B$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_row:B$end_body")->getNumberFormat()
                    ->setFormatCode('#,##0');
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_body:B$end_body")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $start++;
            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $header = str_replace("Untitled Spreadsheet", "Pendapatan", $header);
                $html = $header . $objWriter->generateStyles(true) .
                    $objWriter->generateSheetData() . $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output("$file_name.pdf", 'D');
                } else {
                    echo $html;
                }
            }
            Yii::app()->end();
        }
    }

    public function actionBebanAktivitas()
    {
        if (Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $start = 1;
            $file_name = 'BebanAktivitas';
            $worksheet_name = 'BebanAktivitas';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()
                ->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)
                ->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "LAPORAN BEBAN AKTIVITAS")
                ->getStyle("A$start")->getFont()->setSize(18)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PONDOK ASUH HARAPAN")
                ->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PERIODE: " . sql2long_date($start_date) . " - " .
                sql2long_date($end_date))
                ->getStyle("A$start")->getFont()->setSize(12)
                ->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue("A$start", "Sub Aktivitas")
                ->setCellValue("B$start", "Total Beban")
                ->getStyle("A$start:B$start")->getFont()->setBold(true);
            $start++;
            $rows = Pah::get_beban_aktivitas($start_date, $end_date);
            foreach ($rows as $row) {
                $total_beban = $format == 'excel' ? $row['total_beban'] : number_format($row['total_beban']);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue("A$start", $row['sub_aktivitas'])
                    ->setCellValue("B$start", $total_beban);
                $start++;
            }
            $end_body = $start - 1;
            $styleArray = array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            $objPHPExcel->setActiveSheetIndex(0)
                ->getStyle("A$start_body:B$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_row:B$end_body")->getNumberFormat()
                    ->setFormatCode('#,##0');
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_body:B$end_body")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $start++;
            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $header = str_replace("Untitled Spreadsheet", "Beban Aktivitas", $header);
                $html = $header . $objWriter->generateStyles(true) .
                    $objWriter->generateSheetData() . $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output("$file_name.pdf", 'D');
                } else {
                    echo $html;
                }
            }
            Yii::app()->end();
        }
    }

    public function actionBebanAnak()
    {
        if (Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
            $anak_id = $_POST['pah_member_id'];
            $start = 1;
            $file_name = 'BebanAnak';
            $worksheet_name = 'BebanAnak';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()
                ->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)
                ->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "LAPORAN BEBAN AKTIVITAS PER ANAK")
                ->getStyle("A$start")->getFont()->setSize(18)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PONDOK ASUH HARAPAN")
                ->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PERIODE: " . sql2long_date($start_date) . " - " .
                sql2long_date($end_date))
                ->getStyle("A$start")->getFont()->setSize(12)
                ->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue("A$start", "Nama Anak")
                ->setCellValue("B$start", "Total Pengeluaran")
                ->getStyle("A$start:B$start")->getFont()->setBold(true);
            $start++;
            $rows = Pah::get_beban_anak($start_date, $end_date, $anak_id);
            foreach ($rows as $row) {
                $total_beban = $format == 'excel' ? $row['amount'] : number_format($row['amount']);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue("A$start", $row['real_name'])
                    ->setCellValue("B$start", $total_beban);
                $start++;
            }
            $end_body = $start - 1;
            $styleArray = array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            $objPHPExcel->setActiveSheetIndex(0)
                ->getStyle("A$start_body:B$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_row:B$end_body")->getNumberFormat()
                    ->setFormatCode('#,##0');
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_body:B$end_body")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $start++;
            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $header = str_replace("Untitled Spreadsheet", "Laporan Beban Aktivitas per Anak", $header);
                $html = $header . $objWriter->generateStyles(true) .
                    $objWriter->generateSheetData() . $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output("$file_name.pdf", 'D');
                } else {
                    echo $html;
                }
            }
            Yii::app()->end();
        }
    }

    public function actionTanggungJawab()
    {
        if (Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $bulan = $_POST['periode_bulan'];
            $tahun = $_POST['periode_tahun'];
            $periode = period2date($bulan, $tahun);
            $start_date = $periode['start'];
            $end_date = $periode['end'];
            $start = 1;
            $file_name = 'Pertanggungjawaban';
            $worksheet_name = 'Pertanggungjawaban';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()
                ->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)
                ->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            //$objPHPExcel->setActiveSheetIndex(0)
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "LAPORAN PERTANGGUNGJAWABAN")
                ->getStyle("A$start")->getFont()->setSize(18)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PONDOK ASUH HARAPAN")
                ->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PERIODE: " . date2longperiode($start_date, 'MMMM yyyy'))
                ->getStyle("A$start")->getFont()->setSize(12)
                ->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $saldo_awal_kas = $format == 'excel' ? Pah::get_balance_before_for_bank_account("$tahun-$bulan-02") :
                number_format(Pah::get_balance_before_for_bank_account("$tahun-$bulan-02"));
            $index_kas_masuk = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:C$start")
                ->setCellValue("A$start", "Saldo Kas per " . date2longperiode($start_date, 'd MMMM yyyy'))
                ->setCellValue("D$start", $saldo_awal_kas);
            $start++;
            $total_pendapatan = $format == 'excel' ? Pah::get_total_pendapatan($start_date, $end_date) :
                number_format(Pah::get_total_pendapatan($start_date, $end_date));
            $index_total_pendapatan = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:C$start")
                ->setCellValue("A$start", "Penerimaan")
                ->setCellValue("D$start", $total_pendapatan);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:C$start")
                ->setCellValue("A$start", "Pengeluaran");
            $rows = Pah::get_pengeluaran_per_kode_rekening($start_date, $end_date);
            $start++;
            $total_pengeluaran = 0;
            $start_pengeluaran = $start;
            foreach ($rows as $row) {
                $total_beban = $format == 'excel' ? $row['total_beban'] : number_format($row['total_beban']);
                $total_pengeluaran += $row['total_beban'];
                $objPHPExcel->setActiveSheetIndex(0)
//                    ->setCellValue("A$start", $row['account_code'])
                    ->setCellValue("B$start", $row['account_code'] . " " . $row['nama_rekening'])
                    ->setCellValue("C$start", $total_beban);
                $start++;
            }
            $end_pengeluaran = $start - 1;
            $total_pengeluaran = $format == 'excel' ? $total_pengeluaran :
                number_format($total_pengeluaran);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("B$start:C$start")
                ->setCellValue("B$start", "Total Pengeluaran")
                ->setCellValue("D$start", $total_pengeluaran)
                ->getStyle("B$start:D$start")->getFont()->setBold(true);
            $index_total_pengeluaran = $start;
            $start++;
            $saldo_akhir_kas = $format == 'excel' ? Pah::get_balance_before_for_bank_account("$tahun-" . ($bulan + 1) . "-01") :
                number_format(Pah::get_balance_before_for_bank_account("$tahun-" . ($bulan + 1) . "-01"));
            $index_kas_akhir = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:C$start")
                ->setCellValue("A$start", "Total Kas per " . date2longperiode($end_date, 'dd MMMM yyyy'))
                ->setCellValue("D$start", $saldo_akhir_kas);
            $end_body = $start;
            $start++;
            $styleArray = array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            $objPHPExcel->setActiveSheetIndex(0)
                ->getStyle("A$start_body:D$end_body")->applyFromArray($styleArray);
            $start_row = $start_pengeluaran + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("D$index_kas_masuk")->getNumberFormat()
                    ->setFormatCode('#,##0');
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("D$index_total_pendapatan")->getNumberFormat()
                    ->setFormatCode('#,##0');
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("C$start_pengeluaran:C$end_pengeluaran")->getNumberFormat()
                    ->setFormatCode('#,##0');
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("D$index_total_pengeluaran")->getNumberFormat()
                    ->setFormatCode('#,##0');
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("D$index_kas_akhir")->getNumberFormat()
                    ->setFormatCode('#,##0');
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("D$index_kas_masuk")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("D$index_total_pendapatan")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("C$start_pengeluaran:C$end_pengeluaran")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("D$index_total_pengeluaran")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("D$index_kas_akhir")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setWidth(5);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $start++;
            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $header = str_replace("Untitled Spreadsheet", "Laporan Pertanggungjawaban", $header);
                $html = $header . $objWriter->generateStyles(true) .
                    $objWriter->generateSheetData() . $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output("$file_name.pdf", 'D');
                } else {
                    echo $html;
                }
            }
            Yii::app()->end();
        }
    }

    public function actionAnggaranRealisasi()
    {
        if (Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $bulan = $_POST['periode_bulan'];
            $tahun = $_POST['periode_tahun'];
            $periode = period2date($bulan, $tahun);
            $start_date = $periode['start'];
            $end_date = $periode['end'];
            $start = 1;
            $file_name = 'AnggaranRealisasi';
            $worksheet_name = 'AnggaranRealisasi';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()
                ->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)
                ->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "LAPORAN ANGGARAN VERSUS REALISASI")
                ->getStyle("A$start")->getFont()->setSize(18)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PONDOK ASUH HARAPAN")
                ->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PERIODE: " . date2longperiode($start_date, 'MMMM yyyy'))
                ->getStyle("A$start")->getFont()->setSize(12)
                ->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue("A$start", "Nama Rekening")
                ->setCellValue("B$start", "Anggaran")
                ->setCellValue("C$start", "Realisasi")
                ->setCellValue("D$start", "Selisih")
                ->getStyle("A$start:D$start")->getFont()->setBold(true);
            $start++;
            $rows = Pah::get_chart_master_beban();
            foreach ($rows as $row) {
                $anggaran = Pah::get_anggaran_by_code($bulan, $tahun, $row['account_code']);
                $realisasi = Pah::get_realisasi_by_code($start_date, $end_date, $row['account_code']);
                if ($anggaran == 0 && $realisasi == 0)
                    continue;
                $selisih = $anggaran - $realisasi;
                $anggaran_format = $format == 'excel' ? $anggaran : number_format($anggaran);
                $realisasi_format = $format == 'excel' ? $realisasi : number_format($realisasi);
                $selisih_format = $format == 'excel' ? $selisih : number_format($selisih);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue("A$start", $row['account_name'])
                    ->setCellValue("B$start", $anggaran_format)
                    ->setCellValue("C$start", $realisasi_format)
                    ->setCellValue("D$start", $selisih_format);
                $start++;
            }
            $end_body = $start - 1;
            $styleArray = array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            $objPHPExcel->setActiveSheetIndex(0)
                ->getStyle("A$start_body:D$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_row:D$end_body")->getNumberFormat()
                    ->setFormatCode('#,##0');
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("B$start_body:D$end_body")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $start++;
            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $header = str_replace("Untitled Spreadsheet", "Laporan Beban Aktivitas per Anak", $header);
                $html = $header . $objWriter->generateStyles(true) .
                    $objWriter->generateSheetData() . $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output("$file_name.pdf", 'D');
                } else {
                    echo $html;
                }
            }
            Yii::app()->end();
        }
    }

    public function actionLampiran()
    {
        if (Yii::app()->request->isAjaxRequest)
            return;
        if (isset($_POST) && !empty($_POST)) {
            $format = $_POST['format'];
            $start_date = $_POST['trans_date_mulai'];
            $end_date = $_POST['trans_date_sampai'];
//            $lampiran_id = $_POST['id'];
            $start = 1;
            $file_name = 'Lampiran';
            $worksheet_name = 'Lampiran';
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getDefaultStyle()
                ->getFont()->setSize(10);
            $objPHPExcel->setActiveSheetIndex(0)
                ->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setLeft(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)->getPageMargins()->setRight(0.1 / 2.54);
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "LAMPIRAN DONASI NON TUNAI")
                ->getStyle("A$start")->getFont()->setSize(18)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PONDOK ASUH HARAPAN")
                ->getStyle("A$start")->getFont()->setSize(14)
                ->setBold(true);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "PERIODE: " . sql2long_date($start_date) . " - " .
                sql2long_date($end_date))
                ->getStyle("A$start")->getFont()->setSize(12)
                ->setBold(true);
            $objPHPExcel->getActiveSheet()->setTitle($worksheet_name);
            $start++;
            $start++;
            $start_body = $start;
            $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue("A$start", "No.")
                ->setCellValue("B$start", "Nama Donatur")
                ->setCellValue("C$start", "Keterangan")
                ->setCellValue("D$start", "Satuan")
                ->setCellValue("E$start", "Jumlah")
                ->getStyle("A$start:F$start")->getFont()->setBold(true);
            $start++;
//            $rows = Pah::get_beban_anak($start_date, $end_date, $lampiran_id);
            $criteria = new CDbCriteria();
            $criteria->addBetweenCondition('trans_date',$start_date,$end_date);
            $rows = PahLampiran::model()->findAll($criteria);
            $no = 0;
            foreach ($rows as $row) {
                $no++;
                $total_beban = $format == 'excel' ? $row['qty'] : number_format($row['qty']);
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue("A$start", $no)
                    ->setCellValue("B$start", $row['nama'])
                    ->setCellValue("C$start", $row['keterangan'])
                    ->setCellValue("D$start", $row['satuan'])
                    ->setCellValue("E$start", $total_beban);
                $start++;
            }
            $end_body = $start - 1;
            $styleArray = array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            $objPHPExcel->setActiveSheetIndex(0)
                ->getStyle("A$start_body:E$end_body")->applyFromArray($styleArray);
            $start_row = $start_body + 1;
            if ($format == 'excel') {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("E$start_row:E$end_body")->getNumberFormat()
                    ->setFormatCode('#,##0');
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->getStyle("E$start_body:E$end_body")->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
            }
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("A")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("B")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("C")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("D")->setAutoSize(true);
            $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension("E")->setAutoSize(true);
            $start++;
            $jemaat = get_jemaat_from_user_id(Yii::app()->user->getId());
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Dicetak oleh: " . $jemaat->real_name);
            $start++;
            $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells("A$start:G$start")
                ->setCellValue("A$start", "Pada tanggal " . get_date_today('dd/MM/yyyy') . " jam " . get_time_now());
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
                $header = str_replace("Untitled Spreadsheet", "Lampiran Donasi Non Tunai", $header);
                $html = $header . $objWriter->generateStyles(true) .
                    $objWriter->generateSheetData() . $objWriter->generateHTMLFooter();
                if ($format == 'pdf') {
                    $mPDF1->WriteHTML($html);
                    $mPDF1->Output("$file_name.pdf", 'D');
                } else {
                    echo $html;
                }
            }
            Yii::app()->end();
        }
    }

}

