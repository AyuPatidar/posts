import { render, screen, waitFor } from "@testing-library/react";
import FunctionalLandingPage from "../components/FunctionalLandingPage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function renderComponent() {
  const mockData = {
    hits: [
      {
        _highlightResult: {
          author: {
            matchLevel: "none",
            matchedWords: [],
            value: "DavideNL",
          },
          title: {
            matchLevel: "none",
            matchedWords: [],
            value:
              "Logitech Squeezebox and UE SmartRadio will be taken offline in February",
          },
          url: {
            matchLevel: "none",
            matchedWords: [],
            value: "https://mysqueezebox.com/index/Home",
          },
        },
        _tags: ["story", "author_DavideNL", "story_39176463"],
        author: "DavideNL",
        children: [39176464],
        created_at: "2024-01-29T14:14:20Z",
        created_at_i: 1706537660,
        num_comments: 1,
        objectID: "39176463",
        points: 1,
        story_id: 39176463,
        title:
          "Logitech Squeezebox and UE SmartRadio will be taken offline in February",
        updated_at: "2024-01-29T14:15:12Z",
        url: "https://mysqueezebox.com/index/Home",
      },
      {
        _highlightResult: {
          author: {
            matchLevel: "none",
            matchedWords: [],
            value: "pcbje",
          },
          title: {
            matchLevel: "none",
            matchedWords: [],
            value:
              "Show HN: A shorter alternative to Norvig's Spelling Corrector with deletes only",
          },
          url: {
            matchLevel: "none",
            matchedWords: [],
            value: "https://github.com/pcbje/symdel-spellchecker",
          },
        },
        _tags: ["story", "author_pcbje", "story_39176455", "show_hn"],
        author: "pcbje",
        children: [39176457],
        created_at: "2024-01-29T14:14:08Z",
        created_at_i: 1706537648,
        num_comments: 1,
        objectID: "39176455",
        points: 1,
        story_id: 39176455,
        title:
          "Show HN: A shorter alternative to Norvig's Spelling Corrector with deletes only",
        updated_at: "2024-01-29T14:15:12Z",
        url: "https://github.com/pcbje/symdel-spellchecker",
      },
      {
        _highlightResult: {
          author: {
            matchLevel: "none",
            matchedWords: [],
            value: "cgeier",
          },
          title: {
            matchLevel: "none",
            matchedWords: [],
            value: "MNT Pocket Reform",
          },
          url: {
            matchLevel: "none",
            matchedWords: [],
            value: "https://www.crowdsupply.com/mnt/pocket-reform#products",
          },
        },
        _tags: ["story", "author_cgeier", "story_39176391"],
        author: "cgeier",
        created_at: "2024-01-29T14:08:28Z",
        created_at_i: 1706537308,
        num_comments: 0,
        objectID: "39176391",
        points: 1,
        story_id: 39176391,
        title: "MNT Pocket Reform",
        updated_at: "2024-01-29T14:11:12Z",
        url: "https://www.crowdsupply.com/mnt/pocket-reform#products",
      },
      {
        _highlightResult: {
          author: {
            matchLevel: "none",
            matchedWords: [],
            value: "WaitWaitWha",
          },
          title: {
            matchLevel: "none",
            matchedWords: [],
            value:
              "The Intellectual Rot of the Industrially Necessary University",
          },
          url: {
            matchLevel: "none",
            matchedWords: [],
            value:
              "https://www.epsilontheory.com/the-intellectual-rot-of-the-industrially-necessary-university/",
          },
        },
        _tags: ["story", "author_WaitWaitWha", "story_39176382"],
        author: "WaitWaitWha",
        created_at: "2024-01-29T14:07:26Z",
        created_at_i: 1706537246,
        num_comments: 0,
        objectID: "39176382",
        points: 1,
        story_id: 39176382,
        title: "The Intellectual Rot of the Industrially Necessary University",
        updated_at: "2024-01-29T14:11:12Z",
        url: "https://www.epsilontheory.com/the-intellectual-rot-of-the-industrially-necessary-university/",
      },
      {
        _highlightResult: {
          author: {
            matchLevel: "none",
            matchedWords: [],
            value: "LightMachine",
          },
          title: {
            matchLevel: "none",
            matchedWords: [],
            value:
              "Can a simple functional sieve be fast? Optimizing Tromp's algorithm on HVM",
          },
          url: {
            matchLevel: "none",
            matchedWords: [],
            value:
              "https://gist.github.com/VictorTaelin/a5571afaf5ee565689d2b9a981bd9df8",
          },
        },
        _tags: ["story", "author_LightMachine", "story_39176375"],
        author: "LightMachine",
        created_at: "2024-01-29T14:06:26Z",
        created_at_i: 1706537186,
        num_comments: 0,
        objectID: "39176375",
        points: 1,
        story_id: 39176375,
        title:
          "Can a simple functional sieve be fast? Optimizing Tromp's algorithm on HVM",
        updated_at: "2024-01-29T14:11:12Z",
        url: "https://gist.github.com/VictorTaelin/a5571afaf5ee565689d2b9a981bd9df8",
      },
    ],
  };

  const titles = [
    "Logitech Squeezebox and UE SmartRadio will be taken offline in February",
    "Show HN: A shorter alternative to Norvig's Spelling Corrector with deletes only",
    "MNT Pocket Reform",
    "The Intellectual Rot of the Industrially Necessary University",
    "Can a simple functional sieve be fast? Optimizing Tromp's algorithm on HVM",
  ];

  jest.spyOn(global, "fetch").mockResolvedValue({
    json: async () => mockData,
  } as any);

  const { container } = render(
    <BrowserRouter>
      <FunctionalLandingPage />
    </BrowserRouter>
  );

  return { container, mockData, titles };
}

describe("Post Cards", () => {
  test("should render cards on api fetch", async () => {
    const { titles } = renderComponent();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0"
    );

    const cardHeadings = await screen.findAllByRole("heading");
    expect(cardHeadings).toHaveLength(5);

    titles.forEach((title) => {
      const heading = screen.getByRole("heading", { name: title });
      expect(heading).toBeInTheDocument();
    });
  });

  it("should handle Card Click", async () => {
    const {} = renderComponent();

    const mockNavigate = jest.fn();

    const cards = await screen.findAllByRole("button");

    cards.forEach(async (card) => {
      await userEvent.click(card);
      waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe("Input Box", () => {
  it("should handle input", async () => {
    const { titles } = renderComponent();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0"
    );

    const cardHeadings = await screen.findAllByRole("heading");
    expect(cardHeadings).toHaveLength(5);

    const searchBox = screen.getByRole("searchbox", {
      name: /enter title or author's name/i,
    });
    await userEvent.type(searchBox, titles[0]);

    const searchedCardHeadings = await screen.findAllByRole("heading");
    expect(searchedCardHeadings).toHaveLength(1);

    const heading = screen.getByRole("heading", { name: titles[0] });
    expect(heading).toBeInTheDocument();
  });
});
