require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :req[content-length] - :response-time ms :body',
    { skip: (req) => req.method !== 'POST' }
  )
);

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'missing name or number',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  return person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

app.get('/info', (req, res, next) => {
  Person.estimatedDocumentCount()
    .then((numPersons) =>
      res.send(`
  <p>Phonebook has info for ${numPersons} people</p>
  <p>${new Date()}</p>
  `)
    )
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        return res.json(person);
      }
      return res.status(404).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  Person.findOne({ _id: id })
    .then((duplicatePerson) => {
      const person = duplicatePerson;
      person.number = body.number;
      return person.save();
    })
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(409).send(error.message);
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {});
