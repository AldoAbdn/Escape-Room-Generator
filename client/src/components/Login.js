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
    constructor(props) {
        super(props);
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
        if(this.state.email!=="" && this.state.password!=="" && this.state.recaptcha && this.props.authenticateCredentials){
            var err = await this.props.authenticateCredentials({strategy:'local',email:this.state.email,password:this.state.password});
            this.setState({message:err, color:"danger"});
        } else {
            this.setState({message:"Error"})
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
        });
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
     * Handles Reset Password Click
     * @function
     * @param {Event} e
     */
    handleClick = async (e) => {
        e.preventDefault();
        if(this.props.sendReset){
            let result;
            try {
                result = await this.props.sendReset(this.state.email);
            } catch (error) {
                result = {color:"warning", message:"An error occured, a password reset email may have been sent"};
            }
            this.setState(result);
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
                                <ReCAPTCHA
                                    sitekey={process.env.REACT_APP_RECAPTCHA}
                                    onChange={this.handleReCAPTCHA}
                                />
                                <Button disabled={this.state.email==="" || this.state.password==="" || this.state.message!=="" || !this.state.recaptcha}>Login</Button>
                                <FormText>
                                    Don't have an account? Sign Up <Link to="/signup">Here</Link>
                                </FormText>
                                <FormText>
                                    Forgotten Password? Enter your email above and then <button onClick={this.handleClick} className="btn btn-link" style={{padding:0,fontSize:'inherit'}}>Click Here</button>
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

Login.propTypes = {
    authenticateCredentials: PropTypes.func,
}

export default Login;