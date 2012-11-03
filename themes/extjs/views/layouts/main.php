<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
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
<!--<div id="loading-mask" style=""></div>-->
<!--<div id="loading">-->
<!--    <div class="loading-indicator"><img-->
<!--        src="-->
<?php //echo Yii::app()->request->baseUrl; ?><!--/js/ext340/resources/images/default/shared/blue-loading.gif"-->
<!--        width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"-->
<!--        alt=""/>Aplikasi -->
<?php //echo CHtml::encode(Yii::app()->name); ?><!--</a><br/><span id="loading-msg">Loading styles and images...</span>-->
<!--    </div>-->
<!--</div>-->
<!--<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading Core API...';</script>-->
<script type="text/javascript"
        src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/adapter/ext/ext-base.js"></script>
<!--<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Loading UI Components...';</script>-->
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/ext-all.js"></script>
<!--<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Initializing...';</script>-->
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
<!--<div id="header"><h1><strong>--><?php //echo CHtml::encode(Yii::app()->name); ?><!--</strong></h1>-->
<!--    <span id="usrlogin">Welcome :  -->
    <?php //echo CHtml::encode(Yii::app()->user->name); ?><!--  | <a href="site/logout"-->
<!--                                                                                              class="lout">Logout</a></span>-->
<!--</div>-->
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/mainpanel.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/app.js"></script>
    <? }?>
</body>
</html>