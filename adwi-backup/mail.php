<?php
header("Access-Control-Allow-Origin: https://adwi.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => true, "message" => "Invalid request"]);
    exit;
}

$formType = $_POST['formType'] ?? '';

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

    $mailSubject = "[Website] $subject";
    $mailBody = "
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
}

else {
    echo json_encode(["error" => true, "message" => "Invalid form type"]);
    exit;
}

/* =========================
   SEND MAIL (GoDaddy SAFE)
========================= */
$to = "info@adwitechnologies.com";

$headers  = "From: Website <info@adwitechnologies.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8";

if (mail($to, $mailSubject, $mailBody, $headers)) {
    echo json_encode(["error" => false, "message" => "Mail sent successfully"]);
} else {
    echo json_encode(["error" => true, "message" => "Mail failed"]);
}
