import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.fetchUserName();
  }

  fetchUserName = async () => {
    this.setState({
      isLoading: true,
    });
    const username = await getUser();
    this.setState({
      isLoading: false,
      userName: username.name,
    });
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header className="aside" data-testid="header-component">
        {isLoading ? <Loading />
          : (
            <h3 className="username" data-testid="header-user-name">
              { userName }
            </h3>
          )}
        <nav>
          <Link to="/search" className="search" data-testid="link-to-search">
            Search
          </Link>
          <Link to="/favorites" className="favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/profile" className="profile" data-testid="link-to-profile">
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
