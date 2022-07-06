const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userAuthSchema = mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    administrator: {type: Boolean, require: true}
});

userAuthSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserAuth', userAuthSchema);