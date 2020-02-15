import React, {Component}  from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * Class for Verify
 * @extends Component
 * @author Alistair Quinn
 */
class Verify extends Component {
    /** Creates Verify */
    constructor(props){
        super(props);
        this.state = {color:"success",message:""};
    }

    /**
     * Verifies Token from URL
     * @function
     */
    verify = async () => {
        alert("verify");
        return this.props.verify(this.props.token);
    }

    /**
     * Sends Verify Email
     * @function
     */
    sendVerify = async () => {
        alert("sendverify");
        return this.props.sendVerify();
    }

    /**
     * React Lifecycle Method
     * Component Mounted
     */
    async componentDidMount(){
        let result;
        console.log(this.props);
        if(this.props.token!==undefined && this.props.token!=="" && this.props.token!=="signup")
            result = await this.verify();
        else
            result = await this.sendVerify();
        this.setState(result,()=>alert(this.state));
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
                        <p>To access The Escape Room Generator, you must first verify your account. Please check your emails and click the link.</p>
                        <Alert isOpen={this.state.message!==""} color={this.state.color}>{this.state.message}</Alert>
                    </Col>
                </Row>
            </Container>
        )
    }
};

Verify.propTypes = {
    token: PropTypes.string,
    verify: PropTypes.func,
    sendVerify: PropTypes.func
}

export default Verify;