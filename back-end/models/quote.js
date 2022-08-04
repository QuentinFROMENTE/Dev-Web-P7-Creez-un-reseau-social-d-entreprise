const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    userId: {type: String, require: true},
    date: {type: String, require: true},
    text: {type: String, require: true},
    imageUrl: {type: String, require: true},
    usersLiked: {type: Map, require: true},
    responseTo : {type: String, require: true}
});

module.exports = mongoose.model('quote', quoteSchema);