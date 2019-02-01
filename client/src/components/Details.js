import React, {Component} from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';

class Details extends Component {
    constructor(props){
        super(props);
    }
    //Changes state on input change
    handleChange = (event) => { 
        var state = {};
        state[event.target.id] = event.target.value;    
        this.props.handleChange(state);
    }
    componentDidUpdate(prevProps){
        console.log(this.props)
    }
    render(){
        return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for="roomName">Room Name</Label>
                            <Input type="text" name="roomName" id="roomName" placeholder="Room Name" value={this.props.state.name} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="designers">Designers</Label>
                            <Input type="text" name="designers" id="designers" placeholder="Designer(s)" value={this.props.state.designers} onChange={this.handleChange}/>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="theme">Theme</Label>
                            <Input type="text" name="theme" id="theme" placeholder="theme" value={this.props.state.theme} onChange={this.handleChange}/>
                        </FormGroup>                        
                        <FormGroup>
                            <Label>Players</Label>
                            <Input type="text" name="minPlayers" id="minPlayers" placeholder="Min" value={this.props.state.minPlayers} onChange={this.handleChange}/>
                            <Input type="text" name="maxPlayers" id="maxPlayers" placeholder="Max" value={this.props.state.maxPlayers} onChange={this.handleChange}/>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="targetTime">Target Time</Label>
                            <Input type="text" name="targetTime" id="targetTime" placeholder="Time" value={this.props.state.targetTime} onChange={this.handleChange}/>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="difficulty">Difficulty</Label>
                            <Input type="range" min="1" max="5" name="difficulty" id="difficulty" value={this.props.state.difficulty} onChange={this.handleChange}/>
                        </FormGroup>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for="objective">Objective</Label>
                            <Input type="text" name="objective" id="objective" placeholder="Main Objective" value={this.props.state.objective} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description" placeholder="Description" value={this.props.state.description} onChange={this.handleChange}/>
                        </FormGroup>                        
                    </Form>
                </Col>
            </Row>
        </Container>)
    }
}

export default Details;