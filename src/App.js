import React from 'react';
// import Login from './pages/Login';
// import Header from './components/Header';
import Routes from './pages/Routes';
// import Search from './pages/Search';
// import Album from './pages/Album';
// import Favorites from './pages/Favorites';
// import Profile from './pages/Profile';
// import ProfileEdit from './pages/ProfileEdit';
// import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <Routes />
      </div>
    );
  }
}

export default App;
