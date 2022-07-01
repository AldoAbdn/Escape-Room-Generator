import React, {Component} from 'react';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import PasswordStrengthMeter from './PasswordStrengthMeter'
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from 'prop-types';

/**
 * Class for Reset
 * @extends Component
 * @author Alistair Quinn
 */
class ResetToken extends Component {
    /** Creates Reset */
    constructor() {
        super();
        this.state = {
            password:"",
            password2:"",
            message: "",
            color:"success",
            testResult: {},
        }
    }

    /**
     * Handles Form Submit
     * @function
     * @param {Event} e
     */
    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.password!=="" && this.state.password===this.state.password2 && this.props.resetToken){
            let result = await this.props.resetToken(this.props.token,this.state.password);
            this.setState(result);
        }
    }

    /**
     * Handles Input Change
     * @function
     */
    handleChange = (e) => {
        if(e.target.id === "password")
            this.setState({testResult: zxcvbn(e.target.value)});
        this.setState({
            [e.target.id]: e.target.value,
        },()=>this.setState({color:"danger",message:this.composemessage()}));
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
        if(this.state.testResult.score < 3)
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
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <div className="reset full-container verticaly-center-content">
                <Container>
                    <Row>
                        <Col>
                            <h1>Password Reset</h1>
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
                                <Alert isOpen={this.state.message !== ""} toggle={this.handleDismiss} color={this.state.color}>{this.state.message}</Alert>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

ResetToken.propTypes = {
    resetToken: PropTypes.func,
}

export default ResetToken;