import React, {Component}  from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * Class for Verify
 * @extends Component
 * @author Alistair Quinn
 */
class VerifyToken extends Component {
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
        if(this.props.token!==undefined && this.props.token!==""){
            result = await this.props.verifyToken(this.props.token);
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
                        <h1>Verifying your account</h1>
                        <p>The app is verifying your account. If you recieve an error please email support.</p>
                        <p>You will need to re-login when this is complete</p>
                        <Alert isOpen={this.state.message!==""} color={this.state.color}>{this.state.message}</Alert>
                    </Col>
                </Row>
            </Container>
        )
    }
};

VerifyToken.propTypes = {
    token: PropTypes.string,
    verifyToken: PropTypes.func,
}

export default VerifyToken;