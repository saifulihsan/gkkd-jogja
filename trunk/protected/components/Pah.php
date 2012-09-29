<?php
/**
 * Created by novebeta.
 * Date: 9/28/12
 * Time: 1:04 PM
 */
class Pah
{
//---------------------------------------------  Format  ---------------------------------------------------------------
    static function get_number($number){
        return str_replace(",", "", $number);
    }
//---------------------------------------------- DateTime --------------------------------------------------------------

    static function get_date_tomorrow(){
        return Yii::app()->dateFormatter->format('yyyy-MM-dd', time()+ (1 * 24 * 60 * 60));
    }

    static function get_date_today(){
        return Yii::app()->dateFormatter->format('yyyy-MM-dd', time());
    }


//---------------------------------------------- Anggaran --------------------------------------------------------------

    static function is_periode_anggaran_exist($bulan, $tahun){
        $criteria = new CDbCriteria();
        $criteria->addCondition("periode_bulan =".$bulan);
        $criteria->addCondition("periode_tahun =".$tahun);
        $result = PahAnggaran::model()->count($criteria);
        return $result > 0;
    }
//--------------------------------------------- Bank Trans -------------------------------------------------------------

    static function get_next_trans_no_bank_trans(){
        $db = PahBankTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT MAX(trans_no)
        FROM pah_bank_trans where type=".BANKTRANSFER)->queryScalar();
        return $total == null ? 0 : $total + 1;
    }

    static function get_balance_before_for_bank_account($bank_account, $from)
    {
        $db = PahBankTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT SUM(amount)
        FROM pah_bank_trans where bank_act=$bank_account AND trans_date < '$from'")->queryScalar();
        return $total == null ? 0 : $total;
    }

    static function get_bank_trans_for_bank_account($bank_account, $from, $to)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("bank_act =".$bank_account);
        $criteria->addCondition("trans_date >= '$from'");
        $criteria->addCondition("trans_date <= '$to'");
        $criteria->order = "trans_date, id";
        return PahBankTrans::model()->findAll($criteria);
    }

    static function is_bank_account($account_code)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_code =".$account_code);
        $bank_act = PahBankAccounts::model()->find($criteria);
        if($bank_act != null )
            return $bank_act->id;
        else
            return false;
    }

    static function get_act_code_from_bank_act($bank_act){
        $bank = PahBankAccounts::model()->findByPk($bank_act);
        if($bank != null )
            return $bank->accountCode->account_code;
        else
            return false;
    }

    static function add_bank_trans($type, $trans_no, $bank_act, $ref, $date_, $amount, $person_id)
    {
        $bank_trans = new PahBankTrans;
        $bank_trans->type = $type;
        $bank_trans->trans_no = $trans_no;
        $bank_trans->bank_act = $bank_act;
        $bank_trans->ref = $ref;
        $bank_trans->trans_date = $date_;
        $bank_trans->amount = $amount;
        $bank_trans->users_id = $person_id;
        $bank_trans->save();
    }
//--------------------------------------------- Gl Trans ---------------------------------------------------------------

    static function get_sql_for_journal_inquiry($from,$to){
        $rows = Yii::app()->db->createCommand()
            ->select("gl_trans.tran_date,gl_trans.type,refs.reference,Sum(IF(amount>0, amount,0)) AS amount,
                comments.memo_,gl_trans.person_id,gl_trans.type_no")
            ->from('gl_trans')
            ->join('comments', 'gl_trans.type = comments.type AND gl_trans.type_no = comments.type_no')
            ->Join('refs', 'gl_trans.type = refs.type AND gl_trans.type_no = refs.type_no')
            ->where("gl_trans.amount!=0 and gl_trans.tran_date >= '$from'
		        AND gl_trans.tran_date <= '$to'")
            ->group('gl_trans.type, gl_trans.type_no')
            ->order('tran_date desc')
            ->queryAll();
        return $rows;
    }



    static function add_gl($type, $trans_id, $date_, $ref, $account, $memo_, $amount, $person_id)
    {
        $is_bank_to = Pah::is_bank_account($account);

        Pah::add_gl_trans($type, $trans_id, $date_, $account, $memo_, $amount, $person_id);
        if ($is_bank_to)
        {
            Pah::add_bank_trans($type, $trans_id, $is_bank_to, $ref, $date_, $amount, $person_id);
        }

        Pah::add_comments($type, $trans_id, $date_, $memo_);
//        return $trans_id;
    }

    static function add_gl_trans($type, $trans_id, $date_, $account, $memo_, $amount, $person_id)
    {
        $gl_trans = new PahGlTrans;
        $gl_trans->type = $type;
        $gl_trans->type_no = $trans_id;
        $gl_trans->tran_date = $date_;
        $gl_trans->account = $account;
        $gl_trans->memo_ = $memo_;
        $gl_trans->users_id = $person_id;
        $gl_trans->amount = $amount;
        $gl_trans->save();
        return $amount;
    }

//--------------------------------------------- Comments ---------------------------------------------------------------

    static function get_comments($type, $type_no)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type=".$type);
        $criteria->addCondition("id=".$type_no);
        return PahComments::model()->find($criteria);
    }

    static function add_comments($type, $type_no, $date_, $memo_)
    {
        if ($memo_ != null && $memo_ != "")
        {
            $comment = new PahComments;
            $comment->type = $type;
            $comment->type_no = $type_no;
            $comment->date_= $date_;
            $comment->memo_= $memo_;
            $comment->save();
        }
    }

    static function update_comments($type, $id, $date_, $memo_)
    {
        if ($date_ == null)
        {
            Pah::delete_comments($type, $id);
            Pah::add_comments($type, $id, Yii::app()->dateFormatter->format('yyyy-MM-dd',time()), $memo_);
        }
        else
        {
            $criteria = new CDbCriteria();
            $criteria->addCondition("type=".$type);
            $criteria->addCondition("id=".$type_no);
            $criteria->addCondition("date_=".$date);
            $comment = PahComments::model()->find($criteria);
            $comment->memo_= $memo_;
            $comment->save();
        }
    }

    static function delete_comments($type, $type_no)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type=".$type);
        $criteria->addCondition("id=".$type_no);
        $comment = PahComments::model()->find($criteria);
        $comment->delete();
    }

//--------------------------------------------------------------------------------------------------




}
