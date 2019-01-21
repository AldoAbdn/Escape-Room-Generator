import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import '../styles/App.css';
import Main from './Main';
import * as userActionCreators from '../actions/users';
import * as escpaeRoomActionCreators from '../actions/escapeRooms';
import * as videoActionCreators from '../actions/videos';

function mapStateToProps(state) {
  console.log(state);
  return {
    redux: state
  }
}

function mapDispatchToProps(dispatch){
  const userFuncs = bindActionCreators(userActionCreators,dispatch);
  const escapeRoomFuncs = bindActionCreators(escpaeRoomActionCreators,dispatch);
  const videoFuncs = bindActionCreators(videoActionCreators, dispatch);
  return {...userFuncs, ...escapeRoomFuncs, ...videoFuncs};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  console.log(stateProps);
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
