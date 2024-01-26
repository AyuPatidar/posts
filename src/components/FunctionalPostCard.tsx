import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import React from "react";

interface IPROPS {
  title: string;
  author: string;
  authorURL: string;
  created_at: Date;
  _tags: string[];
  handleClick: Function;
}

const FunctionalPostCard: React.FC<IPROPS> = ({
  title,
  author,
  authorURL,
  created_at,
  _tags,
  handleClick,
}) => {
  return (
    <Card sx={{ width: "75vw", minWidth: "100%", backgroundColor: "black" }}>
      <CardContent sx={{ color: "white" }}>
        <CardActionArea onClick={() => handleClick(title)}>
          <Typography
            variant="h5"
            color="#80d8ff"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: 18 }}
            color="#80d8ff"
            component="div"
          >
            {author}
          </Typography>
          <Typography
            sx={{ mb: 1.5, fontSize: 14 }}
            color="whitesmoke"
          >
            {created_at.toString().substring(0, 10)}
          </Typography>
          <Typography variant="body1">Tags:</Typography>{" "}
          {_tags.map((tag, index) => (
            <span key={index}>
              {tag}
              <br />
            </span>
          ))}
        </CardActionArea>
        <Typography variant="body2">
          Author Url:{" "}
          <Link
            to={authorURL}
            target="_blank"
            style={{
              textDecoration: "none",
              fontSize: 14,
              color: "#80d8ff",
            }}
          >
            {authorURL}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FunctionalPostCard;
