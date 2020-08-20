const mongoose = require('mongoose');
const Person = require('./models/Person');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const mongoURI = `mongodb+srv://jorgeyza:${password}@cluster0.gi2uw.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

const person = new Person({
  name: personName,
  number: personNumber,
});

if (process.argv.length === 3) {
  Person.find({})
    .then((persons) => {
      console.log('phonebook:');
      persons.forEach((p) => console.log(`${p.name} ${p.number}`));
      return mongoose.connection.close();
    })
    .catch((error) => error);
} else if (process.argv.length > 3) {
  person
    .save()
    .then(() => {
      console.log(`added ${personName} number ${personNumber} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((error) => console.log(error));
}
