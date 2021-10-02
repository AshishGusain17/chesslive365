import "./App.css";
import React, {useState} from "react";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import PositionState from './context/position/PositionState'
import Alert from "./components/Alert";


export default function App() {

  const [alertObj, setAlert] = useState(null)
  // const alertCall = (msg, msgText)=>{
  //   setAlert({msg: msg, msgText: msgText});
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 2000);
  // }

  return (
    <>
      <PositionState>
        <Router>

          <Alert alertObj={alertObj} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </Router>
      </PositionState>
    </>
  );
}
