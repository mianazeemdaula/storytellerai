const User = require("./user");
const Category = require("./category");
const Story = require("./story");
const Reaction = require("./reaction");
const Comment = require("./comment");

User.hasMany(Story);
Category.hasMany(Story);
Story.belongsTo(User);
Story.belongsTo(Category);
Story.hasMany(Reaction);
Story.hasMany(Comment);
Comment.belongsTo(Story);
Comment.belongsTo(User);
Reaction.belongsTo(Story);
Reaction.belongsTo(User);

module.exports = {
    db: require("../../config/db"),
    User,
    Category,
    Story,
    Comment,
    Reaction,
};