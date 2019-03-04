import React, {Component}  from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
//Components
import { Dashboard, EscapeRoomDesigner, Login, Signup, Tutorials, About, ProtectedRoute, Profile, NotFound } from '../components/index.js';
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
     * Main construcutor
     * handles initialising state
     * @constructor
     */
    constructor(){
        super();
        this.state = {profile:null};
    }
    /**
     * Authenticates login credentials 
     * @function
     * @param {Object} credentials 
     */
    authenticateCredentials = async(credentials)=>{
        try {
            await this.props.feathersClient.authenticate(credentials);
            let queryResult = await this.props.services.users.find({email:credentials.email});
            if(queryResult.action.type.includes('FULFILLED')){
                var user = queryResult.value.data[0];
                user.token = window.localStorage.getItem('feathers-jwt');
                this.props.redux.actions.login(user);
                this.props.history.push('/dashboard');
            } else {
                this.setState({})
            }
        } catch(err){
            return err.message;
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
            //Check if user already exists
            let queryResult = await this.props.services.users.find({email:credentials.email});
            console.log(queryResult);
            if(queryResult.value!=undefined||queryResult.value!=null){
                return "User Already Exists";
            }
            await this.props.services.users.create(credentials);
            //Authenticate with feathersjs
            try {
                await this.props.feathersClient.authenticate({strategy:'local',email:credentials.email,password:credentials.password});
            } catch(error){
                return error.message;
            }
            //Get User Details and Update Redux Store
            queryResult = await this.props.services.users.find({email:credentials.email});
            if(queryResult.action.type.includes('FULFILLED')){
                var user = queryResult.value.data[0];
                user.token = window.localStorage.getItem('feathers-jwt');
                this.props.redux.actions.login(user);
                this.props.history.push('/dashboard');
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
        this.props.redux.actions.setEscapeRoom(escapeRoom);
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
        let response = await this.props.services['escape-rooms'].create(newEscapeRoom)
        if(response.action.type.includes('FULFILLED')){
            const escapeRoom = response.value;
            if (escapeRoom!==null){
                this.props.redux.actions.addEscapeRoom(escapeRoom);
                this.props.redux.actions.setEscapeRoom(escapeRoom);
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
        this.props.redux.actions.removeEscapeRoom(escapeRoom);
    }
    /**
     * Updates users details 
     * @function
     * @param {Object} update
     */
    updateUser = async (update) => {
        try{
            const user = this.props.redux.state.user;
            let response = await this.props.services.users.patch(user._id,update);
            this.props.redux.actions.login(response.value);
            this.props.history.push('/profile');
        }catch(error){
            return error.message;
        }
    }
    /**
     * Saves an escape room
     * @function
     * @param {EscapeRoom} escapeRoom
     */
    saveEscapeRoom = async(escapeRoom) => {
        if(escapeRoom._id!==undefined){
            await this.props.services['escape-rooms'].update(escapeRoom._id,escapeRoom);
            await this.props.redux.actions.updateEscapeRoom(escapeRoom);
        }
        this.props.history.push('/');
    }
    /**
     * React lifecycle method
     * Renders navigation 
     * @function
     */
    render() {
        const escapeRooms = this.props.redux.state.escapeRooms;
        const escapeRoom = this.props.redux.state.escapeRoom;
        const user = this.props.redux.state.user;
        return (
            <Switch>
                <Redirect exact from="/" to="dashboard"/>
                <ProtectedRoute path="/dashboard" render={(routeProps) => (<Dashboard escapeRooms={escapeRooms} editEscapeRoom={this.editEscapeRoom} newEscapeRoom={this.newEscapeRoom} deleteEscapeRoom={this.deleteEscapeRoom}/>)}/>
                <ProtectedRoute path="/profile" condition={Object.keys(user).length > 0 && user!==undefined} redirect={'/login'} render={(routeProps) => (<Profile user={user} updateUser={this.updateUser}/>)}/>
                <ProtectedRoute path="/designer" condition={Object.keys(escapeRoom).length > 0 &&escapeRoom!==undefined} redirect={'/'} render={(routeProps) =>(<EscapeRoomDesigner escapeRoom={escapeRoom} saveEscapeRoom={this.saveEscapeRoom}/>)}/>
                <Route path="/login" render={(routeProps) => (<Login authenticateCredentials={this.authenticateCredentials}/>)}/>
                <Route path="/signup" render={(routeProps) => (<Signup signUp={this.signUp}/>)}/>
                <Route path="/about" component={About}/>
                <Route path="/tutorials" component={Tutorials}/>
                <Route component={NotFound}/>
            </Switch> 
        )
    }
};

export default BusinessLogic;