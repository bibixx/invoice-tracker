<?php
  header('Access-Control-Allow-Origin: *');

  include "utils.php";
  require_once("vendor/autoload.php");

  $hashids = new Hashids\Hashids("record", 8);
  $hashidsSeller = new Hashids\Hashids("seller", 8);

  $data = array();

  $files = array();
  $domain = (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://$_SERVER[HTTP_HOST]:$_SERVER[SERVER_PORT]/";

  array_push($files, $domain);
  foreach ($_FILES as $key => $value) {
    array_push($files, uploadFile($value));
  }

  $data["files"] = $files;
  $data["data"] = $_POST;

  preg_match("/\d+/", $_POST["Warranty-length"], $matches);
  $data["data"]["Warranty-length"] = $matches[0];

  if (
    !(
      $data["data"]["id"] !== "" &&
      $data["data"]["Product"] !== "" &&
      $data["data"]["Place"] !== "" &&
      $data["data"]["Seller"] !== "" &&
      $data["data"]["Date"] !== "" &&
      $data["data"]["Date"] !== "0000-00-00" &&
      $data["data"]["Warranty-length"] !== ""
    )
  ) {
    $arr = array(
      "error" => 1
    );

    echo json_encode($arr);
    die();
  }

  $tempFiles = $data["files"];
  array_shift($tempFiles);
  $query = "UPDATE `records` SET `product`=:product, `place`=:place, `seller`=:seller, `date`=:date, `warranty`=:warranty, `notes`=:notes WHERE `id` = :id";

  $returned = execQuery($query, array(
    ":id" => $hashids->decode($data["data"]["id"])[0],
    ":product" => $data["data"]["Product"],
    ":place" => $hashidsSeller->decode($data["data"]["Place"])[0],
    ":seller" => $hashidsSeller->decode($data["data"]["Seller"])[0],
    ":date" => $data["data"]["Date"],
    ":warranty" => $data["data"]["Warranty-length"],
    ":notes" => $data["data"]["Notes"]
  ), "id");

  $arr = array(
    "data" => $data,
  );

  echo json_encode($arr);
?>
