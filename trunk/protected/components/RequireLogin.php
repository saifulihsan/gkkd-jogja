<?php

class RequireLogin extends CBehavior
{
    public function attach($owner)
    {
        $owner->attachEventHandler('onBeginRequest', array($this, 'handleBeginRequest'));
    }

    public function handleBeginRequest($event)
    {
        $allowed = array('site/login', 'index.php');
        if (Yii::app()->user->isGuest) {
            $loginRequired = true;
            foreach ($allowed as $page) {
                //$req = $_SERVER['REQUEST_URI'];
                $pos = strpos($_SERVER['REQUEST_URI'], $page);
                if ($pos !== false) {
                    $loginRequired = false;
                    break;
                }
            }
            if ($loginRequired) {
                //Yii::app()->user->loginRequired();
                Yii::app()->request->redirect(Yii::app()->homeUrl . 'index.php');
            }
        }
        //if (Yii::app()->user->isGuest && !strstr($_SERVER['REQUEST_URI'], "index.php"))
//        {
//            Yii::app()->user->loginRequired();
//        }
    }
}

?>