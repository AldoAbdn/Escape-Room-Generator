import React, {Component}  from 'react';
import YouTubePlaylist from 'react-youtube-playlist';
import '../styles/Tutorials.css';

class Tutorials extends Component {
    render() {
        return (
            <YouTubePlaylist
                width={'100%'}
                height={'70%'}
                api_key={process.env.REACT_APP_YOUTUBE_API_KEY}
                playlist_id={process.env.REACT_APP_TUTORIALS_PLAYLIST_URL}
                scrolling={"auto"}
            />
        )
    }
};

export default Tutorials;