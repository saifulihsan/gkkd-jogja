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
        <script>
            Ext.namespace('jun');
            var SYSTEM_TITLE = '<?= app()->params['system_title']; ?>';
            var SYSTEM_SUBTITLE = '<?= app()->params['system_subtitle']; ?>';
        </script>
        <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/lib.min.js"></script>                  
        <script type="text/javascript"
        src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext340/examples/ux/TableGrid.js"></script>
        <?
        $dir = array('/js/view/pah/', '/js/view/pe/', '/js/view/mt/',
            '/js/view/');
        foreach ($dir as $path) {
            $templatePath = dirname(Yii::app()->basePath) . $path;
            $files = scandir($templatePath);
            foreach ($files as $file) {
                if (is_file($templatePath . '/' . $file)) {
                    ?>
                    <script type="text/javascript" src="<?php echo(bu() . $path . $file); ?>"></script>
                    <?
                }
            }
        }
        ?>
        <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/mainpanel.js"></script>
        <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js/app.js"></script>
<?php echo $content; ?>
        <script type="text/javascript"
        src="<?php echo Yii::app()->request->baseUrl; ?>/js/sha512.js"></script>
    </body>
</html>
