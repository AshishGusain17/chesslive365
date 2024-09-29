import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PositionState from './context/position/PositionState';
import Alert from "./components/Alerts/Alert";
import Home from "./components/Home";
import Live from './components/Live';
import { Heart } from "./components/Followups/Heart";

export default function App() {

  const [alertObj, setAlert] = useState(null);
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
          <Switch>
            <Route exact path="/">
              home path '/'
              <Home alertCall={alertCall} nullifyAlert={nullifyAlert} />
            </Route>
            <Route path="/live">
              live path /live
              <Live alertObj={alertObj} alertCall={alertCall} nullifyAlert={nullifyAlert} />
            </Route>
            <Route exact path="/test">
              exact test path /test
            </Route>
            <Route path="/test2">
              test path /test2
            </Route>
          </Switch>
          <Heart />
          <Alert alertObj={alertObj} nullifyAlert={nullifyAlert} />

        </Router>
      </PositionState>
    </>
  );

}
