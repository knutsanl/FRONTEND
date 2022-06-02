import { Route, Redirect } from "react-router-dom";
import { AuthContextConsumer } from "../context/authContext";

// TAKEN FROM FULLSTACK LECTURE and from this link
//https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146
const PrivateRoute = ({ children, ...rest }) => (
  <AuthContextConsumer>
    {({ isAuthFunc }) => (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthFunc() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    )}
  </AuthContextConsumer>
);

export default PrivateRoute;
