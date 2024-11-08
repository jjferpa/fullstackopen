import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data.sort((a, b) => b.votes - a.votes)
}

const addNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

  const update  = async (id, votedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
    return response.data
  }


export default {
  getAll,
  addNew,
  update

}