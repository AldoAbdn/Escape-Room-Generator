import React, {Component} from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,Dropdown, DropdownToggle, DropdownMenu, DropdownItem , ListGroup, ListGroupItem ,Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

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
    handleClick = (e) => {
        
    }
    handleItemClick = (i, action) => (e) => {
        switch(action){
            case 'EDIT':
                break;
            case 'JSON':
                break;
            case 'PDF':
                break;
            case 'DELETE':
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
    updateEscapeRooms(){
        const user = this.props.redux.state.user;
        //Get User Details and Update Redux Store
        this.props.services.escapeRooms.find({userId:user._id})
        .then((queryResult)=>{
            if(queryResult.action.type.includes('FULFILLED')){
                const escapeRooms = queryResult.value.data[0];
                this.props.redux.actions.updateEscapeRooms(escapeRooms);
            }
        });
    }
    componentDidMount(){
        this.updateEscapeRooms();
    }
    componentWillUpdate(oldProps){
        if (oldProps.redux.state.user != this.props.redux.state.user){
            this.updateEscapeRooms();
        }
    }
    render() {
        const escapeRooms = [{name:"test1"},{name:"test2"}];
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