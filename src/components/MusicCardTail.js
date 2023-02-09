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
    // artistName,
    // setArtistName,
    // searchInput,
    // setSearchInput,
    // albumName,
    // setAlbumName,
    // artUrl,
    // setArtUrl,
    // songs,
    // setSongs,
    // albumId,
    // setAlbumId,
    // albumsFromArtist,
    // setAlbumsFromArtist,
    favoritesList,
    setFavoritesList } = useContext(AlbumsContext);

  const [favorite, setFavorite] = useState(false);
  const { song, update } = props;
  const { trackName, previewURL, trackId } = song;
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
        <audio data-testid="audio-component" src={ previewURL } controls>
          <track kind="captions" />
          Your browser doesn&aps;t support the element
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
        >
          Favorite
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
