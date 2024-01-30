import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PostCard from "../components/PostCard";

function renderComponent() {
  const mockData = {
    title: "A title",
    author: "JK",
    authorURL: "https://mysqueezebox.com/index/Home",
    created_at: "2024-01-29T14:14:20Z",
    _tags: ["story", "author_DavideNL", "story_39176463"],
    handleClick: jest.fn(),
  };

  const { container } = render(
    <BrowserRouter>
      <PostCard
        title={mockData.title}
        author={mockData.author}
        authorURL={mockData.authorURL}
        created_at={mockData.created_at}
        _tags={mockData._tags}
        handleClick={mockData.handleClick}
      />
    </BrowserRouter>
  );

  return { container, mockData };
}

describe("card", () => {
  it("should display content and handle click", async () => {
    const mockNavigate = jest.fn();

    const { mockData } = renderComponent();
    const { title, author, authorURL, created_at, _tags } = mockData;

    const screentitle = screen.getByRole("heading", {
      name: /a title/i,
    });
    const screenauthor = screen.getByText(/jk/i);
    const screenauthorURL = screen.getByRole("link", {
      name: /https:\/\/mysqueezebox\.com\/index\/home/i,
    });
    const screencreated_at = screen.getByText(/2024\-01\-29/i);
    const screen_tags = screen.getByText(/tags:/i);
    const card = screen.getByRole("button");

    expect(screentitle).toHaveTextContent(title);
    expect(screenauthor).toHaveTextContent(author);
    expect(screenauthorURL).toHaveTextContent(authorURL);
    expect(screencreated_at).toHaveTextContent(created_at.substring(0, 10));
    await userEvent.click(card);
    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
