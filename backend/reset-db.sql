CREATE TABLE `Tweet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `likes` int DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;