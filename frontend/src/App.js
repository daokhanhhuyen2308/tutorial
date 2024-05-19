import './App.css';
import React, {Component} from "react";
import {Link, Route, Routes} from "react-router-dom";
import AddTutorialComponent from "./components/AddTutorialComponent";
import TutorialComponent from "./components/TutorialComponent";
import TutorialListComponent from "./components/TutorialListComponent";

class App extends Component {


  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand" style={{marginLeft: "20px"}}>
              Tutorials
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<TutorialListComponent/>}/>
              <Route path="/tutorials" element={<TutorialListComponent/>}/>
              <Route path="/add" element={<AddTutorialComponent/>}/>
              <Route path="/tutorials/:id" element={<TutorialComponent/>}/>
            </Routes>
          </div>

        </div>
    )
  }
}

export default App;
