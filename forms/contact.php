<?php
$receiving_email_address = 'aliyantowrat5227@gmail.com';

if (file_exists($php_email_form = './vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
} else {
    die('Unable to load PHP Email Form Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];

$contact->smtp = array(
    'host' => 'smtp-relay.brevo.com',
    'username' => '9c54c9001@smtp-brevo.com',
    'password' => 'zL9d8mBOVPFk2TAa',
    'port' => '587'
);

$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Message', 10);

echo $contact->send();
?>
