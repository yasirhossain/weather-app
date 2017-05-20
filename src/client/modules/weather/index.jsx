import React from 'react';
import { Route, Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';

import Weather from './containers/weather';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: <Route exact path="/weather" component={Weather}/>,
  navItem:
    <NavItem>
      <Link to="/weather" className="nav-link">Weather</Link>
    </NavItem>,
  reducer: { weather: reducers }
});
