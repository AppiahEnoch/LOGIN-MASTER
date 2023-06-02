<?php
require_once '../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


include "../../config/config.php";


$email1 =null;
$user_name=null;
$user_password=null;
$user_mobile=null;
$found_value=0;

// function to check if submit button is clicked

if (isset($_POST['email'])) {
    // AJAX request has been made, handle the data.
    $email1 = $_POST['email'];
    //...
}
else{
    echo "Some Fields are empty";
    exit();
}




$sql = "SELECT * FROM user0 WHERE user0_email=?";
$stmt = $conn->prepare($sql); 
$stmt->bind_param("s", $email1);
$stmt->execute();
$result = $stmt->get_result();
if($row = $result->fetch_assoc()) {
    $user_name=$row['user0_name'];
    $user_password=$row['user0_password'];
    $user_mobile=$row['user0_mobile'];
    $found_value=1;
}



$sql = "SELECT * FROM user1 WHERE user1_email=?";
$stmt = $conn->prepare($sql); 
$stmt->bind_param("s", $email1);
$stmt->execute();
$result = $stmt->get_result();
if($row = $result->fetch_assoc()) {
    $user_name=$row['user1_name'];
    $user_password=$row['user1_password'];
    $user_mobile=$row['user1_mobile'];
    $found_value=1;
}



if($found_value==0){
    echo 0;
    exit;
}





$sender=$email_sender;
$password=$email_password;
$receiverName=$email1;

$subject="LOGIN DETAILS RECOVERY";
$receiver=$email1;



$host="smtp.gmail.com";
$port="587";

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
    'htmlFile' => "PSWR.html"
];

sendCode($settings,$user_name,$user_password,$business_name);





function sendCode($settings,$user_name,$user_password,$business_name) {
    $mail = new PHPMailer;

    if (!file_exists($settings['htmlFile'])) {
        die($settings['htmlFile'] . " does not exist");
    } else {
        $html = file_get_contents($settings['htmlFile']);
    }
    $curyear = date('Y');
    $html = str_replace('{{name}}', $settings['receiverName'], $html);
    $html = str_replace('{{username}}', $user_name, $html);
    $html = str_replace('{{password}}', $user_password, $html);
    $html = str_replace('{{business_name}}', $business_name, $html);
    $html = str_replace('{{curyear}}',  $curyear, $html);


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

