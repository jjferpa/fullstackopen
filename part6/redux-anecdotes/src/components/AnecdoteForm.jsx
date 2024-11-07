import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


export const AnecdoteForm = () => {

    const dispatch = useDispatch()
    
    const add = async (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(addAnecdote(content))
        dispatch(createNotification(`you added: '${content}'`));
        event.target.anecdote.value = '' 
      }


  return (
    <>
    <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}




