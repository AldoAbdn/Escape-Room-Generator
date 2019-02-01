import React, {Component}  from 'react';
import { Container, Dropdown, DropdownToggle , DropdownMenu , DropdownItem , Row, Col, Nav, NavItem, NavLink, TabContent, TabPane , Button, Input } from 'reactstrap';
import { Details, Accessibility, Design } from './index';
import classnames from 'classnames';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

class EscapeRoomDesigner extends Component {
    constructor(){
        super();
        const newEscapeRoom = {
            details:{
                name: "",
                userId: "",
                designer: "",
                theme: "",
                minPlayers: "",
                maxPlayers: "",
                targetTime: "",
                difficulty: "3",
                objective: "",
                description: ""
            },
            accessibility:{
                protanomaly: '',
                protanopia: '',
                deuteranomaly: '',
                deuteranopia: '',
                tritanomaly: '',
                tritanopia: '',
                coneMonochromacy: '',
                rodMonochromacy: '',
                largeFonts: '',
                highContrast: ''
            },
            components: []
        }
        this.state = {id: null, activeTab:'details', dropdownOpen: false, escapeRoom:newEscapeRoom};
    }
    saveJSON(json, name) {
        const blob = new Blob([json],{type:'text/plain;charset=utf-8'});
        saveAs(blob, name+".json");
    }
    savePDF(escapeRoom) {
        var doc = new jsPDF();
        doc.text(JSON.stringify(escapeRoom),10,10);
        doc.save(escapeRoom.name+'.pdf');
    }
    handleClick = (action) => (e) => {
        switch(action){
            case 'EXIT':
                this.props.services['escape-rooms'].update(this.state.escapeRoom).then(() => {
                    this.props.redux.actions.updateEscapeRoom(this.state.escapeRoom);
                    this.props.history.push('/');
                });
                break;
            case 'JSON':
                this.props.services['escape-rooms'].update(this.state.escapeRoom).then(() => {
                    this.saveJSON(JSON.stringify(this.state.escapeRoom),this.state.escapeRoom.name);
                });
                break;
            case 'PDF':
                this.props.services['escape-rooms'].update(this.state.escapeRoom).then(() => {
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
        var newState = {...this.state.escapeRoom.details, ...state};
        this.setState({escapeRoom:{details:newState}});
    }
    //Changes state on input change
    handleAccessibilityChange = (state) => { 
        var newState = {...this.state.escapeRoom.accessibility, ...state};
        this.setState({escapeRoom:{accessibility:newState}});
    }
    //Changes state on input change
    handleDesignChange = (state) => { 
        var newState = [...this.state.escapeRoom.components, ...state.components];
        this.setState({escapeRoom:{components:newState}});
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
                   
                    <Col><Button onClick={this.handleClick('exit')}>Save and Exit</Button></Col>
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
                                <Accessibility initialState={this.state.escapeRoom.accessibility} handleChange={this.handleAccessibilityChange}/>
                            </TabPane>
                            <TabPane tabId="design">
                                <Design initialState={{components:this.state.escapeRoom.components}} handleChange={this.handleDesignChange}/>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default EscapeRoomDesigner;