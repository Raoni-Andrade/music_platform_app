import React from 'react';
import PropTypes, { objectOf, shape } from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      isLoading: false,
    };
  }

  isButtonEnabled = () => {
    const { loginName } = this.state;
    const min = 3;
    return loginName.length >= min;
  };

  handleName = (event) => {
    this.setState({
      loginName: event.target.value,
    });
  };

  fetchUserSession = async () => {
    const { loginName } = this.state;
    const { history } = this.props;

    this.setState({
      isLoading: true,
    });
    await createUser({ name: loginName });
    history.push('/search', this.state);
  };

  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div data-testid="page-login">
            <form>
              <label htmlFor="name">
                <input
                  type="text"
                  id="name"
                  placeholder="Nome"
                  name="name"
                  data-testid="login-name-input"
                  onChange={ this.handleName }
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ !this.isButtonEnabled() }
                onClick={ this.fetchUserSession }
              >
                Entrar
              </button>
            </form>
          </div>
        )
    );
  }
}

Login.propTypes = {
  history: objectOf(
    shape({
      push: PropTypes.func,
    }),
  ).isRequired,
};

export default Login;
