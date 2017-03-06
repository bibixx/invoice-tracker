<?php
  header('Access-Control-Allow-Origin: *');

  $maxFileSize = 500;

  $data = array();

  preg_match("/[0-9]+/", ini_get('post_max_size'), $matches1);
  preg_match("/[0-9]+/", ini_get('upload_max_filesize'), $matches2);

  $maxFileSize = min($matches1[0], $matches2[0]) * 1;
  $target_dir = "uploads/";

  foreach ($_FILES as $key => $value) {
    $file = $value;
    $target_file = $target_dir . basename($file["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

    // Check file size
    if ($file["size"] > $maxFileSize*1000000) {
      array_push($data, "Sorry, your file is too big. (Limit is: ". $maxFileSize ."M)");
      $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
      array_push($data, "Sorry, your file was not uploaded.");
    // if everything is ok, try to upload file
    } else {
      if (move_uploaded_file($file["tmp_name"], $target_file)) {
        array_push($data, "The file ". basename( $file["name"]). " has been uploaded.");
      } else {
        array_push($data, "Sorry, there was an error uploading your file.");
      }
    }
  }

  $arr = array(
  "post" => $_POST,
  "files" => $_FILES,
  "data" => $data
  );

  echo json_encode($arr);
?>
