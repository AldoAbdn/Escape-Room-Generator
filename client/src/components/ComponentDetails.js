import React, {Component}  from 'react';
import { Container, Row, Col, Input, Label, UncontrolledTooltip, ListGroupItem, Button, ListGroup } from 'reactstrap';
import {LockGenerator,PuzzleGenerator} from './index';
import '../styles/ComponentDetails.css';

class ComponentDetails extends Component {
    constructor(){
        super();
        this.state={visualWarning:false,physicalWarning:false}
    }
    toggle = (event)=>{
        this.setState({[event.target.id]:!this.state[event.target.id]});
    }
    convertCamelCase(string){
        if(typeof string !== 'string')
            string = string.toString();
        return string.replace(/([A-Z])/g, ' $1').replace(/^./,(str)=>{ return str.toUpperCase(); })
    }
    //Changes state on input change
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
    handleOutputChange = (output)=>{
        this.props.updateComponent({output});
    }
    handlePuzzleChange = (puzzle)=>{
        if(puzzle.output===undefined){
            puzzle.output = "";
        } 
        this.props.updateComponent({_id:this.props.selected._id,puzzle,output:puzzle.output});
        this.forceUpdate();
    }
    generateFromInputs=()=>{
        this.props.updateComponent({_id:this.props.selected._id,output:this.props.calculateOutput(this.props.selected._id)})
    }
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
                }else if(typeof component[key][property] === Object)
                    detail = JSON.stringify(component[key][property]);
                else{
                    detail = component[key][property];
                } 
                return(
                <Row key={key} id={key}>
                    <Col>
                        <p>{" " + this.convertCamelCase(property) + ": "+this.convertCamelCase(detail)}</p>
                    </Col>
                </Row>
                )
            });
            if(Object.keys(component[key]).length>0){
                return (
                    <Row key={key}>
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
    };
    mapKeysToRow = (property,index,array)=>{
        
    }
    handleOnClick = (id,isInput)=> (e) => {
        let component = {...this.props.selected};
        let state = {};
        state._id = component._id;
        if(isInput){
            state.inputComponents = component.inputComponents.filter(oldId => oldId!==id);
        } else {
            state.outputComponents = component.outputComponents.filter(oldId => oldId!==id);
        }
        this.props.updateComponent(state);
    }
    mapIDToP = (id,i,isInput) => {
        return (
            <ListGroupItem key={i}>
                {id}
                <Button onClick={this.handleOnClick(id,isInput)} color="danger" style={{display:'inline', position: 'absolute', right:'2px', top:'0.3rem'}}>
                    X
                </Button>
            </ListGroupItem>
        )
    }
    
    render() {
        let component = this.props.selected;
        let id="";
        let type="";
        let properties;
        let inputs;
        let outputs;
        let inputRelationships;
        let outputRelationships;
        let visualWarning;
        let physicalWarning;
        if(component!==undefined || component!==null){
            if(component._id!==undefined)
                id = " ("+component._id+")";
            else 
                id="";
            properties = Object.keys(component).map(this.mapDetailToInput)
            type = component.type||"";
            if(component.type!=='Area'&&component.inputComponents!==undefined&&component.outputComponents!==undefined&&(component.inputComponents.length>0||component.outputComponents.length>0)){
                inputs = component.inputComponents.map((id,i)=>this.mapIDToP(id,i,true));
                outputs = component.outputComponents.map((id,i)=>this.mapIDToP(id,i,false));
                inputRelationships = (
                    <Row>
                        <Col>
                            <h4>Inputs</h4>
                            <ListGroup>
                                {inputs}
                            </ListGroup>
                        </Col>
                    </Row>
                );
                outputRelationships = (
                    <Row>
                        <Col>
                            <h4>Outputs</h4>
                            <ListGroup>
                                {outputs}
                            </ListGroup>
                        </Col>
                    </Row>
                );
            }
            //Accessibility
            let visualKeys = [];
            Object.keys(this.props.accessibility.visual).forEach((key)=>{
                if(this.props.accessibility.visual[key]===true)
                    visualKeys.push(key);
            });
            if(visualKeys.length>0)
                visualWarning = (                
                <Col className="col text-center">
                    <p id="visualWarning"><i class="fa fa-wheelchair text-success"  aria-hidden="true"></i></p>  
                    <UncontrolledTooltip id="visual" target="visualWarning">
                    You selected: {visualKeys.join(',')} be careful with colour choices
                    </UncontrolledTooltip>
                </Col>
                )
            let physicalKeys = [];
            Object.keys(this.props.accessibility.physical).forEach((key)=>{
                if(this.props.accessibility.physical[key]===true)
                    physicalKeys.push(key);
            });
            if(physicalKeys.length>0)
                physicalWarning = (
                <Col className="col text-center">
                    <p id="physicalWarning"><i class="fa fa-wheelchair text-primary" id="physicalWarning" aria-hidden="true"></i></p>
                    <UncontrolledTooltip id="physical" target="physicalWarning">
                    You selected: {physicalKeys.join(',')} ensure plenty of room around puzzles and check how difficult puzzle is to handle
                    </UncontrolledTooltip>
                </Col>
                )
        }
        return (
            <Container fluid className="container-fluid component-details">
                <Row>
                    <Col className="col text-center">
                        <h3>Details</h3>
                        <h4>{type + id}</h4>
                    </Col>
                </Row>
                <Row>
                    {visualWarning}
                    {physicalWarning}
                </Row>
                {properties}
                {inputRelationships}
                {outputRelationships}
            </Container>
        )
    }
};

export default ComponentDetails;