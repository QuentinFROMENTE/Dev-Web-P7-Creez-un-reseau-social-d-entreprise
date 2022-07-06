const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    userId: {type: String, require: true}, /*Id MongoDB unique à l'utilisateur créateur de la sauce*/
    date: {type: String, require: true},
    text: {type: String, require: true}, /*Description de la sauce*/
    imageUrl: {type: String, require: true}, /*URL de l'image*/
    usersLiked: {type: Map, require: true},
    responseTo : {type: String, require: true}
});

module.exports = mongoose.model('quote', quoteSchema);