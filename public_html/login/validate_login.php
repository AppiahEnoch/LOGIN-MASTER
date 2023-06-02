<?php
require_once '../../vendor/autoload.php';
include "../../config/config.php";


$username ="";
$password="";
// check if username and password are set
if(isset($_POST['username']) && isset($_POST['password'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
}
else{
   
    exit();
}


$userExist=0;


// check if username already exist  in database
$sql = "SELECT * FROM user0 WHERE user0_name=? and user0_password=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss",$username,$password);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
   $userExist=1;
}



$sql = "SELECT * FROM user1 WHERE user1_name=? and user1_password=?"; 
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss",$username,$password);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc())
{
    $userExist=2;
}



if(($userExist==1)||($userExist==2)){  
    session_start();
    $_SESSION['username']=$username;
    $_SESSION['password']=$password;

}


echo $userExist;
exit();