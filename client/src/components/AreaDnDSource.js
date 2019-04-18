import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import AreaDnDTarget from './AreaDnDTarget';
import '../styles/Component.css';
import { Card, UncontrolledTooltip } from 'reactstrap';
import Modal from '../models/Modal';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  AREA: 'AREA'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const areaSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return true;
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    var item = null;
    if (props.id!==undefined){
       item = { id: props.id };
    } else {
       item = { component: props.component };
    }
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop() && component!=null) {
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

class AreaDnDSource extends Component{
  constructor(){
    super();
    this.state={render:true};
  }
  removeComponent = ()=>{
    this.props.removeComponent(this.props.component._id);
  }
  addComponent = (component,parentId)=>{
    this.props.addComponent(component,this.props.component._id);
    this.props.addRelationship(component._id,parentId);
  }  
  componentDidUpdate(prevProps){
    if(this.props.renderTrigger!==prevProps.renderTrigger)
      this.forceUpdate();
  }
  render() {
    let id = this.props.id;
    let iconId = id+"-icon";
    let target;
    if (this.props.isTarget){
      target = (
        <AreaDnDTarget renderTrigger={JSON.stringify(this.props.component)} addRef={this.props.addRef} findComponent={this.props.findComponent} handleComponentClick={this.props.handleComponentClick} outputComponents={this.props.outputComponents} component={this.props.component} showModal={this.props.showModal} addComponent={this.addComponent} updateComponent={this.props.updateComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship}/>
      );
    }
    let classNames;
    if(this.props.palletItem)
      classNames += " pallet-item";
    return this.props.connectDragSource(
        <div onClick={this.props.handleComponentClick(this.props.component)}>
          <Card className={classNames}>
            <div className={id===undefined?"d-none":""}>
              <p style={{"fontWeight":"bold"}}>{id}<span id={iconId} className="pallet-item-icon"><i className="fa fa-question-circle text-right" aria-hidden="true"></i></span></p>     
              <UncontrolledTooltip target={iconId}>Represents a collection of components. Can be used to represent physical areas such as two seperate rooms or logical areas</UncontrolledTooltip>
            </div>
            {target}
          </Card>
        </div>
    )
  }
};

export default DragSource(Types.AREA, areaSource, collect)(AreaDnDSource);