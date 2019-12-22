import React, {Component}  from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
//Components
import { Dashboard, EscapeRoomDesigner, Login, Signup, Tutorials, About, ProtectedRoute, NotFound, Verify, Reset } from '../components/index.js';
import EscapeRoom from '../models/EscapeRoom.js';
/**
 * Business logic of app 
 * handles creating and updating of data 
 * handles navigation 
 * @class
 * @author Alistair Quinn
 */
class BusinessLogic extends Component {
    /**
     * Authenticates login credentials 
     * @function
     * @param {Object} credentials 
     */
    authenticateCredentials = async(credentials)=>{
        try {
            let { user } = await this.props.feathersClient.authenticate(credentials);
            if(user!=null){
                user.token = window.localStorage.getItem('feathers-jwt');
                console.log(user);
                this.props.redux.actions.user.login(user);
                this.props.history.push('/dashboard');
            }
        } catch(error){
            return error.message;
        }
    }
    /**
     * Creates a new user 
     * @function
     * @param {Object} credentials 
     */
    signUp = async(credentials)=>{
        //Create a new user 
        try{
            let queryResult = await this.props.services.users.create(credentials);
            if(queryResult.action.type.includes('FULFILLED')){
                this.props.history.push('/verify');
            }
        } catch(error){
            return error.message;
        }
    }
    /**
     * Opens escape room designer
     * @function
     * @param {EscapeRoom} escapeRoom
     */
    editEscapeRoom = (escapeRoom) => {
        this.props.redux.actions.escapeRoom.setSelectedEscapeRoom(escapeRoom);
        this.props.history.push('/designer');
    }
    /**
     * Creates a new escape room 
     * then opens designer
     * @function
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
            escapeRoom.estimatedCost = EscapeRoom.calculateCost(escapeRoom);
            await this.props.services['escape-rooms'].update(escapeRoom._id,escapeRoom);
            await this.props.redux.actions.escapeRooms.updateEscapeRoom(escapeRoom);
        }
        this.props.history.push('/');
    }
    /**
     * Verifies a user account via token
     * @function
     * @param {String} token
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
     * Resets users password
     * @function
     * @param {String} email
     * @param {String} token
     * @param {String} password
     */
    reset = async(email, token, password) => {
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
     */
    sendReset = async(email) => {
        let result = await this.props.services['auth-management'].create({action:'sendResetPwd',value:{email}});
        if(result.action.type.includes('FULFILLED')){
            return {color:"success", message:"Password Reset Send, Check Emails"};
        } else {
            return {color:"danger", message:"Error"}
        }
    }
    /**
     * React lifecycle method
     * Renders navigation 
     * @function
     */
    render() {
        const escapeRooms = this.props.redux.state.escapeRooms;
        const escapeRoom = this.props.redux.state.escapeRoom;
        const escapeRoomActions = this.props.redux.actions.escapeRoom;
        const showModal = this.props.redux.actions.modal.showModal;
        return (
            <Switch>
                <Redirect exact from="/" to="dashboard"/>
                <ProtectedRoute path="/dashboard" render={(routeProps) => (<Dashboard escapeRooms={escapeRooms} showModal={showModal} editEscapeRoom={this.editEscapeRoom} newEscapeRoom={this.newEscapeRoom} deleteEscapeRoom={this.deleteEscapeRoom}/>)}/>
                <ProtectedRoute path="/designer" condition={Object.keys(escapeRoom).length > 0 &&escapeRoom!==undefined} redirect={'/'} render={(routeProps) =>(<EscapeRoomDesigner showModal={showModal} escapeRoom={escapeRoom} saveEscapeRoom={this.saveEscapeRoom} updateDetails={escapeRoomActions.updateDetails} updateAccessibility={escapeRoomActions.updateAccessibility} addComponent={escapeRoomActions.addComponent} removeComponent={escapeRoomActions.removeComponent} updateComponent={escapeRoomActions.updateComponent} addRelationship={escapeRoomActions.addRelationship} removeRelationship={escapeRoomActions.removeRelationship}/>)}/>
                <Route path="/login" render={(routeProps) => (<Login authenticateCredentials={this.authenticateCredentials}/>)}/>
                <Route path="/signup" render={(routeProps) => (<Signup signUp={this.signUp}/>)}/>
                <Route path="/about" component={About}/>
                <Route path="/tutorials" component={Tutorials}/>
                <Route path="/verify" component={Verify}/>
                <Route path="/verify/:token" render={(routeProps) => (<Verify token={routeProps.match.params.token} verify={this.verify}/>)}/>
                <Route path="/reset" component={Reset}/>
                <Route path="/reset/:token" componet={(routeProps) => (<Reset token={routeProps.match.params.token} reset={this.reset}/>)}/>
                <Route component={NotFound}/>
            </Switch> 
        )
    }
};

export default BusinessLogic;