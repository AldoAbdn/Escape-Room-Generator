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

    handleClick = (event) => {
        switch (event.target.id) {
            case 'editButton':
                this.setState({edit:true});
                break;
            case 'saveButton':
                let user = this.props.redux.state.user;
                user.email = this.state.email;
                user.password = this.state.password;
                this.props.services.users.update(this.state._id,user)
                .then((output)=>{
                    let user = output.value;
                    this.props.redux.actions.login(user);
                    this.setState({edit:false});
                });
                break;
            default:
        }
    }

    componentDidMount(){
        const user = this.props.redux.state.user;
        this.setState({
            email: user.email
        })
    }

    componentDidUpdate(oldProps){
        const newProps = this.props;
        if(oldProps.redux.state.user.email !== newProps.redux.state.user.email){
            const user = this.props.redux.state.user;
            this.setState({
                email: user.email,
                _id: user._id
            })
        }
    }

    render() {
        this.profile = 
        <Container>
            <Row>
                <Col>
                    <Card>
                        <CardImg height="50%" src={this.props.redux.state.user.avatar} alt="Profile Image" />
                        <CardBody>
                        <CardTitle className="text-center">{this.props.redux.state.user.email}</CardTitle>
                        <Button id="editButton" block={true} className="text-center" onClick={this.handleClick}>Edit Profile</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        this.editProfile = 
        <Container>
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
                        <Button id="saveButton" onClick={this.handleClick}>Save</Button>
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