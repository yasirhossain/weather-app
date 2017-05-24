import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import About from './about';
import Weather from './weather';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li><Link to="/"><i className="fa fa-home"></i></Link></li>
                <li><Link to="/weather">Weather</Link></li>
              </ul>
            </div>
          </nav>

          <div className="container">
            <Route exact path="/" component={About} />
            <Route path="/weather" component={Weather} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
