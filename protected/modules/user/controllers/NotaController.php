<?php

class NotaController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'Nota'),
		));
	}

	public function actionCreate() {
        //return;
		$model = new Nota;		
		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['Nota'][$k] = $v;
                        }
			$model->attributes = $_POST['Nota'];
			

			if ($model->save()) {
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->nota_id
                                ));
                            Yii::app()->end();
                        } else
                        {
                            $this->redirect(array('view', 'id' => $model->nota_id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'Nota');


		if (isset($_POST) && !empty($_POST)) {
                        foreach($_POST as $k=>$v){
                            $_POST['Nota'][$k] = $v;
                        }
			$model->attributes = $_POST['Nota'];

			if ($model->save()) {
                        
                            $status = true;                            
                        } else {
                            $status = false;                            
                        }
                        
                        if (Yii::app()->request->isAjaxRequest)
                        {                            
                            echo CJSON::encode(array(
                                'success'=>$status,
                                'id'=>$model->nota_id
                                ));
                            Yii::app()->end();
                        } else
                        {
				$this->redirect(array('view', 'id' => $model->nota_id));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->request->isPostRequest) {
			$this->loadModel($id, 'Nota')->delete();

			if (!Yii::app()->request->isAjaxRequest)
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}
/*
	public function actionAdmin() {
		$dataProvider = new CActiveDataProvider('Nota');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}*/

	public function actionAdmin() {
		$model = new Nota('search');
		$model->unsetAttributes();

		if (isset($_GET['Nota']))
			$model->attributes = $_GET['Nota'];

		$this->render('admin', array(
			'model' => $model,
		));
	}

	public function actionIndex() {
                if(isset($_POST['limit'])) {
                        $limit = $_POST['limit'];
                } else {
                    $limit = 20;
                }

                if(isset($_POST['start'])){
                    $start = $_POST['start'];

                } else {
                    $start = 0;
                }
		//$model = new Nota('search');
		//$model->unsetAttributes();

                $criteria = new CDbCriteria();
                $criteria->limit = $limit;
                $criteria->offset = $start;
                $model = Nota::model()->findAll($criteria);
                $total = Nota::model()->count($criteria);
                
		if (isset($_GET['Nota']))
			$model->attributes = $_GET['Nota'];

                if (isset($_GET['output']) && $_GET['output']=='json') {
                    $this->renderJson($model, $total);
                } else {
                    $model = new Nota('search');
                    $model->unsetAttributes();
                
                    $this->render('admin', array(
                            'model' => $model,
                    ));
                }
	}

    public function actionPrintPdf($id){
        $nota = $this->loadModel($id, 'Nota');        
        $criteria = new CDbCriteria();
        $criteria->condition = 'nota_id ='.$id;
        $nota_details = NotaDtl::model()->findAll($criteria);
        $sales = $this->loadModel($nota->sales_id,'Sales');
        $cust = $this->loadModel($nota->customer_id,'Customers');
        $id_user = Yii::app()->user->getId();
        $user = $this->loadModel($id_user,'TblUser');
        $date = date("d/m/Y");
        $time = date("H:i:s");
        $total1 = number_format($nota->total_1,2);
        $disc = number_format($nota->disc,2);
        $total2 = number_format($nota->total_2,2);
        $detils = "";
        foreach($nota_details as $detil){
            $barang = $this->loadModel($detil->barang_id,'Barang');
            $jml = number_format($detil->jml,2);
            $price = number_format($detil->harga_satuan,2);
            $disc_rp = number_format($detil->disc_rp,2);
            $total_price = number_format($detil->total_harga_2,2);
            $detils .= "<tr>
            <td style=\"vertical-align: top; width: 15%;\">$barang->ref</td>
            <td style=\"vertical-align: top; width: 30%; \">$barang->desc</td>
            <td style=\"vertical-align: top; width: 10%; text-align: right;\">$jml</td>
            <td style=\"vertical-align: top; width: 15%; text-align: right;\">$price</td>
            <td style=\"vertical-align: top; width: 15%; text-align: right;\">$disc_rp</td>
            <td style=\"vertical-align: top; width: 15%; text-align: right;\">$total_price</td>
            </tr>";
        }


        $html = <<<EOD
<html>
<head>
    <meta content="text/html; charset=ISO-8859-1"
          http-equiv="content-type">
    <title>Receipt</title>
</head>
<style>
td.dashed {
	border-bottom: 1px dotted;
}
td.top-dashed {
	border-top: 1px dotted;
}
</style>
<body>
        <table style="text-align: left; width: 100%; font-family: Courier New; font-size: 9px"
        border="0">
        <tr>
            <td colspan="6" rowspan="1" style="font-weight: bold;" align="center">
            <big>Pison Receipt</big></td>
        </tr>
        <tr>
            <td style="vertical-align: top; width: 15%;">Sales</td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 35%">: $sales->ref</td>
            <td style="vertical-align: top; width: 30%; text-align: right;">Doc. Date : </td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 20%">$nota->doc_date</td>
        </tr>
        <tr>
            <td style="vertical-align: top; width: 15%;">Term</td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 35%;">: $nota->term</td>
            <td style="vertical-align: top; width: 30%; text-align: right;">Invoice Number : </td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 20%">00009</td>
        </tr>
        <tr>
            <td style="vertical-align: top; width: 15%;">Warehouse</td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 35%;">: $nota->warehouse</td>
            <td style="vertical-align: top; width: 30%; text-align: right;">Doc. Ref : </td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 20%">$nota->doc_ref</td>
        </tr>
        <tr>
            <td style="vertical-align: top; width: 15%;">Status</td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 35%;">: $nota->status</td>
            <td style="vertical-align: top; width: 30%; text-align: right;">Customer : </td>
            <td class="dashed" colspan="2" rowspan="4" style="vertical-align: top; width: 20%">$cust->name<br/>$cust->address</td>
        </tr>
        <tr>
            <td style="vertical-align: top; width: 15%;">Notes</td>
            <td colspan="2" rowspan="2" style="vertical-align: top; width: 35%;">: $nota->notes</td>
            <td style="vertical-align: top; width: 30%;"></td>
        </tr>
        <tr>
            <td style="vertical-align: top; width: 15%;"></td>
            <td style="vertical-align: top; width: 30%;"></td>
        </tr>
        <tr>
            <td class="dashed" style="vertical-align: top; width: 15%;">Cr. Date</td>
            <td class="dashed" colspan="2" rowspan="1" style="vertical-align: top; width: 35%;">: $nota->trans_date</td>
            <td class="dashed" style="vertical-align: top; width: 30%;"></td>
        </tr>
        <tr>
            <td class="dashed" style="vertical-align: top; width: 15%;">Item Code</td>
            <td class="dashed" style="vertical-align: top; width: 30%; text-align: center;">Item Description</td>
            <td class="dashed" style="vertical-align: top; width: 10%; text-align: right;">Qty</td>
            <td class="dashed" style="vertical-align: top; width: 15%; text-align: right;">Price</td>
            <td class="dashed" style="vertical-align: top; width: 15%; text-align: right;">Discount</td>
            <td class="dashed" style="vertical-align: top; width: 15%; text-align: right;">Total</td>
        </tr>
        $detils
        <tr>
            <td class="top-dashed" colspan="4" rowspan="3" style="vertical-align: top;"></td>
            <td class="top-dashed" style="vertical-align: top; text-align: right; width: 15%;">Sub Total :</td>
            <td class="top-dashed" style="vertical-align: top; text-align: right; width: 15%;">$total1</td>
        </tr>
        <tr>
            <td style="vertical-align: top; text-align: right; width: 15%;">Discount :</td>
            <td style="vertical-align: top; text-align: right; width: 15%;">$disc</td>
        </tr>
        <tr>
            <td style="vertical-align: top; text-align: right; width: 15%;">Grand Total :</td>
            <td style="vertical-align: top; text-align: right; width: 15%;">$total2</td>
        </tr>
        <tr>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 30%; text-align: center; height: 67px;">Recieved by,</td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 40%; height: 67px;"></td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 30%; text-align: center; height: 67px;">Sales,</td>
        </tr>
        <tr>
            <td class="dashed" colspan="2" rowspan="1" style="text-align: center; width: 30%; vertical-align: bottom;">(&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</td>
            <td class="dashed" colspan="2" rowspan="1" style="width: 40%"></td>
            <td class="dashed" colspan="2" rowspan="1" style="text-align: center; width: 30%; vertical-align: bottom;">($user->complete)</td>
        </tr>
        <tr>
            <td style="vertical-align: top; width: 15%">$date</td>
            <td style="vertical-align: top; text-align: center; width: 15%">$time</td>
            <td colspan="2" rowspan="1" style="vertical-align: top; width: 40%">Printed By : $user->nick</td>
            <td style="vertical-align: top; width: 15%;"></td>
            <td style="vertical-align: top; width: 15%;"></td>
        </tr>
        </table>
</body>
</html>
EOD;

        //use tcpdf
//        $pdf = Yii::createComponent('application.extensions.tcpdf.ETcPdf',
//            'P', 'cm', 'A4', true, 'UTF-8');
//        $pdf->SetCreator(PDF_CREATOR);
//        $pdf->SetAuthor("Pison");
//        $pdf->SetTitle("TCPDF Example 002");
//        $pdf->SetSubject("TCPDF Tutorial");
//        $pdf->SetKeywords("TCPDF, PDF, example, test, guide");
//        $pdf->setPrintHeader(false);
//        $pdf->setPrintFooter(false);
//        $pdf->AliasNbPages();
//        $pdf->AddPage();
//        $pdf->writeHTML($html, true, false, false, false, '');
//        $pdf->Output("example_002.pdf", "I");

        //use mpdf
        $mPDF1 = Yii::app()->ePdf->mpdf();

        # You can easily override default constructor's params
        $mPDF1 = Yii::app()->ePdf->mpdf('', 'A4');

        # render (full page)
        $mPDF1->WriteHTML($html);

        # Load a stylesheet
//        $stylesheet = file_get_contents(Yii::getPathOfAlias('webroot.css') . '/main.css');
//        $mPDF1->WriteHTML($stylesheet, 1);
//
//        # renderPartial (only 'view' of current controller)
//        $mPDF1->WriteHTML($html);
//
//        # Renders image
//        $mPDF1->WriteHTML(CHtml::image(Yii::getPathOfAlias('webroot.css') . '/bg.gif' ));

        # Outputs ready PDF
        $mPDF1->Output();

        //use html2pdf
//        $html2pdf = Yii::app()->ePdf->HTML2PDF();
//        $html2pdf->WriteHTML($html);
//        $html2pdf->Output();

    }

}