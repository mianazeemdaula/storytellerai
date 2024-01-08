const db = require("../../config/db");
const Story = db.sequelize.define("story", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: db.Sequelize.STRING,
    },
    userId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    categoryId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    cover: {
        type: db.Sequelize.STRING,
    },
    content: {
        type: db.Sequelize.TEXT,
    },
    moral: {
        type: db.Sequelize.STRING,
    },
    active: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: true,
    },
    isPrivate: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = Story;