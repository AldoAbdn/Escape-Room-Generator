import React, {Component}  from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * Class for Profile
 * @extends Component
 * @author Alistair Quinn
 */
class Profile extends Component {
    /** Creates Profile */
    constructor(){
        super();
        this.state = {
            message: "",
            color: "success"
        };
    }

    /**
     * Handles input change
     * @function
     * @param {Event} e
     */
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    /**
     * Handles Alert Dismiss
     * @function
     * @param {Event} e
     */
    handleDismiss = (e) => {
        this.setState({message: ""});
    }

    /**
     * Handles button clicks
     * @function
     * @param {Event} e
     */
    handleClick = async (e) => {
        e.preventDefault();
        let result = await this.props.sendReset(this.props.user.email);
        this.setState(result);
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
                    <img id="ProfileImage" className="img-fluid" src={this.props.user.avatar} alt="Profile" />
                    <p className="text-center">{this.props.user.email}</p>
                    <Button id="passwordButton" block className="text-center" onClick={this.handleClick}>Password Reset</Button>
                    <Alert isOpen={this.state.message !== ""} toggle={this.handleDismiss} color={this.state.color}>{this.state.message}</Alert>
                </Col>
            </Row>
        </Container>
        );
    }
};

Profile.propTypes = {
    user: PropTypes.object,
    sendReset: PropTypes.func,
}

export default Profile;