import React, {Component} from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem , ListGroup, ListGroupItem , Button } from 'reactstrap';
import ComponentArranger from "./ComponentArranger";
import { saveAs } from 'file-saver';
import Modal from '../../../client/src/models/Modal';
import html2canvas from 'html2canvas';
import {escapeRoomToPDF} from '../../../client/src/pdf/pdf';
import PropTypes from 'prop-types';

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
            dropdownOpen: [false,false],
            escapeRoom: {components:[]},
        }
        this.InputFile = React.createRef();
        this.ComponentArranger = React.createRef();
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
    async savePDF(escapeRoom) {
        let components = await this.convertComponentsToDataURL();
        escapeRoomToPDF(escapeRoom, components);
    }

    async convertComponentsToDataURL() {
        let canvas;
        this.ComponentArranger.current.style.display = "block";
        canvas = await html2canvas(this.ComponentArranger.current);
        this.ComponentArranger.current.style.display = "none";
        return canvas.toDataURL("image/png");
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
        this.setState({escapeRoom},() => {
            switch(action){
                case 'EDIT':
                    if(this.props.editEscapeRoom)   
                        this.props.editEscapeRoom(escapeRoom);
                    break;
                case 'RUN':
                    if(this.props.runEscapeRoom)
                        this.props.runEscapeRoom(escapeRoom);
                    break;
                case 'JSON':
                    this.saveJSON(escapeRoom);
                    break;
                case 'PDF':
                    this.savePDF(escapeRoom);
                    break;
                case 'JSONANDPDF':
                    this.saveJSON(escapeRoom);
                    this.savePDF(escapeRoom);
                    break;
                case 'DELETE':
                    if(this.props.deleteEscapeRoom)
                        this.props.showModal(new Modal("Warning","Are you sure you want to delete "+escapeRoom.details.name+"?","Yes",()=>{this.props.deleteEscapeRoom(escapeRoom)},"No",()=>{}));
                    break;
                default:
                    return;
            }
        });
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
        let escapeRoom = JSON.parse(text);
        delete escapeRoom._id; // Delete existing id so a new one is generated
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
                    <DropdownItem onClick={this.handleItemClick(i,'RUN')}>Run</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'JSON')}>Export as JSON</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'PDF')}>Export as PDF</DropdownItem>
                    <DropdownItem onClick={this.handleItemClick(i,'JSONANDPDF')}>Export as JSON and PDF</DropdownItem>
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
        const empty = function(){}
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
                <Row>
                    <Col>
                        <div ref={this.ComponentArranger} style={{
                            display:"none",
                            position:"fixed",
                            left:"110vw",
                            width:"790px",
                            }}>
                            <ComponentArranger components={this.state.escapeRoom.components} showModal={empty} handleComponentClick={empty} updateComponent={empty} addComponent={empty} removeComponent={empty} addRelationship={empty}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
};

Dashboard.propTypes = {
    escapeRooms: PropTypes.array,
    showModal: PropTypes.func,
    editEscapeRoom: PropTypes.func,
    newEscapeRoom: PropTypes.func,
    deleteEscapeRoom: PropTypes.func,
    runEscapeRoom: PropTypes.func,
}

export default Dashboard;