import React, {Component}  from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane , Button } from 'reactstrap';
import { Details, Accessibility, Design } from './index';
import classnames from 'classnames';
import EscapeRoom from '../models/EscapeRoom';
import PropTypes from 'prop-types';
import '../styles/EscapeRoomDesigner.css';

/**
 * Class for Designing an Escape Room, Manages tabs
 * @extends Component
 * @author Alistair Quinn
 */
class EscapeRoomDesigner extends Component {
    /** Creates EscapeRoom Designer */
    constructor(){
        super()
        this.state = {activeTab:'design'};
    }

    /**
     * Handles Button Clicks
     * @function
     * @param {string} action
     * @param {Event} e
     */
    handleClick = (action) => (e) => {
        if(this.props.saveEscapeRoom)
            this.props.saveEscapeRoom(this.props.escapeRoom);
    }

    /**
     * Toggles Active Tab
     * @param {string} tab
     * @param {Event} e 
     */
    handleNav = (tab) => (e) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    } 

    /** React Lifecycle Called when Components Updates */
    componentDidUpdate(prevProps,prevState){
        if(prevState.activeTab!==this.state.activeTab){
            this.toggleSvgs();
        }
    }

    /** 
     * Hides SVGs when design not current tab
     * @function 
     */
    toggleSvgs=()=>{
        let lines = document.querySelectorAll("body > div:not(#root)");
        if(this.state.activeTab!=="design"){
            for (let i = 0; i < lines.length;i++){
                lines[i].style.display = 'none';
            }
        } else {
            for (let i = 0; i < lines.length;i++){
                lines[i].style.display = 'block';
            }
        }
    }

    /**
     * Calculates Output of Component
     */
    calculateOutput=(id)=>{
        return EscapeRoom.calculateComponentOutput(this.props.escapeRoom,id);
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        return (
            <Container fluid>
                <Row className="save-options">
                    <Col xs="12" md="12" lg="12">
                        <Button block onClick={this.handleClick('EXIT')}>Save and Exit</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === 'details'})}
                                    onClick={this.handleNav('details')}    
                                >
                                    Details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === 'accessibility'})}
                                    onClick={this.handleNav('accessibility')}    
                                >
                                    Accessibility
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === 'design'})}
                                    onClick={this.handleNav('design')}    
                                >
                                    Design
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="details">
                                <Details details={this.props.escapeRoom.details} updateDetails={this.props.updateDetails}/>
                            </TabPane>
                            <TabPane tabId="accessibility">
                                <Accessibility accessibility={this.props.escapeRoom.accessibility} updateAccessibility={this.props.updateAccessibility}/>
                            </TabPane>
                            <TabPane tabId="design">
                                <Design calculateOutput={this.calculateOutput} components={{components:this.props.escapeRoom.components}} showModal={this.props.showModal} accessibility={this.props.escapeRoom.accessibility} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} updateComponent={this.props.updateComponent} addRelationship={this.props.addRelationship} removeRelationship={this.props.removeRelationship}/>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        )
    }
};

EscapeRoomDesigner.propTypes = {
    saveEscapeRoom: PropTypes.func,
    escapeRoom: PropTypes.instanceOf(EscapeRoom),
    history: PropTypes.object,
    updateDetails: PropTypes.func,
    updateAccessibility: PropTypes.func,
    addComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    updateComponent: PropTypes.func,
    addRelationship: PropTypes.func,
    removeRelationship: PropTypes.func,
}

export default EscapeRoomDesigner;