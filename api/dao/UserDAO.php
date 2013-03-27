<?php
require_once WWW_ROOT . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';

class UserDAO
{
    public $dbh;

    public function __construct()
    {
        $this->dbh = DatabasePDO::getInstance();
    }

    private function getUser($id)
    {
        $sql = 'SELECT * FROM users WHERE id= :id';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':id',$id);
        if($stmt->execute())
        {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }

    public function login($user)
    {
        $sql = 'SELECT * FROM users WHERE username= :username AND password= :password';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':username',$user['username']);
        $stmt->bindValue(':password',$user['password']);
        if($stmt->execute())
        {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }

    public function addUser($user)
    {
        $key = uniqid();
        print_r("adduser inserter");


        $sql = 'INSERT INTO users(username, password, apikey) VALUES(:username, :password, :apikey)';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':username',$user['username']);
        $stmt->bindValue(':password',$user['password']);
        $stmt->bindValue(':apikey', $key);

        if($stmt->execute())
        {
            $id = $this->dbh->lastInsertId();
            return $this->getUser($id);
        }
    }
}