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
        if(this.props.verify){
            var result = await this.props.verify(this.props.token);
            this.setState({color:result.type,message:result.message});
        }
    }

    /**
     * Sends Verify Email
     * @function
     */
    sendVerify = async () => {
        if(this.props.sendVerify){
            var result = await this.props.sendVerify();
            this.setState({colour:result.type,message:result.message});
        }
    }

    /**
     * React Lifecycle Method
     * Component Mounted
     */
    componentDidMount(){
        if(this.props.token!==undefined && this.props.token!==""){
            this.verify();
        } else {
            this.sendVerify();
        }
    }

    /** 
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        if(this.props.token!==undefined && this.props.token!==""){
            alert(this.props.token);
            return (
                <Container fluid>
                    <Row>
                        <Col>
                            <Alert isOpen={this.state.message!==""} color={this.state.color}>{this.state.message}</Alert>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return(
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>Verify your account</h1>
                            <p>To access The Escape Room Generator, you must first verify your account. Please check your emails and click the link.</p>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
};

Verify.propTypes = {
    token: PropTypes.string,
    verify: PropTypes.func,
    sendVerify: PropTypes.func
}

export default Verify;