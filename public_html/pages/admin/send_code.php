<?php
require_once '../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


include "../../../config/config.php";



$user_level=null;
// function to check if submit button is clicked
if (isset($_POST['code'])) {
// get the value of input field
    $code = $_POST['code'];
    $email1 = $_POST['email'];
    $mobile = $_POST['mobile'];
    $user_level = $_POST['user_level'];


    // check if  any of the input field is empty
    if ($code == '') {
        return;
}

if ($email1 == '' && $mobile == '') {
    return;
}

}


$sql  =  "DELETE FROM regcode WHERE mobile=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $mobile);
$stmt->execute();


$sql  =  "DELETE FROM regcode WHERE email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email1);
$stmt->execute();



  
// prepare and bind
try{

    $stmt = $conn->prepare("INSERT INTO regcode (code, email, mobile, user_level) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $code, $email1, $mobile, $user_level);

     $stmt->execute();
    $stmt->close();

    sendCode() ;
        
    }
    catch(Exception $e){
    
        
    }


    





$sender=$email_sender;
$password=$email_password;
$receiverName=$email;

$subject="Email Verification Code";
$receiver=$email;

$htmlFile="OTP2.html";

$host="smtp.gmail.com";
$port="587";

    function sendCode() {
            global $sender,$receiver,$password,$port,
            $host,$subject,$htmlFile,$receiverName, $code;

            $mail = new PHPMailer;
            $html = file_get_contents($htmlFile);
          
          
            // modify file
            $html = str_replace('{{name}}', $receiverName, $html);
            $html = str_replace('{{code}}', $code, $html);
          
          
          
            $mail->isSMTP();
            $mail->Host = $host;
            $mail->SMTPAuth="true";
            $mail->SMTPSecure="tls";
            $mail->Port = $port;
          
          
          
            //echo $port." |".$password." |".$sender." |".$receiver;
          
          
            $mail-> Username=$sender;
            $mail->Password = $password;
            $mail->setFrom($sender);
            $mail->addAddress($receiver);
            $mail->Subject = $subject;
          
          
          
          
          
    
          
            $mail->msgHTML($html);
          
          
            
            if (!$mail->send()) {
              
               echo "Error: " . $mail->ErrorInfo;

               exit();
            } else {
             echo 1;
             exit;
            }
          }
          
          
          
          
          
          