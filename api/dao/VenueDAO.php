<?php
require_once WWW_ROOT . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';

class VenueDAO
{
    public $dbh;

    public function __construct()
    {
        $this->dbh = DatabasePDO::getInstance();
    }

    public function getVenuesByCat()
    {
        $sql = 'SELECT * FROM MAIV_Oostende_Locaties';
        $stmt = $this->dbh->prepare($sql);
        if($stmt->execute())
        {
            //echo "Venues found!";
            return $stmt->fetchAll(PDO::FETCH_ASSOC);

        }
    }
    
}