import './App.css';
import ProjectsContainer from "./components/projectsContainer"
import InnerProject from "./components/innerProject"
import React from "react"
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

function App() {
    return (
      <Router>
        <Route exact path='/'><ProjectsContainer /></Route>
        <Route path='/project/:id'><InnerProject /></Route>
        
      </Router>
    )
}

export default App;