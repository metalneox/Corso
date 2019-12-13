-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ott 01, 2019 alle 18:58
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
-- Database: `ecipar`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `cities`
--

CREATE TABLE `cities` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `cities`
--

INSERT INTO `cities` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('268e8107-bb68-4b4b-91d9-edc86578cb89', 'Rimini', '2019-10-01', '2019-10-01'),
('42dbc02d-4053-4686-8c14-dd433bfe5036', 'Roma', '2019-10-01', '2019-10-01'),
('7c7f048c-14af-4032-b098-618db0962ad7', 'Venezia', '2019-10-01', '2019-10-01'),
('c5bf9848-834c-4f0f-a241-fd91f7027093', 'Cesena', '2019-10-01', '2019-10-01');

-- --------------------------------------------------------

--
-- Struttura della tabella `people`
--

CREATE TABLE `people` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cityId` varchar(190) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `people`
--

INSERT INTO `people` (`id`, `name`, `cityId`, `createdAt`, `updatedAt`) VALUES
('ebd83533-5cf0-43f6-aa2d-e88643164b71', 'massimo', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('1661b4c4-332e-41df-936d-cfd6fa377756', 'Prova', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('5488eff9-d25f-444a-a813-aef8c89fe04f', 'Prova', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('9a8ae743-da04-4805-93ac-6283c580f8d4', 'Prova', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('a817cd47-a9e8-4077-b0b9-ccb24f7960c2', 'test', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('0af2644a-ec49-463f-85a3-d43c111da0d0', 'Prova', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('6af0db87-67fa-4110-b21e-3b8c80b088c2', 'test', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('4b4f9bef-f6e3-4f0e-9558-752e33758ef7', 'Prova', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('c0808655-f28c-4617-af5a-9b47bbfb8c76', 'test', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('e07dbd63-0a2c-4d4c-9119-cd56c41ebd4b', 'Prova', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('1ff8f598-68b2-4917-afd1-e65e84d4460f', 'test', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('ae0a583e-c8ed-440c-ae5b-dec3a11a31db', 'Prova', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01'),
('8f61dc04-9d22-4e67-b195-a6b60fed12a3', 'test', '42dbc02d-4053-4686-8c14-dd433bfe5036', '2019-10-01', '2019-10-01');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `createdAt`, `updatedAt`) VALUES
('120874a3-88e4-403d-b0ca-6cd8a427c669', 'root', '$2b$10$vRyR3H2twcRO7WtAsbWBMu2ilFcO1Ucywl3Uny5JDAX4AUXgaSwa6', 'root@world.com', '2019-10-01 16:02:24.930', '2019-10-01');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `people`
--
ALTER TABLE `people`
  ADD KEY `cityId` (`id`),
  ADD KEY `people_ibfk_1` (`cityId`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`email`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `people_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
