import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../../../components/Blog";

const blog = {
  id: "123456",
  title: "Titulo de blog para test",
  author: "John Smith",
  url: "https://www.blogurl.com",
  likes: "10",
  user: {
    username: "pollo",
    name: "Leonidas",
  },
};
const blogUser = {
  username: "pollo",
  name: "Leonidas",
};

describe("Testing <Blog /> component", () => {
  test("The blog should show title and author, and does not show url and likes", () => {
    render(<Blog blog={blog} user={blogUser} />);
    const element = screen.getByTestId("blog-header");
    expect(element).toHaveTextContent(`${blog.title} ${blog.author}`);
    expect(element).not.toHaveTextContent(`${blog.url} likes ${blog.likes}`);
  });

  test("URL and likes should show on click view button", async () => {
    render(<Blog blog={blog} user={blogUser} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const element = screen.getByTestId("blog-details");

    expect(element).toHaveTextContent(`${blog.url}`) +
      expect(element).toHaveTextContent(`likes ${blog.likes}`);
  });

  test("Clicking twice like button should call twice the event controller ", async () => {
    const mockLikeButton = vi.fn();
    render(<Blog blog={blog} user={blogUser} addLikes={mockLikeButton} />);
    const user = userEvent.setup();

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeButton.mock.calls).toHaveLength(2);
  });
});
