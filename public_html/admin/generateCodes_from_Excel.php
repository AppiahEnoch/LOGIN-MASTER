<?php

require_once '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

use PhpOffice\PhpSpreadsheet\IOFactory;

include "../../config/config.php";

// Function to save the uploaded file
function saveUploadedFile($file) {
    $destination = __DIR__ . '/' . basename($file['name']);
    return move_uploaded_file($file['tmp_name'], $destination) ? $destination : false;
}

// Function to generate a unique code
function generateCode() {
    $seed = md5(uniqid(mt_rand(), true));
    $characters = '123456789abcdefghjkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';
    $randomString = substr(str_shuffle(str_repeat($characters, 20)), 0, 8);
    return $randomString;
}

// Function to send the email with the code and using HTML template
function sendCode($email, $code, $email_sender, $email_password) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->Username = $email_sender;
        $mail->Password = $email_password;

        $mail->setFrom($email_sender);
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = 'Email Verification Code';

        $html = file_get_contents('OTP2.html');
        $html = str_replace(['{{name}}', '{{code}}'], [$email, $code], $html);

        $mail->msgHTML($html);

        return $mail->send();
    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage();
        return false;
    }
}

// Function to load data from the Excel file and insert into the database
function load_data_from_excel($conn, $filename, $email_sender, $email_password) {
    $spreadsheet = IOFactory::load($filename);
    $worksheet = $spreadsheet->getActiveSheet();

    $highest_row = $worksheet->getHighestRow();

    for ($row = 2; $row <= $highest_row; $row++) {
        $mobile = $worksheet->getCellByColumnAndRow(1, $row)->getValue();
        $email = $worksheet->getCellByColumnAndRow(2, $row)->getValue();
        $user_level = '1';
        $code = generateCode();

        $stmt = $conn->prepare("INSERT INTO regcode (mobile, email, user_level, code) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $mobile, $email, $user_level, $code);
        $stmt->execute();
        $stmt->close();

        if (!sendCode($email, $code, $email_sender, $email_password)) {
            echo "Failed to send email to $email";
        }
    }

    echo $highest_row;
}

// Handle the file upload and data processing
if ($_FILES["groupCode"]["error"] == UPLOAD_ERR_OK) {
    $file = $_FILES["groupCode"];
    $savedFilePath = saveUploadedFile($file);

    if ($savedFilePath) {
        load_data_from_excel($conn, $savedFilePath, $email_sender, $email_password);
    } else {
        echo 'Error: Failed to save the uploaded file.';
    }
}
