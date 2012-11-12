<div class="view">
    <?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
    <?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
    <br/>

    <?php echo GxHtml::encode($data->getAttributeLabel('name')); ?>:
    <?php echo GxHtml::encode($data->name); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('notes')); ?>:
    <?php echo GxHtml::encode($data->notes); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
    <?php echo GxHtml::encode($data->inactive); ?>
    <br/>
</div>