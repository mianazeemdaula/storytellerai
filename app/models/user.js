const db = require("../../config/db");
const bcrypt = require('bcryptjs');

const User = db.sequelize.define("user", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true,
    },
    password: {
        type: db.Sequelize.STRING,
    },
    role: {
        type: db.Sequelize.STRING,
        defaultValue: 'user',
    },
}, {
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: {},
        }
    }
});

User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash;
    }).catch((err) => {
        throw new Error(err.message);
    });
});
module.exports = User;