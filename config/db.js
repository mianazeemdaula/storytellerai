const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    }
})
sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
}).catch((err) => {
    console.log(err);
});
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;