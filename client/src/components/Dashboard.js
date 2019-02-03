import React, {Component} from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem , ListGroup, ListGroupItem , Button } from 'reactstrap';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import Area from '../models/Area';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: [false,false],
            firstLoad: true
        }
    }
    handleToggle = (i) => (e) => {
        var dropdownOpen = this.state.dropdownOpen;
        dropdownOpen[i] = !dropdownOpen[i];
        this.setState({dropdownOpen});
    }
    handleClick = async (e) => {
        const userId = this.props.redux.state.user._id;
        const newEscapeRoom = {
            userId: userId,
            details:{
                name: "Unnamed",
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
            components: [new Area()]
        }
        await this.props.services['escape-rooms'].create(newEscapeRoom)
            .then(async (queryResult) => {
                if(queryResult.action.type.includes('FULFILLED')){
                    const escapeRoom = queryResult.value;
                    if (escapeRoom!==null){
                        const i = this.props.redux.state.escapeRooms.length;
                        this.props.redux.actions.addEscapeRoom(escapeRoom);
                        this.props.history.push('/designer/'+i);
                    }
                }
            })
            .catch((err)=>{
                console.log(err);
            });
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
    handleItemClick = (i, action) => (e) => {
        const escapeRoom = this.props.redux.state.escapeRooms[i];
        const escapeRoomService = this.props.services['escape-rooms'];
        const removeEscapeRoom = this.props.redux.actions.removeEscapeRoom;
        switch(action){
            case 'EDIT':
                this.props.history.push('/designer/'+i);
                break;
            case 'JSON':
                this.saveJSON(escapeRoom);
                break;
            case 'PDF':
                this.savePDF(escapeRoom);
                break;
            case 'DELETE':
                escapeRoomService.remove(escapeRoom._id);
                removeEscapeRoom(escapeRoom);
                break;
            default:
                return;
        }
    }
    mapEscapeRoomToList = (escapeRoom,i) => {
        return (
        <ListGroupItem key={i}>{escapeRoom.details.name}
            <Dropdown style={{display:'inline', position: 'absolute', right:'20px'}} isOpen={this.state.dropdownOpen[i]} toggle={this.handleToggle(i)}>
                <DropdownToggle caret/>
                <DropdownMenu right>
                    <DropdownItem onClick={this.handleItemClick(i,'EDIT')}>Edit</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'JSON')}>Export as JSON</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'PDF')}>Export as PDF</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'DELETE')}>Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ListGroupItem>)
    };
    render() {
        const escapeRooms = this.props.redux.state.escapeRooms || [];
        return (
            <Container>
                <Row>
                    <Col>
                        <Button block onClick={this.handleClick}>NEW</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {escapeRooms.map(this.mapEscapeRoomToList)}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Dashboard;