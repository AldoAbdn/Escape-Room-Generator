import React, {Component}  from 'react';
import {Row,Col,Button,Input} from 'reactstrap'
import puzzleGenerator from '../generators/PuzzleGenerator';
import ListCreator from '../components/ListCreator';
import PropTypes from 'prop-types';
import { Puzzle } from '../puzzles';

/** 
 * Class for PuzzleGenerator
 * @extends Component
 * @author Alistair Quinn
 */
class PuzzleGenerator extends Component {
    /** Creates PuzzleGenerator */
    constructor(){
        super();
        this.state = {word:"",words:[],hints:[],answers:[],cipher:"pigpen"};
        this.PuzzleGenerator = new puzzleGenerator();
    }

    /**
     * Handles Input Change
     * @function
     * @param {Event} e
     */
    handleChange = (e) => { 
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    /**
     * Handles List Change
     * @function
     * @param {String} key
     * @param {Array} list
     */
    handleListChange = (key) => (list) => {
        this.setState({[key]:list});
    }

    /**
     * Handles Word Puzzle Click
     * @function
     * @param {Event} e
     */
    handleWordClick = (e) => {
        let options = {...this.state};
        this.props.handlePuzzleChange(this.PuzzleGenerator.generateWord('hidden',options))
    }

    /**
     * Handles Riddle Puzzle Click
     * @function
     * @param {Event} e
     */
    handleRiddleClick = (e) => {
        this.props.handlePuzzleChange(this.PuzzleGenerator.generateWord('riddle'))
    }

    /**
     * Handles Cipher Puzzle Click
     * @function
     * @param {Event} e
     */
    handleCipherClick = (e) => {
        this.props.handlePuzzleChange(this.PuzzleGenerator.generateCipher(this.state.cipher))
    }

    /** 
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
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
}

PuzzleGenerator.propTypes = {
    puzzleType: PropTypes.string,
    handlePuzzleChange: PropTypes.func,
}

export default PuzzleGenerator;