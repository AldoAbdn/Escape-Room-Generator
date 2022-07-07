import React, {Component}  from 'react';
import { Container, Row, Col, Label, Input, Button } from 'reactstrap';
import { LockGenerator, PuzzleGenerator, ImageManager } from './index'
import PropTypes from 'prop-types';

/** 
 * Class for Not Found 
 * @extends Component
 * @author Alistair Quinn 
 */
class Properties extends Component {
    /**
     * Converts a string to Camel Case
     * @param {string} string 
     * @returns {string} 
     */
    convertCamelCase(string){
        if(typeof string !== 'string')
            string = string.toString();
        return string.replace(/([A-Z])/g, ' $1').replace(/^./,(str)=>{ return str.toUpperCase(); })
    }

    /** Generates Output from Inputs */
    generateFromInputs=()=>{
        this.props.updateComponent({_id:this.props.selected._id,output:this.props.calculateOutput(this.props.selected._id)})
    }

    /**
     * Handles Puzzle change
     * @param {Puzzle} puzzle
     */
    handlePuzzleChange = (puzzle)=>{
        if(puzzle.output===undefined){
            puzzle.output = "";
        } 
        this.props.updateComponent({_id:this.props.selected._id,puzzle,output:puzzle.output});
    }

    /**
     * Handles Output change
     * @param {string} event
     */
    handleOutputChange = (output)=>{
        this.props.updateComponent({output});
    }

    /**
     * Handles Images Change
     * @param {Array} images 
     */
    handleImagesChange = (images)=>{
        this.props.updateComponent({images});
    }

    /** 
     * Handles input change 
     * @param {Event} event
     * */
     handleChange = (event) => { 
        let state = {};
        state[event.target.id] = event.target.value;  
        if(event.target.id==="puzzleType")
            state.puzzle = {}
        if(event.target.id==="lockType")
            state.output = ""
        state._id = this.props.selected._id;  
        this.props.updateComponent(state);
    }

    /**
     * Maps Details to Inputs
     * @param {string} key
     * @param {int} i index
     * @returns {JSX}
     */
     mapPropertyToInput = (key,i) => {
        if(key==='output') {
            let generator;
            if(this.props.selected.type==='Lock')
                generator = <LockGenerator lockType={this.props.selected.lockType} handleOutputChange={this.handleOutputChange}></LockGenerator>
            else if(this.props.selected.type==='Puzzle') {
                generator = <PuzzleGenerator puzzleType={this.props.selected.puzzleType} handlePuzzleChange={this.handlePuzzleChange}></PuzzleGenerator>
            }
            return (<Row key={i}>
                <Col>
                    <Label for={key}>{this.convertCamelCase(key)}</Label>
                    <Input type="text" name={key} id={key} placeholder={this.convertCamelCase(key)} value={this.props.selected[key]} onChange={this.handleChange}/>
                    <Button block color="primary" onClick={this.generateFromInputs}>Generate From Inputs</Button>
                    <br/>
                    {generator}
                    <br/>
                </Col>
            </Row>)
        } else if(key==='lockType'){
            return (
                <Row key={i}>
                    <Col>
                        <Label for={key}>{this.convertCamelCase(key)}</Label>
                        <Input type="select" name={key} id={key} placeholder={this.convertCamelCase(key)} value={this.props.selected[key]} onChange={this.handleChange}>
                            <option>Numeric</option>
                            <option>Word</option>
                            <option>Directional</option>
                            <option>Contactless</option>
                            <option>Key</option>
                        </Input>
                    </Col>
                </Row>
            )
        } else if(key==='eventType'){
            return (
                <Row key={i}>
                    <Col>
                        <Label for={key}>{this.convertCamelCase(key)}</Label>
                        <Input type="select" name={key} id={key} placeholder={this.convertCamelCase(key)} value={this.props.selected[key]} onChange={this.handleChange}>
                            <option>Sound Effect</option>
                            <option>New Area</option>
                            <option>Objective Complete</option>
                            <option>Custom</option>
                        </Input>
                    </Col>
                </Row>
            )
        } else if(key==='puzzleType'){
            return (
                <Row key={i}>
                    <Col>
                        <Label for={key}>{this.convertCamelCase(key)}</Label>
                        <Input type="select" name={key} id={key} placeholder={this.convertCamelCase(key)} value={this.props.selected[key]} onChange={this.handleChange}>
                            <option>Cipher</option>
                            <option>Word</option>
                            <option>Colour</option>
                            <option>Hidden Word</option>
                            <option>Hidden Object</option>
                            <option>Riddle</option>
                            <option>Custom</option>
                        </Input>
                    </Col>
                </Row>
            )
        } else if(key==='puzzle'){
            let component = this.props.selected;
            let details = Object.keys(component[key]).map((property,index,array)=>{
                let detail;
                if(property.includes('DATA')){
                    detail = "Export as PDF to View";
                }else if(typeof component[key][property] === 'object')
                    detail = JSON.stringify(component[key][property]);
                else{
                    detail = component[key][property];
                } 
                return(
                <Row key={property} id={key}>
                    <Col>
                        <p>{" " + this.convertCamelCase(property) + ": "+this.convertCamelCase(detail)}</p>
                    </Col>
                </Row>
                )
            });
            if(Object.keys(component[key]).length>0){
                return (
                    <Row key={i}>
                        <Col>
                            <Label>{this.convertCamelCase(key)}</Label>
                            {details}
                        </Col>
                    </Row>
                )
            }else{
                return null;
            } 
        } else if(key==='estimatedCost'){
            return (
                <Row key={i}>
                    <Col>
                        <Label for={key}>{this.convertCamelCase(key)}</Label>
                        <Input type="number" min="0" step="0.01" pattern="^\d*(\.\d{0,2})?$" name={key} id={key} placeholder={this.convertCamelCase(key)} value={this.props.selected[key]} onChange={this.handleChange}/>
                    </Col>
                </Row>)
        } else if(key==='images'){
            return(<ImageManager images={this.props.selected[key]} handleChange={this.handleImagesChange}/>)
        } else if(typeof this.props.selected[key] === "string" && key!=="_id" && key!=="type" && key!=="version"){
            return (
                <Row key={i}>
                    <Col>
                        <Label for={key}>{this.convertCamelCase(key)}</Label>
                        <Input type="text" name={key} id={key} placeholder={this.convertCamelCase(key)} value={this.props.selected[key]} onChange={this.handleChange}/>
                    </Col>
                </Row>)
        }
    }

    /**
     * React lifecycle method 
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <Container>
                {Object.keys(this.props.selected).map(this.mapPropertyToInput)}
            </Container>
        )
    }
};

Properties.propTypes = {
    selected: PropTypes.instanceOf(Component),
    updateComponent: PropTypes.func,
    calculateOutput: PropTypes.func,
}

export default Properties;