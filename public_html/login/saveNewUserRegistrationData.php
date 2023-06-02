<?php
require_once '../../vendor/autoload.php';
include "../../config/config.php";

$code =null;
$email =null;
$username =null;
$password =null;

// check if all variables are set 
if (isset($_POST['code'])) {
    $code = $_POST['code'];
    $email1 = $_POST['email'];
    $mobile = $_POST['mobile'];
    $username = $_POST['username'];
    $password = $_POST['password'];

}
else{
    exit;
}



// check if username already exist  in database
$sql = "SELECT * FROM user0 WHERE user0_name=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username); 
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
   echo 5;
   exit;
}

$sql = "SELECT * FROM user1 WHERE user1_name=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username); 
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
   echo 5;
   exit;
}



$sql = "SELECT * FROM user0 WHERE user0_email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$email1);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    $dbEmail = $row['user0_email'];

    if($dbEmail == "Not Available"){ 

    }
    else{
        echo 6;
        exit;


    }
  
}





$sql = "SELECT * FROM user1 WHERE user1_email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$email1);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    $dbEmail = $row['user1_email'];

    if($dbEmail == "Not Available"){ 

    }
    else{
        echo 6;
        exit;
    }
  
}



$sql = "SELECT * FROM user0 WHERE  user0_mobile=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$mobile);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    echo 7;
    exit;
}



$sql = "SELECT * FROM user1 WHERE  user1_mobile=?"; 
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$mobile);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    echo 7;
    exit;
}










$sql = "SELECT * FROM regcode WHERE code=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $code); 
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    $user_level = $row['user_level'];
}




$dbTable="user1";

if ($user_level == 0){ 
try{
    $stmt = $conn->prepare("INSERT INTO  user0 (user0_name, user0_email, user0_mobile, user0_password) VALUES (?, ?, ?, ?)"); 
   $stmt->bind_param("ssss", $username, $email1, $mobile, $password);
   $stmt->execute();
   $stmt->close();    
    }
    catch(Exception $e){
        
    }

    echo 1;
    exit;

}
else{
// prepare and bind
try{
$stmt = $conn->prepare("INSERT INTO  user1 (user1_name, user1_email, user1_mobile, user1_password) VALUES (?, ?, ?, ?)");
   $stmt->bind_param("ssss", $username, $email1, $mobile, $password);
   $stmt->execute();
   $stmt->close();

    }
    catch(Exception $e){
        
    }


    echo 1;
    exit;

}



