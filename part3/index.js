require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


morgan.token('body', (request) => {
    return JSON.stringify(request.body);
  });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

let persons = [];

  app.get('/', (request, response) => {
      response.send('<h1>Welcome to Api "persons"</h1>')
    });

  app.get('/info', (request, response) =>{
      response.send(
          `<p>Phonebook has info for ${Person.length} ${Person.length < 2 ? "person" : "people"}</p>
          <p>${new Date()}</p>`
          )
  });
    
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
      response.json(person)
    })
  })

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person);
    } else {
        response.status(404).send('This item does not exists').end();
    }
    })
    .catch(error => next(error));
  });

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(response.status(204).end())
      .catch(error => next(error));
  });

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
      number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error));
  });





  const generateNewId = () => {
    let newId;
    
    do {
       newId = Math.floor(Math.random() * 1000000);
    } while (persons.some(person => person.id === newId));
    
    return newId;
}
    


app.post('/api/persons', (request, response, next) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      });
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        });
      }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        });
      }
  
    const person = new Person({
      id: generateNewId(),
      name: body.name,
      number: body.number
    })

    person.save()
    .then(savedPerson =>{
      response.json(savedPerson);
    })
    .catch(error => next(error));
  });


  app.use(errorHandler);

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
