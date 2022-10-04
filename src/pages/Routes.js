import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import NotFound from './NotFound';
import Login from './Login';
// import ProfileEdit from './ProfileEdit';
// import NotFound from './NotFound';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;
