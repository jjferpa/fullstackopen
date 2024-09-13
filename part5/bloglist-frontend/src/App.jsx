import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/Notification'
import { LoginForm } from './components/LoginForm'
import Togglable from './components/Toggable'
import { BlogForm } from './components/BlogForm'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')
  const blogFormRef = useRef()
  const [refreshBlog, setRefreshBlog] = useState(false)


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(
        {
        type: 'error', 
        text: 'Wrong credentials'
        }
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: URL
    }

    blogService
    .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(
        {
          type: 'success',
          text: `A new blog ${title} by ${author} added`
        }
      )
      setRefreshBlog(!refreshBlog)
      setTimeout(()=>{
        setMessage(null)
      }, 5000)
      setNewBlog('')
      blogFormRef.current.toggleVisibility()
    })

  }

  const addLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    setRefreshBlog(!refreshBlog)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [refreshBlog])

  if (user === null) {
       return (
     <LoginForm 
      message={message}
      handleLogin={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
     />
    )
  }



  return (
    <div>
       <h2>blogs</h2>
       <p>{user.name} is logged in<button onClick={handleLogout}>logout</button></p>  
       
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
      addBlog={addBlog}
      message={message}
      title={title}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setURL={setURL}
      />
    </Togglable>


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLikes={addLikes} />
      )}
    </div>
  )
}

export default App

