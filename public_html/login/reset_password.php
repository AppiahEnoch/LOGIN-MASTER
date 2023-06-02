<?php
require_once '../../vendor/autoload.php';
include "../../config/config.php";

$old_password  =null;
$old_username =null;
$new_password =null;
$new_username =null;
$userExist=0;




// check if all variables are set 
if (isset($_POST['new_password']) && isset($_POST['new_username']) && isset($_POST['old_password']) && isset($_POST['old_username'])) {
$old_password = $_POST['old_password'];
$old_username = $_POST['old_username'];
$new_password = $_POST['new_password'];
$new_username = $_POST['new_username'];

}
else{
    exit;
}




// check if username already exist  in database
$sql = "SELECT * FROM user0 WHERE user0_name=? and user0_password=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss",$old_username,$old_password);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
   $userExist=1;
}



$sql = "SELECT * FROM user1 WHERE user1_name=? and user1_password=?"; 
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss",$old_username,$old_password);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc())
{
    $userExist=2;
}




if($userExist==0){
    echo 0;
    exit;

}



if($userExist==1){
    $sql = "UPDATE user0 SET user0_password=?, user0_name=? WHERE user0_name=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss",$new_password,$new_username,$old_username);
    $stmt->execute();
    $stmt->close();
    echo 1;
    exit;
}

else if($userExist==2){
    $sql = "UPDATE user1 SET user1_password=?,  user1_name=? WHERE user1_name=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss",$new_password,$new_username,$old_username);
    $stmt->execute();
    $stmt->close();
    echo 1;
    exit;
}







