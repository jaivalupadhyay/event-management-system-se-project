<!DOCTYPE html>
<html lang="en">
<head>
  <title>Send Query</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body style="background-image:url('main.jpg');background-size:100% 100%;">

<div class="container">
<br>
  <center><h4>Send Your Query </h4></center>
  <div class="row">
  <div class="col-md-2">
  </div>
  <div class="col-md-8">
  
  <form action="" method="post">
    <div class="form-group">
      <label>Name:</label>
      <input type="text" class="form-control" placeholder="Enter Name" name="name">
    </div>
	<div class="form-group">
      <label>Email:</label>
      <input type="email" class="form-control"  placeholder="Enter Email" name="email">
    </div>
    <div class="form-group">
      <label>Contact:</label>
      <input type="text" class="form-control" placeholder="Enter Contact No" name="contact">
    </div>
	<div class="form-group">
      <label>Message:</label>
	  <textarea class="form-control" rows="3" placeholder="Message" name="message"></textarea>
    </div>
    <div class="col-md-12 text-center">
    <button type="submit" class="btn btn-success" name="submit">Send</button>
      </div>
  </form>
  </div>
  </div>
  <div class="col-md-2">
  </div>
</div>

</body>
</html>

<?php
if(isset($_POST['submit'])) {
	
$name = $_POST['name'];
$email = $_POST['email'];
$contact = $_POST['contact'];
$message = $_POST['message'];
if($name=='' || $email=='' || $contact=='' || $message==''){
	echo "</script>alert('All fields are required !')</script>";
} else {

$to = "komalbenkansara19@gnu.ac.in";
$subject    = " Contact Us";

//$headers    = "From: $from";    
//$headers    = "From: " . $from . "<" . $webmaster . ">\r\n";
$headers = "From: komalkansara055@gmail.com";

$message .= "\nName :".$_POST['name']  ."\n";
$message .= "Email : ". $_POST['email'] ."\n";
$message .= "Phone : ". $_POST['contact'] ."\n";
//$message .= "Message :".$_POST['message']."\n";

$sendmail = mail($to, $subject, $message, $headers);

echo "<script>alert('Thank you for contact us, our team will contact with you very soon')</script>";
echo "<script>window.open('main.php?sent=Your Form Has been Submited','_self')</script>";
}
}
?>
