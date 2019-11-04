import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            message: "",
            color: "success"
        }
    }

    //Handles login form submit event
    handleSubmit = async (event) => {
        event.preventDefault();
        //Authenticate credentials 
        if(this.props.authenticateCredentials){
            var err = await this.props.authenticateCredentials({strategy:'local',email:this.state.email,password:this.state.password});
            this.setState({message:err, color:"danger"});
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
    handleClick = (event) => {
        event.preventDefault();
        if(this.props.sendReset){
            let result = await this.props.sendReset(this.state.email);
            this.setState({message:result.message, color:result.color});
        }
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
                                <Button>Login</Button>
                                <FormText>
                                    Don't have an account? Sign Up <Link to="/signup">Here</Link>
                                </FormText>
                                <FormText>
                                    Forgotten Password? Enter your email above and then <button onClick={handleClick} className="form-control">Click Here</button>
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