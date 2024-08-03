import { useState } from 'react';
import { Person } from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addName = (event) =>{
    event.preventDefault();
    
    const personObject = {
      name: newName,    
    }

    const nameExists = persons.some(person => person.name === newName);

    if (nameExists){
      alert(`${newName} is already added to phonebook`);
      return;
    } 

    setPersons(persons.concat(personObject));
    setNewName('');
  }

  const handleAddNameChange = (event) =>{
    setNewName(event.target.value);
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleAddNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
  

      <p>
        {persons.map(person => 
          <Person person={person} key={person.name}/>
        )}
      </p>
  
      <div>debug: {newName}</div>
    </>
    
  )
}

export default App