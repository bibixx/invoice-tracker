<?php
  include "utils.php";
  require_once("vendor/autoload.php");

  $hashids = new Hashids\Hashids("seller", 8);
  $arr = array();

  $query = "SELECT * FROM `sellers` WHERE 1";
  $returned = execQuery($query);

  foreach ($returned as $key => $value) {
    $data = array();
    $data["id"] = $hashids->encode( $value[ "id" ] );
    $data["name"] = $value["name"];
    $data["nip"] = $value["nip"];
    $data["city"] = $value["city"];
    $data["street"] = $value["street"];
    $data["zip"] = $value["zip"];
    $data["isSeller"] = ( $value["seller"] === "1" );
    $data["isPlace"] = ( $value["place"] === "1" );

    array_push($arr, $data);
  }

  echo json_encode($arr);
?>
