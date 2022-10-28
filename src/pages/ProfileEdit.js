import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      image: '',
      descript: '',
      isLoading: false,
      isBtnEnabled: false,
    };
  }

  componentDidMount() {
    this.recoverUserData();
  }

  recoverUserData = async () => {
    const data = await getUser();

    this.setState({
      nome: data.name,
      email: data.email,
      image: data.image,
      descript: data.description,
      isBtnEnabled: false,
      isLoading: false,
    });
  };

  controlEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  controlSaveBtn = () => {
    const { nome, email, descript } = this.state;

    if (nome.length === 0 || descript.length === 0 || !this.controlEmail(email)) {
      this.setState({
        isBtnEnabled: true,
      });
    } else {
      this.setState({
        isBtnEnabled: false,
      });
    }
  };

  clickSaveBtn = async () => {
    this.setState({
      isLoading: true,
    });
    const { history } = this.props;
    const { nome, email, image, descript } = this.state;
    await updateUser({ name: nome, email, description: descript, image });
    this.setState({
      isLoading: false,
    });
    history.push('/profile');
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.controlSaveBtn());
  };

  render() {
    const { nome, email, descript, image, isBtnEnabled, isLoading } = this.state;
    return (
      <>
        <Header />
        { isLoading ? <Loading /> : (
          <div data-testid="page-profile-edit">
            <h1>
              Edit profile
            </h1>
            <label htmlFor="nome">
              Nome:
              <input
                type="text"
                data-testid="edit-input-name"
                id="nome"
                name="nome"
                value={ nome }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                data-testid="edit-input-email"
                id="email"
                name="email"
                onChange={ this.onInputChange }
                value={ email }
              />
            </label>
            <label htmlFor="descript">
              Descrição:
              <input
                type="textarea"
                id="descript"
                name="descript"
                data-testid="edit-input-description"
                onChange={ this.onInputChange }
                value={ descript }
              />
            </label>
            <label htmlFor="image">
              Imagem:
              <input
                type="text"
                data-testid="edit-input-image"
                id="image"
                name="image"
                onChange={ this.onInputChange }
                value={ image }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              name="edit-button-save"
              disabled={ isBtnEnabled }
              onClick={ this.clickSaveBtn }
            >
              Salvar
            </button>
          </div>
        ) }
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
