import React, {Component} from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem , ListGroup, ListGroupItem , Button } from 'reactstrap';
import { saveAs } from 'file-saver';
import Modal from '../models/Modal';
import {escapeRoomToPDF} from '../pdf/pdf';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: [false,false]
        }
    }
    handleToggle = (i) => (e) => {
        var dropdownOpen = this.state.dropdownOpen;
        dropdownOpen[i] = !dropdownOpen[i];
        this.setState({dropdownOpen});
    }
    handleClick = async (e) => {
        if(this.props.newEscapeRoom)
            this.props.newEscapeRoom();
    }
    saveJSON(escapeRoom) {
        const blob = new Blob([JSON.stringify(escapeRoom)],{type:'text/plain;charset=utf-8'});
        saveAs(blob, escapeRoom.details.name+".json");
    }
    savePDF(escapeRoom) {
        escapeRoomToPDF(escapeRoom);
    }
    handleItemClick = (i, action) => (e) => {
        const escapeRoom = this.props.escapeRooms[i];
        switch(action){
            case 'EDIT':
                if(this.props.editEscapeRoom)   
                    this.props.editEscapeRoom(escapeRoom);
                break;
            case 'JSON':
                this.saveJSON(escapeRoom);
                break;
            case 'PDF':
                this.savePDF(escapeRoom);
                break;
            case 'DELETE':
                if(this.props.deleteEscapeRoom)
                    this.props.showModal(new Modal("Warning","Are you sure you want to delete "+escapeRoom.details.name+"?","Yes",()=>{this.props.deleteEscapeRoom(escapeRoom)},"No",()=>{}));
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
                    <DropdownItem onClick={this.handleItemClick(i,'EDIT')} disabled={this.props.escapeRooms[i].components[0].version===undefined?false:true}>Edit</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'JSON')}>Export as JSON</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'PDF')}>Export as PDF</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'DELETE')}>Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ListGroupItem>)
    };
    render() {
        const escapeRooms = this.props.escapeRooms;
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