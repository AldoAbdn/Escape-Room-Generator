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
            <div className="container-fluid pallet">
                <Row>
                    <Col className="col text-center">
                        <h3>Pallet</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" md="12" lg="12">
                        <AreaDnD palletItem={true} id="Area" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Puzzle" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Prop" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Lock" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Event" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Music" handleComponentClick={this.handleComponentClick}/>
                    </Col>
                </Row>
            </div>
        )
    }
};

export default Pallet;