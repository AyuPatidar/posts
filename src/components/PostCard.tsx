import React from "react";
import withRouter from "../services/withRouter";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface IPROPS {
  title: string;
  author: string;
  authorURL: string;
  created_at: Date;
  _tags: string[];
  handleClick: Function;
}

class PostCard extends React.Component<IPROPS> {
  constructor(props: IPROPS) {
    super(props);
  }

  render() {
    return (
      <Card sx={{ width: "75vw", minWidth: "100%", backgroundColor: "black" }}>
        <CardContent sx={{ color: "white" }}>
          <CardActionArea
            onClick={() => this.props.handleClick(this.props.title)}
          >
            <Typography
              variant="h5"
              color="#80d8ff"
              gutterBottom
            >
              {this.props.title}
            </Typography>
            <Typography
              sx={{ fontSize: 18 }}
              color="#80d8ff"
              component="div"
            >
              {this.props.author}
            </Typography>
            <Typography
              sx={{ mb: 1.5, fontSize: 14 }}
              color="whitesmoke"
            >
              {this.props.created_at.toString().substring(0, 10)}
            </Typography>
            <Typography variant="body1">Tags:</Typography>{" "}
            {this.props._tags.map((tag, index) => (
              <span key={index}>
                {tag}
                <br />
              </span>
            ))}
          </CardActionArea>
          <Typography variant="body2">
            Author Url:{" "}
            <Link
              to={this.props.authorURL}
              target="_blank"
              style={{
                textDecoration: "none",
                fontSize: 14,
                color: "#80d8ff",
              }}
            >
              {this.props.authorURL}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(PostCard);
