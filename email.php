<?php

if(isset($_POST['name'])) {
    echo("right");
    $email_to = "shevelyovilja@gmail.com";
    $email_subject = "contact form";

    function died($error){
        echo "Failed to send. apologies";
        die();
    }

    if(!isset($_POST['name']) ||
    !isset($_POST['email']) ||
    !isset($_POST['phone']) || 
    !isset($_POST['address']) ||
    !isset($_POST['date'])){
        died('sorry, there is a problem');
    }

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $date = $_POST['date'];

    $error_message = "";

    $email_message = "Form details below: \n\n";

    $file = fopen('form.txt', 'a');

    ftruncate($file, 0);
    $content = $name."\n".$email."\n".$phone."\n".$address."\n".$date;
    fwrite($file, $content);
    fclose($file);

    function clean_string($string){
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email)."\n";
    $email_message .= "Phone: ".clean_string($phone)."\n";
    $email_message .= "Address: ".clean_string($address)."\n";
    $email_message .= "Date of Birth: ".clean_string($date)."\n";

    @mail($email_to, $email_subject, $email_message, $headers);

    
}
?>