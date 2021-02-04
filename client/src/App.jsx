import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
