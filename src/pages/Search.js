import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
  }

  enableButton = () => {
    const { artistName } = this.state;
    const min = 2;
    return artistName.length >= min;
  };

  handleArtist = (event) => {
    this.setState({
      artistName: event.target.value,
    });
  };

  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h1>
          Search
        </h1>
        <form>
          <label htmlFor="artist">
            <input
              placeholder="Nome do Artista"
              id="artist"
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleArtist }
            />
          </label>
          <button
            type="button"
            disabled={ !this.enableButton() }
            data-testid="search-artist-button"
            // onClick={}
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
