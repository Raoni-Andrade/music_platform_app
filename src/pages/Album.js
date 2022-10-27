import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      fetchDone: false,
    };
  }

  componentDidMount() {
    this.songsFromAlbum();
  }

  songsFromAlbum = async () => {
    const { match: { params } } = this.props;
    const { id } = params;
    const results = await getMusics(id);
    const songs = results.filter((song, index) => index > 0);
    this.setState({
      songs,
      artistName: results[0].artistName,
      albumName: results[0].collectionName,
      fetchDone: true,
    });
    console.log(songs);
  };

  render() {
    const { songs, fetchDone, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>
          Album
        </h1>
        { fetchDone && (
          <div>
            <img
              src={ songs[0].artworkUrl100 }
              alt={ songs[0].collectionName }
            />
            <h2 data-testid="album-name">
              { albumName }
            </h2>
            <h3 data-testid="artist-name">
              { artistName }
            </h3>
            {songs.map((song) => (<MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewURL={ song.previewURL }
            />))}
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
  }),
}.isRequired;

export default Album;
