<?php

//date_default_timezone_set('Asia/Jakarta');
//setlocale(LC_TIME,'INDONESIA');
// change the following paths if necessary
$yii = dirname(__FILE__) . '/../../yii/framework/YiiBase.php';
//$yii=dirname(__FILE__).'/../../yii/framework/Yiilite.php';
$config = dirname(__FILE__) . '/protected/config/main.php';
$yiiG = dirname(__FILE__) . '/protected/globals.php';

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG', true);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL', 3);

require_once($yii);
require_once($yiiG);

//require_once($define);
class Yii extends YiiBase {

    /**
     * @static
     * @return CWebApplication
     */
    public static function app() {
        return parent::app();
    }

}
//<script src="js/ext340/ext-all-debug-w-comments.js">
Yii::createWebApplication($config)->run();
?>
