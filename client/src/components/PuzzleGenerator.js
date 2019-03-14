import React, {Component}  from 'react';
import {Row,Col,Button,Input} from 'reactstrap'
import PuzzleGenerator from '../generators/puzzle';

class PuzzleGenerator extends Component {
    constructor(){
        super();
        this.state = {hiddenWord:{word:"",words:[],hints:[],answers:[]},word:"",cipher:"pigpen"};
        this.PuzzleGenerator = new PuzzleGenerator();
    }

    handleWordClick = (e) => {
        let hiddenWord = this.state.hiddenWord;
        this.props.handleOutputChange(this.PuzzleGenerator.generateWord('hidden',hiddenWord))
    }

    handleRiddleClick = (e) => {
        this.props.handleOutputChange(this.PuzzleGenerator.generateWord('riddle'))
    }

    handleCipherClick = (e) => {
        this.props.handleOutputChange(this.PuzzleGenerator.generateCipher(this.state.cipher))
    }

    render() {
        switch(this.props.puzzleType){
            case 'Hidden Word':
                return (
                    <Row>
                        <Col>
                            <Input type="text" name='hiddenWord' id='hiddenWord' placeholder='hidden word' value={this.state.hiddenWord.word} onChange={this.handleChange}></Input>
                            <Button onClick={this.handleWordClick} color="primary">Generate Hidden Word</Button>
                        </Col>
                    </Row>
                )
            case 'Riddle':
                return (
                    <Row>
                        <Col>
                            <Button onClick={this.handleRiddleClick} color="primary">Generate Random Riddle</Button>
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
                            <Button onClick={this.handleCipherClick} color="primary">Generate Cipher</Button>
                        </Col>
                    </Row>
                )
            default:
                return null;
        }

    }
};

export default PuzzleGenerator;