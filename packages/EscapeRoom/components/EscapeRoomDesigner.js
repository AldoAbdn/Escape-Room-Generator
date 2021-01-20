import React, {Component}  from 'react';
import { Container, Dropdown, DropdownToggle , DropdownMenu , DropdownItem , Row, Col, Nav, NavItem, NavLink, TabContent, TabPane , Button } from 'reactstrap';
import { Details, Accessibility, Design } from '../../../client/src/components/index';
import classnames from 'classnames';
import { saveAs } from 'file-saver';
import {escapeRoomToPDF} from '../../../client/src/pdf/pdf';
import EscapeRoom from '../../../client/src/models/EscapeRoom';
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
        super();
        this.state = {activeTab:'design', dropdownOpen: false};
    }

    /**
     * Saves an EscapeRoom as JSON
     * @param {EscapeRoom} escapeRoom 
     */
    saveJSON(escapeRoom) {
        const blob = new Blob([JSON.stringify(escapeRoom)],{type:'text/plain;charset=utf-8'});
        saveAs(blob, escapeRoom.details.name+".json");
    }

    /**
     * Saves Escape Room as PDF
     * @param {EscapeRoom} escapeRoom 
     */
    savePDF(escapeRoom) {
        escapeRoomToPDF(escapeRoom);
    }

    /**
     * Handles Button Clicks
     * @function
     * @param {string} action
     * @param {Event} e
     */
    handleClick = (action) => (e) => {
        switch(action){
            case 'EXIT':
                if(this.props.saveEscapeRoom)
                    this.props.saveEscapeRoom(this.props.escapeRoom);
                break;
            case 'JSON':
                if(this.props.saveEscapeRoom)
                    this.props.saveEscapeRoom(this.props.escapeRoom);
                this.saveJSON(this.props.escapeRoom);
                break;
            case 'PDF':
                if(this.props.saveEscapeRoom)
                    this.props.saveEscapeRoom(this.props.escapeRoom);
                this.savePDF(this.props.escapeRoom);
                break;
            default:
                return;
        }
    }

    /**
     * Toggles Bool
     * @param {Event} e
     */
    handleToggle = (e) => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
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

    /** React Lifecycle Called when Component Mounts */
    componentDidMount(){
        const escapeRoom = this.props.escapeRoom;
        if(escapeRoom===undefined){
            this.props.history.push('/');
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
                    <Col xs="6" md="3" lg="3"><Button block onClick={this.handleClick('EXIT')}>Save and Exit</Button></Col>
                    <Col xs="6" md="3" lg="3">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
                            <DropdownToggle  className="full-width" caret>Save and Export</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.handleClick('JSON')}>Export as JSON</DropdownItem>
                                <DropdownItem onClick={this.handleClick('PDF')}>Export as PDF</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col xs="6"/>
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