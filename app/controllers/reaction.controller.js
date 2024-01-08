const router = require('express').Router();
const db = require('../models');
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    db.Reaction.findAndCountAll({
        order: [['createdAt', 'DESC']],
        include: [db.User],
        limit: pageSize,
        offset: (page - 1) * pageSize,
    }).then((stories) => {
        stories.current_page = page;
        stories.total_page = Math.ceil(stories.count / pageSize);
        res.json(stories);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Somthing went wrong", raw: err });
    });
});

router.post('/', async (req, res) => {
    try {
        const { reaction, story_id } = req.body;
        var story = await db.Reaction.create({
            reaction: reaction ?? 0,
            storyId: story_id,
            userId: req.user.id,
        });
        return res.json(story);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Somthing went wrong", raw: error });
    }
});

module.exports = router;