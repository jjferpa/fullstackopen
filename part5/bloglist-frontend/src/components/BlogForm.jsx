import { Notification } from "./Notification"


export const BlogForm = ({addBlog, message, title, author, URL, setTitle, setAuthor, setURL}) => {
  return (
    <>
     <h2>create new</h2>
      <form onSubmit={addBlog}>
        <Notification message={ message } />
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="url"
            value={URL}
            name="URL"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}