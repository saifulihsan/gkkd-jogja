<?php
class Mt {
    // ------------------------------------------------ Void ----------------------------------------------------------------
    static function get_voided($type) {
        $void = Yii::app()->db->createCommand()->select('id')->from('mt_voided')->where('type=:type',
                        array(
                    ':type' => $type
                ))->queryColumn();
        return $void;
    }
    static function get_max_type_no($type) {
        $type_no = app()->db->createCommand()->select("IFNULL(MAX(mt_gl_trans.type_no),0)")->from(
                        "mt_gl_trans")->where('type=:type',
                        array(
                    ':type' => $type
                ))->queryScalar();
        return $type_no;
    }
    // ---------------------------------------------- Anggaran --------------------------------------------------------------
    static function is_periode_anggaran_exist($bulan, $tahun) {
        $criteria = new CDbCriteria();
        $criteria->addCondition("periode_bulan =" . $bulan);
        $criteria->addCondition("periode_tahun =" . $tahun);
        $result = MtAnggaran::model()->count($criteria);
        return $result > 0;
    }
    // --------------------------------------------- Bank Trans -------------------------------------------------------------
    static function get_next_trans_no_bank_trans() {
        $db = MtBankTrans::model()->getDbConnection();
        $total = $db->createCommand(
                        "SELECT MAX(trans_no)
        FROM mt_bank_trans where type=" . BANKTRANSFER)->queryScalar();
        return $total == null ? 0 : $total + 1;
    }
    static function get_next_trans_saldo_awal() {
        $db = MtGlTrans::model()->getDbConnection();
        $total = $db->createCommand(
                        "SELECT MAX(type_no)
        FROM mt_gl_trans where type=" . SALDO_AWAL)->queryScalar();
        return $total == null ? 0 : $total + 1;
    }
    static function get_balance_before_for_bank_account($from,
            $bank_account = null) {
        $bank_act = $bank_account == null ? '' : "bank_act=$bank_account AND";
        $db = MtBankTrans::model()->getDbConnection();
        $total = $db->createCommand(
                        "SELECT SUM(amount)
        FROM mt_bank_trans where $bank_act trans_date < '$from'")->queryScalar();
        return $total == null ? 0 : $total;
    }
    static function get_ledger_trans($from, $to) {
        $rows = Yii::app()->db->createCommand(
                        "SELECT
            mt_gl_trans.tran_date,
            mt_gl_trans.type,
            mt_gl_trans.type_no,
            refs.reference,
            SUM(IF(mt_gl_trans.amount>0, mt_gl_trans.amount,0)) as amount,
            users.user_id
            FROM
            mt_gl_trans
            LEFT JOIN mt_refs as refs ON
            (mt_gl_trans.type=refs.type AND mt_gl_trans.type_no=refs.type_no),users
            WHERE mt_gl_trans.tran_date BETWEEN '$from' AND '$to'
            GROUP BY mt_gl_trans.tran_date,mt_gl_trans.type,
            mt_gl_trans.type_no,mt_gl_trans.users_id
            ")->queryAll();
        return $rows;
    }
    static function get_general_ledger_trans($from, $to) {
        $rows = Yii::app()->db->createCommand(
                        "SELECT
            mt_gl_trans.type,
            mt_gl_trans.type_no,
            mt_gl_trans.tran_date,
            CONCAT(mt_chart_master.account_code,' ',mt_chart_master.account_name) as account,
            mt_gl_trans.amount
            FROM
            mt_gl_trans
            INNER JOIN mt_chart_master ON mt_gl_trans.account = mt_chart_master.account_code
            WHERE mt_gl_trans.tran_date BETWEEN '$from' AND '$to'
            ")->queryAll();
        return $rows;
    }
    static function get_bank_trans_view() {
        global $systypes_array;
        $bfw = Mt::get_balance_before_for_bank_account($_POST['trans_date_mulai'],
                        $_POST['bank_act']);
        $arr['data'][] = array(
            'type' => 'Saldo Awal - ' . sql2date($_POST['trans_date_mulai']),
            'ref' => '',
            'tgl' => '',
            'debit' => $bfw >= 0 ? number_format($bfw, 2) : '',
            'kredit' => $bfw < 0 ? number_format($bfw, 2) : '',
            'neraca' => '',
            'person' => ''
        );
        $credit = $debit = 0;
        $running_total = $bfw;
        if ($bfw > 0) $debit+=$bfw;
        else $credit+=$bfw;
        $result = Mt::get_bank_trans_for_bank_account($_POST['bank_act'],
                        $_POST['trans_date_mulai'], $_POST['trans_date_sampai']);
        foreach ($result as $myrow) {
            $running_total+=$myrow->amount;
            $jemaat = get_jemaat_from_user_id($myrow->users_id);
            $arr['data'][] = array(
                'type' => $systypes_array[$myrow->type],
                'ref' => $myrow->ref,
                'tgl' => sql2date($myrow->trans_date),
                'debit' => $myrow->amount >= 0 ? number_format($myrow->amount, 2)
                            : '',
                'kredit' => $myrow->amount < 0 ? number_format(-$myrow->amount,
                                2) : '',
                'neraca' => number_format($running_total, 2),
                'person' => $jemaat->real_name
            );
            if ($myrow->amount > 0) $debit+=$myrow->amount;
            else $credit+=$myrow->amount;
        }
        $arr['data'][] = array(
            'type' => 'Saldo Akhir - ' . sql2date($_POST['trans_date_sampai']),
            'ref' => '',
            'tgl' => '',
            'debit' => $running_total >= 0 ? number_format($running_total, 2) : '',
            'kredit' => $running_total < 0 ? number_format(-$running_total, 2) : '',
            'neraca' => '', // number_format($debit + $credit, 2),
            'person' => ''
        );
        return $arr;
    }
    static function get_bank_trans_for_bank_account($bank_account, $from, $to) {
        $criteria = new CDbCriteria();
        if ($bank_account != null)
                $criteria->addCondition("bank_act =" . $bank_account);
        $criteria->addBetweenCondition("trans_date", $from, $to);
        $criteria->order = "trans_date, id";
        return MtBankTrans::model()->findAll($criteria);
    }
    static function get_prefs($name) {
        $criteria = new CDbCriteria();
        if ($name != null) $criteria->addCondition("name ='$name'");
        else return null;
        $prefs = MtSysPrefs::model()->find($criteria);
        return $prefs->value;
    }
    static function is_bank_account($account_code) {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_code =" . $account_code);
        $bank_act = MtBankAccounts::model()->find($criteria);
        if ($bank_act != null) return $bank_act->id;
        else return false;
    }
    static function get_act_code_from_bank_act($bank_act) {
        $bank = MtBankAccounts::model()->findByPk($bank_act);
        if ($bank != null) return $bank->accountCode->account_code;
        else return false;
    }
    static function add_bank_trans($type, $trans_no, $bank_act, $ref, $date_,
            $amount, $person_id) {
        $bank_trans = new MtBankTrans();
        $bank_trans->type = $type;
        $bank_trans->trans_no = $trans_no;
        $bank_trans->bank_act = $bank_act;
        $bank_trans->ref = $ref;
        $bank_trans->trans_date = $date_;
        $bank_trans->amount = $amount;
        $bank_trans->users_id = $person_id;
        $bank_trans->save();
    }
    // --------------------------------------------- Gl Trans ---------------------------------------------------------------
    static function get_sql_for_journal_inquiry($from, $to) {
        $rows = Yii::app()->db->createCommand()->select(
                        "gl_trans.tran_date,gl_trans.type,refs.reference,Sum(IF(amount>0, amount,0)) AS amount,
                comments.memo_,gl_trans.person_id,gl_trans.type_no")->from('gl_trans')->join(
                        'comments',
                        'gl_trans.type = comments.type AND gl_trans.type_no = comments.type_no')->Join(
                        'refs',
                        'gl_trans.type = refs.type AND gl_trans.type_no = refs.type_no')->where(
                        "gl_trans.amount!=0 and gl_trans.tran_date >= '$from'
		        AND gl_trans.tran_date <= '$to'")->group('gl_trans.type, gl_trans.type_no')->order(
                        'tran_date desc')->queryAll();
        return $rows;
    }
    static function add_gl($type, $trans_id, $date_, $ref, $account, $memo_,
            $amount, $person_id, $id_mobil) {
        $is_bank_to = Mt::is_bank_account($account);
        Mt::add_gl_trans($type, $trans_id, $date_, $account, $memo_, $amount,
                $person_id, $id_mobil);
        if ($is_bank_to) {
            Mt::add_bank_trans($type, $trans_id, $is_bank_to, $ref, $date_,
                    $amount, $person_id);
        }
        Mt::add_comments($type, $trans_id, $date_, $memo_);
        // return $trans_id;
    }
    static function add_gl_trans($type, $trans_id, $date_, $account, $memo_,
            $amount, $person_id, $id_mobil) {
        $gl_trans = new MtGlTrans();
        $gl_trans->type = $type;
        $gl_trans->type_no = $trans_id;
        $gl_trans->tran_date = $date_;
        $gl_trans->account = $account;
        $gl_trans->memo_ = $memo_;
        $gl_trans->users_id = $person_id;
        $gl_trans->amount = $amount;
        $gl_trans->id_mobil = $id_mobil;
        $gl_trans->save();
        return $amount;
    }
    static function get_sum_account_trans($account, $id_mobil, $from_date,
            $to_date) {
        $comm_mobil = '';
        if ($id_mobil != null) {
            $comm_mobil = "AND mm.id_mobil = $id_mobil ";
        }
        $type_no = app()->db->createCommand(
                        "SELECT IFNULL(SUM(mgt.amount),0)
		FROM gkkd.mt_gl_trans mgt
		INNER JOIN gkkd.mt_mobil mm ON ( mgt.id_mobil = mm.id_mobil  )
		WHERE mgt.account = '$account' AND (mgt.tran_date BETWEEN '$from_date' AND '$to_date') $comm_mobil")
                ->queryScalar();
        return $type_no;
    }
    // --------------------------------------------- Comments ---------------------------------------------------------------
    static function get_comments($type, $type_no) {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type=" . $type);
        $criteria->addCondition("id=" . $type_no);
        return MtComments::model()->find($criteria);
    }
    static function add_comments($type, $type_no, $date_, $memo_) {
        if ($memo_ != null && $memo_ != "") {
            $comment = new MtComments();
            $comment->type = $type;
            $comment->type_no = $type_no;
            $comment->date_ = $date_;
            $comment->memo_ = $memo_;
            $comment->save();
        }
    }
    static function update_comments($type, $id, $date_, $memo_) {
        if ($date_ == null) {
            Mt::delete_comments($type, $id);
            Mt::add_comments($type, $id,
                    Yii::app()->dateFormatter->format('yyyy-MM-dd', time()),
                    $memo_);
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
    static function delete_comments($type, $type_no) {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type=" . $type);
        $criteria->addCondition("id=" . $type_no);
        $comment = MtComments::model()->find($criteria);
        $comment->delete();
    }
    // ---------------------------------------------- Report ----------------------------------------------------------------
    static function get_beban_per_mobil() {
        $rows = app()->db->createCommand("SELECT account_code FROM mt_chart_master WHERE account_code REGEXP '^5[2-5]'")->queryAll();
        return $rows;
    }
    static function get_beban() {
        $rows = app()->db->createCommand("SELECT account_code FROM mt_chart_master WHERE account_code REGEXP '^5[1-9]'")->queryAll();
        return $rows;
    }
    static function get_mutasi_kas_ditangan($start_date, $end_date) {
        $criteria = new CDbCriteria();
        $criteria->addBetweenCondition('trans_date', $start_date, $end_date);
        $model = MtBankTrans::model()->findAll($criteria);
        return $model;
    }
    static function get_lap_penjualam_per_mobil($nopol, $from, $to) {
        $rows = Yii::app()->db->createCommand(
                        "SELECT
            mt_pinjam_kendaraan.trans_date,
            mt_pinjam_kendaraan.doc_ref,
            mt_kembali_kendaraan.total,
            mt_kembali_kendaraan.disc,
            (mt_kembali_kendaraan.total - mt_kembali_kendaraan.disc) AS netto
            FROM mt_pinjam_kendaraan
            INNER JOIN mt_kembali_kendaraan ON mt_pinjam_kendaraan.id_pinjam = mt_kembali_kendaraan.id_pinjam
            INNER JOIN mt_mobil ON mt_pinjam_kendaraan.id_mobil = mt_mobil.id_mobil
            WHERE mt_mobil.id_mobil = $nopol AND (mt_kembali_kendaraan.trans_date BETWEEN '$from' AND '$to')
            ")->queryAll();
        return $rows;
    }
    static function get_lap_penjualam_per_kelompok_konsumen($id_kelompok, $from,
            $to) {
        $rows = Yii::app()->db->createCommand(
                        "SELECT
        mt_pinjam_kendaraan.trans_date,
        mt_pinjam_kendaraan.doc_ref,
        mt_kembali_kendaraan.total,
        mt_kembali_kendaraan.disc,
        (mt_kembali_kendaraan.total - mt_kembali_kendaraan.disc) AS netto
        FROM mt_pinjam_kendaraan
        INNER JOIN mt_kembali_kendaraan ON mt_pinjam_kendaraan.id_pinjam = mt_kembali_kendaraan.id_pinjam
        INNER JOIN mt_kelompok_pelanggan ON mt_pinjam_kendaraan.id_kelompok = mt_kelompok_pelanggan.id_kelompok
        WHERE mt_kelompok_pelanggan.id_kelompok = $id_kelompok AND
            (mt_pinjam_kendaraan.trans_date BETWEEN '$from' AND '$to')")->queryAll();
        return $rows;
    }
    static function get_arr_kode_rekening_pengeluaran($code = "") {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_type='" . MtPrefs::TypeCostAct() . "'");
        if ($code != "account_code" && $code != "")
                $criteria->addCondition("account_code='$code'");
        $model = MtChartMaster::model()->findAll($criteria);
        $daftar = array();
        foreach ($model as $coderek) {
            $daftar[$coderek['account_code']] = $coderek['account_name'];
        }
        return $daftar;
    }
    static function get_pengeluaran_detil_kode_rekening($start_date, $end_date,
            $code) {
        $rows = Yii::app()->db->createCommand()->select(
                        "a.tran_date,a.memo_,IF(a.amount > 0,a.amount,'') as debit,IF(a.amount < 0,-a.amount,'') as kredit")->from(
                        "mt_gl_trans a")->rightJoin("mt_chart_master b",
                        "a.account=b.account_code
            AND a.tran_date between :start and :end",
                        array(
                    ':start' => $start_date,
                    ':end' => $end_date
                ))->leftJoin('mt_voided c', "a.type_no=c.id AND c.type=a.type")->where(
                        "b.account_code=:code and a.type != :type and ISNULL(c.date_)",
                        array(
                    'code' => $code,
                    'type' => VOID
                ))->order("a.tran_date")->queryAll();
        // ->where("b.account_code=:code",array('code'=>$code))
        return $rows;
    }
    static function get_pengeluaran_per_kode_rekening($start_date, $end_date) {
        $rows = Yii::app()->db->createCommand()->select(
                        "b.account_code,b.account_name as nama_rekening,IFNULL(sum(a.amount),0) as total_beban")->from(
                        "mt_gl_trans a")->rightJoin("mt_chart_master b",
                        "a.account=b.account_code
            AND a.tran_date between :start and :end",
                        array(
                    ':start' => $start_date,
                    ':end' => $end_date
                ))->where("b.account_type=:type and !b.inactive",
                        array(
                    ':type' => MtPrefs::TypeCostAct()
                ))->group("b.account_name")->order("b.account_code")->queryAll();
        return $rows;
    }
    static function get_total_pengeluaran($start_date, $end_date, $code = "") {
        $kode = $code == "" ? "" : "and b.account_code = '$code'";
        $rows = Yii::app()->db->createCommand()->select("sum(a.amount) as total_beban")->from(
                        "mt_gl_trans a")->join("mt_chart_master b",
                        "a.account=b.account_code")->where(
                        "a.tran_date between :start and :end and b.account_type=:type $kode",
                        array(
                    ':start' => $start_date,
                    ':end' => $end_date,
                    ':type' => MtPrefs::TypeCostAct()
                ))->queryScalar();
        return $rows == null ? 0 : $rows;
    }
    static function get_detil_pendapatan($start_date, $end_date) {
        $rows = Yii::app()->db->createCommand()->select(
                        "b.account_name as nama_rekening,IFNULL(-sum(a.amount),0) as total_pendapatan")->from(
                        "mt_gl_trans a")->rightJoin("mt_chart_master b",
                        "a.account=b.account_code and
                a.tran_date between :start and :end",
                        array(
                    ':start' => $start_date,
                    ':end' => $end_date
                ))->where("b.account_type=:type and !b.inactive",
                        array(
                    ':type' => MtPrefs::TypePendapatanAct()
                ))->group("b.account_name")->order("b.account_code")->queryAll();
        return $rows;
    }
    static function get_total_pendapatan($start_date, $end_date) {
        $rows = Yii::app()->db->createCommand()->select("-sum(a.amount) as total_pendapatan")->from(
                        "mt_gl_trans a")->join("mt_chart_master b",
                        "a.account=b.account_code")->where(
                        "a.tran_date between :start and :end and b.account_type=:type",
                        array(
                    ':start' => $start_date,
                    ':end' => $end_date,
                    ':type' => MtPrefs::TypePendapatanAct()
                ))->order("b.account_code")->queryScalar();
        return $rows == null ? 0 : $rows;
    }
    static function get_penghuni_pondok($where = "") {
        return app()->db->createCommand()->from("jemaat")->join("mt_member",
                        "jemaat.nij = mt_member.jemaat_nij")->where("mt_member.inactive = 0 $where")->order(
                        "jemaat.real_name asc")->queryAll();
    }
    static function get_chart_master_beban() {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_type = " . MtPrefs::TypeCostAct());
        return MtChartMaster::model()->findAll($criteria);
    }
    static function account_in_gl_trans($account) {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account = '$account'");
        $count = MtGlTrans::model()->count($criteria);
        return $count > 0;
    }
    static function account_used_bank($account) {
        $criteria = new CDbCriteria();
        $criteria->addCondition("account_code = '$account'");
        $count = MtBankAccounts::model()->count($criteria);
        return $count > 0;
    }
    static function get_payee_payoor($type, $id) {
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