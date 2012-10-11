<div class="view">
    <?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
    <?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
    <br/>

    <?php echo GxHtml::encode($data->getAttributeLabel('account_code')); ?>:
    <?php echo GxHtml::encode(GxHtml::valueEx($data->accountCode)); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('account_type')); ?>:
    <?php echo GxHtml::encode($data->account_type); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('bank_account_name')); ?>:
    <?php echo GxHtml::encode($data->bank_account_name); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('bank_account_number')); ?>:
    <?php echo GxHtml::encode($data->bank_account_number); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('bank_name')); ?>:
    <?php echo GxHtml::encode($data->bank_name); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('bank_address')); ?>:
    <?php echo GxHtml::encode($data->bank_address); ?>
    <br/>
    <?php /*
	<?php echo GxHtml::encode($data->getAttributeLabel('bank_curr_code')); ?>:
	<?php echo GxHtml::encode($data->bank_curr_code); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('dflt_curr_act')); ?>:
	<?php echo GxHtml::encode($data->dflt_curr_act); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('ending_reconcile_balance')); ?>:
	<?php echo GxHtml::encode($data->ending_reconcile_balance); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('bank_phone')); ?>:
	<?php echo GxHtml::encode($data->bank_phone); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('atas_nama')); ?>:
	<?php echo GxHtml::encode($data->atas_nama); ?>
	<br />
	*/ ?>
</div>