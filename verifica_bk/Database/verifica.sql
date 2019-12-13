-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 10, 2019 at 02:27 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `verifica`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` varchar(255) NOT NULL,
  `plate` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `fk_users` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `plate`, `model`, `fk_users`, `createdAt`, `updatedAt`) VALUES
('1234aad7-d88d-4e22-8709-a7b6ace35fcd', 'abc43dc', 'Punto', 'asdfasdfasf', '2019-10-10 12:07:46.181', '2019-10-10 12:07:46.181'),
('46dfea0e-f367-4c97-a9b0-0032f05da87c', 'abcdfgh', 'punto', '4185aad7-d88d-4e22-8709-a7b6ace35fcd', '2019-10-10 14:21:19.006', '2019-10-10 14:21:19.006'),
('5678aad7-d88d-4e22-8709-a7b6ace35fcd', 'cde43dc', 'Mercedes', '4185aad7-d88d-4e22-8709-a7b6ace35fcd', '2019-10-10 12:07:46.181', '2019-10-10 12:07:46.181');

-- --------------------------------------------------------

--
-- Table structure for table `fine`
--

CREATE TABLE `fine` (
  `id` varchar(255) NOT NULL,
  `price` int(10) NOT NULL,
  `fk_cars` varchar(255) NOT NULL,
  `reason` text NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fine`
--

INSERT INTO `fine` (`id`, `price`, `fk_cars`, `reason`, `createdAt`, `updatedAt`) VALUES
('9876aad7-d88d-4e22-8709-a7b6ace35fcd', 100, '5678aad7-d88d-4e22-8709-a7b6ace35fcd', 'Perchè si', '2019-10-10 12:07:46.181', '2019-10-10 12:07:46.181');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `role`, `createdAt`, `updatedAt`) VALUES
('4185aad7-d88d-4e22-8709-a7b6ace35fcd', 'pippo@gmail.com', '$2b$10$ATmhUqgdNuiQb3zGHzwJeeJtAvkDZk4M/z57OGkKwg2QBux.DN2jO', 'giuseppe', 'verdi', 'POLICE', '2019-10-10 12:07:46.181', '2019-10-10 12:07:46.181'),
('asdfasdfasf', 'vestini.gilda@libero.it', 'aaaa', 'Tizio', 'caio', 'nabbo', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cars_ibfk_1` (`fk_users`);

--
-- Indexes for table `fine`
--
ALTER TABLE `fine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cars` (`fk_cars`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`);

--
-- Constraints for table `fine`
--
ALTER TABLE `fine`
  ADD CONSTRAINT `fine_ibfk_1` FOREIGN KEY (`fk_cars`) REFERENCES `cars` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
