import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AlbumsContext from './AlbumsContext';

function AlbumsProvider({ children }) {
  const [artistName, setArtistName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artUrl, setArtUrl] = useState('');
  const [songs, setSongs] = useState([]);
  const [albumName, setAlbumName] = useState([]);
  const [albumsFromArtist, setAlbumsFromArtist] = useState([]);
  const [albumId, setAlbumId] = useState();
  const [favoritesList, setFavoritesList] = useState([]);

  const contextValue = useMemo(
    () => ({
      artistName,
      setArtistName,
      albumsFromArtist,
      setAlbumsFromArtist,
      searchInput,
      setSearchInput,
      isLoading,
      setIsLoading,
      artistAlbums,
      setArtistAlbums,
      artUrl,
      setArtUrl,
      songs,
      setSongs,
      albumName,
      setAlbumName,
      albumId,
      setAlbumId,
      favoritesList,
      setFavoritesList,
    }),
    [
      artistName,
      searchInput,
      isLoading,
      artistAlbums,
      artUrl,
      songs,
      albumName,
      albumsFromArtist,
      albumId,
      favoritesList,
    ],
  );
  return (
    <AlbumsContext.Provider value={ contextValue }>
      {children}
    </AlbumsContext.Provider>
  );
}

AlbumsProvider.propTypes = {
  children: PropTypes.shape({
  }),
}.isRequired;

export default AlbumsProvider;
