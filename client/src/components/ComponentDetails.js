import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AccessibilityWarning, Properties, Relationships } from './index';
import PropTypes from 'prop-types';
import '../styles/ComponentDetails.css';
import Accessibility from './Accessibility';

/** 
 * Class for Component Details allows editing of a components details
 * @extends Component 
 * @author Alistair Quinn
 */
class ComponentDetails extends Component {
    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        let component = this.props.selected;
        let id="";
        let type="";
        if(component!==undefined && component!==null){
            // Properties
            if(component._id!==undefined)
                id = " ("+component._id+")";
            type = component.type||"";
        }
        if(this.props.selected===null)
            return (
                <Container fluid className="container-fluid component-details">
                    <Col className="col text-center">
                        <h3>Details</h3>
                    </Col>
                </Container>
            )
        else
            return (
                <Container fluid className="container-fluid component-details">
                    <Row>
                        <Col className="col text-center">
                            <h3>Details</h3>
                            <h4>{type + id}</h4>
                        </Col>
                    </Row>
                    <AccessibilityWarning accessibility={this.props.accessibility}/>
                    <Properties selected={this.props.selected} updateComponent={this.props.updateComponent} calculateOutput={this.props.calculateOutput}/>
                    <Relationships selected={this.props.selected} updateComponent={this.props.updateComponent}/>
                </Container>
            )
    }
};

ComponentDetails.propTypes = {
    calculateOutput: PropTypes.func,
    accessibility: PropTypes.instanceOf(Accessibility),
    selected: PropTypes.instanceOf(Component),
    updateComponent: PropTypes.func
}

export default ComponentDetails;