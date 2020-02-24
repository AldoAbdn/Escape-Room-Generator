import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import PasswordStrengthMeter from './PasswordStrengthMeter'
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from 'prop-types';

/**
 * Class for Signup
 * @extends Component
 * @author Alistair Quinn
 */
class Signup extends Component {
    /** Creates Signup */
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            password2:"",
            message: "",
            testResult: {}
        }
    }

    /**
     * Handles Form Submit
     * @function
     * @param {Event} e
     */
    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.email!=="" && this.state.password!=="" && this.state.password2!=="" && this.state.password===this.state.password2 && this.state.recaptcha && this.props.signUp){
            let err = await this.props.signUp({email:this.state.email,password:this.state.password});
            this.setState({message:err});
        } else {
            this.setState({message:"Error"});
        }
    }

    /**
     * Handles Input Change
     * @function
     * @param {Event} e
     */
    handleChange = (e) => {
        if(e.target.id === "password"){
            this.setState({
                [e.target.id]: e.target.value,
                testResult: zxcvbn(e.target.value)
            },()=>this.setState({message:this.composemessage()}));
        } else {
            this.setState({
                [e.target.id]: e.target.value,
            },()=>this.setState({message:this.composemessage()}));
        }
    }

    /**
     * Composes Error Message
     * @function
     * @returns {String}
     */
    composemessage = () => {
        let messages = [];
        if(this.state.password!==""&&this.state.password!==this.state.password2)
            messages.push("Passwords Must Match");
        if(this.state.testResult.score<4)
            messages.push("Password Not Strong Enough");
        if(this.state.password.length < 8)
            messages.push("Password Too Short");
        if(this.state.email.includes(" ") || this.state.email.includes("$") || !this.state.email.includes("@"))
            messages.push("Invalid Email");
        return messages.join(", ");   
    }

    /**
     * Handles Alert Dismiss
     * @function
     */
    handleDismiss = () => {
        this.setState({message: ""});
    }

    /**
     * Handles Test Result
     * @function
     */
    handleTestResult = (testResult) => {
        this.setState({testResult:testResult});
    }

    /**
     * Handles ReCAPTCHA
     * @function
     * @param {bool} value
     */
    handleReCAPTCHA = (value) => {
        this.setState({recaptcha:value})
    }

    /** 
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
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
                                <FormGroup>
                                    <div style={{"width":"fit-content","margin":"auto"}}>
                                        <ReCAPTCHA
                                            sitekey={process.env.REACT_APP_RECAPTCHA}
                                            onChange={this.handleReCAPTCHA}
                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button block disabled={this.state.email==="" || this.state.password==="" || this.state.message!=="" || !this.state.recaptcha}>Sign Up</Button>
                                </FormGroup>
                                <FormText>
                                    Passwords must be strong and 8 characters in length or more
                                </FormText>
                                <FormText>
                                    Have an account? Log In <Link to="/login">Here</Link>
                                </FormText>
                                <Alert isOpen={this.state.message !== ""} toggle={this.handleDismiss} color="danger">{this.state.message}</Alert>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};

Signup.propTypes = {
    signUp: PropTypes.func
}

export default Signup;