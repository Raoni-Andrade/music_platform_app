import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlbumsContext from '../context/AlbumsContext';
// import AlbumsList from '../components/AlbumsList';
// import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import Loading from './Loading';
import AlbumFullPage from './AlbumFullPage';

function AlbumInterface() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    // isLoading,
    // setIsLoading,
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
    setAlbumId,
    // albumsFromArtist,
    // setAlbumsFromArtist,
    // favoritesList,
    // setFavoritesList
  } = useContext(AlbumsContext);

  const { location } = useHistory();

  useEffect(() => {
    const collectionId = location.pathname.replace('/music/', '');
    setAlbumId(collectionId);
  }, []);

  // gettingAlbumId();

  return (
    <AlbumFullPage />
  );
}

export default AlbumInterface;
