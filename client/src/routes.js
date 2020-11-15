// routes for frontend
import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GamePage from "./View/Game/GamePage";
import JoinRoom from "./View/Game/JoinRoom";

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={JoinRoom} />
          <Route exact path="/game/:id" component={GamePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
