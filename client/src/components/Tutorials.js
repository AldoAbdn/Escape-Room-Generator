import React, {Component}  from 'react';
import YouTubePlaylist from 'react-youtube-playlist';
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import config from '../config.json';

class Tutorials extends Component {
    render() {
        return (
            <YouTubePlaylist
                width={'85%'}
                height={'100%'}
                api_key={config.youtubeAPIKey}
                playlist_id="PLWRRwFEmEuDKX5sobzWeb50xD14cpfkk3"
                scrolling={true}
            />
        )
    }
};

export default Tutorials;