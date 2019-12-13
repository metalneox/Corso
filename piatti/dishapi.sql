-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ott 04, 2019 alle 14:40
-- Versione del server: 10.4.6-MariaDB
-- Versione PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dishapi`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `allergen`
--

CREATE TABLE `allergen` (
  `IDAllergen` varchar(255) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `allergen`
--

INSERT INTO `allergen` (`IDAllergen`, `Name`, `updatedAt`, `createdAt`) VALUES
('65bb448c-8710-434c-af7c-d00d3a2bf656', 'lasagna', '2019-10-04 09:22:15', '2019-10-04 09:22:15');

-- --------------------------------------------------------

--
-- Struttura della tabella `dish`
--

CREATE TABLE `dish` (
  `IDDish` varchar(255) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Desc` varchar(30) NOT NULL,
  `Price` varchar(30) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `dish`
--

INSERT INTO `dish` (`IDDish`, `Name`, `Desc`, `Price`, `updatedAt`, `createdAt`) VALUES
('07c72dd2-3d5a-4e43-b372-010aad4decce', 'lasasdaagna', 'asdfaaa', 'proasdva', '2019-10-04 09:37:23', '2019-10-04 09:37:23'),
('a7c3643f-4c6f-44fe-86df-403b6bd9b0a2', 'lasasdaagna', 'asdfaaa', 'proasdva', '2019-10-04 09:35:10', '2019-10-04 09:35:10'),
('d6c4661d-4738-46fa-87a8-781861cb851e', 'lasagna', 'aaa', 'prova', '2019-10-04 09:33:55', '2019-10-04 09:33:55'),
('def5208f-cc90-4e7d-bcab-c7e87e13766a', 'lasagna', 'aaa', 'prova', '2019-10-04 09:24:28', '2019-10-04 09:24:28');

-- --------------------------------------------------------

--
-- Struttura della tabella `dishallergens`
--

CREATE TABLE `dishallergens` (
  `IDDishAllergens` varchar(255) NOT NULL,
  `FK_dish` varchar(255) NOT NULL,
  `FK_allergen` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `allergen`
--
ALTER TABLE `allergen`
  ADD PRIMARY KEY (`IDAllergen`);

--
-- Indici per le tabelle `dish`
--
ALTER TABLE `dish`
  ADD PRIMARY KEY (`IDDish`);

--
-- Indici per le tabelle `dishallergens`
--
ALTER TABLE `dishallergens`
  ADD PRIMARY KEY (`IDDishAllergens`),
  ADD KEY `FK_allergen` (`FK_allergen`),
  ADD KEY `FK_dish` (`FK_dish`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `dishallergens`
--
ALTER TABLE `dishallergens`
  ADD CONSTRAINT `dishallergens_ibfk_1` FOREIGN KEY (`FK_allergen`) REFERENCES `allergen` (`IDAllergen`),
  ADD CONSTRAINT `dishallergens_ibfk_2` FOREIGN KEY (`FK_dish`) REFERENCES `dish` (`IDDish`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
