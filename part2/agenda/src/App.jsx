import { Filter } from './components/Filter';
import { Person } from './components/Person';
import { PersonForm } from './components/PersonForm';
import { useState } from 'react';

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

        <Filter newSearch={newSearch} handleNewSearchChange = {handleNewSearchChange} />

      <h3>Add a new</h3>
        <PersonForm
          addName={addName}
          newName = {newName}
          handleAddNameChange= {handleAddNameChange}
          newNumber={newNumber}
          handleAddNumberChange= {handleAddNumberChange}
          />


      <h3>Numbers</h3>
          <Person persons={persons} key={persons.name} filteredPersons={filteredPersons} />
    </>
    
  )
}

export default App