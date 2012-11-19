<?php
require_once(Yii::app()->basePath. '/vendors/frontaccounting/db/references_db.inc');

class references
{
	//
	//	Get reference from refs table for given transaction.
	//	Used for transactions which do not hold references (journal and bank).
	//
	function get($type, $id) 
	{
		return get_reference($type, $id);
	}
	//
	// Check if reference is used for any non voided transaction (used for ST_JOURNALENTRY type)
	//
	function exists($type, $reference) 
	{
		return (find_reference($type, $reference) != null);
	}
	//
	// Get default reference on new transaction creation.
	//
	function get_next($type) 
	{
		return get_next_reference($type);
	}
	//
	// Check reference is valid before add/update transaction.
	//
	function is_valid($reference) 
	{
		return strlen(trim($reference)) > 0;
	}
	//
	//	Save reference (and prepare next) on write transaction.
	//
	function save($type, $id, $reference) 
	{
		update_reference($type, $id, $reference); // store in refs table
		if ($reference == $this->get_next($type)) { // if reference was not changed from default
			$next = $this->_increment($reference);	// increment default
			save_next_reference($type, $next);
		}
	}
	//
	// Restore previous reference (if possible) after voiding transaction.
	//
	function restore_last($type, $id) 
	{
		$reference = get_reference($type, $id);
		$prev = $this->_increment($this->get_next($type), true); //decrement
		if ($reference==$prev) {
			save_next_reference($type, $prev);
		}
	}
	//-----------------------------------------------------------------------
	//
	//	Increments (or decrements if $back==true) reference template
	//
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

//----------------------------------------------------------------------------

function is_new_reference($ref, $type)
{
	$db_info = get_systype_db_info($type);
	$db_name = $db_info[0];
	$db_type = $db_info[1];
	$db_trans = $db_info[2];
	$db_ref = $db_info[3];
	
	$ref = db_escape(trim($ref));
	$type = db_escape($type);
	
	if ($db_ref == null) { // journal or bank trans store references in refs table
		$db_name = TB_PREF."refs";
		$db_type = 'type';
		$db_trans = 'id';
		$db_ref = 'reference';
	}

	if ($db_type != null) {
		$sql = "SELECT $db_ref FROM $db_name 
			LEFT JOIN ".TB_PREF."voided v ON 
				$db_name.$db_type=v.type AND $db_name.$db_trans=v.id
			WHERE $db_name.$db_ref=$ref AND ISNULL(v.id)
				AND $db_name.$db_type=$type";
	} else {
		$sql = "SELECT $db_ref FROM $db_name 
			LEFT JOIN ".TB_PREF."voided v ON 
				v.type=$type AND $db_name.$db_trans=v.id
			WHERE $db_ref=$ref AND ISNULL(v.id)";
	}

	$result = db_query($sql, "could not test for unique reference");

	return (db_num_rows($result) == 0);

}


?>