import './App.css';
import { AppBar, Toolbar } from "@material-ui/core"
import ProjectsContainer from "./components/projectsContainer"
import React from "react"
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

function App() {
    return (
      <Router>
        <Route path='/'><ProjectsContainer /></Route>
      </Router>
    )
}

export default App;