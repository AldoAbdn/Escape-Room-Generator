import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import Profile from '../components/Profile';
import BusinessLogic from './BusinessLogic.js';
import PropTypes from 'prop-types';
import '../styles/Main.css';

/**
 * Defines main layout of app 
 * Handles re-authentication of logged in user 
 * Renders business logic 
 * @author Alistair Quinn
 */
class Main extends Component {
    /** Creates Main */
    constructor(){
        super();
        this.state = {profile:false, isProfileOpen:false,tooltipOpen:false, isOpen:false};
    }

    /** 
     * Toggles is Open
     * @function 
     */
    toggle = () => {
        this.setState({isOpen:!this.state.isOpen});
    }

    /** 
     * Toggles is Profile 
     * @function
     */
    toggleProfile = () => {
        this.setState({isProfileOpen:!this.state.isProfileOpen});
    }

    /**
     * React lifecycle method
     * Updates profile if user has changed
     * @param {Object} prevProps 
     */
    componentDidUpdate(prevProps){
        if(prevProps.redux.state.user.email!==this.props.redux.state.user.email){
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
     */
    componentDidMount() {
        if (window.localStorage.getItem('feathers-jwt') && this.props.redux.state.user.email!==undefined){
            this.setState({profile:true});
        } else if (window.localStorage.getItem('feathers-jwt') && this.props.redux.state.user.email===undefined){
            this.authenticate();
        }
    }

    /** 
     * Authenticates User 
     * @function 
     */
    authenticate = async() => {
        //Authenticates JWT and then populates user/escapeRooms
        try{
            let { user } = await this.props.feathersClient.reAuthenticate();
            if(user!=null){
                user.token = window.localStorage.getItem('feathers-jwt');
                const verified = await this.populateEscapeRooms(user._id);
                user.verified = verified;
                this.props.redux.actions.user.login(user);
            }
        } catch(error){
            this.logout();
        }
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
            try{
                let result = await this.props.services['escape-rooms'].find({query:{userId:userId}});
                if(result.action.type.includes('FULFILLED')){
                    const escapeRooms = result.value.data;
                    if (escapeRooms!==null && escapeRooms!==undefined){
                        this.props.redux.actions.escapeRooms.updateEscapeRooms(escapeRooms);
                        this.setState({loading:false});
                    }
                }
                return true;
            }catch(e){
                // User Not Verified
                if(e.message.includes("verified")){
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    /** 
     * Logs out user, tidys up 
     * @function 
     */
    logout = () => {
        this.props.feathersClient.logout();
        window.localStorage.removeItem('feathers-jwt');
        this.setState({profile:null});
        this.props.redux.actions.user.logout();
        this.props.history.push('/');
    }

    /**
     * Edits a users email
     * @function
     * @param {String} email
     * @param {String} password
     * @param {Object} change
     * @returns {Object} 
     */
    identityChange = async(user, password, changes) => {
        try {
            let result = await this.props.services['auth-management'].create({action:'identityChange',user,password,changes});
            if(result.action.type.include('FULFILLED')){
                return {color:"success", message:"Email Saved"};
            } else {
                return {color:"danger", message:"Error"}
            }
        } catch(error){
            return {color:"warning", message: "An error has occured, changed may have been made"};
        }
    }

    /**
     * Sends Password Reset
     * @function
     * @returns {Object}
     */
    sendPasswordReset = async() => {
        try {
            let result = await this.props.services['auth-management'].create({action:'sendResetPwd', value:{email:this.props.redux.state.user.email},notifierOptions:{}});
            if(result.action.type.include('FULFILLED')){
                return {color:"success", message:"Email Saved"};
            } else {
                return {color:"danger", message:"Error"}
            }
        } catch(error){
            return {color:"warning", message:"An error has occured, a password reset email may have been sent"};
        }
    }

    /**
     * React lifecycle method 
     * Renders main layout
     * @returns {JSX}
     */
    render() {
        const loading = this.state.loading || this.props.redux.state.usersService.isLoading || this.props.redux.state.escapeRoomsService.isLoading || this.props.redux.state.authManagementService.isLoading;
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
                    <Profile user={user} identityChange={this.identityChange} sendPasswordReset={this.sendPasswordReset}/>
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
                            <NavbarBrand href="/"><img src="/images/logos/main.svg" alt="Logo"/></NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://forms.office.com/Pages/ResponsePage.aspx?id=nKagUU8OPUu2QhLgExmGNYQo7GuPpvBIkCZBfnEHlpZUOUZWQkVHTlNCOVNQS0xOWlMyTzZSRjU2Mi4u">Survey</NavLink>
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

Main.propTypes = {
    redux: PropTypes.object,
    history: PropTypes.object,
    services: PropTypes.array,
    feathersClient: PropTypes.object,
}

export default Main;