const express = require('express');
require('dotenv').config();
const db = require('./app/models');
const app = express();
const auth = require('./app/middleware/auth');

// app
app.use(express.json());

// routes
app.get('/', (req, res) => {
    db.User.findAll().then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(err);
    });
});
app.use('/api/auth', require('./app/controllers/auth.controller'));
app.use('/api/categories', require('./app/controllers/category.controller'));
app.use('/api/stories', auth, require('./app/controllers/story.controller'));
app.use('/api/comments', auth, require('./app/controllers/comment.controller'));
app.use('/api/reactions', auth, require('./app/controllers/reaction.controller'));


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});