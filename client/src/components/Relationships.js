import React, {Component}  from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';

/** 
 * Class for Not Found 
 * @extends Component
 * @author Alistair Quinn 
 */
class Relationships extends Component {
    /**
     * Deletes a relationship
     * @param {string} id
     * @param {bool} isInput
     */
    handleClick = (id,isInput) => (e) => {
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

    /**
     * Maps Relationship to List Group Item
     * @param {string} id
     * @param {int} i
     * @param {bool} isInput
     * @returns {JSX}
     */
     mapRelationshipToListGroup = (id,i,isInput,deletable=true) => {
        if(deletable)
            return (
                <ListGroupItem key={i}>
                    {id}
                    <Button onClick={this.handleClick(id,isInput)} color="danger" style={{display:'inline', position: 'absolute', right:'2px', top:'0.3rem'}}>
                        X
                    </Button>
                </ListGroupItem>
            )
        else
            return (
                <ListGroupItem key={i}>
                    {id}
                </ListGroupItem>
            )
    }

    /**
     * React lifecycle method 
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        console.log(this.props);
        if(this.props.selected.type !== "Area")
            return (
                <Row>
                    <h5>Relationships</h5>
                    <Col>
                        <h6>Inputs</h6>
                        <ListGroup>
                            {this.props.selected.inputComponents.map((id,i)=>this.mapRelationshipToListGroup(id,i,true))}
                        </ListGroup>
                    </Col>
                    <Col>
                        <h6>Outputs</h6>
                        <ListGroup>
                            {this.props.selected.outputComponents.map((id,i)=>this.mapRelationshipToListGroup(id,i,false))}
                        </ListGroup>
                    </Col>
                </Row>
            )
        else
            return (
                <Row>
                    <h5>Relationships</h5>
                    <Col>
                    <ListGroup>
                            {this.props.selected.outputComponents.map((id,i)=>this.mapRelationshipToListGroup(id,i,false,false))}
                    </ListGroup>
                    </Col>
                </Row>
            )
    }
};

Relationships.propTypes = {
    selected: PropTypes.instanceOf(Component),
    updateComponent: PropTypes.func,
}

export default Relationships;