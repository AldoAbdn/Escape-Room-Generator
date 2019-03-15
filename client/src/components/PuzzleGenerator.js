import React, {Component}  from 'react';
import {Row,Col,Button,Input} from 'reactstrap'
import puzzleGenerator from '../generators/puzzle';
import ListCreator from '../components/ListCreator';

class PuzzleGenerator extends Component {
    constructor(){
        super();
        this.state = {word:"",words:[],hints:[],answers:[],cipher:"pigpen"};
        this.PuzzleGenerator = new puzzleGenerator();
    }

    //Changes state on input change
    handleChange = (event) => { 
        let state = {};
        state[event.target.id] = event.target.value;  
        state._id = this.props.selected._id;  
        this.props.updateComponent(state);
    }

    handleListChange = (key) => (list) => {
        this.setState({key:list});
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
                            <Input type="text" name='hiddenWord' id='hiddenWord' placeholder='hidden word' value={this.state.word} onChange={this.handleChange}></Input>
                            <ListCreator handleChange={this.handleListChange('words')}/>
                            <ListCreator handleChange={this.handleListChange('hints')}/>
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

export default PuzzleGenerator;