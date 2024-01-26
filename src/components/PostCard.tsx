import React from "react";
import withRouter from "../services/withRouter";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface IPROPS {
  title: string;
  author: string;
  authorURL: string;
  created_at: string;
  _tags: string[] | null | undefined;
  handleClick: Function;
}

class PostCard extends React.Component<IPROPS> {
  constructor(props: IPROPS) {
    super(props);
  }

  render() {
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
          <CardActionArea
            onClick={() => this.props.handleClick(this.props.title)}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
            >
              {this.props.title}
            </Typography>
            <Typography
              variant="h6"
              component="div"
            >
              {this.props.author}
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              variant="body1"
            >
              {this.props.created_at.substring(0, 10)}
            </Typography>
            <Typography variant="body1">
              {this.props._tags && <>Tags:</>}
              {this.props._tags?.map((tag, index) => (
                <span key={index}>
                  {tag}
                  <br />
                </span>
              ))}
            </Typography>
          </CardActionArea>
          <Typography variant="body1">
            Author Url:{" "}
            <Link
              to={this.props.authorURL}
              target="_blank"
              style={{
                textDecoration: "none",
                fontSize: 14,
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
