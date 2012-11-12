<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'action' => Yii::app()->createUrl($this->route),
    'method' => 'get',
)); ?>

    <div class="span-8 last">
        <?php echo $form->label($model, 'id'); ?>
        <?php echo $form->textField($model, 'id'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'anggaran_id'); ?>
        <?php echo $form->dropDownList($model, 'anggaran_id', GxHtml::listDataEx(PeAnggaran::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'amount'); ?>
        <?php echo $form->textField($model, 'amount'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'account_code'); ?>
        <?php echo $form->dropDownList($model, 'account_code', GxHtml::listDataEx(PeChartMaster::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="row buttons">
        <?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
    </div>

    <?php $this->endWidget(); ?>
</div><!-- search-form -->
