import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogForm } from '../../../components/BlogForm'

describe('Testing <BlogForm />', () => {


  test('Submit the right details should call the event controller', async () => {

    const mockSubmit = vi.fn()

    const { container } = render( <BlogForm createBlog={mockSubmit}  />)

    const user = userEvent.setup()
    const inputTitle = container.querySelector('input[name=\'title\']')
    const inputAuthor = container.querySelector('input[name=\'author\']')
    const inputURL = container.querySelector('input[name=\'URL\']')
    const button = screen.getByText('create')

    await user.type(inputTitle, 'titulo')
    await user.type(inputAuthor, 'autor')
    await user.type(inputURL, 'http://www.google.es')
    await user.click(button)

    expect(mockSubmit.mock.calls).toHaveLength(1)
    expect(mockSubmit.mock.calls[0][0].title).toBe('titulo')
    expect(mockSubmit.mock.calls[0][0].author).toBe('autor')
    expect(mockSubmit.mock.calls[0][0].url).toBe('http://www.google.es')

  })

})