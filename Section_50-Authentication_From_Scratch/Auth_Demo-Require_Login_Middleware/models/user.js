const mongoose = require('mongoose')    

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Pasword cannot be blank']

    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;