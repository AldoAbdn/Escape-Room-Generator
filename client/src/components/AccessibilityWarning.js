import React, {Component}  from 'react';
import { Row, Col, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import Accessibility from '../models/Accessibility';

/** 
 * Class for Not Found 
 * @extends Component
 * @author Alistair Quinn 
 */
class AccessibilityWarning extends Component {
    /**
     * Generates Warning from Checked Accessibility
     */
    generateWarning = (accessibility) => {
        let selectedKeys = [];
        Object.keys(accessibility).forEach((key)=>{
            if(accessibility[key]===true)
                selectedKeys.push(key);
        });
        return selectedKeys.join(',')
    }

    /**
     * React lifecycle method 
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <Row>
                <Col className="col text-center">
                    <p id="visualWarning"><i className="fa fa-wheelchair text-success"  aria-hidden="true"></i></p>  
                    <UncontrolledTooltip id="visual" target="visualWarning">
                        You selected: {this.generateWarning(this.props.accessibility.visual)} be careful with colour choices
                    </UncontrolledTooltip>
                </Col>
                <Col className="col text-center">
                    <p id="physicalWarning"><i class="fa fa-wheelchair text-primary" aria-hidden="true"></i></p>
                    <UncontrolledTooltip id="physical" target="physicalWarning">
                        You selected: {this.generateWarning(this.props.accessibility.physical)} ensure plenty of room around puzzles and check how difficult puzzle is to handle
                    </UncontrolledTooltip>
                </Col>
            </Row>
        );
    }
};

AccessibilityWarning.propTypes = {
    accessibility: PropTypes.instanceOf(Accessibility),
}

export default AccessibilityWarning;