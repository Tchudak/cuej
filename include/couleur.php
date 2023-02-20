<?php
// déclaration d'une classe Auteur

class Couleur {
  public $id;
  public $idPage;
  public $hex;

  static function readAll() {
    // définition de la requête SQL
    $sql= 'select * from couleurs';

    // connexion
    $pdo = connexion();

    // préparation de la requête
    $query = $pdo->prepare($sql);

    // exécution de la requête
    $query->execute();

    // récupération de toutes les lignes sous forme d'objets
    $tableau = $query->fetchAll(PDO::FETCH_CLASS,'Couleur');

    // retourne le tableau d'objets
    return $tableau;
  }

  static function readOne($id)
  {
    $sql= 'SELECT * FROM couleurs WHERE id = :id;';

    $pdo = connexion();
 
    // préparation de la requête
    $query = $pdo->prepare($sql);
    
    // on donne une valeur au paramètre correspondant à la clé
    $query->bindValue(':id', $id, PDO::PARAM_INT);
    
    // exécution de la requête
    $query->execute();

    // récupération de l'unique ligne
    $objet = $query->fetchObject('Couleur');
 
    // retourne l'objet contenant résultat
    return $objet;
  }
}
?>
