/**
 * Connects redux state and actions to the whole app,
 * makes sure routing is possible,
 * @class App
 * @author Alistair Quinn  
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import '../styles/App.css';
import Main from './Main';
import * as userActionCreators from '../actions/user';
import * as escapeRoomsActionCreators from '../actions/escapeRooms';
import * as escapeRoomActionCreators from '../actions/escapeRoom';

function mapStateToProps(state) {
  return {
    redux: state
  }
}

function mapDispatchToProps(dispatch){
  const userFuncs = bindActionCreators(userActionCreators,dispatch);
  const escapeRoomsFuncs = bindActionCreators(escapeRoomsActionCreators,dispatch);
  const escapeRoomFuncs = bindActionCreators(escapeRoomActionCreators, dispatch);
  return {...userFuncs, ...escapeRoomsFuncs, ...escapeRoomFuncs};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    redux: {
      state: stateProps.redux,
      actions: dispatchProps
    }
  }
}

const App = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main);

export default withRouter(App);
