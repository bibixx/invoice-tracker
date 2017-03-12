<?php
  header('Access-Control-Allow-Origin: *');

  include "utils.php";
  require_once("../vendor/autoload.php");

  $domain = (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://$_SERVER[HTTP_HOST]:$_SERVER[SERVER_PORT]/";
  $hashids = new Hashids\Hashids("record", 8);
  $hashidsSeller = new Hashids\Hashids("seller", 8);
  $arr = array();

  $query = "SELECT * FROM `records` WHERE 1 ORDER BY `date` DESC";
  $returned = execQuery($query);

  foreach ($returned as $key => $value) {
    $data = array();
    $data["data"]["id"] = $hashids->encode($value["id"]);
    $data["data"]["Product"] = $value["product"];
    $data["data"]["Place"] = $hashidsSeller->encode($value["place"]);
    $data["data"]["Seller"] = $hashidsSeller->encode($value["seller"]);
    $data["data"]["Date"] = $value["date"];
    $data["data"]["Warranty-length"] = $value["warranty"];
    $data["data"]["Notes"] = $value["notes"];
    $data["files"] = json_decode($value["files"]);

    if( count($data["files"]) > 0 ) {
      array_unshift($data["files"], $domain);
    } else {
      $data["files"] = array();
    }

    array_push($arr, $data);
  }

  echo json_encode($arr);
?>
