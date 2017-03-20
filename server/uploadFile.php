<?php
function uploadFile($file) {
  $fileDir = "";
  $target_dir = "uploads/";
  $allowedFileTypes = array("pdf", "jpg", "jpeg", "png");

  $target_file = $target_dir . basename($file["name"]);
  $uploadStatus = 0;
  $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

  while (true) {
    $filename = str_replace(".", "-", uniqid(rand(), true)) . "." . $imageFileType;
    if (!file_exists($target_dir . $filename)) break;
  }

  $target_file = $target_dir . $filename;

  if ( !in_array( strtolower($imageFileType), $allowedFileTypes) ) {
    $uploadStatus = 1;
  }

  if ($file["size"] > MAXFILESIZE * 1000000) {
    $uploadStatus = 2;
  }

  if ($uploadStatus === 0) {
    if (move_uploaded_file($file["tmp_name"], $target_file)) {
      $fileDir = $target_dir . $filename;
    }
  }

  return $fileDir;
}
?>
