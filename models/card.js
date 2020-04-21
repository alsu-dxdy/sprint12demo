const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        validate: {
            validator: function(v) {
              return v.toUpperCase() === v;
            },
            message: props => `${props.value} should be in upper case!`
        },
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
})


module.exports = mongoose.model('card', cardSchema);