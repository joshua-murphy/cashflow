import React, { Component } from 'react';
import NoMatch from './NoMatch';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <br/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
