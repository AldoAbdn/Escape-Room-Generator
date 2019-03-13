import React, {Component}  from 'react';
import { Container, Dropdown, DropdownToggle , DropdownMenu , DropdownItem , Row, Col, Nav, NavItem, NavLink, TabContent, TabPane , Button } from 'reactstrap';
import { Details, Accessibility, Design } from './index';
import classnames from 'classnames';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import EscapeRoom from '../models/EscapeRoom';

class EscapeRoomDesigner extends Component {
    constructor(){
        super();
        this.state = {activeTab:'design', dropdownOpen: false, escapeRoom:new EscapeRoom()};
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
                    this.props.saveEscapeRoom(this.state.escapeRoom);
                break;
            case 'JSON':
                if(this.props.saveEscapeRoom)
                    this.props.saveEscapeRoom(this.state.escapeRoom);
                this.saveJSON(this.state.escapeRoom);
                break;
            case 'PDF':
                if(this.props.saveEscapeRoom)
                    this.props.saveEscapeRoom(this.state.escapeRoom);
                this.savePDF(this.state.escapeRoom);
                break;
            default:
                return;
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    //Changes state on input change
    handleDetailsChange = (state) => { 
        var escapeRoom = {...this.state.escapeRoom};
        var newState = {...escapeRoom.details, ...state};
        escapeRoom.details = newState;
        this.setState({escapeRoom});
    }
    //Changes state on input change
    handleAccessibilityChange = (state) => { 
        var escapeRoom = {...this.state.escapeRoom};
        var newState = {...this.state.escapeRoom.accessibility, ...state};
        escapeRoom.accessibility = newState;
        this.setState({escapeRoom});
    }
    //Changes state on input change
    handleDesignChange = (state) => { 
        var escapeRoom = {...this.state.escapeRoom};
        var newState = [...state];
        escapeRoom.components = newState;
        console.log(escapeRoom);
        this.setState({escapeRoom});
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
        this.setState({escapeRoom: escapeRoom},()=>{
        });
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="6" md="3" lg="3"><Button block onClick={this.handleClick('EXIT')}>Save and Exit</Button></Col>
                    <Col xs="6" md="3" lg="3">
                        <Dropdown block isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
                            <DropdownToggle caret>Save and Export</DropdownToggle>
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
                                <Details state={this.state.escapeRoom.details} handleChange={this.handleDetailsChange}/>
                            </TabPane>
                            <TabPane tabId="accessibility">
                                <Accessibility state={this.state.escapeRoom.accessibility} handleChange={this.handleAccessibilityChange}/>
                            </TabPane>
                            <TabPane tabId="design">
                                <Design state={{components:this.state.escapeRoom.components}} handleChange={this.handleDesignChange}/>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default EscapeRoomDesigner;