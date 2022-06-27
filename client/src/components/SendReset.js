import React, {Component} from 'react';
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
                                    <Label for="email">Email</Label>
                                    <Input required type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Button block disabled={this.state.email==="" || this.state.message!==""}>Send Reset Password</Button>
                                </FormGroup>
                                <FormText>
                                    Forgotten password? Enter your email above and click the button to recieve a password reset email
                                </FormText>
                                <Alert isOpen={this.state.message !== ""} toggle={this.handleDismiss} color="danger">{this.state.message}</Alert>
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