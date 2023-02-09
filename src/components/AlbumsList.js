/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumsList extends React.Component {
  render() {
    const { artistAlbums } = this.props;
    return (
      <>
        {/* { artistAlbums === [] ? &apos;Nenhum álbum foi encontrado&apos;
        : ( */}
        <div>
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {artistAlbums.map((album) => (
              <li key={ album.collectionId } className="relative">
                <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <img className="pointer-events-none object-cover group-hover:opacity-75" src={ album.artworkUrl100 } alt={ album.collectionName } />
                  {album.collectionName}
                  {album.artistName}
                  <Link
                    to={ `/music/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      More info here
                    </span>
                  </Link>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{album.collectionName}</p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">{album.artistName}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

AlbumsList.propTypes = {
  artistAlbums: PropTypes.arrayOf.isRequired,
};
export default AlbumsList;
