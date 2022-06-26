import React, {Component}  from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Dashboard, EscapeRoomDesigner, Login, Signup, Tutorials, About, ConditionalRoute, NotFound, Verify, Reset } from '../components/index.js';
import EscapeRoom from '../models/EscapeRoom.js';
import PropTypes from 'prop-types';

/**
 * Business logic of app 
 * handles creating and updating of data 
 * handles navigation 
 * @extends Component
 * @author Alistair Quinn
 */
class BusinessLogic extends Component {
    /**
     * React lifecycle method
     */
    componentWillReceiveProps(){
        this.setState({user:this.props.redux.state.user});
    }

    /**
     * Popultes escape rooms by user ID
     * @param {String} userId
     * @returns {bool} success
     */
    populateEscapeRooms = async (userId) => {
        //Get User Details and Update Redux Store
        if (userId !== null && userId !== undefined){
            let result = await this.props.services['escape-rooms'].find({query:{userId:userId}});
            if(result.action.type.includes('FULFILLED')){
                const escapeRooms = result.value.data;
                if (escapeRooms!==null && escapeRooms!==undefined){
                    this.props.redux.actions.escapeRooms.updateEscapeRooms(escapeRooms);
                    this.setState({loading:false});
                }
            }
        }
    }

    /**
     * Authenticates login credentials 
     * @param {Object} credentials 
     * @returns {string} Error
     */
    authenticateCredentials = async(credentials)=>{
        try {
            let { user } = await this.props.feathersClient.authenticate(credentials);
            if(user!=null){
                user.token = window.localStorage.getItem('feathers-jwt');
                await this.populateEscapeRooms(user._id);
                this.props.redux.actions.user.login(user);
                this.props.history.push('/dashboard');
            }
        } catch(error){
            window.location.reload(true);
            return error.message;
        }
    }

    /**
     * Creates a new user 
     * @param {Object} credentials 
     * @returns {string} Error
     */
    signUp = async(credentials)=>{
        //Create a new user 
        try{
            let queryResult = await this.props.services.users.create(credentials);
            if(queryResult.action.type.includes('FULFILLED')){
                await this.authenticateCredentials(credentials);
                this.props.history.push('/verify');
            }
        } catch(error){
            return error.message;
        }
    }

    /**
     * Opens escape room designer
     * @param {EscapeRoom} escapeRoom
     */
    editEscapeRoom = (escapeRoom) => {
        this.props.redux.actions.escapeRoom.setSelectedEscapeRoom(escapeRoom);
        this.props.history.push('/designer');
    }
    
    /**
     * Creates a new escape room 
     * then opens designer
     */
    newEscapeRoom = async() => {
        const userId = this.props.redux.state.user._id;
        const newEscapeRoom = new EscapeRoom(userId);
        let response = await this.props.services['escape-rooms'].create(newEscapeRoom);
        if(response.action.type.includes('FULFILLED')){
            const escapeRoom = response.value;
            if (escapeRoom!==null){
                this.props.redux.actions.escapeRooms.addEscapeRoom(escapeRoom);
                this.props.redux.actions.escapeRoom.setSelectedEscapeRoom(escapeRoom);
                this.props.history.push('/designer');
            }
        }
    }

    /**
     * Deletes an escape room
     * @function
     * @param {EscapeRoom} escapeRoom
     */
    deleteEscapeRoom = (escapeRoom) => {
        this.props.services['escape-rooms'].remove(escapeRoom._id);
        this.props.redux.actions.escapeRooms.removeEscapeRoom(escapeRoom);
    }

    /**
     * Saves an escape room
     * @function
     * @param {EscapeRoom} escapeRoom
     */
    saveEscapeRoom = async(escapeRoom) => {
        if(escapeRoom._id!==undefined){
            escapeRoom.details.estimatedCost = EscapeRoom.calculateCost(escapeRoom);
            await this.props.services['escape-rooms'].update(escapeRoom._id,escapeRoom);
            await this.props.redux.actions.escapeRooms.updateEscapeRoom(escapeRoom);
        }
        this.props.history.push('/');
    }

    /**
     * Verifies a user account via token
     * @function
     * @param {String} token
     * @returns {Status} Result
     */
    verify = async(token)=>{
        let result = await this.props.services['auth-management'].create({action:'verifySignupLong',value:token});
        if(result.action.type.includes('FULFILLED')){
            return {color:"success", message:"Account Verified"};
        } else {
            return {color:"danger", message:"Error"}
        }
    }

