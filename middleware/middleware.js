const jwt = require('jsonwebtoken')
const db = require('../database/database')
require('dotenv').config()


exports.authenticator = (req, res, next) => {
    // Récupérer le token de l'en-tête de la requête
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && process.env.SECRET_KEY) {
        const token = authorizationHeader.replace('Bearer ', ''); // Supprimer le préfixe 'Bearer'
        
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // Si problème => erreur
            if (err) {
                res.status(401).json({erreur: "Accès refusé"});
            } 
            // Décoder => next()
            else {
                console.log(decoded);
                next();
            }
        });
    } else {
        res.status(401).json({erreur: "Accès refusé"});
    }
};


exports.checkAdmin = (req, res, next) => {

    // Récupérer le token
    const token = req.params.token ? req.params.token : req.headers.authorization

    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, async(err, decoded) => {
            const [rows, fields] = await db.promise().query('SELECT role FROM utilisateur WHERE email = ?', [decoded.email]);
            if (rows.length === 1 && "ROLE_ADMIN" in rows[0]){
                next()
            } else {
                res.status(403).json({erreur: "Accès interdit"})
            }
        })
    } else {
        res.status(401).json({erreur: "Accès refusé"})
    }
}