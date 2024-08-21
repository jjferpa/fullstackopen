import { Filter } from './components/Filter';
import { Person } from './components/Person';
import { PersonForm } from './components/PersonForm';
import { useEffect, useState } from 'react';
import personService from './services/persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() =>{
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons);
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
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`);

      const person = persons.find(e => e.name === newName);
      const changedPerson = { ...person, number: newNumber};
      const toChangeId = changedPerson.id;
      
      personService
      .updatePerson(toChangeId, changedPerson)
      .then(returnedPerson=> {
        setPersons(persons.map(person => person.id !== toChangeId ? person : returnedPerson))
        setNewName('');
        setNewNumber('');
      }).catch(error => { 
        setNotificationMessage({
          text: `Information of ${newName} has already been removed from server`,
          type: 'error'
        })
        setTimeout(()=> {
          setNotificationMessage(null);
        }, 5000);
      })


      return;
    } 

   personService
   .addPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNotificationMessage({
          text: `Added ${newName}`,
          type: 'success'
          })
        setTimeout(()=> {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch(error => {
        console.log(error);
        setNotificationMessage({
          text: `Validation error. '${newName}' is shorter than the minimun lenght allowed (3)`,
          type: 'error'
          })
        setTimeout(()=> {
          setNotificationMessage(null);
        }, 5000);
      });

  }

  const deletePerson = (id, name) =>{

    if (window.confirm(`Delete ${name}?`)){

      personService
      .removePerson(id) 
      .then(response => {
        setPersons(filteredPersons.filter(person => person.id !== id));
      }).catch(error => { 

        setNotificationMessage({
          text: `${name} already deleted`,
          type: 'error'
        })
        setTimeout(()=> {
          setNotificationMessage(null);
        }, 5000);
      })
      }
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
        <Notification message={notificationMessage} />

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
          <Person
            persons={persons}
            key={persons.name}
            filteredPersons={filteredPersons}
            deletePerson={deletePerson}
          />
    </>
    
  )
}

export default App