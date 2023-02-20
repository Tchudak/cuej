<?php
// déclaration d'une classe Auteur


class Page {
  public $id;
  public $nom;
  public $resume;
  public $idFamille;
  public $id_famille_oui;
  public $id_famille_non;

  static function readAll() {
    // définition de la requête SQL
    $sql= 'select * from pages';

    // connexion
    $pdo = connexion();

    // préparation de la requête
    $query = $pdo->prepare($sql);

    // exécution de la requête
    $query->execute();

    // récupération de toutes les lignes sous forme d'objets
    $tableau = $query->fetchAll(PDO::FETCH_CLASS,'Page');

    // retourne le tableau d'objets
    return $tableau;
  }

  static function readOne($id)
  {
    $sql= 'SELECT p.*, m.nom AS media_nom, m.datatype AS media_datatype, m.alt AS media_alt, m.credit AS media_credit FROM pages p LEFT JOIN medias m ON p.id_media = m.id WHERE p.id = :id;';

    $pdo = connexion();
 
    // préparation de la requête
    $query = $pdo->prepare($sql);
    
    // on donne une valeur au paramètre correspondant à la clé
    $query->bindValue(':id', $id, PDO::PARAM_INT);
    
    // exécution de la requête
    $query->execute();

    // récupération de l'unique ligne
    $objet = $query->fetchObject('Page');
 
    // retourne l'objet contenant résultat
    return $objet;
  }

  static function readArticles($id)
  {
    $sql= 'SELECT a.*, m.nom AS media_nom, m.datatype AS media_datatype, m.alt AS media_alt, m.credit AS media_credit FROM articles a LEFT JOIN medias m ON a.id_media = m.id WHERE id_page = :id ORDER BY a.id;';

    $pdo = connexion();

    // préparation de la requête
    $query = $pdo->prepare($sql);
    
    // on donne une valeur au paramètre correspondant à la clé
    $query->bindValue(':id', $id, PDO::PARAM_INT);
    
    // exécution de la requête
    $query->execute();

    // récupération de l'unique ligne
    $tableau = $query->fetchAll(PDO::FETCH_CLASS,'Article');
 
    // // var_dump($id);
    // retourne l'objet contenant résultat
    return $tableau;
  }

  static function readCouleurs($id)
  {
    $sql= 'SELECT * FROM couleurs WHERE id_page = :id ORDER BY ordre;';

    $pdo = connexion();

    // préparation de la requête
    $query = $pdo->prepare($sql);
    
    // on donne une valeur au paramètre correspondant à la clé
    $query->bindValue(':id', $id, PDO::PARAM_INT);
    
    // exécution de la requête
    $query->execute();

    // récupération de l'unique ligne
    $tableau = $query->fetchAll(PDO::FETCH_CLASS,'Couleur');
 
    // // var_dump($id);
    // retourne l'objet contenant résultat
    return $tableau;
  }

  function chargePOST() {
    //On verifie et attribut les elements recupéré en POST
    if (isset($_POST['id'])) {
      $this->id = $_POST['id'];
    } else {
      $this->id = 0;
    }

    if (isset($_POST['nom'])) {
      $this->nom = $_POST['nom'];
    } else {
      $this->nom = 'Sans titre';
    }

    if (isset($_POST['resume'])) {
      $this->resume = $_POST['resume'];
    } else {
      $this->resume = '';
    }

    if (isset($_POST['id_famille'])) {
      $this->idFamille = $_POST['id_famille'];
    } else {
      $this->idFamille = '';
    }

    if (isset($_POST['id_media']) && $_POST['id_media'] != 0) {
      $this->id_media = $_POST['id_media'];
    } else {
      $this->id_media = null;
    }
  }

  function create() {
    // On prepare la requete SQL selon les entrées de l'utilisateurs
    $sql = 'INSERT INTO pages (nom, resume) VALUES (:nom, :resume);';
 
    // connexion à la base de données
    $pdo = connexion();
 
    // préparation de la requête
    $query = $pdo->prepare($sql);
 
    // on donne une valeur aux paramètres à partir des attributs de l'objet courant
    $query->bindValue(':nom', $this->nom, PDO::PARAM_STR);
    $query->bindValue(':resume', $this->resume, PDO::PARAM_STR);
 
    // Exécution de la requête
    $query->execute();
 
    $this->id = $pdo->lastInsertId();
  }

  static function delete($id) {
    // construction de la requête :nom, :prenom sont les valeurs à insérées
    $sql = 'DELETE FROM pages WHERE id = :id;';
 
    // connexion à la base de données
    $pdo = connexion();
 
    // préparation de la requête
    $query = $pdo->prepare($sql);
 
    // on lie le paramètre :id à la variable $id reçue
    $query->bindValue(':id', $id, PDO::PARAM_INT);
 
    // exécution de la requête
    $query->execute();
  }

  function update() {
    // construction de la requête :nom, :prenom sont les valeurs à insérées
    $sql = 'UPDATE pages SET nom = :nom, resume = :resume WHERE id = :id;';
    // connexion à la base de données
    $pdo = connexion();
 
    // préparation de la requête
    $query = $pdo->prepare($sql);
 
    // on donne une valeur aux paramètres à partir des attributs de l'objet courant
    $query->bindValue(':id', $this->id, PDO::PARAM_INT);
    $query->bindValue(':nom', $this->nom, PDO::PARAM_STR);
    $query->bindValue(':resume', $this->resume, PDO::PARAM_STR);
    
    //// var_dump('UPDATE articles SET titre = '.$this->titre.', sous_titre = '.$this->sousTitre.', auteur = '.$this->auteur.', date = NOW() WHERE id = '.$this->id.';');
    // exécution de la requête
    $query->execute();

  }
}
