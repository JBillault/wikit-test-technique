CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(150) NOT NULL UNIQUE,
  `email` varchar(250) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Tweet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `post_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  CONSTRAINT fk_user
  FOREIGN KEY (`userId`)
  REFERENCES User(id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Tweet` (author, content)
VALUES ('Jonathan', 'Bienvenue sur Wikit Tweet !'),
('Pedro', "Apéro ?" ),
('Nico', "N'oubliez surtout pas de mettre un cursor:pointer sur les boutons !!"),
('Perceval', "Vous, vous avez une idée derrière la main, j'en mettrais ma tête au feu !"),
('Jonathan', "Petit conseil: Mieux vaut ne rien dire et passer pour un con que l'ouvrir et ne laisser aucun doute à ce sujet !"),
('Perceval', "Si on avait bu un coup dans des trucs qui s'cassent, j'en aurais pété un par terre avant d'monter dans ma chambre, pour bien montrer comment j'suis colère."),
('Adiren', "Vous savez comment on appelle un rhinocéros à une corne ? Un Monoceros !"),
('Jonathan', "Qu'importe le flacon, tant qu'on a l'ivresse !"),
('Perceval', "Le code c'est 'le code' ? Ça va, ils se sont pas trop cassé le bonnet, pour l'trouver celui-là !"),
('Karadoc', "La joie de vivre et le jambon, y'a pas trente-six recettes du bonheur !");

