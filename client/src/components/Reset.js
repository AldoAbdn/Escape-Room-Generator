import React, {Component} from 'react';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import PasswordStrengthMeter from './PasswordStrengthMeter'
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from "react-google-recaptcha";

/**
 * Class for Reset
 * @extends Component
 * @author Alistair Quinn
 */
class Reset extends Component {
    /** Creates Reset */
    constructor(props) {
        super(props);
        this.state = {
            password:"",
            password2:"",
            message: "",
            color:"success",
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
        if(this.props.password!=="" && this.props.password===this.props.password2 && this.props.signUp){
            let result = await this.props.reset(this.props.token,this.state.password);
            this.setState({message:result.message, color:result.color});
        }
    }

    /**
     * Handles Input Change
     * @function
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
     * Handles ReCAPTCHA
     * @function
     * @param {bool} value
     */
    handleReCAPTCHA = (value) => {
        this.setState({recaptcha:value})
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
        return messages.join(", ");   
    }

    /**
     * Handles Alert Dismiss
     * @function
     */
    handleDismiss = (event) => {
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
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        if(this.props.token!==undefined && this.props.token!==""){
            return (
                <div className="sign-up full-container verticaly-center-content">
                    <Container>
                        <Row>
                            <Col>
                                <Form noValidate onSubmit={this.handleSubmit}>
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
                                        <Button block disabled={this.state.password==="" || this.state.message!=="" || !this.state.recaptcha}>Reset Password</Button>
                                    </FormGroup>
                                    <FormText>
                                        Passwords must be strong and 8 characters in length or more
                                    </FormText>
                                    <Alert isOpen={this.state.message !== ""} toggle={this.handleDismiss} color="danger">{this.state.message}</Alert>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        } else {
            return (
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>Password Reset</h1>
                            <p>To reset your password login to your account, click the profile dropdown and click reset password.</p>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Reset;