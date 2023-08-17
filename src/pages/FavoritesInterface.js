import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlbumsContext from '../context/AlbumsContext';
import FavoritesFullPage from './FavoritesFullPage';

function FavoritesInterface() {
  const {
    setAlbumId,
  } = useContext(AlbumsContext);

  const { location } = useHistory();

  useEffect(() => {
    const collectionId = location.pathname.replace('/music/', '');
    setAlbumId(collectionId);
  }, []);

  return (
    <FavoritesFullPage />
  );
}

export default FavoritesInterface;
