<?php
// scripts/contact-mail.php
// <CHANGE> Polished the email design, tightened copy for a professional stock-market context, added preheader text, improved accessibility, and set charset/encoding for better client compatibility.

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// 1) Include PHPMailer (adjust paths as needed)
// If using Composer: require 'vendor/autoload.php';
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// 2) Configuration (prefer environment variables in production)
$SMTP_HOST = getenv('SMTP_HOST') ?: 'smtpout.secureserver.net';                 // e.g. "smtp.yourhost.com"
$SMTP_USER = getenv('SMTP_USERNAME') ?: 'rashmit@adwitechnologies.com';
$SMTP_PASS = getenv('SMTP_PASSWORD') ?: 'Rasshmi@1415';
$ADMIN_TO  = getenv('ADMIN_NOTIFY_TO') ?: 'anishteli238@gmail.com';

// Optional: redirect target after submission
$REDIRECT_URL = 'https://www.adwitechnologies.com/';

// 3) Safe input retrieval
function get_post($key, $default = '') {
  return isset($_POST[$key]) ? trim((string)$_POST[$key]) : $default;
}

$name     = mb_substr(get_post('name', 'N/A'), 0, 120);
$emailRaw = get_post('email', 'N/A');
$email    = filter_var($emailRaw, FILTER_VALIDATE_EMAIL) ? $emailRaw : 'N/A';
$phone    = mb_substr(preg_replace('/[^\d+\s().-]/', '', get_post('phone', 'N/A')), 0, 40);
$location = mb_substr(get_post('location', 'N/A'), 0, 120);
$msg      = mb_substr(get_post('msg', 'N/A'), 0, 5000);

$today   = date('d-m-Y');
$subject = "New Contact Inquiry — {$today}";

// 4) Branding and palette (max 5 colors)
// primary: #0B3C5D (navy), accent: #16A34A (green), text: #111827, muted: #6B7280, soft bg: #F3F4F6
$brandPrimary = '#0B3C5D';
$accent       = '#16A34A';
$textMain     = '#111827';
$textMuted    = '#6B7280';
$bgSoft       = '#F3F4F6';

$errorColor        = '#E3342F';
$statusHeaderColor = '#002147';

// Preheader (hidden preview text for clients)
$preheader = "New website inquiry received on {$today}. Please review and follow up.";

// Build HTML email body (table-based, inline styles for email client compatibility)
$html = '
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Inquiry</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
      .font-sans { font-family: "IBM Plex Sans", Arial, "Segoe UI", sans-serif; }
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    </style>
  </head>
  <body style="margin:0; padding:0; background:' . $bgSoft . ';">

    <div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
      ' . htmlspecialchars($preheader) . '
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $bgSoft . '; padding:24px 0;">
      <tr>
        <td align="center" style="padding:0 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" aria-labelledby="email-title" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden;">
            <tr>
              <td id="email-title" class="font-sans" style="background:' . $brandPrimary . '; color:#ffffff; padding:20px 24px; font-size:18px; font-weight:600;">
                New Contact Inquiry
                <div style="font-size:13px; color:rgba(255,255,255,0.85); font-weight:400; margin-top:4px;">
                  Stock Market Services — Equities | Derivatives | Advisory
                </div>
              </td>
            </tr>

            <tr>
              <td class="font-sans" style="padding:20px 24px; color:' . $textMain . '; font-size:14px; line-height:1.6;">
                <div style="color:' . $textMuted . '; margin-bottom:8px;">Received on ' . htmlspecialchars($today) . '</div>
                Please review the details below and follow up with the prospect.
              </td>
            </tr>

            <tr>
              <td style="padding:0 24px 8px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="font-sans" style="border-collapse:collapse; font-size:14px; color:' . $textMain . '; line-height:1.6;">
                  <tr>
                    <td width="34%" style="padding:10px 0; color:' . $textMuted . '; font-weight:500; border-bottom:1px solid ' . $bgSoft . ';">Name</td>
                    <td style="padding:10px 0; font-weight:600; border-bottom:1px solid ' . $bgSoft . ';">' . htmlspecialchars($name) . '</td>
                  </tr>
                  <tr>
                    <td width="34%" style="padding:10px 0; color:' . $textMuted . '; font-weight:500; border-bottom:1px solid ' . $bgSoft . ';">Email</td>
                    <td style="padding:10px 0; border-bottom:1px solid ' . $bgSoft . ';">' .
                      ($email !== "N/A"
                        ? '<a href="mailto:' . htmlspecialchars($email) . '" style="color:' . $brandPrimary . '; text-decoration:none;">' . htmlspecialchars($email) . '</a>'
                        : 'N/A'
                      ) . '
                    </td>
                  </tr>
                  <tr>
                    <td width="34%" style="padding:10px 0; color:' . $textMuted . '; font-weight:500; border-bottom:1px solid ' . $bgSoft . ';">Phone</td>
                    <td style="padding:10px 0; border-bottom:1px solid ' . $bgSoft . ';">' . htmlspecialchars($phone) . '</td>
                  </tr>
                  <tr>
                    <td width="34%" style="padding:10px 0; color:' . $textMuted . '; font-weight:500; border-bottom:1px solid ' . $bgSoft . ';">Location</td>
                    <td style="padding:10px 0; border-bottom:1px solid ' . $bgSoft . ';">' . htmlspecialchars($location) . '</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="font-sans" style="padding:16px 24px 8px 24px; color:' . $textMain . '; font-size:14px; font-weight:600;">Message</td>
            </tr>
            <tr>
              <td class="font-sans" style="padding:0 24px 20px 24px;">
                <div style="padding:12px 14px; background:' . $bgSoft . '; border-left:3px solid ' . $accent . '; border-radius:6px; color:' . $textMain . '; white-space:pre-wrap;">' . nl2br(htmlspecialchars($msg)) . '</div>
              </td>
            </tr>

            <tr>
              <td class="font-sans" style="padding:12px 24px 22px 24px;">
                <div style="display:inline-block; padding:10px 14px; background:' . $accent . '; color:#ffffff; font-size:13px; font-weight:600; border-radius:6px;">
                  Action: Please follow up with the client as soon as possible.
                </div>
              </td>
            </tr>

            <tr>
              <td class="font-sans" style="background:#ffffff; border-top:1px solid ' . $bgSoft . '; color:' . $textMuted . '; font-size:11px; padding:14px 24px; text-align:center;">
                Automated notification from the PeSB website contact form. Please do not reply directly to this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
