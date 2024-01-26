import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const FunctionalLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [pageNo, setPageNo] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchedPosts, setSearchedPosts] = useState<Post[]>([]);
  const [timeoutId, setTimeoutId] = useState<
    number | NodeJS.Timeout | undefined
  >(undefined);

  const fetchPosts = async () => {
    try {
      console.log("called");
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNo}`
      );
      const data = await res.json();
      if (data.hits.length > 0)
        setPosts((prevState) => [...prevState, ...data.hits] as Post[]);
      else setHasMore(false);
    } catch (error) {
      console.log((error as Error).message);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pageNo === 0) setIsFetching(true);
    if (timeoutId) window.clearTimeout(timeoutId);
    setTimeoutId(
      window.setTimeout(() => {
        console.log("interval");
        if (hasMore) setIsFetching(true);
      }, 10000)
    );
  }, [pageNo]);

  useEffect(() => {
    if (isFetching) {
      fetchPosts();
      setPageNo((prevState) => prevState + 1);
    }
  }, [isFetching]);

  const handleScroll = () => {
    setIsBottom(
      Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight
    );
  };

  useEffect(() => {
    if (isBottom) setPageNo(pageNo);
    if (isBottom && isFetching === false && hasMore) setIsFetching(true);
  }, [isBottom]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedPosts(filteredPosts as Post[]);
  };

  const handleCardClick = (passedTitle: string) => {
    const filteredPosts = posts.filter((post) =>
      post.title.includes(passedTitle)
    );
    navigate(`/${passedTitle}`, {
      state: {
        post: filteredPosts[0],
      },
    });
  };

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
          value={inputValue}
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
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
                handleClick={handleCardClick}
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
                  handleClick={handleCardClick}
                />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );
};

export default FunctionalLandingPage;
