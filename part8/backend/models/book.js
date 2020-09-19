const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
});

bookSchema.set('toObject', {
  transform: (document, returnedObject) => {
    const object = returnedObject;
    object.id = returnedObject._id.toString();
    delete object._id;
    delete object.__v;
  },
});

module.exports = mongoose.model('Book', bookSchema);
