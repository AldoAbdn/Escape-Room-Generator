import React, {Component}  from 'react';
import {Row,Col,Button,Input} from 'reactstrap'
import lockGen from '../../../client/src/generators/LockGenerator';
import PropTypes from 'prop-types';

/**
 * Class for Lock Generator
 * @extends Component
 * @author Alistair Quinn
 */
class LockGenerator extends Component {
    /** Creates LockGenerator */
    constructor(){
        super();
        this.state={length:1,wordsPerString:1}
        this.lockGenerator = new lockGen();
    }

    /**
     * Handles Input Change
     * @function
     * @param {Event} e
     */
    handleChange = (e) => { 
        let state = {};
        state[e.target.name] = e.target.value;  
        this.setState(state);
    }

    /**
     * Handles Numeric Lock Click
     * @function
     * @param {Event} e
     */
    handleNumericClick = (e) => {
        let output = this.lockGenerator.generateNumericCombination(this.state.length);
        this.props.handleOutputChange(output);
    }

    /**
     * Handles Word Lock Click
     * @function
     * @param {Event} e
     */
    handleWordClick = (e) => {
        let output = this.lockGenerator.generateWords(this.state.length,this.state.wordsPerString);
        this.props.handleOutputChange(output);
    }

    /**
     * Handles Directional Lock Click
     * @function
     * @param {Event} e
     */
    handleDirectionalClick = (e) => {
        let output = this.lockGenerator.generateDirectionSequence(this.state.length);
        this.props.handleOutputChange(output);
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        switch(this.props.lockType){
            case 'Numeric':
                return (
                    <Row>
                        <Col>
                            <Input name="length" placeholder="length" type="number" step="1" min="1" value={this.state.length} onChange={this.handleChange}/>
                            <Button block onClick={this.handleNumericClick} color="primary">Generate Random Number</Button>
                        </Col>
                    </Row>
                )
            case 'Word':
                return (
                    <Row>
                        <Col>
                            <Input name="length" placeholder="length" type="number" step="1" min="1" value={this.state.length} onChange={this.handleChange}/>
                            <Input name="wordsPerString" placeholder="words per string" type="number" step="1" min="1" value={this.state.wordsPerString} onChange={this.handleChange}/>
                            <Button block onClick={this.handleWordClick} color="primary">Generate Words</Button>
                        </Col>
                    </Row>
                )
            case 'Directional':
                return (
                    <Row>
                        <Col>
                            <Input name="length" placeholder="length" type="number" step="1" min="1" value={this.state.length} onChange={this.handleChange}/>
                            <Button block onClick={this.handleDirectionalClick} color="primary">Generate Directional Sequence</Button>
                        </Col>
                    </Row>
                )
            default:
                return null;
            
        }
    }
};

LockGenerator.propTypes = {
    handleOutputChange: PropTypes.func,
    lockType: PropTypes.string,
}

export default LockGenerator;