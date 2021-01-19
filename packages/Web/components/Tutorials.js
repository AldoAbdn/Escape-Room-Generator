import React, {Component}  from 'react';
import YouTubePlaylist from 'react-youtube-playlist';
import '../styles/Tutorials.css';

/**
 * Class for Tutorials
 * @extends Component
 * @author Alistair Quinn
 */
class Tutorials extends Component {
    /** 
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <YouTubePlaylist
                width={'100%'}
                height={'70%'}
                api_key={process.env.REACT_APP_YOUTUBE_API_KEY}
                playlist_id={process.env.REACT_APP_TUTORIALS_PLAYLIST_ID}
                scrolling={"auto"}
            />
        )
    }
};

export default Tutorials;