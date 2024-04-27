-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: music
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Dumping data for table `favourite_playlists`
--

LOCK TABLES `favourite_playlists` WRITE;
/*!40000 ALTER TABLE `favourite_playlists` DISABLE KEYS */;
INSERT INTO `favourite_playlists` VALUES (1,18,'2024-03-05 10:11:51'),(1,20,'2024-04-22 16:40:22'),(1,22,'2024-04-27 09:02:41'),(1,23,'2024-04-24 06:32:14'),(1,26,'2024-04-24 08:36:52'),(32,22,'2024-04-21 11:00:43'),(32,24,'2024-04-24 16:29:55'),(32,25,'2024-04-25 11:40:30'),(32,26,'2024-04-22 17:25:09'),(32,27,'2024-04-22 17:25:24'),(32,28,'2024-04-26 12:57:57'),(32,29,'2024-04-22 17:25:29'),(32,30,'2024-04-24 16:29:09'),(32,31,'2024-04-24 16:29:16'),(32,32,'2024-04-24 16:29:48'),(32,33,'2024-04-24 16:29:20'),(32,34,'2024-04-24 16:29:23');
/*!40000 ALTER TABLE `favourite_playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favourite_songs`
--

LOCK TABLES `favourite_songs` WRITE;
/*!40000 ALTER TABLE `favourite_songs` DISABLE KEYS */;
INSERT INTO `favourite_songs` VALUES (1,19,'2024-04-27 09:25:46'),(1,21,'2024-04-16 16:34:20'),(1,22,'2024-04-16 16:34:20'),(1,25,'2024-04-18 18:29:27'),(1,26,'2024-04-19 13:45:01'),(1,60,'2024-04-27 09:26:28'),(2,18,'2024-03-16 10:37:25'),(32,18,'2024-04-20 16:26:11'),(32,23,'2024-04-20 16:26:06'),(32,26,'2024-04-25 11:11:32'),(32,61,'2024-04-24 14:18:51'),(32,62,'2024-04-25 11:40:48'),(32,63,'2024-04-26 13:53:08'),(32,67,'2024-04-23 05:06:55');
/*!40000 ALTER TABLE `favourite_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (1,3,'2024-04-19 05:37:10'),(1,4,'2024-03-05 05:45:45'),(1,25,'2024-04-19 18:04:57'),(1,27,'2024-04-20 06:42:49'),(2,1,'2024-03-03 16:28:55'),(2,3,'2024-03-03 16:28:55'),(3,1,'2024-03-05 06:32:52'),(32,1,'2024-04-27 11:14:01'),(32,3,'2024-04-25 11:08:33'),(32,25,'2024-04-20 17:52:50'),(32,27,'2024-04-21 14:55:46');
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Nhạc Pop',NULL,'2024-03-03 15:10:26'),(2,'Nhạc Rock',NULL,'2024-03-03 15:10:26'),(3,'Nhạc Rap/Hip-hop',NULL,'2024-03-03 15:10:26'),(4,'Nhạc Ballad',NULL,'2024-03-03 15:10:26'),(5,'Nhạc EDM',NULL,'2024-03-03 15:10:26'),(6,'Nhạc Trữ tình',NULL,'2024-03-03 15:10:26'),(7,'Nhạc Đỏ',NULL,'2024-03-03 15:10:26'),(8,'Nhạc Dân ca',NULL,'2024-03-03 15:10:26'),(9,'Nhạc Cổ điển',NULL,'2024-03-03 15:10:26'),(10,'Nhạc Jazz',NULL,'2024-03-03 15:10:26'),(11,'Nhạc Indie',NULL,'2024-03-03 15:10:26'),(12,'Nhạc Hòa tấu',NULL,'2024-03-03 15:10:26'),(13,'Nhạc Thiếu nhi',NULL,'2024-03-03 15:10:26'),(14,'Nhạc Nhật',NULL,'2024-03-03 15:10:26'),(15,'Nhạc Hàn',NULL,'2024-03-03 15:10:26'),(16,'Nhạc Trung',NULL,'2024-03-03 15:10:26'),(17,'Nhạc Phim',NULL,'2024-03-03 15:10:26'),(18,'Nhạc Game',NULL,'2024-03-03 15:10:26'),(19,'Nhạc Remix',NULL,'2024-03-03 15:10:26'),(20,'Nhạc Chế',NULL,'2024-03-03 15:10:26');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `playlist_songs`
--

LOCK TABLES `playlist_songs` WRITE;
/*!40000 ALTER TABLE `playlist_songs` DISABLE KEYS */;
INSERT INTO `playlist_songs` VALUES (18,60,'2024-04-16 20:20:16'),(18,61,'2024-04-16 20:20:16'),(18,62,'2024-04-16 20:20:16'),(18,63,'2024-04-16 20:20:16'),(18,64,'2024-04-16 20:20:16'),(18,65,'2024-04-16 20:20:16'),(20,20,'2024-04-16 20:19:08'),(20,21,'2024-04-16 20:19:08'),(20,22,'2024-04-16 20:19:08'),(20,23,'2024-04-16 20:19:08'),(20,24,'2024-04-16 20:19:08'),(20,25,'2024-04-16 20:19:08'),(20,26,'2024-04-16 20:19:08');
/*!40000 ALTER TABLE `playlist_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (18,'playlist 1','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','',2,32,0,0,'2024-03-04 05:25:25'),(19,'playlist 2','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','db5b8a14-d284-4c49-beb4-c76af3a81cd0.png',1,1,1,1,'2024-04-16 13:04:38'),(20,'playlist 3','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecatiLorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecatiLorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecatiLorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','db5b8a14-d284-4c49-beb4-c76af3a81cd0.png',1,32,1,0,'2024-04-16 13:04:59'),(22,'playlist 4','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','db5b8a14-d284-4c49-beb4-c76af3a81cd0.png',1,1,0,0,'2024-04-16 14:38:37'),(23,'Playlist 4','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecatiLorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','',1,1,1,0,'2024-04-20 05:25:43'),(24,'Tuyển tập hay nhất 2021','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','db5b8a14-d284-4c49-beb4-c76af3a81cd0.png',1,1,1,0,'2024-04-20 09:00:57'),(25,'Thriller','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','4a1cdff6-05f6-432a-accb-edfd642e9553.png',1,1,1,0,'2024-04-20 10:28:17'),(26,'The Dark Side of the Moon','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','4a1cdff6-05f6-432a-accb-edfd642e9553.png',2,1,1,0,'2024-04-20 10:28:17'),(27,'Abbey Road','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','4a1cdff6-05f6-432a-accb-edfd642e9553.png',3,1,1,0,'2024-04-20 10:28:17'),(28,'Back in Black','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','4a1cdff6-05f6-432a-accb-edfd642e9553.png',4,1,1,0,'2024-04-20 10:28:17'),(29,'Rumours','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','4a1cdff6-05f6-432a-accb-edfd642e9553.png',5,1,1,0,'2024-04-20 10:28:17'),(30,'Born to Die','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','',1,1,1,0,'2024-04-20 10:28:17'),(31,'Nevermind','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','4a1cdff6-05f6-432a-accb-edfd642e9553.png',2,1,1,0,'2024-04-20 10:28:17'),(32,'The Wall','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','4a1cdff6-05f6-432a-accb-edfd642e9553.png',3,1,1,0,'2024-04-20 10:28:17'),(33,'Hotel California','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','',4,1,1,0,'2024-04-20 10:28:17'),(34,'Sgt. Pepper\'s Lonely Hearts Club Band','Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati','',5,1,1,0,'2024-04-20 10:28:17');
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `song_plays`
--

LOCK TABLES `song_plays` WRITE;
/*!40000 ALTER TABLE `song_plays` DISABLE KEYS */;
INSERT INTO `song_plays` VALUES (1,15,'2024-03-07 10:26:33'),(2,15,'2024-03-07 10:29:40');
/*!40000 ALTER TABLE `song_plays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (15,'song 1',2,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',1,1,0,'2024-03-04 13:17:31',NULL),(17,'song 2',2,'be1bc3e8-964d-41f1-9d8f-72dd296ee111.png','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',1,1,1,'2024-03-04 15:43:46','2024-03-04 16:27:26'),(18,'Chúng ta của tương lai',1,'ac69f88e-eab6-439c-88e1-7abacae27ff3.png','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',1,1,0,'2024-03-15 16:36:25','2024-03-15 16:42:03'),(19,'Chúng ta của hiện tại',1,'ac69f88e-eab6-439c-88e1-7abacae27ff3.png','94487ce5-c768-4ac8-bc41-e68c9a39e0fc.mp3',1,0,0,'2024-03-16 16:09:48','2024-03-17 07:32:40'),(20,'Song 1',1,'be1bc3e8-964d-41f1-9d8f-72dd296ee111.png','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',1,1,1,'2024-04-16 13:01:04',NULL),(21,'Song 2',1,'be1bc3e8-964d-41f1-9d8f-72dd296ee111.png','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',2,1,1,'2024-04-16 13:01:04',NULL),(22,'Song 3',1,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',3,1,0,'2024-04-16 13:01:04',NULL),(23,'Song 4',1,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',4,1,0,'2024-04-16 13:01:04',NULL),(24,'Song 5',1,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',5,1,0,'2024-04-16 13:01:04',NULL),(25,'Song 6',1,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',1,1,0,'2024-04-16 13:01:04',NULL),(26,'Song 7',1,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',2,1,0,'2024-04-16 13:01:04',NULL),(27,'Song 8',1,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',3,1,0,'2024-04-16 13:01:04',NULL),(28,'Song 9',1,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',4,1,0,'2024-04-16 13:01:04',NULL),(29,'Song 10',1,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',5,1,0,'2024-04-16 13:01:04',NULL),(60,'Song 11',32,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',1,0,0,'2024-04-16 13:03:24',NULL),(61,'Song 12',32,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',2,1,0,'2024-04-16 13:03:24',NULL),(62,'Song 13',32,'be1bc3e8-964d-41f1-9d8f-72dd296ee111.png','94487ce5-c768-4ac8-bc41-e68c9a39e0fc.mp3',3,1,0,'2024-04-16 13:03:24',NULL),(63,'Song 14',32,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',4,1,0,'2024-04-16 13:03:24',NULL),(64,'Song 15',32,'','94487ce5-c768-4ac8-bc41-e68c9a39e0fc.mp3',5,1,0,'2024-04-16 13:03:24',NULL),(65,'Song 16',32,'','94487ce5-c768-4ac8-bc41-e68c9a39e0fc.mp3',1,1,0,'2024-04-16 13:03:24',NULL),(66,'Song 17',32,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',2,1,0,'2024-04-16 13:03:24',NULL),(67,'Song 18',32,'','94487ce5-c768-4ac8-bc41-e68c9a39e0fc.mp3',3,1,0,'2024-04-16 13:03:24',NULL),(68,'Song 19',32,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',4,1,0,'2024-04-16 13:03:24',NULL),(69,'Song 20',32,'','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',5,1,1,'2024-04-16 13:03:24',NULL),(71,'Em của ngày hôm qua 2',1,'ac69f88e-eab6-439c-88e1-7abacae27ff3.png','1a22e6af-fdaf-4a89-92d3-a1f31a78f6b5.mp3',1,0,0,'2024-04-16 14:07:40','2024-04-16 14:07:58');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_songs`
--

LOCK TABLES `user_songs` WRITE;
/*!40000 ALTER TABLE `user_songs` DISABLE KEYS */;
INSERT INTO `user_songs` VALUES (1,15,1),(3,15,1);
/*!40000 ALTER TABLE `user_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tấn Mãi','1@g.com','$2b$10$i7rtN2r61sU288I2OyEr3O8VKu6omtJGsImLLZUZDbbaE4tGk9UlO','c9bddfcb-20a8-41c8-a66e-f049457fc9cc.jpg',0,0,'2024-03-05 14:43:10',NULL,NULL),(2,'mai','2@g.com','$2b$10$wUgUrX9h07OjCaeJLtnGL.bYqC7ZuNc1wypBMi7.N7AJvv/LMNVHy','',0,0,'2024-03-07 10:29:11',NULL,NULL),(3,'mai','3@g.com','$2b$10$XZfSlp87xU6c6dDbFDQgaONLxTMozG/4GWYK4fm/eg/BlF3LYlolm','b3073939-7796-4bc3-a2fe-c4d7b3e1ee7b.jpg',0,0,'2024-04-07 07:43:46',NULL,NULL),(4,'admin','admin@g.com','$2b$10$ITqXF2p40Gk4iT414hfy8eVNx5wNMtTlkrW1gjm.MXkCoVF5rlVMG','b58fd28e-05af-4c0d-8848-f762e1752182.jpg',0,1,NULL,NULL,NULL),(25,'tan mai','10@g.com','$2b$10$k/guWIVEPPJpS9thJKucB.4oJIFhJ5mn7sNaFASYhC2BqFcEBnSmu','',NULL,0,'2024-03-14 09:37:45','woman','2024-03-20 00:00:00'),(26,'tanmai','12@g.com','$2b$10$aAuSCXsSM2fH5AIQw1vA9ORVhjeO68/DhQiMkr8OIJ6./uJRzFrVm','b58fd28e-05af-4c0d-8848-f762e1752182.jpg',NULL,0,'2024-03-14 14:21:40','woman','2024-03-14 00:00:00'),(27,'Đinh Tấn Mãi ','13@g.com','$2b$10$Xs/.n/G55VHVyLBzaJBiV.Ly/e.7fR7UspUfDwaeEbSwJhDy07yJi','b58fd28e-05af-4c0d-8848-f762e1752182.jpg',NULL,0,'2024-03-14 14:57:17','woman','2024-03-14 00:00:00'),(32,'Hòa Minzy','14@g.com','$2b$10$Z6zxEOTt72k7yRfqPa3e6.LhDVwxcD2uPwoeWqvJ6xNuRrASFtlN2','d7166437-50d0-4e99-aa26-5dbd9aed6c00.jpg',NULL,0,'2024-04-05 07:17:17',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `verification_codes`
--

LOCK TABLES `verification_codes` WRITE;
/*!40000 ALTER TABLE `verification_codes` DISABLE KEYS */;
INSERT INTO `verification_codes` VALUES (3,'9456','2024-04-06 17:30:04');
/*!40000 ALTER TABLE `verification_codes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-27 21:38:49
