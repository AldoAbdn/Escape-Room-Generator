import React, {Component}  from 'react';
import { Container, Row, Col, Input, Label, Button } from 'reactstrap';
import { LockGenerator, PuzzleGenerator, AccessibilityWarning, Relationships } from '../../../client/src/components/index';
import PropTypes from 'prop-types';
import '../styles/ComponentDetails.css';
import Accessibility from './Accessibility';

/** 
 * Class for Component Details allows editing of a components details
 * @extends Component 
 * @author Alistair Quinn
 */
class ComponentDetails extends Component {
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
     * Handles Output change
     * @param {string} event
     */
    handleOutputChange = (output)=>{
        this.props.updateComponent({output});
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
        this.forceUpdate();
    }

    /** Generates Output from Inputs */
    generateFromInputs=()=>{
        this.props.updateComponent({_id:this.props.selected._id,output:this.props.calculateOutput(this.props.selected._id)})
    }

    /**
     * Maps Details to Inputs
     * @param {string} key
     * @param {int} i index
     * @returns {JSX}
     */
    mapDetailToInput = (key,i) => {
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
        } else if (key==='lockType'){
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
        } else if (key==='eventType'){
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
        } else if (key==='puzzleType'){
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
        } else if (key==='puzzle'){
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
        }else if(typeof this.props.selected[key] === "string" && key!=="_id" && key!=="type" && key!=="version"){
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
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        let component = this.props.selected;
        let id="";
        let type="";
        let properties;
        if(component!==undefined && component!==null){
            // Properties
            if(component._id!==undefined)
                id = " ("+component._id+")";
            properties = Object.keys(component).map(this.mapDetailToInput)
            type = component.type||"";
        }
        if(this.props.selected===null)
            return (
                <Container fluid className="container-fluid component-details">
                    <Col className="col text-center">
                        <h3>Details</h3>
                    </Col>
                </Container>
            )
        else
            return (
                <Container fluid className="container-fluid component-details">
                    <Row>
                        <Col className="col text-center">
                            <h3>Details</h3>
                            <h4>{type + id}</h4>
                        </Col>
                    </Row>
                    <AccessibilityWarning accessibility={this.props.accessibility}/>
                    {properties}
                    <Relationships selected={this.props.selected} updateComponent={this.props.updateComponent}/>
                </Container>
            )
    }
};

ComponentDetails.propTypes = {
    calculateOutput: PropTypes.func,
    accessibility: PropTypes.instanceOf(Accessibility),
    selected: PropTypes.instanceOf(Component),
    updateComponent: PropTypes.func
}

export default ComponentDetails;