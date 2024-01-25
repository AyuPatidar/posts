import React from "react";
import withRouter from "../services/withRouter";
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
} from "@mui/material";
import "../App.css";
import PostCard from "./PostCard";
import { Post } from "../models/post";

interface IPROPS {
  navigate: any;
}

interface ISTATE {
  pageNo: number;
  hasMore: boolean;
  isFetching: boolean;
  isBottom: boolean;
  inputValue: string;
  posts: Post[];
  searchedPosts: Post[];
  intervalId: number;
}

class LandingPage extends React.Component<IPROPS, ISTATE> {
  constructor(props: IPROPS) {
    super(props);
    this.state = {
      pageNo: 0,
      hasMore: true,
      isBottom: false,
      isFetching: false,
      inputValue: "",
      posts: [] as Post[],
      searchedPosts: [] as Post[],
      intervalId: 0,
    };
  }

  fetchPosts = async () => {
    try {
      console.log("called");
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.pageNo}`
      );
      const data = await res.json();
      if (data.hits.length > 0) {
        this.setState((prevState) => ({
          posts: [...prevState.posts, ...data.hits] as Post[],
          pageNo: prevState.pageNo + 1,
        }));
      } else {
        this.setState({ hasMore: false });
      }
    } catch (error) {
      console.log((error as Error).message);
    }
    this.setState({ isFetching: false });
  };

  componentDidMount() {
    this.setState({
      intervalId: window.setInterval(() => {
        console.log("interval");
        this.setState({ isFetching: true }, () => {
          if (this.state.hasMore) this.fetchPosts();
        });
      }, 10000),
    });

    this.setState({ isFetching: true }, () => {
      this.fetchPosts();
    });

    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps: Readonly<IPROPS>, prevState: Readonly<ISTATE>) {
    if (this.state !== prevState) {
    }
  }

  handleScroll = () => {
    this.setState(
      {
        isBottom:
          Math.ceil(window.innerHeight + window.scrollY) >=
          document.documentElement.scrollHeight,
      },
      () => {
        if (
          this.state.isBottom &&
          this.state.isFetching === false &&
          this.state.hasMore
        ) {
          this.setState({ isFetching: true }, () => {
            this.fetchPosts();
          });
        }
      }
    );
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({ inputValue: e.target.value });
    const posts = this.state.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      searchedPosts: posts as Post[],
    });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.clearInterval(this.state.intervalId);
  }

  handleCardClick = (passedTitle: string) => {
    const posts = this.state.posts.filter((post) =>
      post.title.includes(passedTitle)
    );
    window.clearInterval(this.state.intervalId);
    this.props.navigate(`/${passedTitle}`, {
      state: {
        post: posts[0],
      },
    });
  };

  render() {
    return (
      <Box className="box">
        <FormControl
          sx={{ mx: 1, mt: 3, mb: 1, width: "50%" }}
          variant="outlined"
        >
          <InputLabel htmlFor="title-author">
            Enter title or author's name
          </InputLabel>
          <OutlinedInput
            id="title-author"
            type="search"
            label="Enter title or author's name"
            value={this.state.inputValue}
            onChange={(e) => this.handleChange(e)}
          />
        </FormControl>
        <List>
          {this.state.inputValue === "" ? (
            this.state.posts.map((post, index) => (
              <ListItem key={index}>
                <PostCard
                  title={post.title}
                  author={post.author}
                  _tags={post._tags}
                  created_at={post.created_at}
                  authorURL={post.url}
                  handleClick={this.handleCardClick}
                />
              </ListItem>
            ))
          ) : (
            <>
              {this.state.searchedPosts.map((post, index) => (
                <ListItem key={index}>
                  <PostCard
                    title={post.title}
                    author={post.author}
                    _tags={post._tags}
                    created_at={post.created_at}
                    authorURL={post.url}
                    handleClick={this.handleCardClick}
                  />
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Box>
    );
  }
}

export default withRouter(LandingPage);
