import { render, screen } from '@testing-library/react'
import Blog from '../../../components/Blog'

describe('Testing <Blog /> component', () => {
  test('The blog should show title and author, and does not show url and likes', () => {
    const blog = {
      title: 'Titulo de blog para test',
      author: 'John Smith',
      url: 'https://www.blogurl.com',
      likes: '10',
      user: {
        username: 'pollo',
        name: 'Leonidas'
      }
    }
    const user={
        username: 'pollo',
        name: 'Leonidas'

    }

    render(<Blog blog={blog} user={user}/>)
    const element = screen.getByTestId('blog')
    screen.debug(element)
    expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(element).not.toHaveTextContent(`${blog.url} likes ${blog.likes}`)

  })

})
