<?php

require_once WWW_ROOT . 'classes' . DIRECTORY_SEPARATOR . 'CodePDO.php';

class PollDAO{

    public function __construct(){
        $this->dbh = CodePDO::getInstance();
    }

    public function getPolls(){

        $sql = 'SELECT * FROM decenia';

        $stmt = $this->dbh->query($sql);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function getDecenium($id){

        $sql = 'SELECT * FROM decenia WHERE ID = :id';

        $stmt = $this->dbh->prepare($sql);

        $params = array(
            ':id' => $id
        );

        $stmt->execute($params);

        $detail = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC) ){
            $detail = $row;
        }

        if( empty($detail)){
            return false;
        }

        return $detail;
    }

    public function addVote($id, $votedValue){

        $sql = 'UPDATE decenia SET Votes = :votedValue WHERE ID = :id';

        $stmt = $this->dbh->prepare($sql);

        $params = array(
            ':votedValue' => $votedValue,
            ':id' => $id
        );

        if($stmt->execute($params)){
            return true;
        }
    }
    public function addMember($naam,$email,$postcode){
        $sql = 'INSERT INTO deelnemers (Naam,Email,Postcode) VALUES(:naam,:email,:postcode)';

        $stmt = $this->dbh->prepare($sql);

        $params = array(
            ':naam' => $naam,
            ':email' => $email,
            ':postcode'=>$postcode
        );

        if($stmt->execute($params)){
            return true;
        }
    }



}

?>