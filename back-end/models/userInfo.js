const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userInfoSchema = mongoose.Schema({
    userId: {type: String, require: true, unique: true},
    completeName: {type: String, require: true, unique: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    pictureProfile: {type: String},
    job: {type: String, require: true},
    myQuotes: {type: Array, of: String, require: true},
    quotesLikes: {type: Map, require: true}
});

userInfoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserInfo', userInfoSchema);