<?php
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if(empty($_POST['name']) && empty($_POST['email'])) die();

if($_POST){
    http_response_code(200);
    $subject = $_POST['name'];
    $to = "shevelyovilja@gmail.com";
    $from = $_POST['email'];

    //data to send
    $msg = $_POST['name'].$_POST['email'].$_POST['phone'].$_POST['address'].$_POST['date'];

    $headers ="From <".$from.">";
    mail($to, $subject, $msg, $headers);

    echo json_encode(array(
        "sent" => true
    ));

    $file = fopen('form.txt', 'a');
    ftruncate($file, 0);
    $content = $msg;
    fwrite($file, $content);
    fclose($file);
}
else{
    //report the error
    echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}