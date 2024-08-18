import axios from 'axios';
const baseURL = '/api/persons';

const getAll = () =>{

    const request = axios.get(baseURL);
    return request.then(response => response.data);

}

const addPerson = (personObject) =>{

    const request = axios.post(baseURL, personObject);
    return request.then(response => response.data);

}

const removePerson = (id) =>{
    
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

const updatePerson = (id, changedPerson) =>{
    
    const request = axios.put(`${baseURL}/${id}`, changedPerson);
    return request.then(response => response.data);
}

export default {
    getAll,
    addPerson,
    removePerson,
    updatePerson
}