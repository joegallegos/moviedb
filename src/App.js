import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Movie from './components/Movie';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movie" component={Movie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
