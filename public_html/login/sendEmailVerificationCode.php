<?php
require_once '../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


include "../../config/config.php";

$code ="";
$email1="";
if (isset($_POST['code'])) {
    $code = $_POST['code'];
    $email1 = $_POST['email'];
}
else{
   echo false;
    exit();
}









$sender=$email_sender;
$password=$email_password;
$receiverName=$email1;

$subject="Email Verification Code";
$receiver=$email1;



$host="smtp.gmail.com";
$port="587";
function sendCode($settings, $code) {
    $mail = new PHPMailer;

    if (!file_exists($settings['htmlFile'])) {
        die($settings['htmlFile'] . " does not exist");
    } else {
        $html = file_get_contents($settings['htmlFile']);
    }

    $html = str_replace('{{name}}', $settings['receiverName'], $html);
    $html = str_replace('{{code}}', $code, $html);

    $mail->isSMTP();
    $mail->Host = $settings['host'];
    $mail->SMTPAuth="true";
    $mail->SMTPSecure="tls";
    $mail->Port = $settings['port'];
    
    $mail->Username = $settings['sender'];
    $mail->Password = $settings['password'];
    $mail->addAddress($settings['receiver']);
    $mail->Subject = $settings['subject'];
    $mail->msgHTML($html);

    if (!$mail->send()) {
        echo "Error: " . $mail->ErrorInfo;
        exit();
    } else {
        echo 1;
        exit;
    }
}

$email_sender = $email_sender;
$email_password = $email_password;
$email = $email1;

$settings = [
    'sender' => $email_sender,
    'password' => $email_password,
    'receiverName' => $email,
    'subject' => "Email Verification Code",
    'receiver' => $email,
    'host' => "smtp.gmail.com",
    'port' => "587",
    'htmlFile' => "OTP2.html"
];

 // generate or get your code here

sendCode($settings, $code);
