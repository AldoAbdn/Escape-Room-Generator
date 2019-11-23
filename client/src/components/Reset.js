import React, {Component} from 'react';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import PasswordStrengthMeter from './PasswordStrengthMeter'
import zxcvbn from 'zxcvbn';

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            password2:"",
            message: "",
            color:"success",
            testResult: {}
        }
    }

    //Handles login form submit event
    handleSubmit = async (event) => {
        event.preventDefault();
        if(this.props.password!=="" && this.props.password===this.props.password2 && this.props.signUp){
            let result = await this.props.reset(this.state.email,this.props.token,this.state.password);
            this.setState({message:result.message, color:result.color});
        }
    }

    //Changes state on input change
    handleChange = (event) => {
        if(event.target.id === "password"){
            this.setState({
                [event.target.id]: event.target.value,
                testResult: zxcvbn(event.target.value)
            },()=>this.setState({message:this.composemessage()}));
        } else {
            this.setState({
                [event.target.id]: event.target.value,
            },()=>this.setState({message:this.composemessage()}));
        }
    }

    composemessage = () => {
        let messages = [];
        if(this.state.password!==""&&this.state.password!==this.state.password2)
            messages.push("Passwords Must Match");
        if(this.state.testResult.score<4)
            messages.push("Password Not Strong Enough");
        if(this.state.password.length < 8)
            messages.push("Password Too Short");
        if(this.state.email.includes(" ") || this.state.email.includes("$"))
            messages.push("Invalid Email");
        return messages.join(", ");   
    }

    //Handles error dismiss
    handleDismiss = (event) => {
        this.setState({message: ""});
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
                                <Button disabled={this.state.email==="" || this.state.password==="" || this.state.password !== this.state.password2 || this.state.message!==""}>Sign Up</Button>
                                <FormText>
                                    Passwords must be strong and 8 characters in length or more
                                </FormText>
                                <Alert isOpen={this.state.message !== ""} toggle={this.handleDismiss} color={this.state.color}>{this.state.message}</Alert>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};

export default Reset;