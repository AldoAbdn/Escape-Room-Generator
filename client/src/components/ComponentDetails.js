import React, {Component}  from 'react';
import { Container, Row, Col, Input, Label } from 'reactstrap';

class ComponentDetails extends Component {
    //Changes state on input change
    handleChange = (event) => { 
        var state = {};
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
    mapIDToP = (key,i) => {
        return (
            <div>{i}</div>
        )
    }
    render() {
        console.log(this.props);
        let component = this.props.selected;
        let type;
        let properties;
        let inputs;
        let outputs;
        if(component!==undefined || component!==null){
            properties = Object.keys(component).map(this.mapDetailToInput)
            type = this.props.selected.type;
            if(component.inputComponents!=undefined&&component.outputComponents!=undefined){
                inputs = component.inputComponents.map(this.mapIDToP);
                outputs = component.outputComponents.map(this.mapIDToP);
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
                <Row>
                    <Col>
                        <h4>Inputs</h4>
                        {inputs}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Outputs</h4>
                        {outputs}
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default ComponentDetails;