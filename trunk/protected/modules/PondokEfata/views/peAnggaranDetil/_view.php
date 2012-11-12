<div class="view">
    <?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
    <?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
    <br/>

    <?php echo GxHtml::encode($data->getAttributeLabel('anggaran_id')); ?>:
    <?php echo GxHtml::encode(GxHtml::valueEx($data->anggaran)); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('amount')); ?>:
    <?php echo GxHtml::encode($data->amount); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('account_code')); ?>:
    <?php echo GxHtml::encode(GxHtml::valueEx($data->accountCode)); ?>
    <br/>
</div>