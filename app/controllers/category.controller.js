const router = require('express').Router();
const db = require('../models');
router.get('/', (req, res) => {
    db.Category.findAll().then((categories) => {
        res.json(categories);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: err['errors'][0]['message'], raw: err });
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    db.Category.create({ name }).then((category) => {
        res.json(category);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: err['errors'][0]['message'], raw: err });
    });
});

module.exports = router;