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
    render() {
        var type;
        var inputs;
        if(this.props.selected!==undefined || this.props.selected!==null){
            inputs = Object.keys(this.props.selected).map(this.mapDetailToInput)
            type = this.props.selected.type;
        }
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Details</h3>
                        <h4>{type}</h4>
                    </Col>
                </Row>
                {inputs}
            </Container>
        )
    }
};

export default ComponentDetails;