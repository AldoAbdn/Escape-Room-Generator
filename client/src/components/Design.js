import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Pallet, ComponentArranger, ComponentDetails } from './index';
import PropTypes from 'prop-types';
import Accessibility from './Accessibility';

/**
 * Class for Desinging an Escape Room
 * @extends Component
 * @author Alistair Quinn
 */
class Design extends Component {
    /** Creates Design */
    constructor(props){
        super(props);
        this.state = {selected: {}};
    }

    /**
     * Handles Component Click 
     * @function
     * @param {Component} component
     * @param {Event} e
     */
    handleComponentClick = (component) => (e) => {
        e.stopPropagation();
        this.setState({selected:component});
    }

    /**
     * Updates Selected Component 
     * @function
     * @param {Component} component
     */
    updateComponent = (component) => {
        this.props.updateComponent(component);
        this.setState({selected:{...this.state.selected,...component}});
    }

    /**
     * Finds a component by ID
     * @param {string} id
     * @returns {Component}
     */
    findComponent = (id) => {
        return this.props.components.components.find(component=>component._id===id);
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render(){
        return (
            <Container fluid>
                <Row>
                    <Col md="2">
                        <Pallet/>
                    </Col>
                    <Col md="8">
                        <ComponentArranger renderTrigger={JSON.stringify(this.props.components.components)} findComponent={this.findComponent} showModal={this.props.showModal} handleComponentClick={this.handleComponentClick} updateComponent={this.props.updateComponent} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship} components={this.props.components.components}/>            
                    </Col>
                    <Col md="2">
                        <ComponentDetails calculateOutput={this.props.calculateOutput} accessibility={this.props.accessibility} selected={this.state.selected} updateComponent={this.updateComponent}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Design.propTypes = {
    updateComponent: PropTypes.func,
    components: PropTypes.array,
    findComponent: PropTypes.func,
    showModal: PropTypes.func,
    handleComponentClick: PropTypes.func,
    updateComponent: PropTypes.func,
    addComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    addRelationship: PropTypes.func,
    calculateOutput: PropTypes.func,
    accessibility: PropTypes.instanceOf(Accessibility)
}

export default Design;