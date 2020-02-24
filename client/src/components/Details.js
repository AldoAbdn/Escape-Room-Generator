import React, {Component} from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, UncontrolledTooltip} from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * Class for Editing Escape Room Details
 * @extends Component
 * @author Alistair Quinn
 */
class Details extends Component {
    /**
     * Handles Input Change
     * @param {Event} event
     */
    handleChange = (event) => { 
        var state = {};
        state[event.target.id] = event.target.value;    
        this.props.updateDetails(state);
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render(){
        return (
        <Container fluid>
            <Row>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for="name">Room Name <span id="nameTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <Input type="text" name="name" id="name" placeholder="Room Name" value={this.props.details.name} onChange={this.handleChange}/>
                            <UncontrolledTooltip target="nameTooltip">The name of your design</UncontrolledTooltip>
                        </FormGroup>
                        <FormGroup>
                            <Label for="designers">Designers <span id="designersTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <Input type="text" name="designers" id="designers" placeholder="Designer(s)" value={this.props.details.designers} onChange={this.handleChange}/>
                            <UncontrolledTooltip target="designersTooltip">Names of the designers</UncontrolledTooltip>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="theme">Theme <span id="themeTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <Input type="text" name="theme" id="theme" placeholder="theme" value={this.props.details.theme} onChange={this.handleChange}/>
                            <UncontrolledTooltip target="themeTooltip">The theme of the room: Noir, Medieval, Heist ect.</UncontrolledTooltip>
                        </FormGroup>                        
                        <FormGroup>
                            <Label>Players <span id="playersTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <Input type="text" name="minPlayers" id="minPlayers" placeholder="Min" value={this.props.details.minPlayers} onChange={this.handleChange}/>
                            <Input type="text" name="maxPlayers" id="maxPlayers" placeholder="Max" value={this.props.details.maxPlayers} onChange={this.handleChange}/>
                            <UncontrolledTooltip target="playersTooltip">The maximum and minimum amount of players your room is designed for</UncontrolledTooltip>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="targetTime">Target Time <span id="targetTimeTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <Input type="text" name="targetTime" id="targetTime" placeholder="Time" value={this.props.details.targetTime} onChange={this.handleChange}/>
                            <UncontrolledTooltip target="targetTimeTooltip">Can be the time players have to try and escape by, or the estimated time it will take players to complete the room</UncontrolledTooltip>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="difficulty">Difficulty <span id="difficultyTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <Input type="range" min="1" max="5" name="difficulty" id="difficulty" value={this.props.details.difficulty} onChange={this.handleChange}/>
                            <UncontrolledTooltip target="difficultyTooltip">How difficult the room is rated out of 5. It is up to the designer to gauge difficulty</UncontrolledTooltip>
                        </FormGroup>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for="objective">Objective <span id="objectiveTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <Input type="text" name="objective" id="objective" placeholder="Main Objective" value={this.props.details.objective} onChange={this.handleChange}/>
                            <UncontrolledTooltip target="objectiveTooltip">The objective of the room, for example: retrieve the diamond, foil the mad scientists evil plans ect.</UncontrolledTooltip>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description <span id="descriptionTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <Input type="textarea" name="description" id="description" placeholder="Description" value={this.props.details.description} onChange={this.handleChange}/>
                            <UncontrolledTooltip target="descriptionTooltip">A descriptive paragraph of the room, you can define the overall story here or any extra details that may be needed to set it up</UncontrolledTooltip>
                        </FormGroup>       
                        <FormGroup>
                            <Label for="estimatedCost">Estimated Cost <span id="estimatedCostTooltip"><i className="fa fa-question-circle" aria-hidden="true"></i></span></Label>
                            <p>{this.props.details.estimatedCost}</p>    
                            <UncontrolledTooltip target="estimatedCostTooltip">When you set estimated cost values on components in the design they will be totalled up and the total will be displayed here</UncontrolledTooltip>
                        </FormGroup>             
                    </Form>
                </Col>
            </Row>
        </Container>)
    }
}

Details.propTypes = {
    updateDetails: PropTypes.func,
    details: PropTypes.instanceOf(Details)
}

export default Details;