import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const FunctionalCardPage: React.FC = () => {
  const location = useLocation();
  return (
    <>
      {!location.state ? (
        <Navigate to={"/"} />
      ) : (
        <>{JSON.stringify(location.state.post, null, 2)}</>
      )}
    </>
  );
};

export default FunctionalCardPage;
