const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});

authorSchema.set('toObject', {
  transform: (document, returnedObject) => {
    const object = returnedObject;
    object.id = returnedObject._id.toString();
    delete object._id;
    delete object.__v;
  },
});

module.exports = mongoose.model('Author', authorSchema);
