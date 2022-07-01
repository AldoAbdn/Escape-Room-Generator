import React, {Component}  from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * Class for Verify
 * @extends Component
 * @author Alistair Quinn
 */
class SendVerify extends Component {
    /** Creates Verify */
    constructor(){
        super();
        this.state = {color:"success",message:""};
    }

    /**
     * React Lifecycle Method
     * Component Mounted
     */
    async componentDidMount(){
        let result;
        if(this.props.email!==undefined && this.props.email!==""){
            result = await this.props.sendVerify(this.props.email);
            this.setState(result);
        }
    }

    /** 
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Verify Your Account</h1>
                        <p>To access this app, you must first verify your account. Please check your emails and click the link.</p>
                        <Alert isOpen={this.state.message!==""} color={this.state.color}>{this.state.message}</Alert>
                    </Col>
                </Row>
            </Container>
        )
    }
};

SendVerify.propTypes = {
    email: PropTypes.string,
    sendVerify: PropTypes.func
}

export default SendVerify;