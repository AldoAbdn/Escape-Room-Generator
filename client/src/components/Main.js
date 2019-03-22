import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import Profile from '../components/Profile';
import '../styles/Main.css';

/**
 * Defines main layout of app 
 * Handles re-authentication of logged in user 
 * Renders business logic 
 * @class Main 
 * @author Alistair Quinn
 */
import BusinessLogic from './BusinessLogic.js';
class Main extends Component {
    /**
     * Main constructor to set initial state
     * @constructor
     */
    constructor(){
        super();
        this.state = {profile:false, isProfileOpen:false,tooltipOpen:false, isOpen:false};
    }

    /**
     * Toggles for bootstrap
     */
    toggle=()=>{
        this.setState({isOpen:!this.state.isOpen});
    }
    toggleProfile=()=>{
        this.setState({isProfileOpen:!this.state.isProfileOpen});
    }

    /**
     * React lifecycle method
     * Updates profile if user has changed
     * @function
     * @param {Object} prevProps 
     */
    componentDidUpdate(prevProps){
        if(prevProps.redux.state.user.email!==this.props.redux.state.user.email){
            this.populateEscapeRooms(this.props.redux.state.user._id);
            if(this.props.redux.state.user.email !== undefined){
                this.setState({profile:true});
            } else {
                this.setState({profile:false});
            }
        }
    }
    /**
     * React lifecycle method 
     * Updates profile is logged in
     * @function
     */
    componentDidMount() {
        if (window.localStorage.getItem('feathers-jwt') && this.props.redux.state.user.email!==undefined){
            this.setState({profile:true});
        } else if (window.localStorage.getItem('feathers-jwt') && this.props.redux.state.user.email===undefined){
            this.authenticate();
        }
    }
    /**
     * Authentication
     * @function
     */
    authenticate = async() => {
        //Authenticates JWT and then populates user/escapeRooms
        let jwt = await this.authenticateJWT();
        let user = await this.populateUserFromJWT(jwt);
        if(user!=null)
            await this.populateEscapeRooms(user._id);
    }
    /**
     * Authenticates JWT 
     * @function 
     * @returns string
     */
    authenticateJWT = async() => {
        try {
            let response = await this.props.feathersClient.authenticate();
            return response.accessToken;
        } catch(error) {
            this.logout();
        }
    }
    /**
     * Populates user from a jwt
     * @function
     * @param {String} jwt 
     * @returns {Object}
     */
    populateUserFromJWT = async(jwt) => {
        if(jwt===undefined||jwt===null||jwt===""){
            this.setState({profile:false});
            return null;
        }
        let response = await this.props.feathersClient.passport.verifyJWT(jwt);
        response = await this.props.services.users.get(response.userId);
        var user = response.value;
        if(user.email===undefined||user.email===""){
            this.setState({profile:false});
            return null;
        }
        user.token = window.localStorage.getItem('feathers-jwt');
        this.props.redux.actions.user.login(user);
        this.setState({profile:true});
        return user;
    }
    /**
     * Popultes escape rooms by user ID
     * @function
     * @param {String} userId
     * @returns {Array}
     */
    populateEscapeRooms = async (userId) => {
        //Get User Details and Update Redux Store
        if (userId !== null && userId !== undefined){
            let queryResult = await this.props.services['escape-rooms'].find({query:{userId:userId}});
            if(queryResult.action.type.includes('FULFILLED')){
                const escapeRooms = queryResult.value.data;
                if (escapeRooms!==null && escapeRooms!==undefined)
                    this.props.redux.actions.escapeRooms.updateEscapeRooms(escapeRooms);
                    this.setState({loading:false});
                }
        }
    }
    /**
     * Logs out user, tidys up
     * @function
     */
    logout = () => {
        window.localStorage.removeItem('feathers-jwt');
        this.setState({profile:null});
        this.props.redux.actions.user.logout();
        this.props.history.push('/');
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
            this.props.redux.actions.user.login(response.value);
            return true;
        }catch(error){
            return error.message;
        }
    }
    /**
     * React lifecycle method 
     * Renders main layout
     * @function
     * @returns {JSX}
     */
    render() {
        const loading = this.state.loading || this.props.redux.state.usersService.isLoading || this.props.redux.state.escapeRoomsService.isLoading;
        const modal = this.props.redux.state.modal;
        const hideModal = this.props.redux.actions.modal.hideModal;
        let user = this.props.redux.state.user;
        let profile;
        if(this.state.profile){
            profile =                                 
            <Dropdown isOpen={this.state.isProfileOpen} toggle={this.toggleProfile} nav inNavbar>
                <DropdownToggle nav caret>
                Profile
                </DropdownToggle>
                <DropdownMenu right>
                    <Profile user={user} updateUser={this.updateUser}/>
                    <Button id="LogoutButton" onClick={this.logout} block>Logout</Button>
                </DropdownMenu>
            </Dropdown>
        } else {
            profile = null;
        }
        return (
            <div>   
                <LoadingOverlay className={'loading-overlay'} active={loading} spinner>       
                    <header>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/"><img src="/images/logos/main.svg"/></NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Survey</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/AldoAbdn/Escape-Room-Generator">GitHub</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link" to="/about">About</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link" to="/tutorials">Tutorials</Link>
                                </NavItem>
                                {profile}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </header>
                    <main>
                        <BusinessLogic history={this.props.history} feathersClient={this.props.feathersClient} redux={this.props.redux} services={this.props.services}/>
                    </main>
                </LoadingOverlay>
                <Modal isOpen={modal.isOpen} >
                    <ModalHeader>{modal.header}</ModalHeader>
                    <ModalBody>
                        {modal.body}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={()=>{
                            modal.confirm.action();
                            hideModal();
                        }}>{modal.confirm.text}</Button>
                        <Button color="danger" onClick={()=>{
                            modal.cancel.action();
                            hideModal();
                        }}>{modal.cancel.text}</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
};

export default Main;