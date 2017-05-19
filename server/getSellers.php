<?php
  // sleep( 2 );
  header('Access-Control-Allow-Origin: *');

  include "utils.php";
  require_once("vendor/autoload.php");

  $domain = (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://$_SERVER[HTTP_HOST]:$_SERVER[SERVER_PORT]/";
  $hashids = new Hashids\Hashids("seller", 8);
  $arr = array();

  $query = "SELECT * FROM `sellers` WHERE 1";
  $returned = execQuery($query);

  $a = [ "", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "x", "y", "z", "aa", "ab", "ac", "ad", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq" ];

  foreach ($returned as $key => $value) {
    $data = array();
    $data["id"] = $hashids->encode( $value[ "id" ] );
    $data["id"] = $a[ $value[ "id" ] ];
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
