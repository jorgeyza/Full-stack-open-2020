require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/Person");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("build"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :req[content-length] - :response-time ms :body",
    { skip: (req, res) => req.method !== "POST" }
  )
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => console.error("Could not fetch person", error.message));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  let person;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing name or number",
    });
  }

  person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => console.error("Could not save person to db"));
});

app.put("/api/persons/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Person.findOne({ _id: id }).then((duplicatePerson) => {
    duplicatePerson.number = body.number;
    console.log("duplicatePerson changed number", duplicatePerson);
    duplicatePerson
      .save()
      .then((savedPerson) => res.json(savedPerson))
      .catch((error) => console.error("Could not update person number"));
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
