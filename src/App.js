import React, { useEffect, useState } from "react";

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



  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fakeRequest = () => {
      return new Promise(resolve => setTimeout(() => resolve(), 5000));
    };
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();  // removing the spinner element
        setLoading(false); // showing the app
      }
    });
  })



  // Downloading files to display, till than a fake request
  if (loading) {
    return null;
  }
  else {
    return (
      <>
        <PositionState>
          <Router>

            <Switch>
              <Route exact path="/">
                <Home alertCall={alertCall} nullifyAlert={nullifyAlert} />
              </Route>
              <Route path="/live">
                <Live alertObj={alertObj} alertCall={alertCall} nullifyAlert={nullifyAlert} />
              </Route>
            </Switch>
            <Heart />
            <Alert alertObj={alertObj} nullifyAlert={nullifyAlert} />

          </Router>
        </PositionState>
      </>
    );
  }
}
