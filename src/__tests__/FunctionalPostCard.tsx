import { render, screen, waitFor } from "@testing-library/react";
import FunctionalPostCard from "../components/FunctionalPostCard";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function renderComponent() {
  const mockProps = {
    title: "A title",
    author: "JK",
    authorURL: "https://mysqueezebox.com/index/Home",
    created_at: "2024-01-29T14:14:20Z",
    _tags: ["story", "author_DavideNL", "story_39176463"],
    handleClick: jest.fn(),
  };

  const { container } = render(
    <BrowserRouter>
      <FunctionalPostCard
        title={mockProps.title}
        author={mockProps.author}
        authorURL={mockProps.authorURL}
        created_at={mockProps.created_at}
        _tags={mockProps._tags}
        handleClick={mockProps.handleClick}
      />
    </BrowserRouter>
  );
  return { container, mockProps };
}

describe("card", () => {
  it("should display content and handle click", async () => {
    const mockNavigate = jest.fn();

    const { mockProps } = renderComponent();

    const title = screen.getByRole("heading", {
      name: /a title/i,
    });
    const author = screen.getByText(/jk/i);
    const authorURL = screen.getByRole("link", {
      name: /https:\/\/mysqueezebox\.com\/index\/home/i,
    });
    const created_at = screen.getByText(/2024\-01\-29/i);
    const _tags = screen.getByText(/tags:/i);
    const card = screen.getByRole("button");

    expect(title).toHaveTextContent(mockProps.title);
    expect(author).toHaveTextContent(mockProps.author);
    expect(authorURL).toHaveTextContent(mockProps.authorURL);
    expect(created_at).toHaveTextContent(mockProps.created_at.substring(0, 10));
    await userEvent.click(card);
    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
