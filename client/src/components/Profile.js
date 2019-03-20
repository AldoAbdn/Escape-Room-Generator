import React, {Component}  from 'react';
import { Container, Row, Col, Card, CardImg, CardBody,
    CardTitle, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            edit: false,
            errorMessage: "",
            email: "",
            password: "",
            _id: ""
        };
    }
    //Handles login form submit event
    handleSubmit = async (event) => {
        event.preventDefault();
        if(this.props.updateUser)
            this.props.updateUser({email:this.state.email,password:this.state.password});
    }

    //Changes state on input change
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    //Handles error dismiss
    handleDismiss = (event) => {
        this.setState({errorMessage: ""});
    }

    handleClick = async (event) => {
        event.preventDefault();
        switch (event.target.id) {
            case 'editButton':
                this.setState({edit:true});
                break;
            case 'saveButton':
                let user = this.props.user;
                if(this.state.email===""){
                    this.setState({errorMessage:"Email Required"});
                    return;
                } else {
                    user.email = this.state.email;
                }
                if(this.state.password!=="")
                    user.password = this.state.password;
                if(this.props.updateUser!==undefined){
                    let response = await this.props.updateUser(user);
                    if(response===true){
                        this.setState({edit:false});
                    } else {
                        this.setState({errorMessage:"Error, Please Try Again Later"});
                    }
                }
                    
                break;
            default:
        }
    }

    componentDidMount(){
        const user = this.props.user;
        this.setState({
            email: user.email
        })
    }

    componentDidUpdate(oldProps){
        const newProps = this.props;
        if(oldProps.user.email !== newProps.user.email){
            const user = this.props.user;
            this.setState({
                email: user.email,
                _id: user._id
            })
        }
    }

    render() {
        this.profile = 
            <Container fluid>
                <Row>
                    <Col>
                        <img id="ProfileImage" className="img-fluid" src={this.props.user.avatar} alt="Profile Image" />
                        <p className="text-center">{this.props.user.email}</p>
                        <Button id="editButton" block className="text-center" onClick={this.handleClick}>Edit Profile</Button>
                    </Col>
                </Row>
            </Container>
        this.editProfile = 
        <Container fluid>
            <Row>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                        </FormGroup>
                        <Button id="saveButton" onClick={this.handleClick} block>Save</Button>
                        <Alert isOpen={this.state.errorMessage !== ""} toggle={this.handleDismiss} color="danger">{this.state.errorMessage}</Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
        if(this.state.edit)
            return this.editProfile;
        else 
            return this.profile;
    }
};

export default Profile;