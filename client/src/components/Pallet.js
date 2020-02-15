import React, {Component}  from 'react';
import { Row, Col } from 'reactstrap';
import AreaDnD from './AreaDnDSource';
import PalletItem from './PalletItem';
import '../styles/Pallet.css';

/** 
 * Class for Pallet 
 * @extends Component
 * @author Alistair Quinn 
 */
class Pallet extends Component {
    /**
     * Handles Component Click
     * @function
     * @param {Event} e
     */
    handleComponentClick = (e) => {
        
    }

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