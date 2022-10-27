import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumsList extends React.Component {
  render() {
    const { artistAlbums } = this.props;
    return (
      artistAlbums === [] ? 'Nenhum álbum foi encontrado'
        : (
          <div>
            {artistAlbums.map((album) => (
              <div key={ album.collectionId }>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                {album.collectionName}
                {album.artistName}
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  More info here
                </Link>
              </div>
            ))}
          </div>
        )
    );
  }
}

AlbumsList.propTypes = {
  artistAlbums: PropTypes.arrayOf.isRequired,
};
export default AlbumsList;
