const db = require("../../config/db");
const Reaction = db.sequelize.define("reaction", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    storyId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'stories',
            key: 'id'
        }
    },
    reaction: {
        type: db.Sequelize.INTEGER,
        defaultValue: 0,
    },
});

module.exports = Reaction;