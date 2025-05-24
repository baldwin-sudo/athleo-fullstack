-- 5 utilisateurs
INSERT INTO utilisateur (nom, prenom, username, password, age, taille, points_total, image, avatar) VALUES
('Dupont', 'Jean', 'jdupont', 'pass123', 28, 1.75, 100, 'img1.jpg', 'avatar1.png'),
('Martin', 'Sophie', 'smartin', 'pass456', 35, 1.68, 150, 'img2.jpg', 'avatar2.png'),
('Bernard', 'Luc', 'lbernard', 'pass789', 22, 1.82, 200, 'img3.jpg', 'avatar3.png'),
('Lemoine', 'Claire', 'clemoine', 'pass321', 30, 1.60, 80, 'img4.jpg', 'avatar4.png'),
('Moreau', 'Paul', 'pmoreau', 'pass654', 40, 1.78, 120, 'img5.jpg', 'avatar5.png');

-- 5 objectifs
INSERT INTO objectif (type, valeur_cible, valeur_actuelle, status) VALUES
('hydratation', 2.5, 1.0, FALSE),
('sommeil', 8, 7, TRUE),
('pas', 10000, 7500, FALSE),
('nutrition', 2000, 1800, TRUE),
('posture', NULL, NULL, TRUE);

-- 5 hydratation (ids 1-5; only 1 relevant here)
INSERT INTO hydratation (id) VALUES
(1),
(2),
(3),
(4),
(5);

-- 5 sommeil (same ids)
INSERT INTO sommeil (id) VALUES
(1),
(2),
(3),
(4),
(5);

-- 5 pas
INSERT INTO pas (id) VALUES
(1),
(2),
(3),
(4),
(5);

-- 5 nutrition (with details)
INSERT INTO nutrition (id, proteines, glucides, lipides) VALUES
(1, 50, 250, 70),
(2, 45, 230, 60),
(3, 55, 270, 80),
(4, 40, 210, 65),
(5, 48, 240, 75);

-- 5 posture (with descriptions)
INSERT INTO posture (id, posture_description) VALUES
(1, 'Posture assise correcte'),
(2, 'Posture debout améliorée'),
(3, 'Posture de course ajustée'),
(4, 'Correction posture yoga'),
(5, 'Posture avant travail');

-- 5 entrainement
INSERT INTO entrainement (id, type_entrainement, duree) VALUES
(1, 'Course', 45),
(2, 'Natation', 30),
(3, 'Cyclisme', 60),
(4, 'Musculation', 50),
(5, 'Yoga', 40);

-- 5 poids (only ids here)
INSERT INTO poids (id) VALUES
(1),
(2),
(3),
(4),
(5);

-- 5 points (random user and objectif relations)
INSERT INTO points (id_utilisateur, id_objectif, points_obtenus) VALUES
(1, 1, 10),
(1, 2, 15),
(2, 3, 20),
(3, 4, 30),
(4, 5, 25);

-- 5 classement
INSERT INTO classement (id_utilisateur, classement) VALUES
(1, 2),
(2, 1),
(3, 3),
(4, 4),
(5, 5);

-- 5 journee
INSERT INTO journee (date, id_utilisateur, id_points, points_journaliers) VALUES
(NOW(), 1, 1, 10),
(NOW(), 2, 3, 20),
(NOW(), 3, 4, 30),
(NOW(), 4, 5, 25),
(NOW(), 5, 2, 15);

-- 5 Niveau
INSERT INTO Niveau (id_utilisateur, label) VALUES
(1, 'Débutant'),
(2, 'Intermédiaire'),
(3, 'Avancé'),
(4, 'Expert'),
(5, 'Maître');

-- 5 Badge
INSERT INTO Badge (id_utilisateur, label) VALUES
(1, 'Marathonien'),
(2, 'Hydratation parfaite'),
(3, 'Nuit complète'),
(4, 'Cycliste expert'),
(5, 'Yoga zen');
