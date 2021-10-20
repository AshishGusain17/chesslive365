import "./App.css";
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import PositionState from './context/position/PositionState';
import Alert from "./components/Alerts/Alert";
import Home from "./components/Home";
import Live from './components/Live';

export default function App() {

  const [alertObj, setAlert] = useState(null)
  const alertCall = (msg, msgText) => {
    setAlert({ msg: msg, msgText: msgText });
    if (msg === 'Checkmate' || msg === 'Stalemate') {
      setTimeout(() => {
        setAlert(null);
      }, 20000);
    }
    else {
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  }

  const  nullifyAlert = ()=>{
    setAlert(null);
  }




  return (
    <>
      <PositionState>
        <Router>
        <Alert alertObj={alertObj} nullifyAlert={nullifyAlert}/>
          
          <Switch>
            <Route exact path="/">
              <Home alertCall={alertCall} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route path="/live">
              <Live alertCall={alertCall} />
            </Route>

          </Switch>
        </Router>
      </PositionState>
    </>
  );
}
