import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";

class Login extends Component {
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

    //Handles login form submit event
    handleSubmit = async (event) => {
        event.preventDefault();
        //Authenticate credentials 
        if(this.state.email!=="" && this.state.password!=="" && this.state.recaptcha && this.props.authenticateCredentials){
            var err = await this.props.authenticateCredentials({strategy:'local',email:this.state.email,password:this.state.password});
            this.setState({message:err, color:"danger"});
        } else {
            this.setState({message:"Error"})
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
        this.setState({message: "", color:"success"});
    }

    //Handles button click
    handleClick = async (event) => {
        event.preventDefault();
        if(this.props.sendReset){
            let result = await this.props.sendReset(this.state.email);
            this.setState({message:result.message, color:result.color});
        }
    }

    handleReCAPTCHA = (value) => {
        this.setState({recaptcha:value})
    }

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
                                    Forgotten Password? Enter your email above and then <button onClick={this.handleClick} className="form-control">Click Here</button>
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

export default Login;