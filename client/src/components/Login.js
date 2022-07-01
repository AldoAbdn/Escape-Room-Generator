import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from 'prop-types';

/**
 * Class for Login
 * @extends Component
 * @author Alistair Quinn
 */
class Login extends Component {
    /** Creates Login */
    constructor() {
        super();
        this.state = {
            email:"",
            password:"",
            message: "",
            color: "success",
            recaptcha: false
        }
    }

    /**
     * Handles form submit
     * @function
     * @param {Event} e
     */
    handleSubmit = async (e) => {
        e.preventDefault();
        //Authenticate credentials 
        if(this.state.email!=="" && this.state.password!=="" && this.state.recaptcha && this.props.authenticate){
            var result = await this.props.authenticate({strategy:'local',email:this.state.email,password:this.state.password});
            this.setState(result);
        } else if (this.composeErrorMessage() !== "") {
            this.setState({color:"danger",message:this.composeErrorMessage()});
        }
    }

    /**
     * Handles Input Change
     * @function
     * @param {Event} e
     */
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, ()=>this.setState({color:"danger",message:this.composeErrorMessage()}));
    }

    /**
     * Composes Error Message
     * @function
     * @returns {String}
     */
    composeErrorMessage = () => {
        let messages = [];
        if(this.state.email === "" || this.state.email.includes(" ") || this.state.email.includes("$") || !this.state.email.includes("@") || !this.state.email.includes("."))
            messages.push("Invalid Email");
        return messages.join(", ");   
    }

    /**
     * Handles Alert Dismiss
     * @function
     * @param {Event} e
     */
    handleDismiss = (e) => {
        this.setState({message: "", color:"success"});
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
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        return (
            <div className="login full-container verticaly-center-content">
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
                                <FormGroup>
                                    <div style={{"width":"fit-content","margin":"auto"}}>
                                        <ReCAPTCHA
                                            sitekey={process.env.REACT_APP_RECAPTCHA}
                                            onChange={this.handleReCAPTCHA}
                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button block disabled={this.state.email==="" || this.state.password==="" || this.state.message!=="" || !this.state.recaptcha}>Login</Button>
                                </FormGroup>
                                <FormText>
                                    Don't have an account? Sign Up <Link to="/signup">Here</Link>
                                </FormText>
                                <FormText>
                                    Forgotten Password? <Link to="/reset">Click Here</Link>
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

Login.propTypes = {
    authenticate: PropTypes.func,
}

export default Login;