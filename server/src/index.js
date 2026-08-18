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
    console.log("Connected to mySQL !");

    await sequelize.sync();
    console.log("Synchronisation successful !");

    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log("Server launched ! Port :", port);
    });
  } catch (err) {
    console.error("--- CRITICAL ERROR ---");
    console.error("Error name :", err.name);
    console.error("Message :", err.message);
    console.error("Details :", err);
    console.error("--- ERROR END ---");
    process.exit(1);
  }
};

initApi();
