import { useState } from 'react';
import { Person } from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');

  const addName = (event) =>{
    event.preventDefault();
    
    const personObject = {
      name: newName,
      number: newNumber    
    }

    const nameExists = persons.some(person => person.name === newName);

    if (nameExists){
      alert(`${newName} is already added to phonebook`);
      return;
    } 

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  const handleAddNameChange = (event) =>{
    setNewName(event.target.value);
  }

  const handleAddNumberChange = (event) =>{
    setNewNumber(event.target.value);
  }

  const handleNewSearchChange = (event) =>{
    setNewSearch(event.target.value);
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <>
      <h2>Phonebook</h2>

        <div>
         filter shown with: <input value={newSearch} onChange={handleNewSearchChange} />
        </div>


      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleAddNameChange} />
        </div>
        <div>number: <input value= {newNumber} onChange={handleAddNumberChange}/></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
  

      <p>


        {filteredPersons.map(person => 
          <Person person={person} key={person.name}/>
        )}
      </p>
    </>
    
  )
}

export default App