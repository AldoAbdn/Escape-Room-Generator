import React, {Component} from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem , ListGroup, ListGroupItem , Button } from 'reactstrap';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

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
        const userId = this.props.redux.state.user._id
        await this.props.services['escape-rooms'].create({name:'Unnamed',userId:userId})
            .then((queryResult) => {
                console.log(queryResult);
                if(queryResult.action.type.includes('FULFILLED')){
                    const escapeRoom = queryResult.value;
                    if (escapeRoom!=null){
                        const i = this.props.redux.state.escapeRooms.length + 1;
                        
                        this.props.history.push('/designer/'+i);
                    }
                }
            })
            .catch((err)=>{
                console.log(err);
            });
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
    handleItemClick = (i, action) => (e) => {
        console.log(i);
        console.log(this.props.redux.state.escapeRooms);
        const escapeRoom = this.props.redux.state.escapeRooms[i];
        const escapeRoomService = this.props.services['escape-rooms'];
        const removeEscapeRoom = this.props.redux.actions.removeEscapeRoom;
        switch(action){
            case 'EDIT':
                this.props.history.push('/designer/'+i);
                break;
            case 'JSON':
                this.saveJSON(JSON.stringify(escapeRoom),escapeRoom.name);
                break;
            case 'PDF':
                this.savePDF(escapeRoom);
                break;
            case 'DELETE':
                escapeRoomService.remove(escapeRoom._id);
                removeEscapeRoom(escapeRoom);
                break;
        }
    }
    mapEscapeRoomToList = (escapeRoom,i) => {
        return (
        <ListGroupItem key={i}>{escapeRoom.name}
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
    updateEscapeRooms = () => {
        const self = this;
        const userId = this.props.redux.state.user._id;
        //Get User Details and Update Redux Store
        if (userId != null && userId != undefined)
            this.props.services['escape-rooms'].find({query:{userId:userId}})
            .then((queryResult)=>{
                if(queryResult.action.type.includes('FULFILLED')){
                    const escapeRooms = queryResult.value.data;
                    if (escapeRooms!=null && escapeRooms!=undefined)
                        this.props.redux.actions.updateEscapeRooms(escapeRooms);
                        self.setState({loading:false});
                    }
            });
    }
    componentDidUpdate(oldProps){
        const oldRedux = oldProps.redux.state;
        const redux = this.props.redux.state;
        if (this.state.firstLoad){
            this.updateEscapeRooms();
            this.setState({firstLoad:false});
        }else if (oldRedux.user.email!=undefined && (oldRedux.escapeRooms.length != redux.escapeRooms.length)){
            this.updateEscapeRooms();
        }
    }
    componentDidMount(){
        this.updateEscapeRooms();
    }
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