import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate }
  from 'react-router-dom'
import { useField } from './hooks'


  
const AnecdoteList = ({ anecdotes, notification }) => {


  return (
  
    <div>
      <Notification notification={notification}/>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
      </ul>
    </div>
  )

}

const Anecdote = ({ anecdotes }) =>{
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))

  return (

    <div>
      <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href="{anecdote.info}">{anecdote.info}</a></p>
    </div>

  )

}
  


const Menu = ( { anecdotes, addNew, setNotification, notification } ) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>


      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification}  />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
      </Routes>
    </Router>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, setNotification }) => {
  const { reset: resetContent, ...content } = useField("text")
  const { reset: resetAuthor, ...author } = useField("text")
  const { reset: resetInfo, ...info } = useField("url")

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')

    setNotification(`a new anecdote "${content.value}" created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button> <button type="button" onClick={handleReset}>reset</button>
        
      </form>
    </div>
  )

}

const Notification = ( {notification} ) => {

  return(
           <>
           {notification}
           </>
  )
}



const App = () => {


  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))

  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu
        anecdotes={anecdotes} 
        addNew={addNew}
        setNotification={setNotification}
        notification={notification}
      />
      <Footer />
    </div>
  )
}

export default App
