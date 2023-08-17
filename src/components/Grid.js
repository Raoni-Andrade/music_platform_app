import { useContext } from 'react';
import MusicCardTail from './MusicCardTail';
import AlbumsContext from '../context/AlbumsContext';

export default function Grid() {
  const {
    songs,
  } = useContext(AlbumsContext);
  // console.log(songs);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {songs.map((song) => (
        <div
          key={ song.trackId }
          className="relative flex items-center space-x-3 rounded-lg border
          border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2
          focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          song={ song }
        >
          <div className="min-w-0 flex-1">
            <MusicCardTail key={ song.trackId } song={ song } />
          </div>
        </div>
      ))}
    </div>
  );
}
