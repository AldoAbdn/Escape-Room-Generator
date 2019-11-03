import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import PasswordStrengthMeter from './PasswordStrengthMeter'
import zxcvbn from 'zxcvbn';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            password2:"",
            errorMessage: "",
            testResult: {}
        }
    }

    //Handles login form submit event
    handleSubmit = async (event) => {
        event.preventDefault();
        if(this.props.password!=="" && this.props.password===this.props.password2 && this.props.signUp){
            let err = await this.props.signUp({email:this.state.email,password:this.state.password});
            this.setState({errorMessage:err});
        }
    }

    //Changes state on input change
    handleChange = (event) => {
        if(event.target.id === "password"){
            this.setState({
                [event.target.id]: event.target.value,
                testResult: zxcvbn(event.target.value)
            },()=>this.setState({errorMessage:this.composeErrorMessage()}));
        } else {
            this.setState({
                [event.target.id]: event.target.value,
            },()=>this.setState({errorMessage:this.composeErrorMessage()}));
        }
    }

    composeErrorMessage = () => {
        let errorMessages = [];
        if(this.state.password!==""&&this.state.password!==this.state.password2)
            errorMessages.push("Passwords Must Match");
        if(this.state.testResult.score<4)
            errorMessages.push("Password Not Strong Enough");
        if(this.state.password.length < 8)
            errorMessages.push("Password Too Short");
        if(this.state.email.contains(" ") || this.state.email.contains("$"))
            errorMessages.push("Invalid Email");
        return errorMessages.join(", ");   
    }

    //Handles error dismiss
    handleDismiss = (event) => {
        this.setState({errorMessage: ""});
    }

    handleTestResult = (testResult) => {
        this.setState({testResult:testResult});
    }

    render() {
        return (
            <div className="sign-up full-container verticaly-center-content">
                <Container>
                    <Row>
                        <Col>
                            <Form noValidate onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input required type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input required type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                                    <PasswordStrengthMeter score={this.state.testResult.score}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password2">Re-Type Password</Label>
                                    <Input required type="password" name="password2" id="password2" value={this.state.password2} onChange={this.handleChange}/>
                                </FormGroup>
                                <Button disabled={this.state.email==="" || this.state.password==="" || this.state.password !== this.state.password2 || this.state.errorMessage!==""}>Sign Up</Button>
                                <FormText>
                                    Passwords must be strong and 8 characters in length or more
                                </FormText>
                                <FormText>
                                    Have an account? Log In <Link to="/login">Here</Link>
                                </FormText>
                                <Alert isOpen={this.state.errorMessage !== ""} toggle={this.handleDismiss} color="danger">{this.state.errorMessage}</Alert>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};

export default Signup;