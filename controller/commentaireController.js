const db = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.getAll =  (req, res) => {
    db.query('SELECT * FROM commentaire', (error, results) => {
        res.status(200).json({results});
    });
}

exports.post =  (req, res) => {
    const { utilisateur_id, technologie_id, message } = req.body;
    db.query('INSERT INTO commentaire (utilisateur_id, technologie_id, message) VALUES (?, ?)', [utilisateur_id, technologie_id, message], (error, results) => {
        res.status(200).json({ id: results.insertId, utilisateur_id, technologie_id, message });
    });
}

exports.getCommentByTechno = (req, res) => {
    const technologieId = req.params.technologieId;
    db.query('SELECT * FROM commentaire WHERE technologie_id = ?', [technologieId], (error, results) => {
        res.status(200).json(results);
    });
}

exports.getCommentByUser = (req, res) => {
    const utilisateurId = req.params.utilisateurId;
    db.query('SELECT * FROM commentaire WHERE utilisateur_id = ?', [utilisateurId], (error, results) => {
        res.status(200).json(results);
    });
}

exports.getCommentByDate = (req, res) => {
    const dateParam = req.params.date;
    db.query('SELECT * FROM commentaire WHERE date_creation_commentaire < ?', [dateParam], (error, results) => {
        res.status(200).json(results);
    });
}