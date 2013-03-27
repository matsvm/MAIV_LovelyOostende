<?php
require_once WWW_ROOT . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';


class RegistrationDAO
{
    public $dbh;

    public function __construct()
    {
        $this->dbh = DatabasePDO::getInstance();
    }

    public function getRegistrationsForEvent($eventid)
    {
        $sql = 'SELECT * FROM registrations WHERE eventid=:id';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':id',$eventid);
        if($stmt->execute())
        {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    public function addRegistrationForEvent($registration)
    {
        $sql = 'INSERT INTO registrations(eventid, name, firstname, email) VALUES(:eventid, :name, :firstname, :email)';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':eventid',$registration['eventid']);
        $stmt->bindValue(':name',$registration['name']);
        $stmt->bindValue(':firstname',$registration['firstname']);
        $stmt->bindValue(':email',$registration['email']);

        if($stmt->execute())
        {
            return $registration;
        }
    }

    public function deleteRegistrationForEvent($id)
    {
        $sql = 'DELETE FROM registrations WHERE id= :id';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':id',$id);
        if($stmt->execute())
        {
            return $id;
        }
    }
}
