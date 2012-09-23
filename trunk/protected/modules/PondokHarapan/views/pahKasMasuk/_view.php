<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('kas_masuk_id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->kas_masuk_id), array('view', 'id' => $data->kas_masuk_id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('doc_ref')); ?>:
	<?php echo GxHtml::encode($data->doc_ref); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('no_bukti')); ?>:
	<?php echo GxHtml::encode($data->no_bukti); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('amount')); ?>:
	<?php echo GxHtml::encode($data->amount); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('entry_time')); ?>:
	<?php echo GxHtml::encode($data->entry_time); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('trans_date')); ?>:
	<?php echo GxHtml::encode($data->trans_date); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('trans_via')); ?>:
	<?php echo GxHtml::encode($data->trans_via); ?>
	<br />
	<?php /*
	<?php echo GxHtml::encode($data->getAttributeLabel('pah_donatur_id')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->pahDonatur)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('pah_chart_master_account_code')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->pahChartMasterAccountCode)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('pah_bank_accounts_id')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->pahBankAccounts)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('users_id')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->users)); ?>
	<br />
	*/ ?>

</div>