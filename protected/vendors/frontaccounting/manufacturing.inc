<?php
include_once($path_to_root . "/includes/db/manufacturing_db.inc");


function is_manufactured($mb_flag)
{
	return ($mb_flag == 'M');
}

function is_purchased($mb_flag)
{
	return ($mb_flag == 'B');
}

function is_service($mb_flag)
{
	return ($mb_flag == 'D');
}

function is_materials($mb_flag)
{
	return ($mb_flag == 'T');
}

function is_barang_pesanan($mb_flag)
{
	return ($mb_flag == 'P');
}

function has_stock_holding($mb_flag)
{
	return is_purchased($mb_flag) || is_manufactured($mb_flag);
}

//--------------------------------------------------------------------------------------

?>
