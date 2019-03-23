import React, {Component}  from 'react';
import YouTubePlaylist from 'react-youtube-playlist';

class Tutorials extends Component {
    render() {
        return (
            <YouTubePlaylist
                width={'85%'}
                height={'100%'}
                api_key={process.env.YOUTUBE_API_KEY}
                playlist_id="PLWRRwFEmEuDKX5sobzWeb50xD14cpfkk3"
                scrolling={true}
            />
        )
    }
};

export default Tutorials;