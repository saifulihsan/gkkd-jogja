<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
    <title><?php echo CHtml::encode(Yii::app()->name); ?></title>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/resources/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/resources/css/xtheme-gray.css"/>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/css/default.css"/>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/examples/grid/grid-examples.css"/>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/examples/ux/css/RowEditor.css"/>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/css/extjs.css"/>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/examples/shared/icons/silk.css"/>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/css/aspnet/aspnet.css"/>
    <link rel="stylesheet" type="text/css"
          href="<?php echo Yii::app()->request->baseUrl; ?>/css/silk_v013/silk013.css"/>
</head>
<body>
<script type="text/javascript"
        src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/ext-all.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/sidebar.js"></script>
<? if (Yii::app()->user->isGuest && !strstr($_SERVER['REQUEST_URI'], "site/login")) { ?>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/view/login.js"></script>
    <?
} else {
    ?>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/lib.js"></script>
<script type="text/javascript"
        src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/examples/ux/TableGrid.js"></script>
    <?
    $templatePath = './js/view/pah/';
    $files = scandir($templatePath);
    foreach ($files as $file) {
        if (is_file($templatePath . '/' . $file)) {
            //if ($file == 'login.js') continue;
            ?>
        <script type="text/javascript" src="<?php echo($templatePath . $file); ?>"></script>
            <?
        }
    }

    $templatePath = './js/view/pe/';
    $files = scandir($templatePath);
    foreach ($files as $file) {
        if (is_file($templatePath . '/' . $file)) {
            //if ($file == 'login.js') continue;
            ?>
        <script type="text/javascript" src="<?php echo($templatePath . $file); ?>"></script>
            <?
        }
    }

    $templatePath = './js/view/';
    $files = scandir($templatePath);
    foreach ($files as $file) {
        if (is_file($templatePath . '/' . $file)) {
            if ($file == 'login.js') continue;
            ?>
        <script type="text/javascript" src="<?php echo($templatePath . $file); ?>"></script>
            <?
        }
    }
    ?>

<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/mainpanel.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/app.js"></script>
    <? }?>
</body>
</html>