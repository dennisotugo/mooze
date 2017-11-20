import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './AudioPlayer.css';

class AudioPlayer extends PureComponent {
  static propTypes = {
    songs: PropTypes.array.isRequired,
    autoplay: PropTypes.bool,
    onTimeUpdate: PropTypes.func,
    onEnded: PropTypes.func,
    onError: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
  };

  static defaultProps = {
    onTimeUpdate: () => {},
    onEnded: () => {},
    onError: () => {},
    onPlay: () => {},
    onPause: () => {},
    onPrevious: () => {},
    onNext: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      active: props.songs[0],
      songs: props.songs,
      current: 0,
      progress: 0,
      random: false,
      playing: !!props.autoplay,
      repeat: true,
      mute: false,
    };

    this.audio = document.createElement('audio');
    this.audio.src = this.state.active.url;
    this.audio.autoplay = !!this.state.autoplay;

    this.audio.addEventListener('timeupdate', e => {
      this.updateProgress();

      props.onTimeUpdate(e);
    });
    this.audio.addEventListener('ended', e => {
      this.next();

      props.onEnded(e);
    });
    this.audio.addEventListener('error', e => {
      this.next();

      props.onError(e);
    });
  }

  shuffle = arr => arr.sort(() => Math.random() - 0.5);

  updateProgress = () => {
    const { duration, currentTime } = this.audio;
    const progress = (currentTime * 100) / duration;

    this.setState({
      progress: progress,
    });
  };

  setProgress = e => {
    const target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    const width = target.clientWidth;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const duration = this.audio.duration;
    const currentTime = (duration * offsetX) / width;
    const progress = (currentTime * 100) / duration;

    this.audio.currentTime = currentTime;

    this.setState({
      progress: progress,
    });

    this.play();
  };

  play = () => {
    this.setState({
      playing: true,
      repeat: true,
    });

    this.audio.play();

    this.props.onPlay();
  };

  pause = () => {
    this.setState({
      playing: false,
    });

    this.audio.pause();

    this.props.onPause();
  };

  toggle = () => this.state.playing ? this.pause() : this.play();

  next = () => {
    const { repeat, current, songs } = this.state;
    const total = songs.length;
    const newSongToPlay = repeat 
                          ? current 
                          : current < total - 1 
                            ? current + 1 
                            : 0;
    const active = songs[newSongToPlay];

    this.setState({
      current: newSongToPlay,
      active: active,
      progress: 0,
      repeat: false,
    });

    this.audio.src = active.url;
    this.play();
    this.props.onNext();
  };

  previous = () => {
    const { current, songs } = this.state;
    const total = songs.length;
    const newSongToPlay = current > 0 ? current - 1 : total - 1;
    const active = songs[newSongToPlay];

    this.setState({
      current: newSongToPlay,
      active: active,
      progress: 0,
    });

    this.audio.src = active.url;
    this.play();
    this.props.onPrevious();
  };

  randomize = () => {
    const { random, songs } = this.state;
    const shuffled = this.shuffle(songs.slice());

    this.setState({
      songs: !random ? shuffled : songs,
      random: !random,
    });
  };

  repeat = () =>
    this.setState({
      repeat: !this.state.repeat,
    });

  toggleMute = () => {
    const { mute } = this.state;

    this.setState({
      mute: !mute,
    });

    this.audio.volume = !!mute;
  };

  render() {
    const { 
      active: currentSong,
      active,
      playing,
    } = this.state;

    const coverClass = classnames({
      'player-cover': false,
      'no-height': !!active.cover === true,
    });

    const playPauseClass = classnames({
      'fa': true,
      'fa-play': !playing,
      'fa-pause': playing,
    });

		return (
      <div className="player-container">

        <div className={coverClass} style={{backgroundImage: `url(${currentSong.cover || ''})`}}></div>

        <div className="artist-info">
          <h2 className="artist-name">{currentSong.artist.name}</h2>
        </div>

        <div className="player-options">
          <div className="player-buttons player-controls">
            <button
              onClick={this.previous}
              className="player-btn small"
              title="Previous Song"
            >
              <i className="fa fa-backward"></i>
            </button>
             <button
              onClick={this.toggle}
              className="player-btn medium"
              title="Play/Pause"
            >
              <i className={playPauseClass}></i>
            </button>
            <button
              onClick={this.next}
              className="player-btn small"
              title="Next Song"
            >
              <i className="fa fa-forward"></i>
            </button>
          </div>
        </div>

      </div>
    );
	}
}

export default AudioPlayer;
