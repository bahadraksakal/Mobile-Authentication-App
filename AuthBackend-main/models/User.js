const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    userMail: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userCreated: {
        type: Date,
        default: Date.now
    }
});


UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('userPassword')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.userPassword, salt, function(err, hash) {
            if (err) return next(err);
            user.userPassword = hash;
            next();
        });
    });
  });


const User = mongoose.model('User', UserSchema);
module.exports = User;