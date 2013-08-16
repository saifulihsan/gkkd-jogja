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
              href="<?php echo Yii::app()->request->baseUrl; ?>/css/extjs.css"/>        
    </head>
    <body>
        <script type="text/javascript"
        src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/ext-all.js"></script>
        <script>
            Ext.namespace('jun');
            var BASE_URL = '<?=bu()===""?"/":bu();?>';
        </script>        
        <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/lib.min.js"></script>                  
        <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/login.js"></script>        
        <?php echo $content; ?>
        <script type="text/javascript"
        src="<?php echo Yii::app()->request->baseUrl; ?>/js/sha512.js"></script>
    </body>
</html>
