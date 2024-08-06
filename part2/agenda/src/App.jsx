import { Filter } from './components/Filter';
import { Person } from './components/Person';
import { PersonForm } from './components/PersonForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');

  useEffect(() =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    }, []);


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

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      })

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