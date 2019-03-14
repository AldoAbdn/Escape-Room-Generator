import React, {Component}  from 'react';
import {Row,Col,Button,Input} from 'reactstrap'
import lockGen from '../generators/lock';

class LockGenerator extends Component {
    constructor(){
        super();
        this.state={length:1,wordsPerString:1}
        this.lockGenerator = new lockGen();
    }

    handleChange = (event) => { 
        let state = {};

        state[event.target.name] = event.target.value;  
        console.log(state);
        this.setState(state);
    }

    handleNumericClick = (e)=>{
        let output = this.lockGenerator.generateNumericCombination(this.state.length);
        this.props.handleOutputChange(output);
    }

    handleWordClick = (e) => {
        console.log(this.state.length);
        let output = this.lockGenerator.generateWords(this.state.length,this.state.wordsPerString);
        this.props.handleOutputChange(output);
    }

    handleDirectionalClick = (e) => {
        let output = this.lockGenerator.generateDirectionSequence(this.state.length);
        this.props.handleOutputChange(output);
    }

    render() {
        switch(this.props.lockType){
            case 'Numeric':
                return (
                    <Row>
                        <Col>
                            <Input name="length" placeholder="length" type="number" step="1" min="1" value={this.state.length} onChange={this.handleChange}/>
                            <Button onClick={this.handleNumericClick} color="primary">Generate Random Number</Button>
                        </Col>
                    </Row>
                )
            case 'Word':
                return (
                    <Row>
                        <Col>
                            <Input name="length" placeholder="length" type="number" step="1" min="1" value={this.state.length} onChange={this.handleChange}/>
                            <Input name="wordsPerString" placeholder="words per string" type="number" step="1" min="1" value={this.state.wordsPerString} onChange={this.handleChange}/>
                            <Button onClick={this.handleWordClick} color="primary">Generate Words</Button>
                        </Col>
                    </Row>
                )
            case 'Directional':
                return (
                    <Row>
                        <Col>
                            <Input name="string" placeholder="length" type="number" step="1" min="1" value={this.state.length} onChange={this.handleChange}/>
                            <Button onClick={this.handleDirectionalClick} color="primary">Generate Directional Sequence</Button>
                        </Col>
                    </Row>
                )
            default:
                return null;
            
        }
    }
};

export default LockGenerator;