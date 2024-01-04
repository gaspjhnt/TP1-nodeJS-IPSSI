-- Ajouter les colonnes manquantes dans la table utilisateur
ALTER TABLE `utilisateur`
ADD COLUMN `password` varchar(255) NOT NULL,
ADD COLUMN `role` TEXT NOT NULL;

-- Ajouter les colonnes manquantes dans la table commentaire
ALTER TABLE `commentaire`
ADD COLUMN `message` TEXT NOT NULL;

-- Ajouter les colonnes manquantes dans la table technologie
ALTER TABLE `technologie`
ADD COLUMN `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN `createur_nom` varchar(255) NOT NULL;
