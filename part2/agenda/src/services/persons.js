import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAll = () =>{

    const request = axios.get(baseURL);
    return request.then(response => response.data);

}

const addPerson = (personObject) =>{

    const request = axios.post(baseURL, personObject);
    return request.then(response => response.data);

}

const removePerson = (id) =>{
<<<<<<< HEAD
    
=======
>>>>>>> 7ff799c543d9959f43ef69c949beec6e10de9404
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

const updatePerson = (id, changedPerson) =>{
<<<<<<< HEAD
    
=======
>>>>>>> 7ff799c543d9959f43ef69c949beec6e10de9404
    const request = axios.put(`${baseURL}/${id}`, changedPerson);
    return request.then(response => response.data);
}

export default {
    getAll,
    addPerson,
    removePerson,
    updatePerson
}