CREATE DATABASE athleo;
USE athleo;
CREATE TABLE utilisateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(50) ,
    age INT,
    taille FLOAT,
    points_total INT DEFAULT 0,
    image VARCHAR(50) , 
    avatar VARCHAR(50)
    
);
CREATE TABLE objectif (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50),
    valeur_cible FLOAT ,
    valeur_actuelle FLOAT,
    status BOOLEAN
);
CREATE TABLE hydratation (
    id INT PRIMARY KEY,
    CONSTRAINT fk_objectif FOREIGN KEY (id) REFERENCES objectif(id)
    -- spécificités pour l'hydratation, par exemple, quantité d'eau
    
);

CREATE TABLE sommeil (
    id INT PRIMARY KEY,
    CONSTRAINT fk_objectif FOREIGN KEY (id) REFERENCES objectif(id)
    -- spécificités pour le sommeil, par exemple, heures de sommeil
    
);

-- Et ainsi de suite pour les autres types d'objectifs
CREATE TABLE points (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_utilisateur INT,
    id_objectif INT,
    points_obtenus INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_utilisateur FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id),
    CONSTRAINT fk_objectif FOREIGN KEY (id_objectif) REFERENCES objectif(id)
);
CREATE TABLE classement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_utilisateur INT,
    classement  INT, 
    CONSTRAINT fk_utilisateur FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
);
CREATE TABLE journee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_utilisateur INT,
    id_points INT,
    points_journaliers INT,
    CONSTRAINT fk_utilisateur FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id) ,
    CONSTRAINT fk_points FOREIGN KEY (id_points) REFERENCES points(id)
);
CREATE TABLE pas (
    id INT PRIMARY KEY,
    CONSTRAINT fk_objectif FOREIGN KEY (id) REFERENCES objectif(id)
    -- Spécificité pour les pas : nombre de pas effectués
    
);
CREATE TABLE nutrition (
    id INT PRIMARY KEY,
    CONSTRAINT fk_objectif FOREIGN KEY (id) REFERENCES objectif(id),
    -- Spécificité pour la nutrition : quantité de calories
    proteines FLOAT , 
    glucides FLOAT , 
    lipides FLOAT 
    
);
CREATE TABLE posture (
    id INT PRIMARY KEY,
    CONSTRAINT fk_objectif FOREIGN KEY (id) REFERENCES objectif(id),
    -- Spécificité pour la posture : description ou type de posture
    posture_description VARCHAR(255)
);
CREATE TABLE entrainement (
    id INT PRIMARY KEY,
    CONSTRAINT fk_objectif FOREIGN KEY (id) REFERENCES objectif(id),
    -- Spécificité pour l'entraînement : type d'entraînement et durée (en minutes)
    type_entrainement VARCHAR(100),
    duree INT 
);
CREATE TABLE poids (
    id INT PRIMARY KEY,
    CONSTRAINT fk_objectif FOREIGN KEY (id) REFERENCES objectif(id)
    -- Spécificité pour le poids : objectif de poids
    
);
CREATE TABLE Niveau (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT,
    label VARCHAR(255),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
);
CREATE TABLE Badge (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT,
    label VARCHAR(255),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
);