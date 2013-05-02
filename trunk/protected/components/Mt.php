<?php
/**
 * Created by novebeta.
 * Date: 9/28/12
 * Time: 1:04 PM
 */
class Mt
{
//------------------------------------------------ Void ----------------------------------------------------------------
    static function get_voided($type)
    {
        $void = Yii::app()->db->createCommand()
            ->select('id')
            ->from('mt_voided')
            ->where('type=:type', array(':type' => $type))
            ->queryColumn();
        return $void;
    }

//---------------------------------------------- Anggaran --------------------------------------------------------------
    static function is_periode_anggaran_exist($bulan, $tahun)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("periode_bulan =" . $bulan);
        $criteria->addCondition("periode_tahun =" . $tahun);
        $result = MtAnggaran::model()->count($criteria);
        return $result > 0;
    }

//--------------------------------------------- Bank Trans -------------------------------------------------------------
    static function get_next_trans_no_bank_trans()
    {
        $db = MtBankTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT MAX(trans_no)
        FROM mt_bank_trans where type=" . BANKTRANSFER)->queryScalar();
        return $total == null ? 0 : $total + 1;
    }

    static function get_next_trans_saldo_awal()
    {
        $db = MtGlTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT MAX(type_no)
        FROM mt_gl_trans where type=" . SALDO_AWAL)->queryScalar();
        return $total == null ? 0 : $total + 1;
    }

    static function get_balance_before_for_bank_account($from, $bank_account = null)
    {
        $bank_act = $bank_account == null ? '' : "bank_act=$bank_account AND";
        $db = MtBankTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT SUM(amount)
        FROM mt_bank_trans where $bank_act trans_date < '$from'")
            ->queryScalar();
        return $total == null ? 0 : $total;
    }

    static function get_bank_trans_for_bank_account($bank_account, $from, $to)
    {
        $criteria = new CDbCriteria();
        if ($bank_account != null)
            $criteria->addCondition("bank_act =" . $bank_account);
//        $criteria->addCondition("trans_date >= '$from'");
//        $criteria->addCondition("trans_date <= '$to'");
        $criteria->addBetweenCondition("trans_date",$from,$to);
        $criteria->order = "trans_date, id";
        return MtBankTrans::model()->findAll($criteria);
    }

    static function is_bank_account($account_code)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_code =" . $account_code);
        $bank_act = MtBankAccounts::model()->find($criteria);
        if ($bank_act != null)
            return $bank_act->id;
        else
            return false;
    }

    static function get_act_code_from_bank_act($bank_act)
    {
        $bank = MtBankAccounts::model()->findByPk($bank_act);
        if ($bank != null)
            return $bank->accountCode->account_code;
        else
            return false;
    }

    static function add_bank_trans($type, $trans_no, $bank_act, $ref, $date_, $amount, $person_id)
    {
        $bank_trans = new MtBankTrans;
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
        $is_bank_to = Mt::is_bank_account($account);
        Mt::add_gl_trans($type, $trans_id, $date_, $account, $memo_, $amount, $person_id);
        if ($is_bank_to) {
            Mt::add_bank_trans($type, $trans_id, $is_bank_to, $ref, $date_, $amount, $person_id);
        }
        Mt::add_comments($type, $trans_id, $date_, $memo_);
//        return $trans_id;
    }

    static function add_gl_trans($type, $trans_id, $date_, $account, $memo_, $amount, $person_id)
    {
        $gl_trans = new MtGlTrans;
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
        return MtComments::model()->find($criteria);
    }

    static function add_comments($type, $type_no, $date_, $memo_)
    {
        if ($memo_ != null && $memo_ != "") {
            $comment = new MtComments;
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
            Mt::delete_comments($type, $id);
            Mt::add_comments($type, $id, Yii::app()->dateFormatter->format('yyyy-MM-dd', time()), $memo_);
        } else {
            $criteria = new CDbCriteria();
            $criteria->addCondition("type=" . $type);
            $criteria->addCondition("id=" . $type_no);
            $criteria->addCondition("date_=" . $date);
            $comment = MtComments::model()->find($criteria);
            $comment->memo_ = $memo_;
            $comment->save();
        }
    }

    static function delete_comments($type, $type_no)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type=" . $type);
        $criteria->addCondition("id=" . $type_no);
        $comment = MtComments::model()->find($criteria);
        $comment->delete();
    }

