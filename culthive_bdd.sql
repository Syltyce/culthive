-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: culthive_bdd
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `workId` varchar(255) NOT NULL,
  `type` enum('watchlist','favorites') NOT NULL,
  `workType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (3,1,'1241982','favorites','film','2025-02-04 20:44:11','2025-02-04 20:44:11'),(7,1,'251691','watchlist','serie','2025-02-06 20:16:47','2025-02-06 20:16:47'),(8,2,'384018','watchlist','film','2025-02-07 11:45:29','2025-02-07 11:45:29'),(10,1,'597','watchlist','film','2025-02-10 10:00:00','2025-02-10 10:00:00'),(12,1,'822119','watchlist','film','2025-02-19 10:07:59','2025-02-19 10:07:59'),(13,1,'1241982','watchlist','film','2025-02-24 14:58:11','2025-02-24 14:58:11'),(14,1,'822119','favorites','film','2025-02-24 16:33:58','2025-02-24 16:33:58');
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `userId` int NOT NULL,
  `workId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (4,2,'dfsq','dsfqqsdfsdqfqsdf',1,'539972','2025-02-04 17:55:09','2025-02-20 16:13:38'),(5,2,'Incroyable ce film','nan je rigole trop nul',1,'539972','2025-02-04 17:56:11','2025-02-22 12:04:00'),(12,1,'film de merde','jamais vu un film aussi merdique',4,'539972','2025-02-06 15:58:10','2025-02-06 15:58:10'),(16,6,'super','aezafsdfqsf',1,'939243','2025-02-13 14:14:36','2025-02-21 15:44:36'),(17,1,'pas ouf ','',1,'94605','2025-02-13 15:01:29','2025-02-13 15:01:29'),(20,5,'Moyen','ça mais mais peut mieux faire',1,'1241982','2025-02-22 11:27:32','2025-02-24 15:14:01'),(21,5,'qd','sdqf',1,'939243','2025-02-22 11:36:03','2025-02-22 13:39:36'),(22,3,'pas ouf','',6,'1241982','2025-02-22 12:19:46','2025-02-22 12:19:46'),(23,2,'sqfd','sdfq',1,'939243','2025-02-22 12:21:21','2025-02-22 17:54:00'),(24,3,'sfdq','fsd',1,'539972','2025-02-22 18:15:44','2025-02-22 18:15:44'),(25,2,'TROP NUL ','',1,'539972','2025-02-22 18:28:28','2025-02-22 18:28:28'),(26,2,'dsqf','sdf',1,'939243','2025-02-22 18:30:41','2025-02-22 18:30:41'),(27,8,'Incroyable ','',1,'85231','2025-02-24 16:13:17','2025-02-24 16:13:17'),(28,7,'incroyable','j\'ai bien aimé mais je pense qu\'il aurait pu être mieux',1,'822119','2025-02-24 16:34:10','2025-02-24 16:48:14'),(29,8,'j\'ai adoré ','',6,'939243','2025-02-24 21:37:43','2025-02-24 21:37:43');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20250206154728-add-banned-to-user.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Marc','marc@gmail.com','$2b$10$kzuuavME1EBFCBQu7JJJuODY1cMwogSKooVGTceh2Ug0AfEF8e5Wu','2025-02-04 16:34:39','2025-02-04 16:34:39','user',0),(2,'Admin','admin@mail.com','$2b$10$Go74FsCiPpZ9sSxs3XlaTesVLhXLzUZYIjB0.IkEwIixhqOIGsyh6','2025-02-06 14:07:54','2025-02-06 14:07:54','admin',0),(3,'mec à bannir ','mecabannir@mail.com','$2b$10$VN6XyXGOY.aayHH95aypCedCZeO6jHo6zBXbp2XfjA4YgdlvshZOO','2025-02-06 15:41:50','2025-02-06 15:56:34','user',1),(4,'ban','bannir@mail.com','$2b$10$HwmUNtQ1N4J.wMD/0YX8WOJ2qcGWKZiWjaJlQrzecYXcj15Rf8h6G','2025-02-06 15:57:16','2025-02-06 15:58:52','user',1),(5,'paul','paul@mail.com','$2a$10$FoA.0Lgw0bCKDOBSVHBqR.bdhqeIpVUSuBpfqPStGIRN38Z/OFpsW','2025-02-22 12:15:38','2025-02-22 12:15:38','user',0),(6,'jean','jean@mail.fr','$2a$10$7bOa.2xTM5iXYF3/rcigkezIh3YbU551Rsn2.2iLhAS7eN.oSiok.','2025-02-22 12:18:45','2025-02-22 12:18:45','user',0),(7,'Eric','eric@mail.com','$2a$10$nAv364y8sZpu3NJC0s0hOubk6ZP9GO8cColM673jD56Opa8dqYI1m','2025-02-24 21:37:11','2025-02-24 21:37:11','user',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works`
--

DROP TABLE IF EXISTS `works`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works` (
  `id` int NOT NULL AUTO_INCREMENT,
  `external_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `external_id` (`external_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works`
--

LOCK TABLES `works` WRITE;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-25 15:26:49
