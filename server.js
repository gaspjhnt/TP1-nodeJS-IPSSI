const express = require('express');
const cors = require('cors');
const database = require('./database/database');

const app = express();

// Récupération des routes
const userRoute = require('./routes/userRoute');
const commentaireRoute = require('./routes/commentaireRoute');
const technologieRoute = require('./routes/technologieRoute');

app.use(cors());
app.use(express.json());

// Appel des routes
app.use('/utilisateurs', userRoute);
app.use('/commentaires', commentaireRoute);
app.use('/technologies', technologieRoute);

app.listen(8000, () => {
    console.log("Serveur en cours d'exécution sur le port 8000");
});
