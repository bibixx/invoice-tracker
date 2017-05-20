<?php
  header('Access-Control-Allow-Origin: *');

  include "utils.php";
  require_once("vendor/autoload.php");

  $hashids = new Hashids\Hashids("record", 8);
  $hashidsSeller = new Hashids\Hashids("seller", 8);

  $data = array(
    "id" => $_POST[ "id" ],
    "name" => $_POST[ "name" ],
    "city" => $_POST[ "city" ],
    "street" => $_POST[ "street" ],
    "zip" => $_POST[ "zip" ],
    "nip" => $_POST[ "nip" ],
    "isSeller" => $_POST[ "isSeller" ] === "true",
    "isPlace" => $_POST[ "isPlace" ] === "true"
  );

  if (
    !(
      $data["name"] !== "" &&
      $data["city"] !== "" &&
      $data["street"] !== "" &&
      $data["zip"] !== "" &&
      preg_match("/^\d{2}-\d{3}$/", $data["zip"]) &&
      preg_match("/^\d{10}$/", $data["nip"])
    )
  ) {
    $arr = array(
      "error" => 1
    );

    echo json_encode($arr);
    die();
  }

  $query = "UPDATE `sellers` SET `name`=:name, `nip`=:nip, `city`=:city, `street`=:street, `zip`=:zip, `seller`=:seller, `place`=:place WHERE `id` = :id";

  $returned = execQuery($query, array(
    ":id" => $hashidsSeller->decode($data["id"])[0],
    ":name" => $data["name"],
    ":nip" => $data["nip"],
    ":city" => $data["city"],
    ":street" => $data["street"],
    ":zip" => $data["zip"],
    ":seller" => ( $data["isSeller"] ) ? 1 : 0,
    ":place" => ( $data["isPlace"] ) ? 1 : 0,
  ), "id");

  echo json_encode( $data );
?>
