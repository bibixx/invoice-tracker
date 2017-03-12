<?php
  include 'passwords.php';

  $maxFileSize = 500;
  preg_match("/[0-9]+/", ini_get('post_max_size'), $matches1);
  preg_match("/[0-9]+/", ini_get('upload_max_filesize'), $matches2);
  $maxFileSize = min($matches1[0], $matches2[0]) * 1;

  define("MAXFILESIZE", $maxFileSize);

  function execQuery($query, $queryArgs = null, $mode = "") {
    try {
      $db = new PDO('mysql:host='.HOST.';dbname='.DATABASE.';charset=utf8mb4', LOGIN, PASSWORD);
      $queryPDO = $db->prepare($query);
      $queryPDO->execute($queryArgs);
      $queryOut = $queryPDO->fetchAll(PDO::FETCH_ASSOC);

      switch ($mode) {
        case "id":
          return $db->lastInsertId();
          break;

        default:
          return $queryOut;
          break;
      }
    } catch (PDOException $e) {
      $error = array();
      $error["error"] = utf8_encode($e->getMessage());
      $error["error_code"] = "0";
      echo json_encode($error);
      die();
    }
  }
?>
