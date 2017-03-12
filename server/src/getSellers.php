<?php
  header('Access-Control-Allow-Origin: *');

  include "utils.php";
  require_once("../vendor/autoload.php");

  $domain = (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://$_SERVER[HTTP_HOST]:$_SERVER[SERVER_PORT]/";
  $hashids = new Hashids\Hashids("seller", 8);
  $arr = array();

  $query = "SELECT * FROM `sellers` WHERE 1";
  $returned = execQuery($query);

  foreach ($returned as $key => $value) {
    $data = array();
    $data["data"]["id"] = $hashids->encode($value["id"]);
    $data["data"]["Name"] = $value["name"];
    $data["data"]["NIP"] = $value["nip"];
    $data["data"]["City"] = $value["city"];
    $data["data"]["Street"] = $value["street"];
    $data["data"]["Zip"] = $value["zip"];
    $data["data"]["isSeller"] = $value["seller"];
    $data["data"]["isPlace"] = $value["place"];

    array_push($arr, $data);
  }

  echo json_encode($arr);
?>
