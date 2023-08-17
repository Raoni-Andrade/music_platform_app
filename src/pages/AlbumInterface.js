import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlbumsContext from '../context/AlbumsContext';
import AlbumFullPage from './AlbumFullPage';

function AlbumInterface() {
  const {
    setAlbumId,
  } = useContext(AlbumsContext);

  const { location } = useHistory();

  useEffect(() => {
    const collectionId = location.pathname.replace('/music/', '');
    setAlbumId(collectionId);
  }, []);

  return (
    <AlbumFullPage />
  );
}

export default AlbumInterface;
