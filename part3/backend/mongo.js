const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const mongoURI = `mongodb+srv://jorgeyza:${password}@cluster0.gi2uw.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: personName,
  number: personNumber,
});

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
} else if (process.argv.length > 3) {
  person.save().then((result) => {
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
}
