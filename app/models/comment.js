const db = require("../../config/db");
const Comment = db.sequelize.define("comment", {
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
    content: {
        type: db.Sequelize.STRING,
    },
});

module.exports = Comment;