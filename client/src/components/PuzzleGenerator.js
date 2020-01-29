import React, {Component}  from 'react';
import {Row,Col,Button,Input} from 'reactstrap'
import puzzleGenerator from '../generators/PuzzleGenerator';
import ListCreator from '../components/ListCreator';
import PropTypes from 'prop-types';
import { Puzzle } from '../puzzles';

class PuzzleGenerator extends Component {
    constructor(){
        super();
        this.state = {word:"",words:[],hints:[],answers:[],cipher:"pigpen"};
        this.PuzzleGenerator = new puzzleGenerator();
    }

    //Changes state on input change
    handleChange = (event) => { 
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleListChange = (key) => (list) => {
        this.setState({[key]:list});
    }

    handleWordClick = (e) => {
        let options = {...this.state};
        this.props.handlePuzzleChange(this.PuzzleGenerator.generateWord('hidden',options))
    }

    handleRiddleClick = (e) => {
        this.props.handlePuzzleChange(this.PuzzleGenerator.generateWord('riddle'))
    }

    handleCipherClick = (e) => {
        this.props.handlePuzzleChange(this.PuzzleGenerator.generateCipher(this.state.cipher))
    }

    render() {
        switch(this.props.puzzleType){
            case 'Hidden Word':
                return (
                    <Row>
                        <Col>
                            <Input type="text" name='word' id='word' placeholder='hidden word'value={this.state.word} onChange={this.handleChange}></Input>
                            <p>Words</p>
                            <ListCreator handleChange={this.handleListChange('words')}/>
                            <p>Hints</p>
                            <ListCreator handleChange={this.handleListChange('hints')}/>
                            <p>Answers</p>
                            <ListCreator handleChange={this.handleListChange('answers')}/>
                            <Button block onClick={this.handleWordClick} color="primary">Generate Hidden Word</Button>
                        </Col>
                    </Row>
                )
            case 'Riddle':
                return (
                    <Row>
                        <Col>
                            <Button block onClick={this.handleRiddleClick} color="primary">Generate Random Riddle</Button>
                        </Col>
                    </Row>
                )
            case 'Cipher':
                return (
                    <Row>
                        <Col>
                            <Input type="select" name="cipher" id="cipher" placeholder="cipher" value={this.state.cipher} onChange={this.handleChange}>
                                <option>pigpen</option>
                            </Input>
                            <Button block onClick={this.handleCipherClick} color="primary">Generate Cipher</Button>
                        </Col>
                    </Row>
                )
            default:
                return null;
        }

    }
};

PuzzleGenerator.propTypes = {
    puzzleType: PropTypes.string,
    handlePuzzleChange: PropTypes.func,
}

export default PuzzleGenerator;