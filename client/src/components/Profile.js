import React, {Component}  from 'react';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            edit: false,
            message: "",
            email: "",
            password: "",
            color: "success"
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
        this.setState({message: ""});
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
                    this.setState({message:"Email Required",color:"danger"});
                    return;
                }
                if(this.state.password===""){
                    this.setState({message:"Your current password is required for authentication",color:"danger"})
                    return;
                }
                if(this.props.identityChange){
                    let result = await this.props.identityChange(user.email, this.state.password, {email:this.state.email});
                    this.setState({message:result.message, color:result.color});
                }
                break;
            case 'cancelButton':
                this.setState({edit:false});
                break;
            case 'passwordButton':
                if(this.props.sendPasswordReset){
                    let result = await this.props.sendPasswordReset();
                    this.setState({message:result.message, color:result.color});
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
            })
        }
    }

    render() {
        if(this.state.edit)
            // Edit Profile
            return (
            <Container fluid>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Confirm Password</Label>
                                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                            </FormGroup>
                            <Button id="cancelButton" onClick={this.handleClick} block>Cancel</Button>
                            <Button id="saveButton" onClick={this.handleClick} block>Save</Button>
                            <Alert isOpen={this.state.message !== ""} toggle={this.handleDismiss} color={this.state.color}>{this.state.message}</Alert>
                        </Form>
                    </Col>
                </Row>
            </Container>
            );
        else 
            // Profile
            return (
            <Container fluid>
                <Row>
                    <Col>
                        <img id="ProfileImage" className="img-fluid" src={this.props.user.avatar} alt="Profile" />
                        <p className="text-center">{this.props.user.email}</p>
                        <Button id="editButton" block className="text-center" onClick={this.handleClick}>Edit Email</Button>
                        <Button id="passwordButton" block className="text-center" onClick={this.handleClick}>Password Reset</Button>
                    </Col>
                </Row>
            </Container>
            );
    }
};

export default Profile;