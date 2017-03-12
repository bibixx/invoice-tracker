<?php
  header('Access-Control-Allow-Origin: *');

  include "utils.php";
  require_once("../vendor/autoload.php");

  $hashids = new Hashids\Hashids("seller", 8);

  $data = array();

  $domain = (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://$_SERVER[HTTP_HOST]:$_SERVER[SERVER_PORT]/";

  $data["data"] = $_POST;

  if (
    !(
      $data["data"]["Name"] !== "" &&
      $data["data"]["City"] !== "" &&
      $data["data"]["Street"] !== "" &&
      $data["data"]["Zip"] !== "" &&
      preg_match("/^\d{2}-\d{3}$/", $data["data"]["Zip"]) &&
      preg_match("/^\d{10}$/", $data["data"]["NIP"]) &&
      ( $data["data"]["isSeller"] === "true" || $data["data"]["isSeller"] === "false" ) &&
      ( $data["data"]["isPlace"] === "true" || $data["data"]["isPlace"] === "false" )
    )
  ) {
    $arr = array(
      "error" => 1
    );

    echo json_encode($arr);
    die();
  }

  $query = "INSERT INTO `sellers`(`name`, `nip`, `city`, `street`, `zip`, `seller`, `place`) VALUES (:name, :nip, :city, :street, :zip, :seller, :place)";

  $returned = execQuery($query, array(
    ":name" => $data["data"]["Name"],
    ":nip" => $data["data"]["NIP"],
    ":city" => $data["data"]["City"],
    ":street" => $data["data"]["Street"],
    ":zip" => $data["data"]["Zip"],
    ":seller" => ( $data["data"]["isSeller"] === "true" ) ? 1 : 0,
    ":place" => ( $data["data"]["isPlace"] === "true" ) ? 1 : 0,
  ), "id");

  $data["data"]["id"] = $hashids->encode($returned);
  $data["data"]["id"] = $returned;

  $arr = array(
    "data" => $data,
  );

  echo json_encode($arr);
?>
