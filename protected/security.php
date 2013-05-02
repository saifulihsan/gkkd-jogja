<?php

/**
 * Created by novebeta.
 * Date: 11/12/12
 * Time: 5:05 PM
 */
defined('ADMINISTRATOR') or define('ADMINISTRATOR', '0000');
defined('PONDOKHARAPAN') or define('PONDOKHARAPAN', '1000');
defined('PAHMASTER') or define('PAHMASTER', '1100');
defined('PAHKODE') or define('PAHKODE', '1110');
defined('PAHKODEADD') or define('PAHKODEADD', '1111');
defined('PAHKODEEDIT') or define('PAHKODEEDIT', '1112');
defined('PAHKAS') or define('PAHKAS', '1120');
defined('PAHKASADD') or define('PAHKASADD', '1121');
defined('PAHKASEDIT') or define('PAHKASEDIT', '1122');
defined('PAHANAK') or define('PAHANAK', '1130');
defined('PAHANAKADD') or define('PAHANAKADD', '1131');
defined('PAHANAKEDIT') or define('PAHANAKEDIT', '1132');
defined('PAHGRUPANAK') or define('PAHGRUPANAK', '1140');
defined('PAHGRUPANAKADD') or define('PAHGRUPANAKADD', '1141');
defined('PAHGRUPANAKEDIT') or define('PAHGRUPANAKEDIT', '1142');
defined('PAHSUP') or define('PAHSUP', '1150');
defined('PAHSUPADD') or define('PAHSUPADD', '1151');
defined('PAHSUPEDIT') or define('PAHSUPEDIT', '1152');
defined('PAHSUBAKTIVITAS') or define('PAHSUBAKTIVITAS', '1160');
defined('PAHSUBAKTIVITASADD') or define('PAHSUBAKTIVITASADD', '1161');
defined('PAHSUBAKTIVITASEDIT') or define('PAHSUBAKTIVITASEDIT', '1162');
defined('PAHTRANS') or define('PAHTRANS', '1200');
defined('PAHTRANSKASMASUK') or define('PAHTRANSKASMASUK', '1210');
defined('PAHTRANSKASMASUKADD') or define('PAHTRANSKASMASUKADD', '1211');
defined('PAHTRANSKASMASUKSHOW') or define('PAHTRANSKASMASUKSHOW', '1212');
defined('PAHTRANSKASMASUKVOID') or define('PAHTRANSKASMASUKVOID', '1213');
defined('PAHTRANSANGGARAN') or define('PAHTRANSANGGARAN', '1220');
defined('PAHTRANSANGGARANADD') or define('PAHTRANSANGGARANADD', '1221');
defined('PAHTRANSANGGARANEDIT') or define('PAHTRANSANGGARANEDIT', '1222');
defined('PAHTRANSANGGARANDEL') or define('PAHTRANSANGGARANDEL', '1223');
defined('PAHTRANSKASKELUAR') or define('PAHTRANSKASKELUAR', '1230');
defined('PAHTRANSKASKELUARADD') or define('PAHTRANSKASKELUARADD', '1231');
defined('PAHTRANSKASKELUAREDIT') or define('PAHTRANSKASKELUAREDIT', '1232');
defined('PAHTRANSKASKELUARVOID') or define('PAHTRANSKASKELUARVOID', '1233');
defined('PAHTRANSAKTANAK') or define('PAHTRANSAKTANAK', '1240');
defined('PAHTRANSAKTANAKADD') or define('PAHTRANSAKTANAKADD', '1241');
defined('PAHTRANSAKTANAKSHOW') or define('PAHTRANSAKTANAKSHOW', '1242');
defined('PAHTRANSAKTANAKVOID') or define('PAHTRANSAKTANAKVOID', '1243');
defined('PAHTRANSAKTGRUP') or define('PAHTRANSAKTGRUP', '1250');
defined('PAHTRANSAKTGRUPADD') or define('PAHTRANSAKTGRUPADD', '1250');
defined('PAHTRANSAKTGRUPSHOW') or define('PAHTRANSAKTGRUPSHOW', '1251');
defined('PAHTRANSAKTGRUPVOID') or define('PAHTRANSAKTGRUPVOID', '1252');
defined('PAHTRANSMUTASI') or define('PAHTRANSMUTASI', '1260');
defined('PAHTRANSDONASI') or define('PAHTRANSDONASI', '1270');
defined('PAHTRANSDONASIADD') or define('PAHTRANSDONASIADD', '1271');
defined('PAHTRANSDONASIEDIT') or define('PAHTRANSDONASIEDIT', '1272');
defined('PAHTRANSDONASIDEL') or define('PAHTRANSDONASIDEL', '1273');
defined('PAHTRANSSETSALDO') or define('PAHTRANSSETSALDO', '1280');
defined('PAHREPORT') or define('PAHREPORT', '1300');
defined('PAHREPMUTASI') or define('PAHREPMUTASI', '1310');
defined('PAHREPTANGGUNGJAWAB') or define('PAHREPTANGGUNGJAWAB', '1320');
defined('PAHREPANGGARAN') or define('PAHREPANGGARAN', '1330');
defined('PAHREPPENDAPATAN') or define('PAHREPPENDAPATAN', '1340');
defined('PAHREPPENGELUARAN') or define('PAHREPPENGELUARAN', '1350');
defined('PAHREPBEBAKT') or define('PAHREPBEBAKT', '1360');
defined('PAHREPBEBAKTANAK') or define('PAHREPBEBAKTANAK', '1370');
defined('PAHREPBEBAKTGRUP') or define('PAHREPBEBAKTGRUP', '1380');
defined('PAHREPLAMP') or define('PAHREPLAMP', '1390');

defined('PONDOKEFATA') or define('PONDOKEFATA', '2000');
defined('MAHKOTRANS') or define('MAHKOTRANS', '3000');



global $security_role;
$security_role = array(
    PONDOKHARAPAN => "Pondok Asuh Harapan",
);