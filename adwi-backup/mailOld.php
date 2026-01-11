<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtpout.secureserver.net'; // GoDaddy SMTP
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@adwitechnologies.com'; // Your GoDaddy email
    $mail->Password   = 'Rasshmi@1415';      // GoDaddy email password
    $mail->SMTPSecure = 'tls';                       // or 'ssl'
    $mail->Port       = 465;                         // 465 for SSL, 587 for TLS

    //Recipients
    $mail->setFrom('info@adwitechnologies.com', 'Test SMTP');
    $mail->addAddress('yourpersonal@gmail.com'); // Test email

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'SMTP Test from GoDaddy';
    $mail->Body    = 'If you receive this email, SMTP is working correctly.';

    $mail->send();
    echo 'SMTP Test: Mail sent successfully';
} catch (Exception $e) {
    echo "SMTP Test failed: {$mail->ErrorInfo}";
}
