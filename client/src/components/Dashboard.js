import React, {Component} from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem , ListGroup, ListGroupItem , Button } from 'reactstrap';
import { saveAs } from 'file-saver';
import Modal from '../../../client/src/models/Modal';
import {escapeRoomToPDF} from '../../../client/src/pdf/pdf';
import PropTypes from 'prop-types';
import { EscapeRoom } from '../models';

/**
 * Class for Dashboard that shows users escape rooms 
 * @extends Component
 * @author Alistair Quinn
 */
class Dashboard extends Component {
    /** Creates Dashboard */
    constructor(){
        super();
        this.state = {
            dropdownOpen: [false,false]
        }
        this.InputFile = React.createRef();
    }

    /**
     * Handles Toggle
     * @function
     * @param {int} i index
     * @param {Event} e 
     */
    handleToggle = (i) => (e) => {
        var dropdownOpen = this.state.dropdownOpen;
        dropdownOpen[i] = !dropdownOpen[i];
        this.setState({dropdownOpen});
    }

    /**
     * Handles Add Escape Room Click
     * @function
     * @param {Event} e
     */
    handleClick = async (e) => {
        switch(e.target.id){
            case "newButton":
                if(this.props.newEscapeRoom)
                    this.props.newEscapeRoom();
                    break;
            case "importButton":
                this.InputFile.current.click();
                break;
            default:
                return;
        }
    }

    /**
     * Saves an Escape Room as JSON 
     * @param {EscapeRoom} escapeRoom 
     */
    saveJSON(escapeRoom) {
        const blob = new Blob([JSON.stringify(escapeRoom)],{type:'text/plain;charset=utf-8'});
        saveAs(blob, escapeRoom.details.name+".json");
    }

    /**
     * Saves an Escape Room as PDF
     * @param {EscapeRoom} escapeRoom 
     */
    savePDF(escapeRoom) {
        escapeRoomToPDF(escapeRoom);
    }

    /**
     * Handles Dropdown Menu Item Click
     * @function
     * @param {int} i index
     * @param {string} action 
     * @param {Event} e
     */
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

    /**
     * Handles File Input Change
     * @param {Event} e 
     */
    handleChange = async(e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            let escapeRoom = await this.convertJSONFileToEscapeRoom(files[0]);
            if(this.props.newEscapeRoom != null)
                this.props.newEscapeRoom(escapeRoom);
        }
    }

    /**
     * Reads JSON File and Converts to Object
     * @param {File} file 
     * @returns {EscapeRoom}
     */
    convertJSONFileToEscapeRoom = async(file) => {
        let text = await file.text();
        let escapeRoomObject = JSON.parse(text);
        delete escapeRoomObject._id; // Delete existing id so a new one is generated
        let escapeRoom = EscapeRoom.convert(escapeRoomObject);
        return escapeRoom;
    }

    /**
     * Maps Escape Rooms to List Item
     * @function
     * @param {EscapeRoom} escapeRoom
     * @param {int} i index
     */
    mapEscapeRoomToList = (escapeRoom,i) => {
        return (
        <ListGroupItem key={i}>{escapeRoom.details.name}
            <Dropdown style={{display:'inline', position: 'absolute', right:'20px'}} isOpen={this.state.dropdownOpen[i]} toggle={this.handleToggle(i)}>
                <DropdownToggle caret/>
                <DropdownMenu right>
                    <DropdownItem onClick={this.handleItemClick(i,'EDIT')} disabled={this.props.escapeRooms[i].components[0].version!==undefined?false:true}>Edit</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'JSON')}>Export as JSON</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'PDF')}>Export as PDF</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'DELETE')}>Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ListGroupItem>)
    };

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        const escapeRooms = this.props.escapeRooms;
        return (
            <Container>
                <Row>
                    <Col>
                        <Button id="newButton" block onClick={this.handleClick}>NEW</Button>
                    </Col>
                    <Col>
                        <input id="jsonFile" style={{display: "none"}} accept=".json" ref={this.InputFile} onChange={this.handleChange} type="file" name="file"/>
                        <Button id="importButton" block onClick={this.handleClick}>IMPORT</Button>
                    </Col>
                </Row>
                <br/>
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

Dashboard.propTypes = {
    newEscapeRoom: PropTypes.func,
    escapeRooms: PropTypes.array,
    editEscapeRoom: PropTypes.func,
    deleteEscapeRoom: PropTypes.func,
    showModal: PropTypes.func,
}

export default Dashboard;