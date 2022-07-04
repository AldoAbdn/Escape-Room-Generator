import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * Class for Verify
 * @extends Component
 * @author Alistair Quinn
 */
class TermsOfService extends Component {
    /** 
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Terms of Service</h1>
                        <p>BLAH BLAH BLAH BLAH</p>
                    </Col>
                </Row>
            </Container>
        )
    }
};

TermsOfService.propTypes = {
    email: PropTypes.string,
}

export default TermsOfService;