<?php
/**
 * Created by novebeta.
 * Date: 9/23/12
 * Time: 12:03 PM
 */
class PahReferenceCom
{

    function get_next_reference($type)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type_id =".$type);
        $model = PahSysTypes::model()->find($criteria);
        return $model->next_reference;

//        $sql = "SELECT next_reference FROM ".TB_PREF."sys_types WHERE type_id = ".db_escape($type);
//
//        $result = db_query($sql,"The last transaction ref for $type could not be retreived");
//
//        $row = db_fetch_row($result);
//        return $row[0];
    }

    function save_next_reference($type, $reference)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type_id =".$type);
        $model = PahSysTypes::model()->find($criteria);
        $model->next_reference = trim($reference);
        $model->save();
//        $sql = "UPDATE ".TB_PREF."sys_types SET next_reference=" . db_escape(trim($reference))
//            . " WHERE type_id = ".db_escape($type);
//
//        db_query($sql, "The next transaction ref for $type could not be updated");
    }

    function update_reference($type, $id, $reference)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type =".$type);
        $criteria->addCondition("type_no =".$id);
        $model = PahRefs::model()->find($criteria);
        if($model == null){
            $model = new PahRefs();
            $model->type = $type;
            $model->type_no = $id;
        }
        $model->reference = $reference;
        $model->save();
//
//
//        $sql = "REPLACE ".TB_PREF."refs SET reference=".db_escape($reference)
//            .", type=".db_escape($type).", id=".db_escape($id);
//        db_query($sql, "could not update reference entry");
    }

    function save($type, $id, $reference)
    {
        $this->update_reference($type, $id, $reference); // store in refs table
        $next = $this->_increment($reference);	// increment default
        $this->save_next_reference($type, $next);

//        if ($reference == $this->get_next($type)) { // if reference was not changed from default
//            $next = $this->_increment($reference);	// increment default
//            save_next_reference($type, $next);
//        }
    }

    function _increment($reference, $back=false)
    {
        // New method done by Pete. So f.i. WA036 will increment to WA037 and so on.
        // If $reference contains at least one group of digits,
        // extract first didgits group and add 1, then put all together.
        // NB. preg_match returns 1 if the regex matches completely
        // also $result[0] holds entire string, 1 the first captured, 2 the 2nd etc.
        //
        if (preg_match('/^(\D*?)(\d+)(.*)/', $reference, $result) == 1)
        {
            list($all, $prefix, $number, $postfix) = $result;
            $dig_count = strlen($number); // How many digits? eg. 0003 = 4
            $fmt = '%0' . $dig_count . 'd'; // Make a format string - leading zeroes
            $val = intval($number + ($back ? ($number<1 ? 0 : -1) : 1));
            $nextval =  sprintf($fmt, $val); // Add one on, and put prefix back on

            return $prefix.$nextval.$postfix;
        }
        else
            return $reference;
    }
}
