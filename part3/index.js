const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));


morgan.token('body', (request) => {
    return JSON.stringify(request.body);
  });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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
    response.json(persons)
  });

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).send('This item does not exists').end();
    }

  });

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.filter(person => person.id !== id)

    response.status(204).end()

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
  
    const person = {
      id: generateNewId(),
      name: body.name,
      number: body.number
    }
  
    persons = persons.concat(person);
    response.json(person);
  });


  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
