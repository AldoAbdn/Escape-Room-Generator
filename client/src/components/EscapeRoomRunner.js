import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import EscapeRoom from '../models/EscapeRoom';
import PropTypes from 'prop-types';

/** 
 * Class for Pallet 
 * @extends Component
 * @author Alistair Quinn 
 */
class EscapeRoomRunner extends Component {
    /**
     * React lifecycle method 
     * Renders layout
     * @returns {JSX}
     */
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Runner</h1>
                    </Col>
                </Row>
            </Container>
        )
    }
};

EscapeRoomRunner.propTypes = {
    escapeRoom: PropTypes.instanceOf(EscapeRoom)
}

export default EscapeRoomRunner;