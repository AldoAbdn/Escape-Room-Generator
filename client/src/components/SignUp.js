import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class Signup extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password"/>
                            </FormGroup>
                            <Button>Sign Up</Button>
                            <FormText>
                                Already have an account? Login <Link to="/login">Here</Link>
                            </FormText>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Signup;