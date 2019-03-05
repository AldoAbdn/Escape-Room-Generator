import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import AreaDnD from './AreaDnDSource';
import ComponentDnD from './ComponentDnDSource';

class Pallet extends Component {
    handleComponentClick = (e) => {
        
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Pallet</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3" md="12" lg="12">
                        <AreaDnD id="Area" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="3" md="12" lg="12">
                        <ComponentDnD id="Puzzle" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="3" md="12" lg="12">
                        <ComponentDnD id="Prop" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="3" md="12" lg="12">
                        <ComponentDnD id="Lock" handleComponentClick={this.handleComponentClick}/>
                    </Col>

                    <Col xs="3" md="12" lg="12">
                        <ComponentDnD id="Event" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="3" md="12" lg="12">
                        <ComponentDnD id="Music" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Pallet;