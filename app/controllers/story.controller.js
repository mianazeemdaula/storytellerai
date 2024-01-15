const router = require('express').Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const db = require('../models');

router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    db.Story.findAndCountAll({
        order: [['createdAt', 'DESC']],
        include: [db.User, db.Category],
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
        const { title, category_id } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const cat = await db.Category.findByPk(category_id);
        const promot = title + "\nthe story mubt be of type " + cat.name;
        console.log(promot)
        const result = await model.generateContent(promot);
        const response = await result.response;
        var content = response.text();
        const cover = "https://picsum.photos/seed/200/300";
        var story = await db.Story.create({
            title,
            content: content,
            categoryId: cat.id,
            userId: req.user.id,
            cover,
        });
        return res.json(story);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Somthing went wrong", raw: error });
    }
});

module.exports = router;