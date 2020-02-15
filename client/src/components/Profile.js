import React, {Component}  from 'react';
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
            edit: false,
            message: "",
            email: "",
            password: "",
            color: "success"
        };
    }
    
    /**
     * Handles form submit
     * @function
     * @param {Event} e
     */
    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.props.updateUser)
            this.props.updateUser({email:this.state.email,password:this.state.password});
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
        switch (e.target.id) {
            case 'editButton':
                this.setState({edit:true});
                break;
            case 'saveButton':
                let user = this.props.user;
                if(this.state.email==="")
                    this.setState({message:"Email Required",color:"danger"});
                else if(this.state.password==="")
                    this.setState({message:"Your current password is required for authentication",color:"danger"})
                else if(this.props.identityChange){
                    let result;
                    try{
                        result = await this.props.identityChange(user.email, this.state.password, {email:this.state.email});
                    } catch(error) {
                        result = "An error occured, your email may have been changed"
                    }
                    this.setState(result);
                }
                break;
            case 'cancelButton':
                this.setState({edit:false});
                break;
            case 'passwordButton':
                let result;
                try{
                    result = await this.props.sendPasswordReset();
                }catch(error){
                    result = {color:"warning", message:"An error occured, a password reset email may have been sent"}
                }
                this.setState(result);
                break;
            default:
        }
    }

    /**
     * React Lifecycle Method
     * Component Mounted
     */
    componentDidMount(){
        const user = this.props.user;
        this.setState({
            email: user.email
        })
    }

    /**
     * React Lifecycle Method
     * Component Updated
     * @param {Object} oldProps 
     */
    componentDidUpdate(oldProps){
        const newProps = this.props;
        if(oldProps.user.email !== newProps.user.email){
            const user = this.props.user;
            this.setState({
                email: user.email,
            })
        }
    }

    /**
     * React Lifecycle Method
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        if(this.state.edit)
            // Edit Profile
            return (
            <Container fluid>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Confirm Password</Label>
                                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                            </FormGroup>
                            <Button id="cancelButton" onClick={this.handleClick} block>Cancel</Button>
                            <Button id="saveButton" onClick={this.handleClick} block>Save</Button>
                            <Alert isOpen={this.state.message !== ""} toggle={this.handleDismiss} color={this.state.color}>{this.state.message}</Alert>
                        </Form>
                    </Col>
                </Row>
            </Container>
            );
        else 
            // Profile
            return (
            <Container fluid>
                <Row>
                    <Col>
                        <img id="ProfileImage" className="img-fluid" src={this.props.user.avatar} alt="Profile" />
                        <p className="text-center">{this.props.user.email}</p>
                        <Button id="editButton" block className="text-center" onClick={this.handleClick}>Edit Email</Button>
                        <Button id="passwordButton" block className="text-center" onClick={this.handleClick}>Password Reset</Button>
                    </Col>
                </Row>
            </Container>
            );
    }
};

Profile.propTypes = {
    user: PropTypes.object,
    identityChange: PropTypes.func,
    sendPasswordReset: PropTypes.func,
}

export default Profile;