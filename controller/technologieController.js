const db = require('../database/database');

exports.getAllTechnologies = (req, res) => {
    db.query('SELECT * FROM technologie', (error, results) => {
            res.status(200).json(results);
    });
}

exports.getTechnologieById = (req, res) => {
    const technologieId = req.params.id;
    db.query('SELECT * FROM technologie WHERE id = ?', [technologieId], (error, results) => {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ error: "Technologie non trouvée" });
            }
    });
}

exports.createTechnologie = (req, res) => {
    const { nom_techno } = req.body;
    db.query('INSERT INTO technologie (nom_techno) VALUES (?)', [nom_techno], (error, results) => {
        res.status(201).json({ id: results.insertId, nom_techno });
    });
}

exports.updateTechnologie = (req, res) => {
    const technologieId = req.params.id;
    const { nom_techno } = req.body;
    db.query('UPDATE technologie SET nom_techno = ? WHERE id = ?', [nom_techno, technologieId], (error) => {
        res.status(200).json({ id: technologieId, nom_techno });
    });
}

exports.deleteTechnologie = (req, res) => {
    const technologieId = req.params.id;
    db.query('DELETE FROM technologie WHERE id = ?', [technologieId], (error) => {
        res.status(200).json({ message: 'Technologie supprimée avec succès', id: technologieId });
    });
}