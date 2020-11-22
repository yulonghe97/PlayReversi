// routes for frontend
import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GamePlayPage from "./View/Game/GamePlayPage";
import WaitingRoom from "./View/Game/WaitingRoom";
import JoinRoom from "./View/Game/JoinRoom";
import GamePage from "./View/Game";
import LoginPage from "./View/Login";
import RegisterPage from "./View/Login/Register";
import { RootRef } from "@material-ui/core";

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={GamePage} />
          <Route exact path="/game/:id" component={GamePlayPage} />
          <Route exact path="/waiting/:id" component={WaitingRoom} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
