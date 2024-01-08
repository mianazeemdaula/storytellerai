const db = require("../../config/db");
const Category = db.sequelize.define("category", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: db.Sequelize.STRING,
        unique: true,
    },
    active: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: true,
    }
});

module.exports = Category;