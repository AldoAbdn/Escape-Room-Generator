import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import ComponentDnDTarget from './ComponentDnDTarget';
import { Row, Col } from 'reactstrap'
import '../styles/Component.css';
import { ArcherElement } from 'react-archer';
import Modal from '../models/Modal';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  COMPONENT: 'COMPONENT'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const componentSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return true;
  },

  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    var item
    if(props.component === undefined){
      item = {id: props.id}
    } else {
      item = {...props.component};
    }
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      if((props.component!==undefined||props.component!==null)&&props.showModal)
        props.showModal(new Modal("Warning", "Are you sure you want to delete this component?","Yes",component.removeComponent,"No",()=>{}));
        return;
    }
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class ComponentDnDSource extends Component{
  removeComponent = ()=>{
    this.props.removeComponent(this.props.component._id);
  }
  componentDidMount(){
    if(this.props.addRef)
      this.props.addRef(this.ref);
  }
  componentDidUpdate(prevProps){
    if(this.props.renderTrigger!=prevProps.renderTrigger)
      this.forceUpdate();
  }
  findComponent(component){
    if(this.props.findComponent!==undefined){
      return this.props.findComponent(component);
    } else {
      return null;
    }
  }
  update = () => this.forceUpdate()
  componentDidMount() {
    window.addEventListener('click', this.update, true);
    window.addEventListener('scroll', this.update, true);
    window.addEventListener('resize', this.update);
}
  
componentWillUnmount() {
  window.removeEventListener('click', this.update);
    window.removeEventListener('scroll', this.update);
    window.removeEventListener('resize', this.update)
}
  render() {
      var target;
      if (this.props.isTarget){
        target = (
          <Row>
              <Col xs="6"><ComponentDnDTarget isInput={true} component={this.props.component} handleComponentClick={this.props.handleComponentClick} showModal={this.props.showModal} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship}/></Col>
              <Col xs="6"><ComponentDnDTarget isInput={false} component={this.props.component} handleComponentClick={this.props.handleComponentClick} showModal={this.props.showModal} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship}/></Col>
          </Row>  
        );
      }
      var style = {};
      let id="";
      let classNames = "component";
      if(this.props.component!==undefined){
        style.top = this.props.component.position.top;
        style.left = this.props.component.position.left;
        classNames += " " + this.props.component.type + " " + this.props.component._id;
        id=this.props.component._id;
      } 
      return this.props.connectDragSource(
          <div className={classNames} id={id} ref={(ref)=>this.ref=ref} style={style} onClick={this.props.handleComponentClick(this.props.component)}>
            <span>{this.props.id||id}</span>
            {target}
            <span>{id}</span>
          </div>
      )
  }
};

export default DragSource(Types.COMPONENT, componentSource, collect)(ComponentDnDSource);