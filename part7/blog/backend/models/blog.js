const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: String }],
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const object = returnedObject;
    object.id = returnedObject._id.toString();
    delete object._id;
    delete object.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
