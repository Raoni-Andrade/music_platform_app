import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.recoverUserName();
  }

  recoverUserName = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();

    this.setState({
      data: user,
      isLoading: false,
    });
  };

  render() {
    const { data, isLoading } = this.state;
    return (
      <>
        <Header />
        { isLoading ? <Loading /> : (
          <div data-testid="page-profile">
            <h1>
              Profile
            </h1>
            <img
              src={ data.image }
              data-testid="profile-image"
              alt={ `Foto de ${data.name}` }
            />
            <span>{data.name}</span>
            <span>{data.email}</span>
            <span>{data.description}</span>
            <Link to="/profile/edit">
              Editar perfil
            </Link>
          </div>
        ) }
      </>
    );
  }
}

export default Profile;
