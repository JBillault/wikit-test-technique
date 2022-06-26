CREATE TABLE wikit_test_technique.Tweet (
	id INT auto_increment NOT NULL,
	author varchar(150) NOT NULL,
	content TEXT NOT NULL,
	likes INT DEFAULT 0 NULL,
	`date` DATE NOT NULL,
	CONSTRAINT id PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
