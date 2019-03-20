import React, {Component} from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import '../styles/details.css';

class Details extends Component {
    //Changes state on input change
    handleChange = (event) => { 
        var state = {};
        state[event.target.id] = event.target.value;    
        this.props.updateDetails(state);
    }
    render(){
        return (
        <Container fluid>
            <Row>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for="name">Room Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Room Name" value={this.props.details.name} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="designers">Designers</Label>
                            <Input type="text" name="designers" id="designers" placeholder="Designer(s)" value={this.props.details.designers} onChange={this.handleChange}/>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="theme">Theme</Label>
                            <Input type="text" name="theme" id="theme" placeholder="theme" value={this.props.details.theme} onChange={this.handleChange}/>
                        </FormGroup>                        
                        <FormGroup>
                            <Label>Players</Label>
                            <Input type="text" name="minPlayers" id="minPlayers" placeholder="Min" value={this.props.details.minPlayers} onChange={this.handleChange}/>
                            <Input type="text" name="maxPlayers" id="maxPlayers" placeholder="Max" value={this.props.details.maxPlayers} onChange={this.handleChange}/>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="targetTime">Target Time</Label>
                            <Input type="text" name="targetTime" id="targetTime" placeholder="Time" value={this.props.details.targetTime} onChange={this.handleChange}/>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="difficulty">Difficulty</Label>
                            <Input type="range" min="1" max="5" name="difficulty" id="difficulty" value={this.props.details.difficulty} onChange={this.handleChange}/>
                        </FormGroup>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for="objective">Objective</Label>
                            <Input type="text" name="objective" id="objective" placeholder="Main Objective" value={this.props.details.objective} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description" placeholder="Description" value={this.props.details.description} onChange={this.handleChange}/>
                        </FormGroup>       
                        <FormGroup>
                            <Label for="estimatedCost">Estimated Cost</Label>
                            <p>{this.props.details.estimatedCost}</p>    
                        </FormGroup>             
                    </Form>
                </Col>
            </Row>
        </Container>)
    }
}

export default Details;