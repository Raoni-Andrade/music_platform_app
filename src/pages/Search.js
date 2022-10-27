import React from 'react';
import AlbumsList from '../components/AlbumsList';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      isLoading: false,
      searchInput: '',
      artistAlbums: [],
    };
  }

  enableButton = () => {
    const { searchInput } = this.state;
    const min = 2;
    return searchInput.length >= min;
  };

  handleArtist = (event) => {
    this.setState({
      artistName: event.target.value,
      searchInput: event.target.value,
    });
  };

  fetchArtist = async () => {
    const { searchInput } = this.state;
    // const { history } = this.props;

    this.setState({
      isLoading: true,
    });

    const albumsFound = await searchAlbumsAPI(searchInput);
    this.setState({
      artistAlbums: albumsFound,
      isLoading: false,
      searchInput: '',
    });
  };

  render() {
    const { isLoading, artistAlbums, searchInput, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist">
            <input
              placeholder="Nome do Artista"
              id="artist"
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleArtist }
              value={ searchInput }
            />
          </label>
          <button
            type="button"
            disabled={ !this.enableButton() }
            data-testid="search-artist-button"
            onClick={ this.fetchArtist }
          >
            Pesquisar
          </button>
        </form>
        <section>
          {isLoading && <Loading />}

          { artistAlbums.length > 0 && !isLoading && (
            <div>
              <h3>
                {' '}
                Resultado de álbuns de:
                {' '}
                {artistName}
                {' '}
              </h3>
              <AlbumsList artistAlbums={ artistAlbums } />
            </div>
          )}
          {artistAlbums.length === 0 && !isLoading
          && <h3>Nenhum álbum foi encontrado</h3>}
        </section>
      </div>
    );
  }
}

export default Search;
