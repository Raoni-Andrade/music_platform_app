/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3BottomLeftIcon,
  BellIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useHistory } from 'react-router-dom';
import LoginBackground from '../images/LoginBackground.svg';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import AlbumsContext from '../context/AlbumsContext';
import Grid from '../components/Grid';

const navigation = [
  { name: 'Search', href: '/test', icon: FolderIcon, current: false },
  { name: 'Favorites', href: '/favorites', icon: ChartBarIcon, current: false },
  { name: 'Profile', href: '/profile', icon: UsersIcon, current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Favorites', href: '/favorites' },
  { name: 'Sign out', href: '/' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function AlbumFullPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { location } = useHistory();

  const {
    isLoading,
    setIsLoading,
    artistName,
    setArtistName,
    searchInput,
    setSearchInput,
    albumName,
    setAlbumName,
    artUrl,
    setArtUrl,
    setSongs,
    albumId,
  } = useContext(AlbumsContext);

  const handleArtist = (event) => {
    setArtistName(event.target.value);
    setSearchInput(event.target.value);
  };

  const fetchArtist = async () => {
    setIsLoading(true);

    const albumsFound = await searchAlbumsAPI(searchInput);
    setAlbumName(albumsFound);
    setIsLoading(false);
    setSearchInput('');
    // console.log('albumsFound', albumsFound);
    // console.log('albumName', albumName);
  };

  // const gettingAlbumId = () => {
  const collectionId = location.pathname.replace('/music/', '');
  // console.log(albumId);
  // setAlbumId(collectionId);
  //   return collectionId;
  // };

  const songsFromAlbum = async () => {
    // const { match: { params } } = props;
    // const { id } = params;
    // const magic = 588335548;
    // const something = albumsFromArtist.map((album) => console.log(album.collectionId) ));

    const results = await getMusics(collectionId);
    setSongs(results.filter((song, index) => index > 0));
    // const rolha = results.map((song, index) => (
    //   console.log(song, index)
    // setArtistName(song[index].artistName),
    // setAlbumName(song[index].collectionName),
    // setArtUrl(song[index].artworkUrl100),
    // setAlbumId(song[index].collectionId)
    // ));
    // songs,
    setArtistName(results[0].artistName);
    setAlbumName(results[0].collectionName);
    setArtUrl(results[0].artworkUrl100);
    // setAlbumId(results[0].collectionId);
    // fetchDone: true,
    // console.log(rolha);
    // console.log(results);
    // console.log(albumName);
    // console.log(artUrl);
  };
  // console.log('SONGS: ', songs);

  useEffect(() => {
    songsFromAlbum();
  }, []);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={ sidebarOpen } as={ Fragment }>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={ setSidebarOpen }>
            <Transition.Child
              as={ Fragment }
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={ Fragment }
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={ Fragment }
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={ () => setSidebarOpen(false) }
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src={ LoginBackground }
                      alt="Logo TrybeTunes"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={ item.name }
                          href={ item.href }
                          className={ classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                          ) }
                        >
                          <item.icon
                            className={ classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6',
                            ) }
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-13 w-auto"
                src={ LoginBackground }
                alt="Logo TrybeTunes"
              />
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                  <a
                    key={ item.name }
                    href={ item.href }
                    className={ classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    ) }
                  >
                    <item.icon
                      className={ classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6',
                      ) }
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={ () => setSidebarOpen(true) }
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <label htmlFor="artist">
                      <input
                        placeholder="type an artist to check 'em out!"
                        id="artist"
                        data-testid="search-artist-input"
                        className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                        type="text"
                        name="text"
                        onChange={ handleArtist }
                        value={ searchInput }
                      />
                    </label>
                  </div>
                  <button
                    className="searchBtn inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    type="button"
                    // disabled={ !this.enableButton() }
                    data-testid="search-artist-button"
                    onClick={ fetchArtist }
                  >
                    Search
                  </button>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={ Fragment }
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={ item.name }>
                          {({ active }) => (
                            <a
                              href={ item.href }
                              className={ classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              ) }
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              {/* Replace with your content */}
              <section>
                {isLoading && <Loading />}

                <div className="py-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200">
                    <div data-testid="page-album">
                      <div>
                        <div>
                          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            {<li key={ albumId } className="relative">
                              <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                <img src={ artUrl } alt={ albumName } className="pointer-events-none object-cover group-hover:opacity-75" />
                                <button type="button" className="absolute inset-0 focus:outline-none">
                                  <span className="sr-only">
                                    View details for
                                    {' '}
                                    Raoni
                                    {/* {file.title} */}
                                  </span>
                                </button>
                              </div>
                              <h2 data-testid="album-name" className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{albumName}</h2>
                              <h3 data-testid="artist-name" className="pointer-events-none block text-sm font-medium text-gray-500">{artistName}</h3>
                            </li>}
                          </ul>
                        </div>
                        <ul role="list" className="space-y-3">
                          <Grid />
                          {/* {songs.map((song) => (
                            <li key={ song.trackId } className="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
                              <MusicCardTail key={ song.trackId } song={ song } />
                            </li>
                          ))} */}
                        </ul>
                        <div className="overflow-hidden bg-white shadow sm:rounded-md" />
                      </div>
                    </div>
                    {/* <Search /> */}
                    {/* <Favorites /> */}
                  </div>
                </div>
                {/* /End replace */}
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

AlbumFullPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default AlbumFullPage;
