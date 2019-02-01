import React, {Component}  from 'react';
import { Container, Row, Col, Input } from 'reactstrap';

class ComponentDetails extends Component {
    //Changes state on input change
    handleChange = (event) => { 
        var state = {};
        state[event.target.id] = event.target.value;    
        this.props.handleChange(state);
    }
    mapDetailToInput = (key,i) => {
        return (
        <Row key={i}>
            <Col>
                <Input type="text" name={key} id={key} placeholder={key} value={this.props.selected[key]} onChange={this.handleChange}/>
            </Col>
        </Row>)
    };
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Details</h3>
                    </Col>
                </Row>
                {this.props.selected.keys.map(this.mapDetailToInput)}
            </Container>
        )
    }
};

export default ComponentDetails;