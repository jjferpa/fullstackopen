import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../../components/Blog'

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
  const blogUser={
      username: 'pollo',
      name: 'Leonidas'

  }

describe('Testing <Blog /> component', () => {
  test('The blog should show title and author, and does not show url and likes', () => {


    render(<Blog blog={blog} user={blogUser}/>)
    const element = screen.getByTestId('blog-header')
    screen.debug(element)
    expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(element).not.toHaveTextContent(`${blog.url} likes ${blog.likes}`)

  })

  test('URL and likes should show on click view button', async () => { 

    const mockView = vi.fn()
    render(<Blog blog={blog} user={blogUser}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const element = screen.getByTestId('blog-details')

    expect(element).toHaveTextContent(`${blog.url}likes ${blog.likes}like${blog.user.name}remove`)

   })

})
