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
        if(this.props.signUp){
            let err = await this.props.signUp({username:this.state.username,password:this.state.password});
            this.setState({errorMessage:err});
        }
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