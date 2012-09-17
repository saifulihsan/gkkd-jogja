<?php
/**
 * Created by JetBrains PhpStorm.
 * User: axioo
 * Date: 9/10/12
 * Time: 7:16 PM
 * To change this template use File | Settings | File Templates.
 */
class GlTransHelper
{
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
}
