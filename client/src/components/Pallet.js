import React, {Component}  from 'react';
import { Row, Col } from 'reactstrap';
import AreaPalletItem from './AreaPalletItem';
import PalletItem from './PalletItem';
import '../styles/Pallet.css';

/** 
 * Class for Pallet 
 * @extends Component
 * @author Alistair Quinn 
 */
class Pallet extends Component {
    /**
     * React lifecycle method 
     * Renders layout
     * @returns {JSX}
     */
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
                        <AreaPalletItem id="Area"/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Puzzle"/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Prop"/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Lock"/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Event"/>
                    </Col>
                    <Col xs="6" md="12" lg="12">
                        <PalletItem id="Music"/>
                    </Col>
                </Row>
            </div>
        )
    }
};

export default Pallet;