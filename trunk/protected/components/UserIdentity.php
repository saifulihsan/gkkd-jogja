<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
    /**
     * Authenticates a user.
     * The example implementation makes sure if the username and password
     * are both 'demo'.
     * In practical applications, this should be changed to authenticate
     * against some persistent user identity storage (e.g. database).
     * @return boolean whether authentication succeeds.
     */
    private $_id;

    public function authenticate()
    {
        $users = array(
            // username => password
            'demo' => 'demo',
            'admin' => 'admin',
        );
        $user = Users::model()->findByAttributes(array('user_id' => $this->username));
        if ($user === null)
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        //if(!isset($users[$this->username]))
        //			$this->errorCode=self::ERROR_USERNAME_INVALID;
        else if (!bCrypt::verify($this->password, $user->password)) {
//            $pass = $user->password;
//            $pass2 = $this->password;
//            $very = $this->encrypt($this->password);
//            $encrypt = $this->encrypt("nove");
//            $enc = NEW bCrypt();
//            $veryvied = $enc->verify($this->password, $user->password);
            $this->errorCode = self::ERROR_PASSWORD_INVALID;
        } else {
            $this->_id = $user->id;
            $this->username = $user->user_id;
            //$this->username = 'admin';
            $this->errorCode = self::ERROR_NONE;
            $user->last_visit_date = get_date_today('yyyy-MM-dd HH:mm:ss');
            $user->save();
        }
        return !$this->errorCode;
    }

    public function getId()
    {
        return $this->_id;
    }

    public function encrypt($value)
    {
        $enc = NEW bCrypt();
        return $enc->hash($value);
    }
}
