import React, {Component}  from 'react';
import { Container, Row } from 'reactstrap';

class NotFound extends Component {
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