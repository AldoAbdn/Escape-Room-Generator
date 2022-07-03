import React, {Component}  from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import PropTypes from 'prop-types';

/** 
 * Class for Pallet 
 * @extends Component
 * @author Alistair Quinn 
 */
class EscapeRoomRunner extends Component {
    constructor(props){
        super();
        this.state = {paused:true, time:props.time * 60}; // Change time from minutes to seconds
        this.music = new Audio(props.music);
        this.music.loop = true;
        this.hintSound = new Audio(props.hint);
    }

    /**
     * React Lifecycle Methods
     */
    componentWillUnmount(){
        this.music.pause();
    }

    /**
     * Handles Timer Toggle
     */
    handleTimerToggle = ()=>{
        if(this.state.paused){
            this.timerInterval = setInterval(this.timer, 1000);
            this.music.play();
        }
        else {
            clearInterval(this.timerInterval);
            this.music.pause();
        }
        this.setState({paused:!this.state.paused});
    }

    /**
     * Decrements timer by 1 second
     */
    timer = () => {
        if(this.state.time>0)
            this.setState({time:this.state.time-1});
        else 
            this.setState({paused:true});
    }

    /**
     * Handles Timer Toggle
     */
    handleHintSound = ()=>{
        this.hintSound.play();
    }

    /**M
     * Handles Timer Toggle
     */
    handleMusicMute = ()=>{
        this.music.muted = !this.music.muted;
    }
    
    /**
     * React lifecycle method 
     * Renders layout
     * @returns {JSX}
     */
    render() {
        // Get Time in a better format for display
        let date = new Date(null);
        date.setSeconds(this.state.time);
        return (
            <Container fluid 
            style={{
                height:"100%", 
                backgroundImage:`url(${this.props.background})`, 
                backgroundSize:"cover",
                color: "#fff",
                textShadow:"4px 0 0 #000, 0 -4px 0 #000, 0 4px 0 #000, -4px 0 0 #000"
            }}>
                <Row>
                    <Col className="col text-center">
                        <h1 style={{fontSize:"4rem"}}>{this.props.name}</h1>
                    </Col>
                </Row>
                <Row style={{height:"60%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Col className="col text-center">
                        <span id="time" style={{width:"100%", "fontSize":"20vw"}}>
                            {date.toISOString().substr(11, 8)}
                        </span>
                    </Col>
                </Row>
                <Row style={{height:"20%"}}>
                    <Col className="col text-center">
                        <Input type="textarea" id="hint" style={{width:"100%", height:"100%", fontSize:"2rem"}}
                        defaultValue="Welcome to the escape room runner! Use this space to type hints to your players. You can use chromecast or other screen sharing options to display this timer. To start the timer press 'SHIFT+SPACEBAR', to play a hint sound press 'CTRL+SPACEBAR' and to mute music press 'SHIFT+M'. REMEMBER TO CLEAR THIS TEXT BOX BEFORE STARTING. Enjoy your game!"/>
                    </Col>
                </Row>
                <KeyboardEventHandler handleKeys={['shift+space']} onKeyEvent={(key,e)=>this.handleTimerToggle()}/>
                <KeyboardEventHandler handleKeys={['ctrl+space']} onKeyEvent={(key,e)=>this.handleHintSound()}/>
                <KeyboardEventHandler handleKeys={['shift+m']} onKeyEvent={(key,e)=>this.handleMusicMute()}/>
            </Container>
        )
    }
};

EscapeRoomRunner.propTypes = {
    name: PropTypes.string,
    time: PropTypes.number,
    background: PropTypes.string,
    music: PropTypes.string,
    hint: PropTypes.string,
}

EscapeRoomRunner.defaultProps = {
    name:"Unnamed",
    time: 60,
    background:"/images/backgrounds/main.jpg",
    music:"https://cdn.bensound.com/bensound-wildwildtown.mp3",
    hint:"/sounds/hint.wav"
}

export default EscapeRoomRunner;