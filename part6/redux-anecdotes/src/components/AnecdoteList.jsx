import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

export const AnecdoteList = () => {


  const anecdotes = useSelector(({ filter, anecdotes }) => {
    let filteredAnecdotes = anecdotes
    if (filter) {
      filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.includes(filter))
    }

    return filteredAnecdotes
  })
    
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(voteAnecdote({id}))
      const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
      dispatch(createNotification(`you voted: '${anecdoteToVote.content}'`));
    }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
