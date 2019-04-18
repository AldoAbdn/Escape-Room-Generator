import React, {Component} from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { DragSource } from 'react-dnd';
import '../styles/Component.css';

const descriptions = {
  Puzzle:"Represents a puzzle, or any type of component that accepts and combines inputs",
  Prop:"Can represent any prop in the escape room such as a key, ornament, book, poster ect. It is up to the designer what constitutes a prop",
  Lock:"Represents a lock, supports multiple types",
  Event:"Represents an event in the escape room such as a new room being unlocked",
  Music:"Represents music played in the room can be linked together to create a playlist"
}

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
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    var item = {id: props.id}
    return item;
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

class PalletItem extends Component{
  render() {
      let id=this.props.id || "";
      let iconId = this.props.id + "-icon";
      let classNames = id + " component pallet-item"
      return this.props.connectDragSource(
          <div className={classNames} id={id} >
            <p>{id}<span id={iconId} className="pallet-item-icon"><i className="fa fa-question-circle text-right" aria-hidden="true"></i></span></p>     
            <UncontrolledTooltip target={iconId}>{descriptions[id]}</UncontrolledTooltip>
          </div>
      )
  }
};

export default DragSource(Types.COMPONENT, componentSource, collect)(PalletItem);