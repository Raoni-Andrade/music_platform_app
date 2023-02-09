import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import AlbumInterface from './pages/AlbumInterface';
import SearchInterface from './pages/SearchInterface';
import FavoritesInterface from './pages/FavoritesInterface';

class App extends React.Component {
  render() {
    return (
      <div className="body">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/test" component={ SearchInterface } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route
            path="/music/:id"
            component={ AlbumInterface }

          />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/liked" component={ FavoritesInterface } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />

        </Switch>
      </div>
    );
  }
}

export default App;
