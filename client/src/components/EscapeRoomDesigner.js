import React, {Component}  from 'react';
import { Container, Dropdown, DropdownToggle , DropdownMenu , DropdownItem , Row, Col, Nav, NavItem, NavLink, TabContent, TabPane , Button, Input } from 'reactstrap';
import { Details, Accessibility, Design } from './index';
import classnames from 'classnames';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

class EscapeRoomDesigner extends Component {
    constructor(){
        super();
        this.state = {id: null, activeTab:'details', dropdownOpen: false ,escapeRoom:{name:""}};
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
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    //Changes state on input change
    handleDetailsChange = (state) => { 
        this.state.escapeRoom.details = state;
    }
    //Changes state on input change
    handleAccessibilityChange = (state) => { 
        this.state.escapeRoom.accessibility = state;
    }
    //Changes state on input change
    handleDesignChange = (state) => { 
        this.state.escapeRoom.components = state;
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
        console.log(id);
        this.setState({id: id, escapeRoom: this.props.redux.state.escapeRooms[id]});
        console.log(this.props.redux.state.escapeRooms);
        console.log(this.props.redux.state.escapeRooms[id]);
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col><Input placeholder="Design Name Goes Here" value={this.state.escapeRoom.name} onChange={this.handleChange}></Input></Col>
                    <Col><Button onClick={this.handleClick('exit')}>Save and Exit</Button></Col>
                    <Col>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
                            <DropdownToggle caret>Save and Exit</DropdownToggle>
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
                                <Details handleChange={this.handleDetailsChange}/>
                            </TabPane>
                            <TabPane tabId="accessibility">
                                <Accessibility handleChange={this.handleAccessibilityChange}/>
                            </TabPane>
                            <TabPane tabId="design">
                                <Design handleChange={this.handleDesignChange}/>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default EscapeRoomDesigner;