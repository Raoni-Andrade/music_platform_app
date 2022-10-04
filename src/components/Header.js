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
    const userName = await getUser();
    this.setState({
      isLoading: false,
      userName: userName.name,
    });
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      <>
        <header className="Header" data-testid="header-component">
          <nav>
            <Link to="/search" data-testid="link-to-search">
              Search
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favorites
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              Profile
            </Link>
          </nav>
        </header>
        {isLoading
          ? <Loading />
          : (
            <h3 data-testid="header-user-name">
              { userName }
            </h3>
          )}
      </>
    );
  }
}

export default Header;
