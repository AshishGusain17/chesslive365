// import "./App.css";
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import PositionState from './context/position/PositionState';
import Alert from "./components/Alerts/Alert";
import Home from "./components/Home";
import Live from './components/Live';
import { Heart } from "./components/Followups/Heart";

export default function App() {

  const [alertObj, setAlert] = useState(null)
  const alertCall = (msg, msgText, timeLimit) => {
    setAlert({ msg: msg, msgText: msgText });
      setTimeout(() => {
        setAlert(null);
      }, timeLimit);
  }

  const nullifyAlert = () => {
    setAlert(null);
  }




  return (
    <>
      <PositionState>
        <Router>
          <Alert alertObj={alertObj} nullifyAlert={nullifyAlert} />

          <Switch>
            <Route exact path="/">
              <Home alertCall={alertCall} nullifyAlert={nullifyAlert} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route path="/live">
              <Live alertCall={alertCall} nullifyAlert={nullifyAlert} />
            </Route>
          </Switch>
          <Heart />

        </Router>
      </PositionState>
    </>
  );
}
