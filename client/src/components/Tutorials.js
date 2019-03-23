import React, {Component}  from 'react';
import YouTubePlaylist from 'react-youtube-playlist';

class Tutorials extends Component {
    render() {
        return (
            <YouTubePlaylist
                width={'100%'}
                height={'70%'}
                api_key={process.env.REACT_APP_YOUTUBE_API_KEY}
                playlist_id="PLWRRwFEmEuDKX5sobzWeb50xD14cpfkk3"
                scrolling={"auto"}
            />
        )
    }
};

export default Tutorials;