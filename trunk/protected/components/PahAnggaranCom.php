<?php
/**
 * Created by novebeta.
 * Date: 9/23/12
 * Time: 6:06 AM
 */
class PahAnggaranCom
{
    static function is_periode_anggaran_exist($bulan, $tahun){
        $criteria = new CDbCriteria();
        $criteria->addCondition("periode_bulan =".$bulan);
        $criteria->addCondition("periode_tahun =".$tahun);
        $result = PahAnggaran::model()->count($criteria);
        return $result > 0;
    }

}
