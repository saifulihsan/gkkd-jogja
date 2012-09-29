<?php
global $systypes_array, $bank_account_types, $bank_transfer_types, 
	$payment_person_types, $wo_types_array, $wo_cost_types, $class_types,
	$quick_actions, $quick_entry_types, $stock_types, $tag_types;

$systypes_array = array (
    KAS_MASUK => "Kas Masuk",
	KAS_KELUAR => "Kas Keluar",
	ANGGARAN => "Anggaran",
    AKTIVITAS => "Aktivitas",
	BANKTRANSFER => "Mutasi Antar Kas/Bank",

	ST_SALESINVOICE => _("Sales Invoice"),
	ST_CUSTCREDIT => _("Customer Credit Note"),
	ST_CUSTPAYMENT => _("Customer Payment"),
	ST_CUSTDELIVERY => _("Delivery Note"),
	ST_LOCTRANSFER => _("Location Transfer"),
	ST_INVADJUST => _("Inventory Adjustment"),
	//ST_PURCHORDER => _("Purchase Order"),
    ST_PURCHORDER => "Faktur Pembelian Kredit",
	//ST_SUPPINVOICE => _("Supplier Invoice"),
    ST_SUPPINVOICE => "Faktur Pembelian Tunai",
	ST_SUPPCREDIT => _("Supplier Credit Note"),
	ST_SUPPAYMENT => _("Supplier Payment"),
	//ST_SUPPRECEIVE => _("Purchase Order Delivery"),
    ST_SUPPRECEIVE => _("Pembelian Tunai"),
	ST_WORKORDER => _("Work Order"),
	ST_MANUISSUE => _("Work Order Issue"),
	ST_MANURECEIVE => _("Work Order Production"),
	//ST_SALESORDER => _("Sales Order"),
	ST_SALESORDER => _("Faktur Penjualan Pesan"),
	ST_SALESQUOTE => _("Sales Quotation"),
	ST_COSTUPDATE => _("Cost Update"),
	ST_DIMENSION => _("Dimension"),
	ST_KASBON => _("Kas Bon"),
	ST_RETKASBON => _("Pengisian Kas Bon"),
    HPP => "Harga Pokok Produksi",
    ST_PEMBAYARAN => "Pembayaran Pelanggan",
    ST_PURCHPAY => "Pembayaran Supplier",
    ST_RETKASKECIL => "Kas Kecil",
    ST_ESTIMASI => "Estimasi"
	);

$type_shortcuts = array(
	KAS_MASUK => "KM", // general journal
	KAS_KELUAR => "KK",
	ANGGARAN => "AG",
    AKTIVITAS => "AK",
	BANKTRANSFER => "BT",
	ST_SALESINVOICE => _("SI"),
	ST_CUSTCREDIT => _("CN"),
	ST_CUSTPAYMENT => _("CP"),
	ST_CUSTDELIVERY => _("DN"),
	ST_LOCTRANSFER => _("IT"), // inventory transfer
	ST_INVADJUST => _("IA"),
	ST_PURCHORDER => _("PO"),
	ST_SUPPINVOICE => _("PI"), // purchase invoice
	ST_SUPPCREDIT => _("PC"),
	ST_SUPPAYMENT => _("SP"),
	ST_SUPPRECEIVE => _("GRN"),
	ST_WORKORDER => _("WO"),
	ST_MANUISSUE => _("WI"),
	ST_MANURECEIVE => _("WP"),
	ST_SALESORDER => _("SO"),
	ST_SALESQUOTE => _("SQ"),
	ST_COSTUPDATE => _("CU"),
	ST_DIMENSION => _("Dim")
);


//----------------------------------------------------------------------------------
//		Bank transaction types
//
$bank_account_types = array (
	BT_TRANSFER => _("Savings Account"),
		_("Chequing Account"),
		_("Credit Account"),
		_("Cash Account")
	);

$bank_transfer_types = array(
	BT_TRANSFER => _("Transfer"),
			_("Cheque"),
			_("Credit"),
			_("Cash")
	);

//----------------------------------------------------------------------------------
//	Payment types
//

$payment_person_types = array (
	PT_MISC => _("Miscellaneous"),
				_("Work Order"),
				_("Customer"),
				_("Supplier"),
				_("Quick Entry")
	);

//----------------------------------------------------------------------------------
//	Manufacturing types
//
$wo_types_array = array (
	WO_ASSEMBLY => _("Assemble"),
	WO_UNASSEMBLY => _("Unassemble"),
	WO_ADVANCED => _("Advanced Manufacture")
	);

$wo_cost_types = array(
	WO_LABOUR => _("Labour Cost"),
	WO_OVERHEAD => _("Overhead Cost"),
);

//----------------------------------------------------------------------------------
//	GL account classes
//
$class_types = array(
	CL_ASSETS => _("Assets"),
	CL_LIABILITIES => _("Liabilities"),
	CL_EQUITY => _("Equity"),
	CL_INCOME => _("Income"),
	CL_COGS => _("Cost of Goods Sold"),
	CL_EXPENSE => _("Expense"),
);

//----------------------------------------------------------------------------------
//	Quick entry types
//
$quick_actions = array(
	'=' => _('Remainder'), // post current base amount to GL account
	'a' => _('Amount'), // post amount to GL account
	'a+' => _('Amount, increase base'), // post amount to GL account and increase base
	'a-' => _('Amount, reduce base'), // post amount to GL account and reduce base
	'%' => _('% amount of base'),	// store acc*amount% to GL account
	'%+' => _('% amount of base, increase base'),	// ditto & increase base amount
	'%-' => _('% amount of base, reduce base'),	// ditto & reduce base amount
	'T' => _('Taxes added'), // post taxes calculated on base amount
	'T+' => _('Taxes added, increase base'), // ditto & increase base amount
	'T-' => _('Taxes added, reduce base'), // ditto & reduce base amount
	't' => _('Taxes included'), // post taxes calculated on base amount
	't+' => _('Taxes included, increase base'), // ditto & increase base amount
	't-' => _('Taxes included, reduce base') // ditto & reduce base amount
);

$quick_entry_types = array(
	QE_DEPOSIT => _("Bank Deposit"),
	QE_PAYMENT => _("Bank Payment"),
	QE_JOURNAL => _("Journal Entry"),
	QE_SUPPINV => _("Supplier Invoice/Credit")
);

//----------------------------------------------------------------------------------
// Types of stock items
$stock_types = array(
	'M' => _("Manufactured"),
	'B' => _("Purchased"),
	'D' => _("Service"),
	'T' => _("Raw Materials"),
	'P' => _("Barang Pesanan")
);
//----------------------------------------------------------------------------------

$bagian_produksi = array(
	BAG_POTONG => _("Bagian Potong"),
	BAG_SABLON => _("Bagian Sablon"),
	BAG_JAHIT => _("Bagian Jahit"),
	BAG_FINISH => _("Bagian Finish")
);

//----------------------------------------------------------------------------------

$tag_types = array (
	TAG_ACCOUNT   => _("Account"),
	TAG_DIMENSION => _("Dimension")
);

//----------------------------------------------------------------------------------
// crm contacts categories
$sys_crm_cats = array (
	'cust_branch' => _("Customer branch"),
	'supplier' => _("Supplier"),
	'shipper' => _("Shipper"),
	'company' => _("Company internal")
);
//----------------------------------------------------------------------------------

$pterm_types = array(
	PTT_PRE => _("Prepayment"),
	PTT_CASH => _("Cash"),
	PTT_DAYS => _("After No. of Days"),
	PTT_FOLLOWING => _("Day In Following Month")
);


?>