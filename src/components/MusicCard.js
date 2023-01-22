import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.checkIfFavorite();
  }

  checkIfFavorite = async () => {
    const { song } = this.props;
    this.setState({
      isLoading: true,
    });
    const favoritesList = await getFavoriteSongs();
    const isFavorite = favoritesList
      .some((favoriteSong) => favoriteSong.trackId === song.trackId);
    this.setState({
      favorite: isFavorite,
      isLoading: false,
    });
  };

  addOrRemoveFavorite = async (song) => {
    const { favorite } = this.state;
    this.setState({
      isLoading: true,
    });

    if (favorite === false) {
      await addSong(song);
      this.setState({
        favorite: true,
      });
    } else {
      await removeSong(song);
      this.setState({
        favorite: false,
      });
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { song, update } = this.props;
    const { trackName, previewURL, trackId } = song;
    const { favorite, isLoading } = this.state;
    return (
      isLoading ? <Loading /> : (
        <div>
          <strong>
            { trackName }
          </strong>
          <audio data-testid="audio-component" src={ previewURL } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor={ trackId }
          >
            Favorita
            <input
              id={ trackId }
              type="checkbox"
              track={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ () => { this.addOrRemoveFavorite(); update(); } }
              checked={ favorite }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.PropTypes.shape().isRequired,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  favorite: PropTypes.bool,
  trackId: PropTypes.string.isRequired,
  addOrRemoveFavorite: PropTypes.func,
}.isRequired;

export default MusicCard;
