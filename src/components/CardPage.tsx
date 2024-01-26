import React from "react";
import withRouter from "../services/withRouter";
import { Navigate } from "react-router-dom";

interface IPROPS {
  location: any;
}

class CardPage extends React.Component<IPROPS> {
  constructor(props: IPROPS) {
    super(props);
  }
  render() {
    if (!this.props.location.state) return <Navigate to={"/"} />;
    const { post } = this.props.location.state;
    return <>{JSON.stringify(post, null, 2)}</>;
  }
}

export default withRouter(CardPage);
