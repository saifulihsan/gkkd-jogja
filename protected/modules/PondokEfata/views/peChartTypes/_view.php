<div class="view">
    <?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
    <?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
    <br/>

    <?php echo GxHtml::encode($data->getAttributeLabel('name')); ?>:
    <?php echo GxHtml::encode($data->name); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('class_id')); ?>:
    <?php echo GxHtml::encode(GxHtml::valueEx($data->class)); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('parent')); ?>:
    <?php echo GxHtml::encode($data->parent); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
    <?php echo GxHtml::encode($data->inactive); ?>
    <br/>
</div>