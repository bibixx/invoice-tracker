<?php
  include "utils.php";
  include "uploadFile.php";
  require_once("vendor/autoload.php");

  $hashids = new Hashids\Hashids("record", 8);
  $hashidsSeller = new Hashids\Hashids("seller", 8);

  $data = array(
    "id" => $_POST[ "id" ],
    "name" => $_POST[ "name" ],
    "place" => $_POST[ "place" ],
    "seller" => $_POST[ "seller" ],
    "warrantyDate" => $_POST[ "warrantyDate" ],
    "warrantyLength" => (float)$_POST[ "warrantyLength" ],
    "notes" => $_POST[ "notes" ],
  );

  $files = json_decode( $_POST[ "oldFiles" ] );
  $domain = (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://$_SERVER[HTTP_HOST]:$_SERVER[SERVER_PORT]/server/";

  array_unshift($files, $domain);
  foreach ($_FILES as $key => $value) {
    array_push($files, uploadFile($value));
  }

  $data["files"] = $files;


  preg_match("/\d+/", $_POST["warrantyLength"], $matches);
  $data["warrantyLength"] = (float)$matches[0];

  if (
    !(
      $data["name"] !== "" &&
      $data["place"] !== "" &&
      $data["seller"] !== "" &&
      $data["warrantyDate"] !== "" &&
      $data["warrantyDate"] !== "0000-00-00" &&
      $data["warrantyLength"] !== ""
    )
  ) {
    $arr = array(
      "error" => 1
    );

    echo json_encode($arr);
    die();
  }

  $query = "UPDATE `records` SET `product`=:product, `place`=:place, `seller`=:seller, `date`=:date, `warranty`=:warranty, `notes`=:notes, `files`=:files WHERE `id` = :id";

  $tempFiles = $data["files"];
  array_shift($tempFiles);

  $returned = execQuery($query, array(
    ":id" => $hashids->decode($data["id"])[0],
    ":product" => $data["name"],
    ":place" => $hashidsSeller->decode($data["place"])[0],
    ":seller" => $hashidsSeller->decode($data["seller"])[0],
    ":date" => $data["warrantyDate"],
    ":warranty" => $data["warrantyLength"],
    ":notes" => $data["notes"],
    ":files" => json_encode( $tempFiles )
  ), "id");

  echo json_encode( $data );
?>
