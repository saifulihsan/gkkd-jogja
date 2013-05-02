<?php
/**
 * Created by novebeta.
 * Date: 9/23/12
 * Time: 12:03 PM
 */
class MtReferenceCom
{
    function get_next_reference($type)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type_id =" . $type);
        $model = MtSysTypes::model()->find($criteria);
        return $model->next_reference;
    }

    function save_next_reference($type, $reference)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type_id =" . $type);
        $model = MtSysTypes::model()->find($criteria);
        $model->next_reference = trim($reference);
        $model->save();
    }

    function update_reference($type, $id, $reference)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("type =" . $type);
        $criteria->addCondition("type_no =" . $id);
        $model = MtRefs::model()->find($criteria);
        if ($model == null) {
            $model = new MtRefs();
            $model->type = $type;
            $model->type_no = $id;
        }
        $model->reference = $reference;
        $model->save();
    }

    function save($type, $id, $reference)
    {
        $this->update_reference($type, $id, $reference); // store in refs table
        $next = $this->_increment($reference); // increment default
        $this->save_next_reference($type, $next);
    }

    function _increment($reference, $back = false)
    {
        // New method done by Pete. So f.i. WA036 will increment to WA037 and so on.
        // If $reference contains at least one group of digits,
        // extract first didgits group and add 1, then put all together.
        // NB. preg_match returns 1 if the regex matches completely
        // also $result[0] holds entire string, 1 the first captured, 2 the 2nd etc.
        //
        if (preg_match('/^(\D*?)(\d+)(.*)/', $reference, $result) == 1) {
            list($all, $prefix, $number, $postfix) = $result;
            $dig_count = strlen($number); // How many digits? eg. 0003 = 4
            $fmt = '%0' . $dig_count . 'd'; // Make a format string - leading zeroes
            $val = intval($number + ($back ? ($number < 1 ? 0 : -1) : 1));
            $nextval = sprintf($fmt, $val); // Add one on, and put prefix back on
            return $prefix . $nextval . $postfix;
        } else
            return $reference;
    }
}
