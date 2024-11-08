import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const id = action.payload.id
      return state
        .map(anecdote => 
          anecdote.id !== id ? anecdote : action.payload
        )
        .sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { setAnecdotes, appendAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const votingAnecdote = id => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer
