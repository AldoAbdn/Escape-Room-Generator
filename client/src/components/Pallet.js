import React, {Component}  from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import AreaDnD from './AreaDnD';
import ComponentDnD from './ComponentDnDSource';

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
                        <AreaDnD id="Area"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ComponentDnD id="Puzzle"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ComponentDnD id="Prop"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ComponentDnD id="Event"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ComponentDnD id="Music"/>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Pallet;