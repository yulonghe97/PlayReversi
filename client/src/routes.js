// routes for frontend
import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import GamePlayPage from "./View/Game/GamePlayPage";
import WaitingRoom from "./View/Game/WaitingRoom";
import JoinRoom from "./View/Game/JoinRoom";
import GamePage from "./View/Game";
import LoginPage from "./View/Login";
import RegisterPage from "./View/Login/Register";
import RoomPage from "./View/Room/RoomList";
import { isLoggedIn } from "./utils/checkAuth";

/**
 * PrivateRoute only allows user who signed in to access to route
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={RoomPage} />
          <PrivateRoute exact path="/game/:id" component={GamePlayPage} />
          <PrivateRoute exact path="/waiting/:id" component={WaitingRoom} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/room" component={RoomPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
