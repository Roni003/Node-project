const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 4
    }
}, {timestamps: true});


userSchema.pre('save', async function(next) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Wrong password');
    }
    throw Error('Wrong username');
};

const User = mongoose.model('User', userSchema);

module.exports = User;