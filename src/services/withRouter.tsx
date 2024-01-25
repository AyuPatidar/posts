import { useLocation, useNavigate } from "react-router-dom";

const withRouter = (Component: React.ComponentType<any>) => {
  const WithRouter = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
      <Component
        {...props}
        location={location}
        navigate={navigate}
      />
    );
  };
  return WithRouter;
};
export default withRouter;
