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

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :req[content-length] - :response-time ms :body",
    { skip: (req, res) => req.method !== "POST" }
  )
);

app.post("/api/persons", (req, res, next) => {
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
    .catch((error) => next(error));
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Person.estimatedDocumentCount().then((numPersons) =>
    res.send(`
  <p>Phonebook has info for ${numPersons} people</p>
  <p>${new Date()}</p>
  `)
  );
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const id = req.params.id;
  Person.findOne({ _id: id }).then((duplicatePerson) => {
    duplicatePerson.number = body.number;
    duplicatePerson
      .save()
      .then((savedPerson) => res.json(savedPerson))
      .catch((error) => next(error));
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(409).send(error.message);
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {});
