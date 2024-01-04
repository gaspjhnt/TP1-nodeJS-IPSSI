const db = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()


exports.getAllUser =  (req, res) => {
    db.query('SELECT * FROM utilisateur', (error, results) => {
        res.status(200).json(results);
    });
}

exports.put = (req, res) => {
    const userId = req.params.id;
    const { nom, prenom, email } = req.body;    
    db.query('UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?', [nom, prenom, email, userId], (error) => {
        res.status(200).json({ id: userId, nom, prenom, email });
    });
}

exports.delete = (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM utilisateur WHERE id = ?', [userId], (error) => {
        res.status(200).json({ message: 'Utilisateur supprimé avec succès', userId });
    });
}


exports.register =  async(req, res) => {
    const { email, password, nom, prenom } = req.body
    const [rows, fields] = await db.promise().query('SELECT * FROM utilisateur WHERE email = ?', [email]);
    if (rows.length > 0){
        return res.status(401).json({error: "Utilisateur déjà existant"})
    }

    const hashMDP = await bcrypt.hash(password, 10)
    console.log(hashMDP)
    
    db.query('INSERT INTO utilisateur (email, password, nom, prenom, role) VALUES (?, ?, ?, ?, ?)', [email, hashMDP, nom, prenom, 'ROLE_USER'])

    const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn: '1h'})
    res.json({token})
}

exports.login =  async(req, res) => {
    const { email, password } = req.body
    const [rows, fields] = await db.promise().query('SELECT * FROM utilisateur WHERE email = ?', [email]);
    if (rows.length == 0){
        return res.status(401).json({error: "Utilisateur non existant"})
    }

    const client = rows[0];
    console.log(client)

    const SamePwd = await bcrypt.compare(password, client.password)
    if (!SamePwd){
        return res.status(401).json({error: "Mot de passe incorrect"})
    }

    const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn: '1h'})
    res.json({token})
}

