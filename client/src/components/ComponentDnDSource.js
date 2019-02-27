import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import ComponentDnDTarget from './ComponentDnDTarget';
import { Row, Col } from 'reactstrap'
import '../styles/Component.css';
import { ArcherElement } from 'react-archer';

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
      if(props.component!==undefined||props.component!==null)
        component.handleDidNotDrop(props.component);
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
  handleDidNotDrop = (component)=>{
    if(this.props.handleDidNotDrop!==undefined)
      this.props.handleDidNotDrop(component);
  }
  mapRelationships = (componentId,type) => {
    let style;
    let label="";
    switch(type){
      case 'input':
        style = {
          strokeColor:'blue'
        }
        label='input';
        break;
      case 'output':
        style = {
          strokeColor:'green'
        }
        label="output"
      break;
      default:
        style={};
    }
    return ({
      targetId: componentId,
      targetAnchor: 'top',
      sourceAnchor: 'bottom',
      style,
      label,
    });
  }
  render() {
      var target;
      if (this.props.isTarget){
        target = (
          <Row>
              <Col xs="6"><ComponentDnDTarget isInput={true} component={this.props.component} handleDidNotDrop={this.props.handleDidNotDrop} handleComponentDrop={this.props.handleComponentDrop} handleComponentClick={this.props.handleComponentClick}/></Col>
              <Col xs="6"><ComponentDnDTarget isInput={false} component={this.props.component} handleDidNotDrop={this.props.handleDidNotDrop} handleComponentDrop={this.props.handleComponentDrop} handleComponentClick={this.props.handleComponentClick}/></Col>
          </Row>  
        );
      }
      var style = {};
      let inputComponents;
      let outputComponents; 
      let id="";
      let classNames = "component";
      let archer;
      if(this.props.component!==undefined){
        style.top = this.props.component.position.top;
        style.left = this.props.component.position.left;
        style.position = 'relative';
        classNames += " " + this.props.component.type + " " + this.props.component._id;
        id=this.props.component._id;
        inputComponents = this.props.component.inputComponents.map(id=>this.mapRelationships(id,'input'));
        outputComponents = this.props.component.outputComponents.map(id=>this.mapRelationships(id,'output'));
        archer = (
          <ArcherElement onClick={()=>{alert('test')}} id={id} relations={[...outputComponents,...inputComponents]}>
            <span>{id}</span>
          </ArcherElement>
        );
      } 
      return this.props.connectDragSource(
          <div className={classNames} style={style} onClick={this.props.handleComponentClick(this.props.component)}>
            <span>{this.props.id}</span>
            {target}
            {archer}
          </div>
      )
  }
};

export default DragSource(Types.COMPONENT, componentSource, collect)(ComponentDnDSource);