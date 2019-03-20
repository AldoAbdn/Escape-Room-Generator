import React, {Component}  from 'react';
import { Container, Dropdown, DropdownToggle , DropdownMenu , DropdownItem , Row, Col, Nav, NavItem, NavLink, TabContent, TabPane , Button } from 'reactstrap';
import { Details, Accessibility, Design } from './index';
import classnames from 'classnames';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import '../styles/EscapeRoomDesigner.css';

class EscapeRoomDesigner extends Component {
    constructor(){
        super();
        this.state = {activeTab:'design', dropdownOpen: false};
    }
    saveJSON(escapeRoom) {
        const blob = new Blob([JSON.stringify(escapeRoom)],{type:'text/plain;charset=utf-8'});
        saveAs(blob, escapeRoom.details.name+".json");
    }
    savePDF(escapeRoom) {
        var doc = new jsPDF();
        doc.text(JSON.stringify(escapeRoom),10,10);
        doc.save(escapeRoom.details.name+'.pdf');
    }
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
    handleToggle = (e) => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }
    handleNav = (tab) => (e) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }
    componentDidMount(){
        const escapeRoom = this.props.escapeRoom;
        if(escapeRoom===undefined){
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <Container fluid>
                <Row className="save-options">
                    <Col xs="6" md="3" lg="3"><Button block onClick={this.handleClick('EXIT')}>Save and Exit</Button></Col>
                    <Col xs="6" md="3" lg="3">
                        <Dropdown block isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
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
                                <Design components={{components:this.props.escapeRoom.components}} showModal={this.props.showModal} accessibility={this.props.escapeRoom.accessibility} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} updateComponent={this.props.updateComponent} addRelationship={this.props.addRelationship} removeRelationship={this.props.removeRelationship}/>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default EscapeRoomDesigner;