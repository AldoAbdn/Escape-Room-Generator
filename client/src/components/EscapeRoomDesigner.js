import React, {Component}  from 'react';
import { Container, Dropdown, DropdownToggle , DropdownMenu , DropdownItem , Row, Col, Nav, NavItem, NavLink, TabContent, TabPane , Button } from 'reactstrap';
import { Details, Accessibility, Design } from './index';
import classnames from 'classnames';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

class EscapeRoomDesigner extends Component {
    constructor(){
        super();
        const newEscapeRoom = {
            userId: "",
            details:{
                name: "",
                designers: "",
                theme: "",
                minPlayers: "",
                maxPlayers: "",
                targetTime: "",
                difficulty: "3",
                objective: "",
                description: ""
            },
            accessibility:{
                protanomaly: false,
                protanopia: false,
                deuteranomaly: false,
                deuteranopia: false,
                tritanomaly: false,
                tritanopia: false,
                coneMonochromacy: false,
                rodMonochromacy: false,
                largeFonts: false,
                highContrast: false
            },
            components: []
        }
        this.state = {id: null, activeTab:'details', dropdownOpen: false, escapeRoom:newEscapeRoom};
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
                this.props.services['escape-rooms'].update(this.state.escapeRoom._id,this.state.escapeRoom).then(() => {
                    this.props.redux.actions.updateEscapeRoom(this.state.id,this.state.escapeRoom);
                    console.log(this.state.escapeRoom);
                    this.props.history.push('/');
                });
                break;
            case 'JSON':
                this.props.services['escape-rooms'].update(this.state.escapeRoom._id,this.state.escapeRoom).then(() => {
                    this.saveJSON(this.state.escapeRoom);
                });
                break;
            case 'PDF':
                this.props.services['escape-rooms'].update(this.state.escapeRoom._id,this.state.escapeRoom).then(() => {
                    this.savePDF(this.state.escapeRoom);
                });
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
        var newState = [...this.state.escapeRoom.components, ...state.components];
        escapeRoom.components = newState;
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
        const id = this.props.match.params.id;
        const escapeRoom = this.props.redux.state.escapeRooms[id];
        if(escapeRoom===undefined){
            this.props.history.push('/');
        }
        this.setState({id: id, escapeRoom: escapeRoom},()=>{
        });
    }
    render() {
        return (
            <Container>
                <Row>
                   
                    <Col><Button onClick={this.handleClick('EXIT')}>Save and Exit</Button></Col>
                    <Col>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
                            <DropdownToggle caret>Save and Export</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.handleClick('JSON')}>Export as JSON</DropdownItem>
                                <DropdownItem onClick={this.handleClick('PDF')}>Export as PDF</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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