<?php
/**
 * Created by novebeta.
 * Date: 9/28/12
 * Time: 1:04 PM
 */
class Pah
{


//---------------------------------------------- Anggaran --------------------------------------------------------------

    static function is_periode_anggaran_exist($bulan, $tahun)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("periode_bulan =" . $bulan);
        $criteria->addCondition("periode_tahun =" . $tahun);
        $result = PahAnggaran::model()->count($criteria);
        return $result > 0;
    }

//--------------------------------------------- Bank Trans -------------------------------------------------------------

    static function get_next_trans_no_bank_trans()
    {
        $db = PahBankTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT MAX(trans_no)
        FROM pah_bank_trans where type=" . BANKTRANSFER)->queryScalar();
        return $total == null ? 0 : $total + 1;
    }

    static function get_balance_before_for_bank_account($from, $bank_account = null)
    {
        $bank_act = $bank_account == null ? '' : "bank_act=$bank_account AND";
        $db = PahBankTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT SUM(amount)
        FROM pah_bank_trans where $bank_act trans_date < '$from'")
            ->queryScalar();
        return $total == null ? 0 : $total;
    }

    static function get_bank_trans_for_bank_account($bank_account, $from, $to)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("bank_act =" . $bank_account);
        $criteria->addCondition("trans_date >= '$from'");
        $criteria->addCondition("trans_date <= '$to'");
        $criteria->order = "trans_date, id";
        return PahBankTrans::model()->findAll($criteria);
    }

    static function is_bank_account($account_code)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_code =" . $account_code);
        $bank_act = PahBankAccounts::model()->find($criteria);
        if ($bank_act != null)
            return $bank_act->id;
        else
            return false;
    }

    static function get_act_code_from_bank_act($bank_act)
    {
        $bank = PahBankAccounts::model()->findByPk($bank_act);
        if ($bank != null)
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

    static function get_sql_for_journal_inquiry($from, $to)
    {
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
        if ($is_bank_to) {
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
        $criteria->addCondition("type=" . $type);
        $criteria->addCondition("id=" . $type_no);
        return PahComments::model()->find($criteria);
    }

    static function add_comments($type, $type_no, $date_, $memo_)
    {
        if ($memo_ != null && $memo_ != "") {
            $comment = new PahComments;
            $comment->type = $type;
            $comment->type_no = $type_no;
            $comment->date_ = $date_;
            $comment->memo_ = $memo_;
            $comment->save();
        }
    }

    static function update_comments($type, $id, $date_, $memo_)
    {
        if ($date_ == null) {
            Pah::delete_comments($type, $id);
            Pah::add_comments($type, $id, Yii::app()->dateFormatter->format('yyyy-MM-dd', time()), $memo_);
        } else {
            $criteria = new CDbCriteria();
            $criteria->addCondition("type=" . $type);
            $criteria->addCondition("id=" . $type_no);
            $criteria->addCondition("date_=" . $date);
            $comment = PahComments::model()->find($criteria);
            $comment->memo_ = $memo_;
            $comment->save();
        }
    }

    static function delete_comments($type, $type_no)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type=" . $type);
        $criteria->addCondition("id=" . $type_no);
        $comment = PahComments::model()->find($criteria);
        $comment->delete();
    }

//---------------------------------------------- Report ----------------------------------------------------------------

    static function get_mutasi_kas_ditangan($start_date, $end_date)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("a.trans_date,
                (case when a.type = 1 then g.supp_name else f.name end) as payee_payor,
                (case when a.type = 1 then c.account_name else e.account_name end) as nama_rekening,
                (case when a.type = 0 then a.amount else 0 end) as kas_masuk,
                (case when a.type = 1 then a.amount else 0 end) as kas_keluar,
                a.amount as saldo")
            ->from("pah_bank_trans a")
            ->leftJoin("pah_kas_keluar b", "b.doc_ref = a.ref")
            ->leftJoin("pah_chart_master c", "b.pah_chart_master_account_code = c.account_code")
            ->leftJoin("pah_kas_masuk d", "d.doc_ref = a.ref")
            ->leftJoin("pah_chart_master e", "d.pah_chart_master_account_code = e.account_code")
            ->leftJoin("pah_donatur f", "d.pah_donatur_id = f.id")
            ->leftJoin("pah_suppliers g", "b.pah_suppliers_supplier_id  = g.supplier_id")
            ->where("a.trans_date between '$start_date' and '$end_date' and a.bank_act='7' and  type in (0,1)")
            ->order("a.trans_date asc")
            ->queryAll();
        return $rows;
    }

    static function get_pengeluaran_per_kode_rekening($start_date, $end_date)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("b.account_code,b.account_name as nama_rekening,sum(a.amount) as total_beban")
            ->from("pah_gl_trans a")
            ->join("pah_chart_master b", "a.account=b.account_code")
            ->where("a.tran_date between '$start_date' and '$end_date' and b.account_type=:type",
                array(':type',PahPrefs::TypeCostAct()))
            ->group("b.account_name")
            ->order("b.account_code")
            ->queryAll();
        return $rows;
    }

    static function get_beban_aktivitas($start_date, $end_date)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("pah_sub_aktivitas.nama as sub_aktivitas,Sum(pah_aktivitas.amount) as total_beban")
            ->from("pah_aktivitas")
            ->join("pah_sub_aktivitas", "pah_aktivitas.pah_sub_aktivitas_id = pah_sub_aktivitas.id")
            ->where("pah_aktivitas.trans_date between '$start_date' and '$end_date'")
            ->group("pah_sub_aktivitas.nama")
            ->queryAll();
        return $rows;
    }

    static function get_beban_anak($start_date, $end_date, $anak_id)
    {
        $per_anak = $anak_id == 'undefined' ? '' : "AND pah_member.id = $anak_id";
        $rows = Yii::app()->db->createCommand()
            ->select("Sum(pah_aktivitas.amount) as amount,jemaat.real_name")
            ->from("pah_aktivitas")
            ->join("pah_member", "pah_aktivitas.pah_member_id = pah_member.id")
            ->join("jemaat", "pah_member.jemaat_nij = jemaat.nij")
            ->where("pah_aktivitas.trans_date between '$start_date' and '$end_date' $per_anak")
            ->group("jemaat.real_name")
            ->queryAll();
        return $rows;
    }

    static function get_detil_pendapatan($start_date, $end_date)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("b.account_name as nama_rekening,sum(a.amount) as total_pendapatan")
            ->from("pah_gl_trans a")
            ->join("pah_chart_master b", "a.account=b.account_code")
            ->where("a.tran_date between '$start_date' and '$end_date' and b.account_type=:type",
                array(':type',PahPrefs::TypePendapatanAct()))
            ->group("b.account_name")
            ->order("b.account_code")
            ->queryAll();
        return $rows;
    }

    static function get_total_pendapatan($start_date, $end_date)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("sum(a.amount) as total_pendapatan")
            ->from("pah_gl_trans a")
            ->join("pah_chart_master b", "a.account=b.account_code")
            ->where("a.tran_date between '$start_date' and '$end_date' and b.account_type=:type",
                array(':type',PahPrefs::TypePendapatanAct()))
            ->order("b.account_code")
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_realisasi_by_code($start_date, $end_date, $code){
        $rows = Yii::app()->db->createCommand()
            ->select("sum(a.amount) as total_realisasi")
            ->from("pah_gl_trans a")
            ->join("pah_chart_master b", "a.account=b.account_code")
            ->where("a.tran_date between '$start_date' and '$end_date' and b.account_code='$code'")
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_anggaran_by_code($month, $year, $code){
        $rows = Yii::app()->db->createCommand()
            ->select("pah_anggaran_detil.amount AS anggaran")
            ->from("pah_anggaran_detil")
            ->join("pah_anggaran", "pah_anggaran.id = pah_anggaran_detil.pah_anggaran_id")
            ->where("pah_anggaran.periode_bulan = :month AND pah_anggaran.periode_tahun = :year AND
                pah_anggaran_detil.pah_chart_master_account_code = :code",
            array(':month'=>$month,':year'=>$year,':code'=>$code))
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_chart_master_beban(){

        $criteria = new CDbCriteria();
        $criteria->addCondition("account_type = ".PahPrefs::TypeCostAct());
        return PahChartMaster::model()->findAll($criteria);
    }

}
