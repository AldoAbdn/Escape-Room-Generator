import React, {Component} from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../utilities/items';
import PropTypes from 'prop-types';
import '../styles/Component.css';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const componentSource = {
  /**
   * Return the data describing the dragged item
   * @param {object} props 
   * @param {Monitor} monitor 
   * @param {Component} component
   * @returns {object} 
   */
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    var item = {id: props.id}
    return item;
  }
};

/**
 * Specifies which props to inject into your component.
 * @param {Connect} connect
 * @param {Monitor} monitor
 * @returns {object} Props
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

/** 
 * Class for PalletItem
 * @extends Component
 * @author Alistair Quinn 
 */
class PalletItem extends Component{
  descriptions = {
    Puzzle:"Represents a puzzle, or any type of component that accepts and combines inputs",
    Prop:"Can represent any prop in the escape room such as a key, ornament, book, poster ect. It is up to the designer what constitutes a prop",
    Lock:"Represents a lock, supports multiple types",
    Event:"Represents an event in the escape room such as a new room being unlocked",
    Music:"Represents music played in the room can be linked together to create a playlist"
  }

  /** 
   * React Lifecycle Render
   * Renders Layout
   * @returns {JSX}
   */
  render() {
      let id=this.props.id || "";
      let classNames = id + " component pallet-item";
      return this.props.connectDragSource(
          <div className={classNames} id={id} >
            <p>{id}</p>     
            <UncontrolledTooltip target={id}>{this.descriptions[id]}</UncontrolledTooltip>
          </div>
      )
  }
};

PalletItem.propTypes = {
  id: PropTypes.string,
}

export default DragSource(ItemTypes.COMPONENT, componentSource, collect)(PalletItem);