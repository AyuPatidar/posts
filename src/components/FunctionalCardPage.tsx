import React from "react";
import { useLocation } from "react-router-dom";

const FunctionalCardPage: React.FC = () => {
  const location = useLocation();
  return <>{JSON.stringify(location.state.post, null, 2)}</>;
};

export default FunctionalCardPage;
