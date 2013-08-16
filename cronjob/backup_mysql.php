<?php
require_once 'mysqldump.class.php';
require_once 'lib/swift_required.php';
$label = '
/***************************************************
	Backup2Mail v0.18, 30. 06. 2010.
	by Marko Dugonjic, http://www.backup2mail.com/
****************************************************/
';


/* * *************************************************
  Database settings
 * ************************************************** */
$db_server = 'localhost';    // Database server, usually "localhost", 
// on (mt) servers something like internal-db.s12345.gridserver.com
$db_name = 'gkkd';    // Database name, leave empty for 'all databases'
$db_user = 'root';    // Database username
$db_pass = 'root';    // Database password



/* * *************************************************
  E-mail settings
 * ************************************************** */
$website = 'zoho.com';      // Your site's domain (without www. part)
$send_to = 'novebeta@zoho.com';          // backup file will be sent to?
$from = 'novebeta@' . $website; // some hosting providers won’t let you send backups from invalid e-mail address



/* * *************************************************
  Misc options
 * ************************************************** */

$full_path = '/opt/lampp/htdocs/gkkd/cronjob';
// Full path to folder where you are running the script, usually "/home/username/public_html"
// (mt) servers have something like "/nfs/c01/h01/mnt/12345/domains/yourdomain.mobi/html/tools/backup2mail"


$delete_backup = true;
// delete gziped database from server after sending?

$send_log = false;
// send follow-up report?
// - true = send log file to an e-mail after each backup transfer
// - false = don't send log file, just leave it on the server



/* * *************************************************
  If everything goes well, you shouldn't
  modify anything below.
 * ************************************************** */

error_reporting(E_ALL);

echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Backup2mail status [' . $website . ']</title>
		<style type="text/css">body { background: #000; color: #0f0; font-family: \'Courier New\', Courier; }</style>
	</head>
	<body>';
function date_stamp() {
    global $html_output;
    $backup_date = date('Y-m-d-H-i');
    echo 'Database backup date: ' . $backup_date . '<br />';
    return $backup_date;
}
function backup_filename() {
    global $db_name, $date_stamp, $html_output;
    $db_backup_filename = ($db_name == '' ? 'all_databases' : $db_name) . '_' . $date_stamp . '.sql.gz';
    echo 'Database backup file: ' . $db_backup_filename . '<br />';
    return $db_backup_filename;
}
function db_dump() {
    global $db_server, $db_name, $db_user, $db_pass, $backup_filename, $html_output, $full_path;
    //$cmd = 'mysqldump -u ' . $db_user . ' -h ' . $db_server . ' --password=' . $db_pass . ' ' . ($db_name == '' ? '--all-databases' : $db_name) . ' | gzip > ' . $backup_filename;
    //$dump_status = (passthru($cmd) === false) ? 'No' : 'Yes';
    $dumpSettings = array(
        'compress' => CompressMethod::GZIP, /* CompressMethod::[GZIP, BZIP2, NONE] */
        'no-data' => false, /* http://dev.mysql.com/doc/refman/5.1/en/mysqldump.html#option_mysqldump_no-data */
        'add-drop-table' => false, /* http://dev.mysql.com/doc/refman/5.1/en/mysqldump.html#option_mysqldump_add-drop-table */
        'single-transaction' => true, /* http://dev.mysql.com/doc/refman/5.1/en/mysqldump.html#option_mysqldump_single-transaction */
        'lock-tables' => false, /* http://dev.mysql.com/doc/refman/5.1/en/mysqldump.html#option_mysqldump_lock-tables */
        'add-locks' => false, /* http://dev.mysql.com/doc/refman/5.1/en/mysqldump.html#option_mysqldump_add-locks */
        'extended-insert' => true /* http://dev.mysql.com/doc/refman/5.1/en/mysqldump.html#option_mysqldump_extended-insert */
    );

    $dump = new MySQLDump($db_name, $db_user, $db_pass,
            $db_server, $dumpSettings);
    $dump->start(str_replace('.gz', '', $backup_filename));
    //echo 'Command: ' . $cmd . '<br />';
    //echo 'Command executed? ' . $dump_status . '<br />';
    return true;
}
function send_attachment($file, $file_is_db = true) {
    global $send_to, $from, $website, $delete_backup, $html_output;

    $sent = 'Yes';

    $subject = 'MySQL backup GKKD - ' . ($file_is_db ? 'db dump' : 'report') . ' [' . $website . ']';
//    $boundary = md5(uniqid(time()));
    $mailer = 'Sent by Backup2Mail (c) Marko Dugonjic, www.maratz.com, 2005-2009.';

    $body = 'Database backup file:' . "\n" . ' - ' . $file . "\n\n";
    $body .= '---' . "\n" . $mailer;

    $transport = Swift_SmtpTransport::newInstance('smtp.zoho.com', 465, 'ssl')
            ->setUsername('novebeta@zoho.com')
            ->setPassword('anando13');
    $mailer = Swift_Mailer::newInstance($transport);
    $message = Swift_Message::newInstance($subject)
            ->setFrom(array($from))
            ->setTo(array($send_to))
            ->setBody($body)
            ->attach(Swift_Attachment::fromPath($file));    
    if (!$mailer->send($message, $failures)) {
        echo "Failures:";
        print_r($failures);
        $sent = 'No';
    }else{
        if ($file_is_db) {
            if ($delete_backup) {
                unlink($file);
                echo 'Backup file REMOVED from disk.<br />';
            } else {
                echo 'Backup file LEFT on disk.<br />';
            }
        }
    }
    echo 'Sent? ' . $sent;
    return $sent;
}
function write_log() {
    global $backup_filename, $date_stamp, $send_log, $label, $full_path;

    $log_file = $full_path . '/backup_log.txt';
    if (!$handle = fopen($log_file, 'a+')) exit;
    if (is_writable($log_file)) {

        echo '<h2>Mysqldump...</h2>';
        $dumped = db_dump();

        echo '<h2>Sending db...</h2>';
        $log_content = "\n" . $date_stamp . "\t\t\t" . $dumped . "\t\t\t" . send_attachment($backup_filename);

        echo '<h2>Writing log...</h2>';

        $log_header = '';
        if (filesize($log_file) == '0') {
            $log_header .= $label . "\n\n";
            $log_header .= 'Backup log' . "\n";
            $log_header .= '----------------------------------------------' . "\n";
            $log_header .= 'DATESTAMP:					DUMPED		MAILED' . "\n";
            $log_header .= '----------------------------------------------';

            if (fwrite($handle, $log_header) === false) exit;
        }

        echo 'Log header written: ';
        if (fwrite($handle, $log_header) === false) {
            echo 'no<br />' . "\n";
            exit;
        } else {
            echo 'yes<br />' . "\n";
        }

        echo 'Log status written: ';
        if (fwrite($handle, $log_content) === false) {
            echo 'no<br />' . "\n";
            exit;
        } else {
            echo 'yes<br />' . "\n";
        }
    }

    fclose($handle);

    if ($send_log) {
        echo '<h2>Sending log...</h2>';
        send_attachment($log_file, false);
    }
}
echo '<h2>Setup</h2>';
$date_stamp = date_stamp();
$backup_filename = backup_filename();
$init = write_log();

echo '<br /><br />...<br /><br />If all letters are green and you received the files, you\'re good to go!<br />Remove '#' from this folder’s .htaccess file NOW.</body></html>';
?>
