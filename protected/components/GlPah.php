<?php
/**
 * Created by PhpStorm.
 * User: novebeta
 * Date: 1/12/15
 * Time: 6:58 PM
 */

class GlPah {
    private $_total_amount = 0;
    private $detil = array();
    public function add_gl($type, $trans_id, $date_, $ref, $account, $memo_, $amount, $person_id)
    {
        $is_bank_to = $this->is_bank_account($account);
        $this->add_gl_trans($type, $trans_id, $date_, $account, $memo_, $amount, $person_id);
        if ($is_bank_to) {
            $this->add_bank_trans($type, $trans_id, $is_bank_to, $ref, $date_, $amount, $person_id);
        }
        $this->add_comments($type, $trans_id, $date_, $memo_);
//        return $trans_id;
    }

    public function is_bank_account($account_code)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_code =" . $account_code);
        $bank_act = PahBankAccounts::model()->find($criteria);
        if ($bank_act != null)
            return $bank_act->id;
        else
            return false;
    }

    public function add_gl_trans($type, $trans_id, $date_, $account, $memo_, $amount, $person_id)
    {
        $gl_trans = new PahGlTrans;
        $gl_trans->type = $type;
        $gl_trans->type_no = $trans_id;
        $gl_trans->tran_date = $date_;
        $gl_trans->account = $account;
        $gl_trans->memo_ = $memo_;
        $gl_trans->users_id = $person_id;
        $gl_trans->amount = $amount;
        if (!$gl_trans->save())
            throw new Exception("Gagal menyimpan transaksi jurnal.");
        return $amount;
    }

    public function add_bank_trans($type, $trans_no, $bank_act, $ref, $date_, $amount, $person_id)
    {
        $bank_trans = new PahBankTrans;
        $bank_trans->type = $type;
        $bank_trans->trans_no = $trans_no;
        $bank_trans->bank_act = $bank_act;
        $bank_trans->ref = $ref;
        $bank_trans->trans_date = $date_;
        $bank_trans->amount = $amount;
        $bank_trans->users_id = $person_id;
        if (!$bank_trans->save())
            throw new Exception("Gagal menyimpan transaksi bank.");
    }
    public function add_comments($type, $type_no, $date_, $memo_)
    {
        if ($memo_ != null && $memo_ != "") {
            $comment = new PahComments;
            $comment->type = $type;
            $comment->type_no = $type_no;
            $comment->date_ = $date_;
            $comment->memo_ = $memo_;
            if (!$comment->save())
                throw new Exception("Gagal menyimpan keterangan.");
        }
    }
    public function validate()
    {
//        $this->_total_amount = array_sum(array_column($this->detil,'amount'));
        if (round($this->_total_amount,2) != 0.00)
            throw new Exception("Gagal menyimpan jurnal karena tidak balance. Total GL = " .
                number_format($this->_total_amount, 2));
    }
}