import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strategy: 'local',
            email:"",
            password:"",
            errorMessage: ""
        }
    }

    //Handles login form submit event
    handleSubmit = async (event) => {
        event.preventDefault();
        //Authenticate with feathersjs
        await this.props.feathersClient.authenticate(this.state)
        .then((output) => {
            this.props.services.users.find({email:this.state.email});
            this.props.history.push('/dashboard');
        })
        .catch((err) => {
            this.setState({errorMessage:err.message});
        });
    }

    //Changes state on input change
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    //Handles error dismiss
    handleDismiss = (event) => {
        this.setState({errorMessage: ""});
    }

    render() {
        return (
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
                            <Alert isOpen={this.state.errorMessage !== ""} toggle={this.handleDismiss} color="danger">{this.state.errorMessage}</Alert>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Login;