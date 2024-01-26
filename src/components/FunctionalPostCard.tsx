import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";
import React from "react";

interface IPROPS {
  title: string;
  author: string;
  authorURL: string;
  created_at: string;
  _tags: string[] | null | undefined;
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
    <Card
      sx={{
        width: "75vw",
        minWidth: "100%",
        borderRadius: 5,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        textWrap: "pretty",
      }}
    >
      <CardContent>
        <CardActionArea onClick={() => handleClick(title)}>
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            component="div"
          >
            {author}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            variant="body1"
          >
            {created_at.substring(0, 10)}
          </Typography>
          <Typography variant="body1">
            {_tags && <>Tags: </>}
            {_tags?.map((tag, index) => (
              <span key={index}>
                {index !== 0 && ", "}
                {tag}
              </span>
            ))}
          </Typography>
        </CardActionArea>
        <Typography variant="body1">
          Author Url:{" "}
          <Link
            to={authorURL}
            target="_blank"
            style={{
              textDecoration: "none",
              fontSize: 14,
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
