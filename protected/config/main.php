<?php
return array(
    'basePath' => dirname(__file__) . DIRECTORY_SEPARATOR . '..',
    'name' => 'Sistem Informasi GKKD',
    'theme' => 'extjs',
//        'preload' => array('log'),
    'sourceLanguage' => 'id',
    'import' => array(
        'application.models.*',
        'application.modules.general.models.*',
        'application.components.*',
        'ext.giix-components.*',
        'application.extensions.PasswordHash',
        'application.extensions.PHPExcel',
        'application.vendors.*'
    ),
    'modules' => array(
//        'gii' => array(
//            'class' => 'system.gii.GiiModule',
//            'password' => 'admin',
//            'ipFilters' => array('127.0.0.1', '::1'),
//            'generatorPaths' => array('ext.giix-core',
//            ),
//        ),
        'general',
        'PondokHarapan',
        'PondokEfata',
        'Mahkotrans',
    ),
    'components' => array(
        'user' => array(
            'loginUrl' => array('site/login'),
            'allowAutoLogin' => true,),
        'urlManager' => array(
            'urlFormat' => 'path',
            'showScriptName' => false,
            'rules' => array(
//                '/' => 'site/index',
//                '<action:(contact|login|logout)>/*' => 'site/<action>',
                '<controller:\w+>/<id:\d+>' => '<controller>/view',
                '<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
                '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
            ),
        ),
        'excel' => array(
            'class' => 'application.extensions.PHPExcel',
        ),
        'db' => array(
            'connectionString' => 'mysql:host=localhost;dbname=gkkd',
            'emulatePrepare' => true,
            'username' => 'root',
            'password' => 'root',
            'charset' => 'utf8',
        ),
        'errorHandler' => array(
            'errorAction' => '',),
//        'log' => array(
//            'class' => 'CLogRouter',
//            'routes' => array(array(
//                    'class' => 'CWebLogRoute',
//                    'levels' => 'error, warning',
//                ),
//            ),
//        ),
        'ePdf' => array(
            'class' => 'ext.yii-pdf.EYiiPdf',
            'params' => array(
                'mpdf' => array(
                    'librarySourcePath' => 'application.vendors.mpdf.*',
                    'constants' => array(
                        '_MPDF_TEMP_PATH' => Yii::getPathOfAlias('application.runtime'),
                    ),
                    'class' => 'mpdf',
                ),
                'HTML2PDF' => array(
                    'librarySourcePath' => 'application.vendors.html2pdf.*',
                    'classFile' => 'html2pdf.class.php',
                )
            ),
        ),
    ),
    'params' => array(
        'adminEmail' => 'webmaster@example.com',
        'system_title' => 'Sistem Informasi Gereja Kristen Kemah Daud Yogyakarta',
        'system_subtitle' => 'Villa Seturan Indah Bl D/10, Caturnunggal, Depok Yogyakarta 55281',
        'phpass' => array(
            'iteration_count_log2' => 8,
            'portable_hashes' => false,
        ),
    ),
//    'behaviors' => array(
//        'onBeginRequest' => array('class' => 'application.components.RequireLogin'
//        )
//    ),
);
