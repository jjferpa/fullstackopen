require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));


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
        `<p>Phonebook has info for ${persons.length} ${persons.length < 2 ? "person" : "people"}</p>
         <p>${new Date()}</p>`
        )
});
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person);
    } else {
        response.status(404).send('This item does not exists').end();
    }
    });
  });

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
      .then(response.status(204).end());
  });

  const generateNewId = () => {
    let newId;
    
    do {
       newId = Math.floor(Math.random() * 1000000);
    } while (persons.some(person => person.id === newId));
    
    return newId;
}
    


app.post('/api/persons', (request, response) => {
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

    person.save().then(savedPerson =>{
      response.json(savedPerson);
    });
  });


  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
