import { Switch, Route } from "react-router-dom";
import { Auth, Dash, Form, Post } from "react-router-dom";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/cart" component={Dash} />
    <Route path="/post/:id" component={Post} />
    <Route path="form" component={Form} />
  </Switch>
);
