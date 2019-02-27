import React, {Component}  from 'react';
import { Container, Row, Col, Input, Label, ListGroupItem, Button, ListGroup } from 'reactstrap';

class ComponentDetails extends Component {
    //Changes state on input change
    handleChange = (event) => { 
        let state = {};
        state[event.target.id] = event.target.value;  
        state._id = this.props.selected._id;  
        this.props.handleChange(state);
    }
    mapDetailToInput = (key,i) => {
        if(typeof this.props.selected[key] === "string" && key!=="_id"){
            return (
                <Row key={i}>
                    <Col>
                        <Label for={key}>{key}</Label>
                        <Input type="text" name={key} id={key} placeholder={key} value={this.props.selected[key]} onChange={this.handleChange}/>
                    </Col>
                </Row>)
        } else {
            return;
        }
    };
    handleOnClick = (id,isInput)=> (e) => {
        let component = {...this.props.selected};
        let state = {};
        state._id = component._id;
        if(isInput){
            state.inputComponents = component.inputComponents.filter(oldId => oldId!==id);
        } else {
            let index = component.outputComponents.indexOf(id);
            state.outputComponents = component.outputComponents.filter(oldId => oldId!==id);
        }
        this.props.handleChange(state);
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
        let type;
        let properties;
        let inputs;
        let outputs;
        let inputRelationships;
        let outputRelationships;
        if(component!==undefined || component!==null){
            properties = Object.keys(component).map(this.mapDetailToInput)
            type = this.props.selected.type;
            if(component.inputComponents!==undefined&&component.outputComponents!==undefined&&(component.inputComponents.length>0||component.outputComponents.length>0)){
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
        }
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Details</h3>
                        <h4>{type}</h4>
                    </Col>
                </Row>
                {properties}
                {inputRelationships}
                {outputRelationships}
            </Container>
        )
    }
};

export default ComponentDetails;