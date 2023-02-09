/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../index.css';
import '../dist/output.css';
import LoginBackground from '../images/LoginBackground.svg';

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
    history.push('/test');
  };

  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <>
            {/*
            <div className="" data-testid="page-login">
              <form>
                <div>
                  <label htmlFor="name email-address">
                    <input
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      type="text"
                      id="name"
                      placeholder="qual é o seu nome?"
                      name="name"
                      data-testid="login-name-input"
                      onChange={ this.handleName }
                    />
                  </label>
                </div>
                <div>
                  <button
                    className="enterButton"
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ !this.isButtonEnabled() }
                    onClick={ this.fetchUserSession }
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div> */}
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
            <div className="flex min-h-full items-center justify-center py-40 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <img
                    className="mx-auto h-15 w-auto"
                    src={ LoginBackground }
                    alt="Your Company"
                  />
                  {/* <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    TrybeTunes
                  </h2> */}
                  <p className="mt-2 text-center text-sm text-gray-600">
                    developed by
                    {' '}
                    <a href="https://github.com/Raoni-Andrade" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Raoni Andrade
                    </a>
                  </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="name email-address">
                        <input
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          type="text"
                          id="name"
                          placeholder="what's your name?"
                          name="name"
                          data-testid="login-name-input"
                          onChange={ this.handleName }
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      className="group relative flex w-full justify-center rounded-md border border-black bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="button"
                      data-testid="login-submit-button"
                      disabled={ !this.isButtonEnabled() }
                      onClick={ this.fetchUserSession }
                    >
                      Enter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
