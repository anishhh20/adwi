<?php
header("Access-Control-Allow-Origin: https://www.adwitechnologies.com/");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// PHPMailer files
require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => true, "message" => "Invalid request"]);
    exit;
}

$formType = $_POST['formType'] ?? '';

$mail = new PHPMailer(true);

try {
    /* =========================
       GO DADDY SMTP RELAY
    ========================= */
    $mail->isSMTP();
    $mail->Host = 'relay-hosting.secureserver.net';
    $mail->Port = 25;
    $mail->SMTPAuth = false;
    $mail->SMTPSecure = false;

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';

    // REQUIRED: From must be a domain email
    $mail->setFrom('info@adwitechnologies.com', 'Website');

    /* =========================
       GENERAL CONTACT FORM
    ========================= */
    if ($formType === 'general') {

        $name    = trim($_POST['generalName'] ?? '');
        $email   = trim($_POST['generalEmail'] ?? '');
        $subject = trim($_POST['generalSubject'] ?? 'General Inquiry');
        $message = trim($_POST['generalMessage'] ?? '');

        if (!$name || !$email || !$message) {
            echo json_encode(["error" => true, "message" => "Missing fields (General)"]);
            exit;
        }

        $mail->addAddress('info@adwitechnologies.com');
        $mail->addReplyTo($email);

        $mail->Subject = "[Website] $subject";
        $mail->Body = "
            <b>Name:</b> $name<br>
            <b>Email:</b> $email<br><br>
            <b>Message:</b><br>$message
        ";
    }

    /* =========================
       FL / COURSE FORM
    ========================= */
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

        $mail->addAddress('info@adwitechnologies.com');
        $mail->addReplyTo($email);

        $mail->Subject = "[Course Enquiry] $enquiry";
        $mail->Body = "
            <b>Name:</b> $name<br>
            <b>Email:</b> $email<br>
            <b>Phone:</b> $phone<br>
            <b>Gender:</b> $gender<br>
            <b>DOB:</b> $dob<br>
            <b>Profession:</b> $profession<br>
            <b>Enquiry:</b> $enquiry<br><br>
            <b>Address:</b><br>$address
        ";
    } else {
        echo json_encode(["error" => true, "message" => "Invalid form type"]);
        exit;
    }

    $mail->send();
    echo json_encode(["error" => false, "message" => "Mail sent successfully"]);

} catch (Exception $e) {
    echo json_encode([
        "error" => true,
        "message" => "Mailer Error: " . $mail->ErrorInfo
    ]);
}
