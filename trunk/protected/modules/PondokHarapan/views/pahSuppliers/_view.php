<div class="view">
    <?php echo GxHtml::encode($data->getAttributeLabel('supplier_id')); ?>:
    <?php echo GxHtml::link(GxHtml::encode($data->supplier_id), array('view', 'id' => $data->supplier_id)); ?>
    <br/>

    <?php echo GxHtml::encode($data->getAttributeLabel('supp_name')); ?>:
    <?php echo GxHtml::encode($data->supp_name); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('supp_ref')); ?>:
    <?php echo GxHtml::encode($data->supp_ref); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('address')); ?>:
    <?php echo GxHtml::encode($data->address); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('mail_address')); ?>:
    <?php echo GxHtml::encode($data->mail_address); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('gst_no')); ?>:
    <?php echo GxHtml::encode($data->gst_no); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('contact')); ?>:
    <?php echo GxHtml::encode($data->contact); ?>
    <br/>
    <?php /*
	<?php echo GxHtml::encode($data->getAttributeLabel('supp_account_no')); ?>:
	<?php echo GxHtml::encode($data->supp_account_no); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('website')); ?>:
	<?php echo GxHtml::encode($data->website); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('bank_account')); ?>:
	<?php echo GxHtml::encode($data->bank_account); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('curr_code')); ?>:
	<?php echo GxHtml::encode($data->curr_code); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('payment_terms')); ?>:
	<?php echo GxHtml::encode($data->payment_terms); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('credit_limit')); ?>:
	<?php echo GxHtml::encode($data->credit_limit); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('purchase_account')); ?>:
	<?php echo GxHtml::encode($data->purchase_account); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('payable_account')); ?>:
	<?php echo GxHtml::encode($data->payable_account); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('payment_discount_account')); ?>:
	<?php echo GxHtml::encode($data->payment_discount_account); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('notes')); ?>:
	<?php echo GxHtml::encode($data->notes); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />
	*/ ?>
</div>