';

// Plain-text alternative
$alt = "New Contact Inquiry — Stock Market Services\n"
     . "Received on {$today}\n\n"
     . "Name: {$name}\n"
     . "Email: {$email}\n"
     . "Phone: {$phone}\n"
     . "Location: {$location}\n\n"
     . "Message:\n{$msg}\n";

// 5) Send email
$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host       = $SMTP_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = $SMTP_USER;
  $mail->Password   = $SMTP_PASS;
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  $mail->CharSet    = 'UTF-8';
  $mail->Encoding   = 'base64';

  $mail->setFrom($SMTP_USER, 'ADWI Website Contact');
  $mail->addAddress($ADMIN_TO, 'Team');

  if ($email !== 'N/A') {
    $mail->addReplyTo($email, $name !== 'N/A' ? $name : '');
  }

  $mail->isHTML(true);
  $mail->Subject = $subject;
  $mail->Body    = $html;
  $mail->AltBody = $alt;

  $mail->send();

  $titleColor       = $statusHeaderColor; 
  $headerText       = 'Message Sent Successfully';
  $statusText       = 'Thank you for contacting us. We have received your inquiry and will get back to you shortly.';
  $loaderText       = 'You will be redirected in a few seconds...';
  $redirect         = true;
  $loaderContainerDisplay = 'flex'; // Show loader on success

} catch (Exception $e) {
  // Log the detailed error message as requested (only visible in server logs)
  error_log('PHPMailer send failed: ' . $mail->ErrorInfo);
  http_response_code(500);

  // --- ERROR TEMPLATE DATA ---
  // Using the consistent header color #002147
  $titleColor       = $statusHeaderColor; 
  $headerText       = 'Sending Failed';
  $statusText       = 'We were unable to send your message at this time. Please try again later.';
  $loaderText       = 'Reference: mail delivery issue. (Not redirected)';
  $redirect         = true;
  $loaderContainerDisplay = 'flex'; // Use flex to align text/reference, but spinner will be hidden

}

// --- BUILD CONDITIONAL REDIRECT META TAG ---
$redirectMetaTag = '';
if ($redirect) {
    // If successful, set the meta refresh tag
    $redirectMetaTag = '<meta http-equiv="refresh" content="5;url=' . htmlspecialchars($REDIRECT_URL) . '">';
}


// --- UNIFIED HTML OUTPUT (using Heredoc) ---
$output_html = <<<HTML
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>$headerText</title>
    
    $redirectMetaTag
    
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
      /* --- Loader Animation --- */
      @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
      }
      
      /* --- Global Styles --- */
      body {
          margin:0; padding:0; background:$bgSoft; font-family:'IBM Plex Sans', Arial, 'Segoe UI', sans-serif; color:$textMain;
          display: flex; 
          justify-content: center;
          align-items: center;
          min-height: 100vh;
      }
      
      /* --- Status Box Styles --- */
      .status-box {
          max-width: 520px; 
          width: 90%; 
          margin: 0; 
          background: #ffffff; 
          border-radius: 8px; 
          overflow: hidden; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
      }
      .status-header {
          background: $titleColor; /* Now consistently #002147 */
          color: #ffffff; 
          padding: 18px 25px; 
          font-weight: 600;
          font-size: 1.2rem;
      }
      .status-body {
          padding: 25px; 
          font-size: 15px; 
          line-height: 1.6;
          color: $textMain;
      }

      /* --- Loader & Redirect Message --- */
      .loader-spinner {
          /* Dynamic Color: Uses $titleColor (#002147) for the spinning part */
          border: 4px solid $bgSoft;
          border-top: 4px solid $titleColor; 
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          margin-right: 10px;
          
          /* Show block only on success */
          display: $redirect ? 'block' : 'none'; 
      }
      
      .redirect-msg {
          margin-top: 20px; 
          padding-top: 15px;
          color: $textMuted;
          font-size: 14px;
          display: $loaderContainerDisplay; 
          align-items: center;
          border-top: 1px solid $bgSoft;
          font-weight: 500;
      }
      
      /* On Error (when not redirecting), use the explicit error color for the reference text */
      $redirect ? '' : ".redirect-msg { color: $errorColor; }"

    </style>
  </head>
  <body>
    <div class="status-box">
      <div class="status-header">$headerText</div>
      <div class="status-body">
        <p>$statusText</p>
        <div class="redirect-msg">
          <div class="loader-spinner"></div>
          $loaderText
        </div>
      </div>
    </div>
  </body>
</html>
HTML;

echo $output_html;