<?php
require_once WWW_ROOT . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';

class EventDAO
{
    public $dbh;

    public function __construct()
    {
        $this->dbh = DatabasePDO::getInstance();
    }

    public function getEventsByUser($key)
    {
        $sql = 'SELECT events.* FROM events INNER JOIN users ON events.userid=users.id WHERE users.apikey= :key';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':key',$key);
        if($stmt->execute())
        {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    public function getEventById($id, $key)
    {
        $sql = 'SELECT * FROM events WHERE id=:id';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':id',$id);
        if($stmt->execute())
        {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        $amount = count($this->checkKey($result['userid'],$key));
        if($amount > 0)
            return $result;
        else
            return null;
    }

    private function checkKey($userid, $key)
    {
        $sql = 'SELECT * FROM users WHERE id= :userid AND apikey= :key';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':userid',$userid);
        $stmt->bindValue(':key',$key);
        if($stmt->execute())
        {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }

    public function addEvent($event)
    {
        $sql = 'INSERT INTO events(userid, name, description, date, fromtime, untiltime, capacity) VALUES(:userid, :name, :description, :date, :fromtime, :untiltime, :capacity)';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':userid',$event['userid']);
        $stmt->bindValue(':name',$event['name']);
        $stmt->bindValue(':description',$event['description']);
        $stmt->bindValue(':date',$event['date']);
        $stmt->bindValue(':fromtime',$event['fromtime']);
        $stmt->bindValue(':untiltime',$event['untiltime']);
        $stmt->bindValue(':capacity',$event['capacity']);

        if($stmt->execute())
        {
            $event['id'] = $this->dbh->lastInsertId();
            return $event;
        }
    }

    public function removeEvents($key)
    {
        //$sql = 'DELETE FROM events WHERE id="96" ';
        $sql = 'DELETE FROM events WHERE id=:hetID ';
        
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':hetID',$key);

        if($stmt->execute())
        {
        }
    }

    public function updateEvent($id,$event)
    {
        $sql = 'UPDATE events SET name= :name, description= :description, date= :date, fromtime= :fromtime, untiltime= :untiltime, capacity= :capacity WHERE id= :id';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':name',$event['name']);
        $stmt->bindValue(':description',$event['description']);
        $stmt->bindValue(':date',$event['date']);
        $stmt->bindValue(':fromtime',$event['fromtime']);
        $stmt->bindValue(':untiltime',$event['untiltime']);
        $stmt->bindValue(':capacity',$event['capacity']);
        $stmt->bindValue(':id',$id);
        if($stmt->execute())
        {
            return $event;
        }
    }

    
}