    /**
     * Sends a verify link
     * @function
     * @returns {Status} Result
     */
    sendVerify = async(email)=>{
        let result = await this.props.services['auth-management'].create({action:'resendVerifySignup',value:{email:email}});
        if(result.action.type.includes('FULFILLED')){
            return {color:"success", message:"Verification Email Sent"};
        } else {
            return {color:"danger", message:"Error"}
        }
    }

    /**
     * Resets users password
     * @function
     * @param {String} email
     * @param {String} token
     * @param {String} password
     * @returns {Status} Result
     */
    reset = async(token, password) => {
        let result = await this.props.services['auth-management'].create({action:'resetPwdLong',value:{token,password}});
        if(result.action.type.includes('FULFILLED')){
            return {color:"success", message:"Password Reset"};
        } else {
            return {color:"danger", message:"Error"}
        }
    }

    /**
     * Sends password reset
     * @function
     * @param {String} email
     * @returns {Status} Result
     */
    sendReset = async(email) => {
        let result = await this.props.services['auth-management'].create({action:'sendResetPwd', value:{email:email}});
        if(result.action.type.includes('FULFILLED')){
            return {color:"success", message:"Password Reset Sent, Check Emails"};
        } else {
            return {color:"danger", message:"Error"}
        }
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        const user = this.props.redux.state.user;
        const escapeRooms = this.props.redux.state.escapeRooms;
        const escapeRoom = this.props.redux.state.escapeRoom;
        const escapeRoomActions = this.props.redux.actions.escapeRoom;
        const showModal = this.props.redux.actions.modal.showModal;
        const loggedIn = window.localStorage.getItem("feathers-jwt") != null;
        return (
            <Switch>
                <Redirect exact from="/" to="dashboard"/>
                <ConditionalRoute path="/dashboard" condition={user.isVerified && loggedIn} redirect={'/verify'} render={(routeProps) => (<Dashboard escapeRooms={escapeRooms} showModal={showModal} editEscapeRoom={this.editEscapeRoom} newEscapeRoom={this.newEscapeRoom} deleteEscapeRoom={this.deleteEscapeRoom}/>)}/>
                <ConditionalRoute path="/designer" condition={Object.keys(escapeRoom).length > 0 && escapeRoom!==undefined && loggedIn} redirect={'/'} render={(routeProps) =>(<EscapeRoomDesigner showModal={showModal} escapeRoom={escapeRoom} saveEscapeRoom={this.saveEscapeRoom} updateDetails={escapeRoomActions.updateDetails} updateAccessibility={escapeRoomActions.updateAccessibility} addComponent={escapeRoomActions.addComponent} removeComponent={escapeRoomActions.removeComponent} updateComponent={escapeRoomActions.updateComponent} addRelationship={escapeRoomActions.addRelationship} removeRelationship={escapeRoomActions.removeRelationship}/>)}/>
                <ConditionalRoute path="/login" condition={!loggedIn} redirect={'/dashboard'} render={(routeProps) => (<Login authenticateCredentials={this.authenticateCredentials} sendReset={this.sendReset}/>)}/>
                <ConditionalRoute path="/signup" condition={!loggedIn} redirect={'/dashboard'} render={(routeProps) => (<Signup signUp={this.signUp}/>)}/>
                <Route path="/about" component={About}/>
                <Route path="/tutorials" component={Tutorials}/>
                <ConditionalRoute exact path="/verify" condition={user.email!=undefined} redirect={'/verify'} render={(routeProps) => (<Verify email={user.email} sendVerify={this.sendVerify}/>)}/>
                <Route path="/verify/:token" render={(routeProps) => (<Verify token={routeProps.match.params.token} verify={this.verify} />)}/>
                <Route exact path="/reset" component={Reset}/>
                <Route path="/reset/:token" render={(routeProps) => (<Reset token={routeProps.match.params.token} reset={this.reset}/>)}/>
                <Route component={NotFound}/>
            </Switch> 
        )
    }
};

BusinessLogic.propTypes = {
    history: PropTypes.object,
    feathersClient: PropTypes.object,
    redux: PropTypes.object,
    services: PropTypes.object
}

export default BusinessLogic;