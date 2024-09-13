import { useState } from "react"

const Blog = ({ blog, addLikes, deleteBlog, user }) => {

  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    addLikes(blog.id, blogObject)
  }

  const handleDelete = () => {
    const confirmDelete = confirm(`Remove blog ${blog.title} by ${blog.author}`)
    
    if (confirmDelete){
     deleteBlog(blog.id);
    }

  }

  const showDeleteButton = blog.user.username === user.username ? true : false

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button style={showWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={hideWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={hideWhenVisible}>
      {blog.url}<br/>

      likes {blog.likes}<button onClick={handleLike}>like</button><br/>
      {blog.user.name}<br/>
      {showDeleteButton && <button onClick={handleDelete}>remove</button>}
      </div>
  </div>
)}

export default Blog