<?php
require_once '../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


include "../../config/config.php";

$code =null;
$email1 =null;

$user_level=null;
// function to check if submit button is clicked

if (isset($_POST['email'], $_POST['mobile'], $_POST['code'], $_POST['user_level'])) {
    // AJAX request has been made, handle the data.
    $email1 = $_POST['email'];
    $mobile = $_POST['mobile'];
    $code = $_POST['code'];
    $user_level = $_POST['user_level'];
    //...
}
else{
    echo "Some Fields are empty";
    exit();
}





    // check if  any of the input field is empty
    if ($code == '') {
        return;
}

if ($email1 == '' && $mobile == '') {
    return;
}



$sql = "DELETE FROM regcode WHERE mobile=? OR email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $mobile, $email1);
$stmt->execute();



// prepare and bind
try{

    $stmt = $conn->prepare("INSERT INTO regcode (code, email, mobile, user_level) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $code, $email1, $mobile, $user_level);

     $stmt->execute();
    $stmt->close();
        
    }
    catch(Exception $e){
    
        
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
