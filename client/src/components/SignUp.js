import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            errorMessage: ""
        }
    }

    //Handles login form submit event
    handleSubmit = async (event) => {
        event.preventDefault();
        //Create a new user 
        await this.props.services.users.create({email:this.state.email, password:this.state.password});
        console.log(this);
        //Authenticate with feathersjs
        await this.props.feathersClient.authenticate({strategy:'local',email:this.state.email,password:this.state.password})
        .then(async (output) => {
            console.log(output);
            //Get User Details and Update Redux Store
            let queryResult = await this.props.services.users.find({email:this.state.email});
            console.log(queryResult);
            if(queryResult.action.type.includes('FULFILLED')){
                var user = queryResult.value.data[0];
                user.token = window.localStorage.getItem('feathers-jwt');
                this.props.redux.actions.login(user);
                this.props.history.push('/dashboard');
            } else {
                this.setState({})
            }
        })
        .catch((err) => {
            this.setState({errorMessage:err.message});
        });
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

    render() {
        return (
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
                            <Button>Sign Up</Button>
                            <FormText>
                                Have an account? Log In <Link to="/login">Here</Link>
                            </FormText>
                            <Alert isOpen={this.state.errorMessage !== ""} toggle={this.handleDismiss} color="danger">{this.state.errorMessage}</Alert>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Signup;