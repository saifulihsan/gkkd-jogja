<div class="view">
    <?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
    <?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
    <br/>

    <?php echo GxHtml::encode($data->getAttributeLabel('user_id')); ?>:
    <?php echo GxHtml::encode($data->user_id); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('password')); ?>:
    <?php echo GxHtml::encode($data->password); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('last_visit_date')); ?>:
    <?php echo GxHtml::encode($data->last_visit_date); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
    <?php echo GxHtml::encode($data->inactive); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('nij')); ?>:
    <?php echo GxHtml::encode(GxHtml::valueEx($data->nij0)); ?>
    <br/>
    <?php echo GxHtml::encode($data->getAttributeLabel('security_roles_id')); ?>:
    <?php echo GxHtml::encode(GxHtml::valueEx($data->securityRoles)); ?>
    <br/>
</div>