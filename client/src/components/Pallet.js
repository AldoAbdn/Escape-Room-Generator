import React, {Component}  from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class Pallet extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Pallet</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button>Area</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button>Puzzle</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button>Prop</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button>Event</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button>Music</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Pallet;