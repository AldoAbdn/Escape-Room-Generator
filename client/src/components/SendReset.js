import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * Class for Reset
 * @extends Component
 * @author Alistair Quinn
 */
class SendReset extends Component {
    /** Creates Reset */
    constructor() {
        super();
        this.state = {
            email:"",
            message: "",
            color:"success",
        }
    }

    /**
     * Handles Form Submit
     * @function
     * @param {Event} e
     */
    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.email!=="" && this.props.sendReset){
            let result = await this.props.sendReset(this.state.email);
            this.setState({message:result.message, color:result.color});
        }
    }

    /**
     * Handles Input Change
     * @function
     */
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        },()=>this.setState({message:this.composemessage()}));
    }

    /**
     * Composes Error Message
     * @function
     * @returns {String}
     */
    composemessage = () => {
        let messages = [];
        if(this.state.email.includes(" ") || this.state.email.includes("$") || !this.state.email.includes("@") || !this.state.email.includes("."))
            messages.push("Invalid Email");
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
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input required type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Button block disabled={this.state.email==="" || this.state.message!==""}>Send Password Reset</Button>
                                </FormGroup>
                                <FormText>
                                    Forgotten password? Enter your email above and click the button to recieve a password reset email
                                </FormText>
                                <FormText>
                                    Have an account? Login <Link to="/login">Here</Link>
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

SendReset.propTypes = {
    sendReset: PropTypes.func,
}

export default SendReset;