const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl);

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose, {
    usernameUnique: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;