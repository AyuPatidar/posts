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
  timeoutId: number | NodeJS.Timeout | undefined;
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
      timeoutId: undefined,
    };
  }

  fetchPosts = async () => {
    try {
      console.log("called");
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.pageNo}`
      );
      const data = await res.json();
      if (data.hits.length > 0)
        this.setState((prevState) => ({
          posts: [...prevState.posts, ...data.hits] as Post[],
        }));
      else this.setState({ hasMore: false });
    } catch (error) {
      console.log((error as Error).message);
    }
    this.setState({ isFetching: false });
  };

  componentDidMount() {
    if (this.state.pageNo === 0) this.setState({ isFetching: true });
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps: Readonly<IPROPS>, prevState: Readonly<ISTATE>) {
    if (this.state !== prevState) {
      // pageNo change
      if (prevState.pageNo !== this.state.pageNo) {
        if (this.state.pageNo === 0) this.setState({ isFetching: true });
        if (this.state.timeoutId) window.clearTimeout(this.state.timeoutId);
        this.setState({
          timeoutId: window.setTimeout(() => {
            console.log("interval");
            if (this.state.hasMore) this.setState({ isFetching: true });
          }, 10000),
        });
      }
      // isBottom change
      if (this.state.isBottom !== prevState.isBottom) {
        if (this.state.isBottom) this.setState({ pageNo: prevState.pageNo });
        if (
          this.state.isBottom &&
          this.state.isFetching === false &&
          this.state.hasMore
        )
          this.setState({ isFetching: true });
      }
      // isFetching change
      if (
        this.state.isFetching !== prevState.isFetching &&
        this.state.isFetching
      ) {
        this.fetchPosts();
        this.setState({ pageNo: prevState.pageNo + 1 });
      }
    }
  }

  handleScroll = () => {
    this.setState({
      isBottom:
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight,
    });
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
  }

  handleCardClick = (passedTitle: string) => {
    const posts = this.state.posts.filter((post) =>
      post.title.includes(passedTitle)
    );
    this.props.navigate(`/${passedTitle}`, {
      state: {
        post: posts[0],
      },
    });
  };

  render() {
    const { inputValue, posts, searchedPosts } = this.state;
    return (
      <Box className="box">
        <Box className="form-container">
          <FormControl
            sx={{ mx: 1, mt: 3, mb: 1, width: "50%" }}
            variant="outlined"
            color="info"
          >
            <InputLabel htmlFor="title-author">
              Enter title or author's name
            </InputLabel>
            <OutlinedInput
              id="title-author"
              type="search"
              label="Enter title or author's name"
              value={inputValue}
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
        </Box>
        <List>
          {inputValue === "" ? (
            posts.map((post, index) => (
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
              {searchedPosts.map((post, index) => (
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
