import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import AlbumsContext from '../context/AlbumsContext';
import updateFavoriteList from './MusicCard';

function MusicCardTail(props) {
  const {
    isLoading,
    setIsLoading,
    favoritesList,
    setFavoritesList } = useContext(AlbumsContext);

  const [favorite, setFavorite] = useState(false);
  const { song, update } = props;
  const { trackName, previewUrl, trackId } = song;
  // console.log(update);

  const checkIfFavorite = async () => {
    setIsLoading(true);
    setFavoritesList(await getFavoriteSongs());
    const isFavorite = favoritesList
      .some((favoriteSong) => favoriteSong.trackId === song.trackId);
    setFavorite(isFavorite);
    setIsLoading(false);
  };

  useEffect(() => {
    const checking = async () => {
      await checkIfFavorite();
    };
    checking();
  }, []);

  const addOrRemoveFavorite = async () => {
    setIsLoading(true);

    if (favorite === false) {
      await addSong(song);
      setFavorite(true);
    } else {
      await removeSong(song);
      setFavorite(false);
    }
    setIsLoading(false);
    updateFavoriteList();
  };

  return (
    isLoading ? <Loading /> : (
      <div>
        <strong>
          { trackName }
        </strong>
        <audio data-testid="audio-component" className="songCard" controls>
          <source src={ previewUrl } type="audio/mp3" />
          <track kind="captions" />
          Your browser doesn&aps;t support the element
          {' '}
          <code>audio</code>
          .
          Seu navegador não suporta a tag de áudio.
        </audio>
        <label
          htmlFor={ trackId }
        >
          { !favorite ? 'Wanna add this song to your favorites? '
            : 'Saved on favorites! '}
          <input
            className="material-symbols-outlined"
            value="Favorite"
            id={ trackId }
            type="checkbox"
            track={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => { addOrRemoveFavorite(); update(); } }
            checked={ favorite }
          />
        </label>
      </div>
    )
  );
}

MusicCardTail.propTypes = {
  song: PropTypes.PropTypes.shape().isRequired,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  favorite: PropTypes.bool,
  trackId: PropTypes.string.isRequired,
  addOrRemoveFavorite: PropTypes.func,
}.isRequired;

export default MusicCardTail;
