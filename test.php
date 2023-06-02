<?php
require_once 'vendor/autoload.php'; // Adjust path if needed

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $mail = new PHPMailer(true);
    echo 'PHPMailer is installed successfully!';
} catch (Exception $e) {
    echo 'There was a problem with PHPMailer: ',  $e->getMessage(), "\n";
}
