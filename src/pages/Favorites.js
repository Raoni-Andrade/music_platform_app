import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesList: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.showFavoritesList();
  }

  showFavoritesList = async () => {
    let favoritesList = await getFavoriteSongs();

    if (favoritesList === undefined) {
      favoritesList = [];
    }
    this.setState({
      favoritesList,
      isLoading: false,
    });
  };

  updateFavoriteList = () => {
    this.showFavoritesList();
  };

  // updateFavoritesList = (music) => {
  //   const { favoritesList } = this.state;
  //   const updatedList = favoritesList
  //     .filter((song) => song.trackId !== music.trackId);
  //   this.setState({
  //     favoritesList: updatedList,
  //   });
  // };

  render() {
    const { favoritesList, isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {
            isLoading ? <Loading /> : (
              <div>
                {
                  favoritesList.map((song) => (
                    <MusicCard
                      key={ song.trackId }
                      song={ song }
                      update={ this.updateFavoriteList }
                    />
                  ))
                }
              </div>
            )
          }
        </div>
      </>
    );
  }
}

export default Favorites;
