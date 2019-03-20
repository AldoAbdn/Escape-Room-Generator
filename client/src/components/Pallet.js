import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import AreaDnD from './AreaDnDSource';
import PalletItem from './PalletItem';
import '../styles/Pallet.css';

class Pallet extends Component {
    handleComponentClick = (e) => {
        
    }
    render() {
        return (
            <Container fluid>
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
                        <PalletItem id="Puzzle" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="3" md="12" lg="12">
                        <PalletItem id="Prop" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="3" md="12" lg="12">
                        <PalletItem id="Lock" handleComponentClick={this.handleComponentClick}/>
                    </Col>

                    <Col xs="3" md="12" lg="12">
                        <PalletItem id="Event" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="3" md="12" lg="12">
                        <PalletItem id="Music" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Pallet;