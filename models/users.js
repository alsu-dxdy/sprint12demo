const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /https?.*/
    }
})


module.exports = mongoose.model('user', userSchema);