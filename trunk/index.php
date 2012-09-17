<?php

// change the following paths if necessary
$yii=dirname(__FILE__).'/../../yii/framework/YiiBase.php';
$config=dirname(__FILE__).'/protected/config/main.php';
//$define=dirname(__FILE__).'/protected/vendors/frontaccounting/define.php';

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);

require_once($yii);
//require_once($define);
class Yii extends YiiBase
{
    /**
     * @static
     * @return CWebApplication
     */
    public static function app()
    {
        return parent::app();
    }
}

Yii::createWebApplication($config)->run();
