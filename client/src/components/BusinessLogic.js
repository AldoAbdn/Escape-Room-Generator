import React, {Component}  from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Dashboard, EscapeRoomDesigner, EscapeRoomRunner, Login, Signup, Tutorials, About, ConditionalRoute, NotFound, VerifyToken, SendVerify, ResetToken, SendReset, TermsOfService } from './index.js';
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
    componentDidUpdate(prevProps){
        if(this.props.redux.state.user !== prevProps.redux.state.user){
            this.forceUpdate();
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
            let result = await this.props.services.users.create(credentials);
            if(result.action.type.includes('FULFILLED')){
                credentials.strategy = "local";
                let result = await this.props.authenticate(credentials);
                return result;
            }
        } catch(error){
            return {color:"danger", message:error.message};
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
     * Opens escape room designer
     * @param {EscapeRoom} escapeRoom
     */
    runEscapeRoom = (escapeRoom) => {
        this.props.redux.actions.escapeRoom.setSelectedEscapeRoom(escapeRoom);
        this.props.history.push('/runner');
    }
    
    /**
     * Creates a new escape room 
     * then opens designer
     */
    newEscapeRoom = async(newEscapeRoom) => {
        const userId = this.props.redux.state.user._id;
        if(newEscapeRoom == null)
            newEscapeRoom = new EscapeRoom(userId);
        else
            newEscapeRoom.userId = userId;
        let response = await this.props.services['escape-rooms'].create(newEscapeRoom);
        if(response.action.type.includes('FULFILLED')){
            const escapeRoom = EscapeRoom.convert(response.value);
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
    verifyToken = async(token)=>{
        let result = await this.props.authManagement({action:'verifySignupLong',value:token}, "Account Verified. You will be directed to the dashboard or login screen", "Invalid Token");
        if(result.color === "success"){
            setTimeout(() => {
                window.location.reload(true);
                window.location.href="";
            }, 10000);
        };
        return result;
    }

    /**
     * Sends a verify link
     * @function
     * @returns {Status} Result
     */
    sendVerify = async(email)=>{
        let result = await this.props.authManagement({action:'resendVerifySignup',value:{email:email}}, "Verification Email Sent", "An Error occured, Verification email may have been sent");
        return result;
    }

    /**
     * Resets users password
     * @function
     * @param {String} email
     * @param {String} token
     * @param {String} password
     * @returns {Status} Result
     */
    resetToken = async(token, password) => {
        let result = await this.props.authManagement({action:'resetPwdLong',value:{token,password}}, "Password Reset. You will be redirected to the dashboard or login screen", "Invalid Token");
        if(result.color === "success"){
            setTimeout(() => {
                window.location.reload(true);
                window.location.href="";
            }, 10000);
        };
        return result;
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
                <ConditionalRoute path="/dashboard" condition={user.isVerified && loggedIn} redirect={'/verify'} render={(routeProps) => (<Dashboard escapeRooms={escapeRooms} showModal={showModal} editEscapeRoom={this.editEscapeRoom} newEscapeRoom={this.newEscapeRoom} deleteEscapeRoom={this.deleteEscapeRoom} runEscapeRoom={this.runEscapeRoom}/>)}/>
                <ConditionalRoute path="/designer" condition={Object.keys(escapeRoom).length > 0 && escapeRoom!==undefined && loggedIn} redirect={'/'} render={(routeProps) =>(<EscapeRoomDesigner showModal={showModal} escapeRoom={escapeRoom} saveEscapeRoom={this.saveEscapeRoom} updateDetails={escapeRoomActions.updateDetails} updateAccessibility={escapeRoomActions.updateAccessibility} addComponent={escapeRoomActions.addComponent} removeComponent={escapeRoomActions.removeComponent} updateComponent={escapeRoomActions.updateComponent} addRelationship={escapeRoomActions.addRelationship} removeRelationship={escapeRoomActions.removeRelationship}/>)}/>
                <ConditionalRoute path="/runner" condition={Object.keys(escapeRoom).length > 0 && escapeRoom!==undefined && loggedIn} redirect={'/'} render={(routeProps) =>(<EscapeRoomRunner name={escapeRoom.details.name} time={escapeRoom.details.targetTime} background={escapeRoom.details.image} music={escapeRoom.details.music} hint="/sounds/hint.wav"/>)}/>
                <ConditionalRoute path="/login" condition={!loggedIn} redirect={'/dashboard'} render={(routeProps) => (<Login authenticate={this.props.authenticate} sendReset={this.sendReset}/>)}/>
                <ConditionalRoute path="/signup" condition={!loggedIn} redirect={'/dashboard'} render={(routeProps) => (<Signup signUp={this.signUp}/>)}/>
                <Route path="/about" component={About}/>
                <Route path="/tutorials" component={Tutorials}/>
                <ConditionalRoute exact path="/verify" condition={!user.isVerified && loggedIn} redirect={'/login'} render={(routeProps) => (<SendVerify email={user.email} sendVerify={this.sendVerify}/>)}/>
                <Route path="/verify/:token" render={(routeProps) => (<VerifyToken token={routeProps.match.params.token} verifyToken={this.verifyToken}/>)}/>
                <Route exact path="/reset" render={(routeProps) => (<SendReset sendReset={this.props.sendReset}/>)}/>
                <Route path="/reset/:token" render={(routeProps) => (<ResetToken token={routeProps.match.params.token} resetToken={this.resetToken}/>)}/>
                <Route path="/termsofservice" component={TermsOfService}/>
                <Route component={NotFound}/>
            </Switch> 
        )
    }
};

BusinessLogic.propTypes = {
    history: PropTypes.object,
    feathersClient: PropTypes.object,
    redux: PropTypes.object,
    services: PropTypes.object,
    authenticate: PropTypes.func,
    populateEscapeRooms: PropTypes.func,
    authManagement: PropTypes.func,
    sendReset: PropTypes.func,
}

export default BusinessLogic;