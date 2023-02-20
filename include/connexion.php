<?php

function connexion()
{
  $pdo = new PDO('mysql:host=wsql.u-strasbg.fr;dbname=cuejreligion;charset=utf8', 'cuej', 'bu4Xahj^');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

  if ($pdo) {
    return $pdo;
  } else {
    echo '<p>Erreur de connexion</p>';
    exit;
  }
}
?>