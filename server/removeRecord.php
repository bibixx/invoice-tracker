<?php
  header('Access-Control-Allow-Origin: *');

  include "utils.php";
  require_once("vendor/autoload.php");

  $hashids = new Hashids\Hashids("record", 8);

  $query = "DELETE FROM `records` WHERE `id`=:id";

  $returned = execQuery($query, array(
    ":id" => $hashids->decode($_POST["id"])[0],
  ));

  $arr = array(
    "status" => "success",
  );

  echo json_encode($arr);
?>
