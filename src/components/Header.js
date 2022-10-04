import React from 'react';
import { Link } from 'react-router-dom';
// import { getUser } from '../services/userAPI';

class Header extends React.Component {
  render() {
    return (
      <header className="Header" data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Search
          </Link>
          <Link to="/album/:id">
            Album
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Profile
          </Link>
          <Link to="/profile/edit">
            Edit profile
          </Link>
        </nav>
        <h3>
          {/* { getUser() } */}
        </h3>
      </header>
    );
  }
}

export default Header;
