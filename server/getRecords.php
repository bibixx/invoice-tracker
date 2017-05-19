<?php
  // sleep( 10 );
  header('Access-Control-Allow-Origin: *');

  include "utils.php";
  require_once("vendor/autoload.php");

  $domain = (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://$_SERVER[HTTP_HOST]:$_SERVER[SERVER_PORT]/";
  $hashids = new Hashids\Hashids("record", 8);
  $hashidsSeller = new Hashids\Hashids("seller", 8);
  $arr = array();

  $query = "SELECT * FROM `records` WHERE 1 ORDER BY `date` DESC";
  $returned = execQuery($query);

  foreach ($returned as $key => $value) {
    $data = array();
    $data["id"] = $hashids->encode($value["id"]);
    $data["name"] = $value["product"];
    // $data["place"] = $hashidsSeller->encode($value["place"]);
    // $data["seller"] = $hashidsSeller->encode($value["seller"]);
    $data["place"] = "a";
    $data["seller"] = "a";
    $data["warrantyDate"] = $value["date"];
    $data["warrantyLength"] = (float)$value["warranty"];
    $data["notes"] = $value["notes"];
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
