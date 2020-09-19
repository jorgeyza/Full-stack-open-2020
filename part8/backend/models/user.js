const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
  },
});

userSchema.set('toObject', {
  transform: (document, returnedObject) => {
    const object = returnedObject;
    object.id = returnedObject._id.toString();
    delete object._id;
    delete object.__v;
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
