import React, {Component}  from 'react';
import { Container, Row } from 'reactstrap';

/** 
 * Class for Not Found 
 * @extends Component
 * @author Alistair Quinn 
 */
class NotFound extends Component {
    /**
     * React lifecycle method 
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <Container>
                <Row>
                    <h1>404 Page Not Found</h1>
                </Row>
            </Container>
        )
    }
};

export default NotFound;