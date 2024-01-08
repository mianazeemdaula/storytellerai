const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.User.create({ name, email, password }).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: err['errors'][0]['message'], raw: err });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.User.scope('withPassword').findOne({ where: { email } }).then((user) => {
        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "Error signing token.", raw: err });
                    }
                    res.json({ success: true, token: `Bearer ${token}` });
                });
            } else {
                return res.status(400).json({ message: "Password incorrect." });
            }
        });
    }).catch((err) => {
        console.log(err);
    });
});
module.exports = router;