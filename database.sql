-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 27 mrt 2013 om 13:27
-- Serverversie: 5.5.25
-- PHP-versie: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Databank: `MAIV_Oostende`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `MAIV_Oostende_Locaties`
--

CREATE TABLE `MAIV_Oostende_Locaties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `adress` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `long` decimal(11,6) NOT NULL,
  `lat` decimal(11,6) NOT NULL,
  `cat` int(11) NOT NULL,
  `likes` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Gegevens worden uitgevoerd voor tabel `MAIV_Oostende_Locaties`
--

INSERT INTO `MAIV_Oostende_Locaties` (`id`, `name`, `description`, `adress`, `img`, `long`, `lat`, `cat`, `likes`) VALUES
(13, 'Oesterhoeve', 'Dit is de enige oesterkwekerij in BelgiÃ«. Ze is enkele jaren geleden omgebouwd tot B&B. Het is de ideale plaats om te genieten van rust en heerlijke Oostendse specialiteiten zoals oesters, kreeft, enz.  Je verblijft er ook in prachtige kamers die in het thema van de zee en visserij zijn ingericht.  ', 'Schietbaanstraat 84 8400 OOSTENDE ', 'oester.jpg', 2.949743, 51.231734, 1, NULL),
(15, 'De Hofkamers', 'Heerlijk hotel waar de 27 kamers individueel ingericht zijn met antieke/romantische meubels. Het hotel is gelegen in een rustig straatje en op wandelafstand van de zee, het strand en het Leopoldpark. Elke kamer beschikt over een tal van faciliteiten zoals een massagezetel, minibar, enz. Daarbovenop geniet je als gast ook van gratis gebruik van de fitnessruimte en het zonneterras. Er is dus binnen de groep van de medioren voor ieder wat wils.', 'Ijzerstraat 5 8400 OOSTENDE ', 'hofkamer.jpg', 2.912858, 51.229486, 1, NULL),
(16, 'Het Wilgenhuis', 'Deze B&B is gelegen in de rand van Oostende, ver weg van lawaai en pottenkijkers. De tuin, in Engelse stijl, nodigt uit tot een romantische wandeling of heerlijk luieren in de ligzetels', 'Pontonstraat 2 8400 Oostende ', 'wilgen.jpg', 2.923533, 51.216135, 1, NULL),
(17, 'Porto Bello', 'Porto Bello is een zowel unieke als uitzonderlijke B&B met vijf-sterren service en vol met charme. Het heeft een perfecte ligging met uitzicht op zee, jacht en vissershaven. ', 'Visserplein 2-5 A  8400 Oostende ', 'portobello.png', 2.921848, 51.232688, 1, NULL),
(18, 'Beluga', 'Dit restaurant dat vooral de Belgische en Franse keuken aandoet heeft aandacht voor verse producten. Vis en schaaldieren vinden we hier zeker terug op de menukaart. Ze staan ook op een persoonlijke service.\r\n50.769471, 4.674683\r\n51.228966,2.909639', 'Kemmelbergstraat 33 8400 Oostende', 'beluga.png', 4.674683, 50.769471, 1, NULL),
(19, 'Aqua del mar', 'Dit restaurant staat voor een losse bediening en lekker eten in het Kursaal van Oostende. Hier serveren ze heel wat lekkers uit de zee, maar ook tongstrelende vleesgerechten. Bij mooi weer kunnen de klanten gebruik maken van het terras met zicht op zee.', 'Kursaal â€“ Westhelling 12 	8400 OOSTENDE ', 'aguadelmar.png', 2.911270, 51.231841, 1, NULL),
(20, 'Adelientje', 'Adelientje is een klein en gezellig restaurantje met een lange geschiedenis. Je kunt hier genieten van dagverse vis op traditionele wijze gebracht.', 'Bonenstraat 9 8400 Oostende ', 'adelientje.png', 2.921505, 51.232392, 1, NULL),
(21, 'Chocolatier Willems', 'Hier kun je de etalage bewonderen die al verschillende keren is bekroond. Alles wat je je maar kan inbeelden vind je hier terug in chocolade (zelfs een screenshot van Man Bijt Hond!). ', 'Alfons Pieterslaan 120 8400 Oostende ', 'Willems.png', 2.910089, 51.225082, 1, NULL),
(22, 'Zeegeuzen', 'Dit is een sfeervol volkscafÃ© waar je kunt genieten van een typisch Oostends streekbier, de zeegeuze. Voor een klein prijsje kun je genieten van een heerlijke spaghetti.', 'Kapucijnenstraat 38 8400 Oostende', 'zeegeuzen011.jpg', 2.918179, 51.233967, 1, NULL),
(23, 'Oâ€™riant', 'In dit welnesscentrum kun je je laten verwennen in duocabines. Daar kunnen kan je genieten van een duomassage of een gelaatsverzorging. In de relaxruimte kun je uitrusten in de loungezetels met een hapje en een drankje.', 'Kaaistraat 1A (groentemarkt)  8400 Oostende ', 'oriant.jpg', 2.919509, 51.232520, 4, NULL),
(24, 'Kinepolis', 'Hier kan je genieten van een romantische liefdesfilm  in een "Loveseat".', 'Koningin Astridlaan 12 8400 Oostende ', 'Kinepolis.jpg', 2.898379, 51.224037, 2, NULL),
(25, 'Japanse tuin Shin Kai Tei', 'In deze tuin die we in het Koningspark vinden kun je genieten van het natuurschoon. Je kan indien gewenst picknicken op Ã©Ã©n van de vele bankjes in en dit in een schitterend decor. ', 'Koningspark 8400 Oostende', 'koningspark.jpg', 2.906495, 51.227575, 2, NULL),
(26, 'Vuurtoren', 'Het is de ideale plaats om te genieten van het mooi uitzicht. Daarbovenop ligt het ook op wandelafstand van de B&B Oesterhoeve. ', 'Vuurtorendok-West 8400 Oostende', 'vuurtoren.jpg', 2.930796, 51.236302, 2, NULL),
(27, 'Venetiaanse Gaanderijen', 'In deze gaanderijen kun je een leuke wandeling maken min een schitterend dÃ©cor. Er zijn ook bankjes voor als je even van de schoonheid van de zee en het strand wilt genieten.', 'Albert I-Promenade 8400 Oostende', 'venetiaanse-gaanderijen-oostende.jpg', 2.912981, 51.233071, 2, NULL);
