const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, unique: true, required: true },
  number: { type: String, minlength: 8, required: true },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const object = returnedObject;
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);
