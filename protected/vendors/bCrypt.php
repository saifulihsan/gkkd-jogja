<?php

class bCrypt {
    private $rounds;
    private $prefix;

//    public function __construct($prefix = '', $rounds = 12) {
//        if(CRYPT_BLOWFISH != 1) {
//            throw new Exception("bcrypt not supported in this installation. See http://php.net/crypt");
//        }
//
//        $this->rounds = $rounds;
//        $this->prefix = $prefix;
//    }

//    public function hash($input) {
//        $hash = crypt($input, $this->getSalt());
//
//        if(strlen($hash) > 13)
//            return $hash;

//        return false;
//    }

    static public function verify($input, $existingHash) {
//        $hash = crypt($input, $existingHash);

        return $input === $existingHash;
    }

//    private function getSalt() {
//        // the base64 function uses +'s and ending ='s; translate the first, and cut out the latter
//        return sprintf('$2a$%02d$%s', $this->rounds, substr(strtr(base64_encode($this->getBytes()), '+', '.'), 0, 22));
//    }
//
//    private function getBytes() {
//        $bytes = '';
//
//        if(function_exists('openssl_random_pseudo_bytes') &&
//            (strtoupper(substr(PHP_OS, 0, 3)) !== 'WIN')) { // OpenSSL slow on Win
//            $bytes = openssl_random_pseudo_bytes(18);
//        }
//
//        if($bytes === '' && is_readable('/dev/urandom') &&
//            ($hRand = @fopen('/dev/urandom', 'rb')) !== FALSE) {
//            $bytes = fread($hRand, 18);
//            fclose($hRand);
//        }
//
//        if($bytes === '') {
//            $key = uniqid($this->prefix, true);
//
//            // 12 rounds of HMAC must be reproduced / created verbatim, no known shortcuts.
//            // Salsa20 returns more than enough bytes.
//            for($i = 0; $i < 12; $i++) {
//                $bytes = hash_hmac('salsa20', microtime() . $bytes, $key, true);
//                usleep(10);
//            }
//        }
//        return $bytes;
//    }
}
