

const AnecdoteForm = ({ newAnecdoteMutation }) => {



  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
   
    if (content.length < 5) {
      console.log('Anecdote length is less than 5')
      return
    }
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
}


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
