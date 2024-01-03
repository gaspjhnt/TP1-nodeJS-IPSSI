const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

// CRUD pour les utilisateurs
app.get('/utilisateurs', (req, res) => {
    database.query('SELECT * FROM utilisateur', (error, results) => {
        res.json(results);
    });
});

app.post('/utilisateurs', (req, res) => {
    const { nom, prenom, email } = req.body;
    database.query('INSERT INTO utilisateur (nom, prenom, email) VALUES (?, ?, ?)', [nom, prenom, email], (error, results) => {
        res.json({ id: results.insertId, nom, prenom, email });
    });
});

app.put('/utilisateurs/:id', (req, res) => {
    const userId = req.params.id;
    const { nom, prenom, email } = req.body;    
    database.query('UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?', [nom, prenom, email, userId], (error) => {
        res.json({ id: userId, nom, prenom, email });
    });
});

app.delete('/utilisateurs/:id', (req, res) => {
    const userId = req.params.id;
    database.query('DELETE FROM utilisateur WHERE id = ?', [userId], (error) => {
        res.json({ message: 'Utilisateur supprimé avec succès', userId });
    });
});

// Ecrire un commentaire
app.post('/commentaires', (req, res) => {
    const { utilisateur_id, technologie_id } = req.body;
    database.query('INSERT INTO commentaire (utilisateur_id, technologie_id) VALUES (?, ?)', [utilisateur_id, technologie_id], (error, results) => {
        res.json({ id: results.insertId, utilisateur_id, technologie_id });
    });
});

// Affichez tous les commentaires concernant une technologie
app.get('/commentaires/technologie/:technologieId', (req, res) => {
    const technologieId = req.params.technologieId;
    database.query('SELECT * FROM commentaire WHERE technologie_id = ?', [technologieId], (error, results) => {
        res.json(results);
    });
});

// Affichez tous les messages écrits par une personne
app.get('/commentaires/utilisateur/:utilisateurId', (req, res) => {
    const utilisateurId = req.params.utilisateurId;
    database.query('SELECT * FROM commentaire WHERE utilisateur_id = ?', [utilisateurId], (error, results) => {
        res.json(results);
    });
});

// Afficher les commentaires dont la date sera antérieure à celle mise en paramètre
//Exemple : http://localhost:8000/commentaires/avant/2024-01-03
app.get('/commentaires/avant/:date', (req, res) => {
    const dateParam = req.params.date;
    database.query('SELECT * FROM commentaire WHERE date_creation_commentaire < ?', [dateParam], (error, results) => {
        res.json(results);
    });
});

app.listen(8000, () => {
    console.log("Serveur en cours d'exécution sur le port 8000");
});
