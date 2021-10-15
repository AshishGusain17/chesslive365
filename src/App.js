import "./App.css";
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import PositionState from './context/position/PositionState';
import Alert from "./components/Alert";
import { InitialFrame } from './components/InitialFrame';


export default function App() {

  const [alertObj, setAlert] = useState(null)
  const alertCall = (msg, msgText) => {
    setAlert({ msg: msg, msgText: msgText });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <PositionState>
        <Router>

          <Alert alertObj={alertObj} />
          <Switch>
            <Route exact path="/">
              <InitialFrame alertCall={alertCall} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>           
            <Route exact path="/live">
              <InitialFrame alertCall={alertCall} />
            </Route>
          </Switch>
        </Router>
      </PositionState>
    </>
  );
}
