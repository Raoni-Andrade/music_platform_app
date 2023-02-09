// import AlbumsList from '../components/AlbumsList';
// import Header from '../components/Header';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumsContext from '../context/AlbumsContext';
import SearchFullPage from './SearchFullPage';

function SearchInterface() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    // isLoading,
    // setIsLoading,
    artistName,
    setArtistName,
    searchInput,
    setSearchInput,
    albumName,
    setAlbumName,
    artUrl,
    setArtUrl,
    songs,
    setSongs,
    albumsFromArtist,
    setAlbumsFromArtist,
  } = useContext(AlbumsContext);

  const fetchArtist = async () => {
    // const { history } = this.props;

    setIsLoading(true);

    const albumsFound = await searchAlbumsAPI(searchInput);
    setAlbumsFromArtist(albumsFound);
    setIsLoading(false);
    setSearchInput('');
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  const enableButton = () => {
    const min = 2;
    return searchInput.length >= min;
  };

  const handleArtist = (event) => {
    setArtistName(event.target.value);
    setSearchInput(event.target.value);
  };

  return (
    <SearchFullPage />
  );
}

export default SearchInterface;