//---------------------------------------------- Report ----------------------------------------------------------------
    static function get_mutasi_kas_ditangan($start_date, $end_date)
    {
        $criteria = new CDbCriteria();
        $criteria->addBetweenCondition('trans_date', $start_date, $end_date);
        $model = MtBankTrans::model()->findAll($criteria);
        return $model;
    }

    static function get_arr_kode_rekening_pengeluaran($code = ""){
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_type='".MtPrefs::TypeCostAct()."'");
        if($code != "account_code" && $code != "")
            $criteria->addCondition("account_code='$code'");
        $model = MtChartMaster::model()->findAll($criteria);
        $daftar = array();
        foreach($model as $coderek){
            $daftar[$coderek['account_code']] = $coderek['account_name'];
        }
        return $daftar;
    }

    static function get_pengeluaran_detil_kode_rekening($start_date, $end_date, $code)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("a.tran_date,a.memo_,IF(a.amount > 0,a.amount,'') as debit,IF(a.amount < 0,-a.amount,'') as kredit")
            ->from("mt_gl_trans a")
            ->rightJoin("mt_chart_master b", "a.account=b.account_code
            AND a.tran_date between :start and :end",array(':start' => $start_date, ':end' => $end_date))
            ->leftJoin('mt_voided c',"a.type_no=c.id AND c.type=a.type")
            ->where("b.account_code=:code and a.type != :type and ISNULL(c.date_)",array('code'=>$code,'type'=>VOID))
            //->where("b.account_code=:code",array('code'=>$code))
            ->order("a.tran_date")
            ->queryAll();
        return $rows;
    }

    static function get_pengeluaran_per_kode_rekening($start_date, $end_date)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("b.account_code,b.account_name as nama_rekening,IFNULL(sum(a.amount),0) as total_beban")
            ->from("mt_gl_trans a")
            ->rightJoin("mt_chart_master b", "a.account=b.account_code
            AND a.tran_date between :start and :end",
            array(':start' => $start_date, ':end' => $end_date))
            ->where("b.account_type=:type and !b.inactive",
            array(':type' => MtPrefs::TypeCostAct()))
            ->group("b.account_name")
            ->order("b.account_code")
            ->queryAll();
        return $rows;
    }

    static function get_total_pengeluaran($start_date, $end_date, $code = "")
    {
        $kode = $code == "" ? "" : "and b.account_code = '$code'";
        $rows = Yii::app()->db->createCommand()
            ->select("sum(a.amount) as total_beban")
            ->from("mt_gl_trans a")
            ->join("mt_chart_master b", "a.account=b.account_code")
            ->where("a.tran_date between :start and :end and b.account_type=:type $kode",
            array(':start' => $start_date, ':end' => $end_date, ':type' => MtPrefs::TypeCostAct()))
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_beban_aktivitas($start_date, $end_date)
    {
        $void = Mt::get_voided(AKTIVITAS);
        $void_st = '';
        if(count($void)>0)
            $void_st = "and mt_aktivitas.aktivitas_id not in (".join(',',$void).")";
        $query = Yii::app()->db->createCommand()
            ->select("mt_sub_aktivitas.nama as sub_aktivitas,IFNULL(Sum(mt_aktivitas.amount),0) as total_beban")
            ->from("mt_aktivitas")
            ->rightJoin("mt_sub_aktivitas", "mt_aktivitas.mt_sub_aktivitas_id = mt_sub_aktivitas.id
            AND mt_aktivitas.trans_date between :start and :end $void_st ",
            array(':start' => $start_date, ':end' => $end_date))
            ->where("!mt_sub_aktivitas.inactive")
            ->group("mt_sub_aktivitas.nama");
        $rows = $query->queryAll();
        return $rows;
    }

    static function get_total_beban_aktivitas($start_date, $end_date)
    {
        $void = Mt::get_voided(AKTIVITAS);
        $void_st = '';
        if(count($void)>0)
            $void_st = "and mt_aktivitas.aktivitas_id not in (".join(',',$void).")";
        $rows = Yii::app()->db->createCommand()
            ->select("Sum(mt_aktivitas.amount) as total_beban")
            ->from("mt_aktivitas")
            ->join("mt_sub_aktivitas", "mt_aktivitas.mt_sub_aktivitas_id = mt_sub_aktivitas.id")
            ->where("mt_aktivitas.trans_date between :start and :end $void_st ",
            array(':start' => $start_date, ':end' => $end_date))
            ->queryScalar();
//            ->where("mt_aktivitas.trans_date between :start and :end",
//            array(':start' => $start_date, ':end' => $end_date))
        return $rows == null ? 0 : $rows;
    }

    static function get_beban_anak($start_date, $end_date, $anak_id)
    {
        $void = Mt::get_voided(AKTIVITAS);
        $void_st = '';
        if(count($void)>0)
            $void_st = "and mt_aktivitas.aktivitas_id not in (".join(',',$void).")";
        $per_anak = $anak_id == 'undefined' ? '' : "AND mt_member.id = $anak_id";
        $rows = Yii::app()->db->createCommand()
            ->select("Sum(mt_aktivitas.amount) as amount,jemaat.real_name")
            ->from("mt_aktivitas")
            ->rightJoin("mt_member", "mt_aktivitas.mt_member_id = mt_member.id and
                mt_aktivitas.trans_date between '$start_date' and '$end_date' $void_st ")
            ->join("jemaat", "mt_member.jemaat_nij = jemaat.nij")
            ->where("!mt_member.inactive")
            ->group("jemaat.real_name")
            ->queryAll();
        return $rows;
    }

    static function get_total_beban_anak($start_date, $end_date, $anak_id)
    {
        $void = Mt::get_voided(AKTIVITAS);
        $void_st = '';
        if(count($void)>0)
            $void_st = "and mt_aktivitas.aktivitas_id not in (".join(',',$void).")";
        $per_anak = $anak_id == 'undefined' ? '' : "AND mt_member.id = $anak_id";
        $rows = Yii::app()->db->createCommand()
            ->select("Sum(mt_aktivitas.amount) as amount")
            ->from("mt_aktivitas")
            ->rightJoin("mt_member", "mt_aktivitas.mt_member_id = mt_member.id and
                mt_aktivitas.trans_date between '$start_date' and '$end_date' $void_st ")
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_beban_grup($start_date, $end_date, $anak_id)
    {
        $void = Mt::get_voided(T_AKTIVITASGRUP);
        $void_st = '';
        if(count($void)>0)
            $void_st = "and mt_aktivitas_grup_trans.aktivitas_id not in (".join(',',$void).")";
        $per_anak = $anak_id == 'undefined' ? '' : "AND mt_member.id = $anak_id";
        $rows = Yii::app()->db->createCommand()
            ->select("IFNULL(Sum(mt_aktivitas_grup_trans.amount),0) as amount,mt_aktivitas_grup.name")
            ->from("mt_aktivitas_grup_trans")
            ->rightJoin("mt_aktivitas_grup", "mt_aktivitas_grup_trans.mt_aktivitas_grup_id = mt_aktivitas_grup.id and
                mt_aktivitas_grup_trans.trans_date between '$start_date' and '$end_date' $void_st")
            ->where("!mt_aktivitas_grup.inactive")
            ->group("mt_aktivitas_grup.name")
            ->queryAll();
        return $rows;
    }

    static function get_total_beban_grup($start_date, $end_date, $anak_id)
    {
        $void = Mt::get_voided(T_AKTIVITASGRUP);
//        $void = Mt::get_voided(7);
        $void_st = '';
        if(count($void)>0)
            $void_st = "and mt_aktivitas_grup_trans.aktivitas_id not in (".join(',',$void).")";
        $per_anak = $anak_id == 'undefined' ? '' : "AND mt_member.id = $anak_id";
        $rows = Yii::app()->db->createCommand()
            ->select("Sum(mt_aktivitas_grup_trans.amount) as amount")
            ->from("mt_aktivitas_grup_trans")
            ->rightJoin("mt_aktivitas_grup", "mt_aktivitas_grup_trans.mt_aktivitas_grup_id = mt_aktivitas_grup.id and
                mt_aktivitas_grup_trans.trans_date between '$start_date' and '$end_date' $void_st")
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_detil_pendapatan($start_date, $end_date)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("b.account_name as nama_rekening,IFNULL(-sum(a.amount),0) as total_pendapatan")
            ->from("mt_gl_trans a")
            ->rightJoin("mt_chart_master b", "a.account=b.account_code and 
                a.tran_date between :start and :end",array(':start' => $start_date, ':end' => $end_date))
            ->where("b.account_type=:type and !b.inactive", array(':type' => MtPrefs::TypePendapatanAct()))
            ->group("b.account_name")
            ->order("b.account_code")
            ->queryAll();
        return $rows;
    }

    static function get_total_pendapatan($start_date, $end_date)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("-sum(a.amount) as total_pendapatan")
            ->from("mt_gl_trans a")
            ->join("mt_chart_master b", "a.account=b.account_code")
            ->where("a.tran_date between :start and :end and b.account_type=:type",
            array(':start' => $start_date, ':end' => $end_date, ':type' => MtPrefs::TypePendapatanAct()))
            ->order("b.account_code")
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_realisasi_by_code($start_date, $end_date, $code)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("sum(a.amount) as total_realisasi")
            ->from("mt_gl_trans a")
            ->join("mt_chart_master b", "a.account=b.account_code")
            ->where("a.tran_date between :start and :end and b.account_code=:code",
            array(':start' => $start_date, ':end' => $end_date, ':code' => $code))
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_anggaran_by_code($month, $year, $code)
    {
        $rows = Yii::app()->db->createCommand()
            ->select("mt_anggaran_detil.amount AS anggaran")
            ->from("mt_anggaran_detil")
            ->join("mt_anggaran", "mt_anggaran.id = mt_anggaran_detil.mt_anggaran_id")
            ->where("mt_anggaran.periode_bulan = :month AND mt_anggaran.periode_tahun = :year AND
                mt_anggaran_detil.mt_chart_master_account_code = :code",
            array(':month' => $month, ':year' => $year, ':code' => $code))
            ->queryScalar();
        return $rows == null ? 0 : $rows;
    }

    static function get_penghuni_pondok($where=""){
         return app()->db->createCommand()
             ->from("jemaat")
             ->join("mt_member","jemaat.nij = mt_member.jemaat_nij")
             ->where("mt_member.inactive = 0 $where")
             ->order("jemaat.real_name asc")
             ->queryAll();
    }

    static function get_chart_master_beban()
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_type = " . MtPrefs::TypeCostAct());
        return MtChartMaster::model()->findAll($criteria);
    }

    static function account_in_gl_trans($account)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account = '$account'");
        $count = MtGlTrans::model()->count($criteria);
        return $count > 0;
    }

    static function account_used_bank($account)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_code = '$account'");
        $count = MtBankAccounts::model()->count($criteria);
        return $count > 0;
    }

    static function get_payee_payoor($type, $id)
    {
        switch ($type) {
            case KAS_MASUK:
                $model = MtKasMasuk::model()->findAllByPk($id);
                return $model->MtDonatur->name;
                break;
            case KAS_KELUAR:
                $model = MtKasKeluar::model()->findAllByPk($id);
                return $model->MtSuppliers->supp_name;
                break;
            case AKTIVITAS:
                $model = MtAktivitas::model()->findAllByPk($id);
                return $model->MtSuppliers->supp_name;
                break;
            case BANKTRANSFER:
                $criteria = new CDbCriteria();
                $criteria->addCondition('type=' . BANKTRANSFER);
                $criteria->addCondition("trans_no=$id");
                $model = MtBankTrans::model()->find($criteria);
                $jemaat = get_jemaat_from_user_id($model->users_id);
                return $jemaat->real_name;
                break;
            case VOID:
                $criteria = new CDbCriteria();
                $criteria->addCondition('type=' . VOID);
                $criteria->addCondition("trans_no=$id");
                $model = MtBankTrans::model()->find($criteria);
                $jemaat = get_jemaat_from_user_id($model->users_id);
                return $jemaat->real_name;
                break;
            case SALDO_AWAL:
                $criteria = new CDbCriteria();
                $criteria->addCondition('type=' . SALDO_AWAL);
                $criteria->addCondition("trans_no=$id");
                $model = MtBankTrans::model()->find($criteria);
                $jemaat = get_jemaat_from_user_id($model->users_id);
                return $jemaat->real_name;
                break;
            case T_AKTIVITASGRUP:
                $model = MtAktivitasGrupTrans::model()->findAllByPk($id);
                return $model->MtSuppliers->supp_name;
                ;
                break;
        }
    }
}
