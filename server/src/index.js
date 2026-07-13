/**
 * @file index.js
 * @description API connection with Sequelize
 */

const app = require("./app");
const sequelize = require("./config/config");

/**
 * Start API
 * @async
 * @returns {Promise<void>}
 */
const initApi = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connecté à mysql !");

    await sequelize.sync();
    console.log("Synchronisation réussie !");

    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log("Serveur lancé ! Port :", port);
    });
  } catch (err) {
    console.error("--- ERREUR CRITIQUE ---");
    console.error("Nom de l'erreur :", err.name);
    console.error("Message :", err.message);
    console.error("Détails complets :", err);
    console.error("--- FIN DE L'ERREUR ---");
    process.exit(1);
  }
};

initApi();
