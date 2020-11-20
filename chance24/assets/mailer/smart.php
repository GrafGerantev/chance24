<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output
//$mail->SMTPDebug = SMTP::DEBUG_SERVER;
//$mail->SMTPDebug = 2; //Alternative to above constant
//$mail->Debugoutput = function($str, $level) {echo "debug level $level; message: $str";};
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'fokkerger@gmail.com';                 // Наш логин
$mail->Password = 'volks010191wagen2011';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;    // TCP port to connect to

$mail->setFrom('fokkerger@gmail.com', 'Ультрамедиа.рф');   // От кого письмо
$mail->addAddress('gerantev@ukefir.ru');     // Куда будут приходить письма с сайта
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные с сайта';
$mail->Body    = 
	'
	Пользователь оставил данные <br>
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

/*if($mail->Send()) {
	$arrResult['response'] = 'success';
 } else {
	 $arrResult['response'] = 'error';
	 echo "There was a problem sending the form.: " . $mail->ErrorInfo;
	 exit;
 }*/

?>