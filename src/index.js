import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AudioPlayer from './AudioPlayer';
import registerServiceWorker from './registerServiceWorker';

const songs = [
  {
    url: './fire.mp3',
    artist: {
      name: 'Fireplace'
    }
  },
  {
    url: './rain.mp3',
    artist: {
      name: 'Rainy'
    }
  },
  {
    url: './wind.mp3',
    artist: {
      name: 'Wind'
    }
  },
  {
    url: './coffee.mp3',
    artist: {
      name: 'Cafe'
    }
  },
  {
    url: './night.mp3',
    artist: {
      name: 'Night'
    }
  },
  {
    url: './static.mp3',
    artist: {
      name: 'Static'
    }
  }
];

ReactDOM.render(<AudioPlayer songs={songs} />, document.getElementById('root'));
registerServiceWorker();
