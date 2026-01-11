<?php
header("Access-Control-Allow-Origin: https://adwi.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Require PHPMailer files
require '/mailer/Exception.php';
require '/mailer/PHPMailer.php';
require '/mailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => true, "message" => "Invalid request"]);
    exit;
}

$formType = $_POST['formType'] ?? '';

$mail = new PHPMailer(true);

try {
    // =========================
    // Common SMTP Settings
    // =========================
    $mail->isSMTP();
    $mail->Host       = 'localhost';         // GoDaddy internal SMTP
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@adwitechnologies.com'; // Your GoDaddy email
    $mail->Password   = 'Rasshmi@1415';      // Your GoDaddy email password
    $mail->SMTPSecure = false;                // No SSL/TLS needed for localhost
    $mail->Port       = 25;                   // GoDaddy local SMTP port
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';

    // =========================
    // GENERAL CONTACT FORM
    // =========================
    if ($formType === 'general') {

        $name    = trim($_POST['generalName'] ?? '');
        $email   = trim($_POST['generalEmail'] ?? '');
        $subject = trim($_POST['generalSubject'] ?? 'General Inquiry');
        $message = trim($_POST['generalMessage'] ?? '');

        if (!$name || !$email || !$message) {
            echo json_encode(["error" => true, "message" => "Missing fields (General)"]);
            exit;
        }

        $mailSubject = "[Website] $subject";
        $mailBody = "
            <b>Name:</b> $name<br>
            <b>Email:</b> $email<br><br>
            <b>Message:</b><br>$message
        ";

        $mail->setFrom('info@adwitechnologies.com', 'Website');
        $mail->addAddress('adwitechnologies@gmail.com');
        $mail->addReplyTo($email);

    }

    // =========================
    // FL / COURSE FORM
    // =========================
    elseif ($formType === 'fl') {

        $enquiry    = trim($_POST['enquiryLanguage'] ?? '');
        $name       = trim($_POST['fullName'] ?? '');
        $phone      = trim($_POST['contactNumber'] ?? '');
        $gender     = trim($_POST['gender'] ?? '');
        $email      = trim($_POST['emailAddress'] ?? '');
        $dob        = trim($_POST['dob'] ?? '');
        $profession = trim($_POST['profession'] ?? '');
        $address    = trim($_POST['residentialAddress'] ?? '');

        if (!$enquiry || !$name || !$phone || !$email) {
            echo json_encode(["error" => true, "message" => "Missing fields (FL)"]);
            exit;
        }

        $mailSubject = "[Course Enquiry] $enquiry";
        $mailBody = "
            <b>Name:</b> $name<br>
            <b>Email:</b> $email<br>
            <b>Phone:</b> $phone<br>
            <b>Gender:</b> $gender<br>
            <b>DOB:</b> $dob<br>
            <b>Profession:</b> $profession<br>
            <b>Enquiry:</b> $enquiry<br><br>
            <b>Address:</b><br>$address
        ";

        $mail->setFrom('info@adwitechnologies.com', 'Website');
        $mail->addAddress('Fladwitechnologies@gmail.com');
        $mail->addReplyTo($email);

    } else {
        echo json_encode(["error" => true, "message" => "Invalid form type"]);
        exit;
    }

    // =========================
    // Send Mail
    // =========================
    $mail->Subject = $mailSubject;
    $mail->Body    = $mailBody;

    if ($mail->send()) {
        echo json_encode(["error" => false, "message" => "Mail sent successfully"]);
    } else {
        echo json_encode(["error" => true, "message" => "Mail failed"]);
    }

} catch (Exception $e) {
    echo json_encode(["error" => true, "message" => "Mailer Error: " . $mail->ErrorInfo]);
}
