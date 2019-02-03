import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/ComponentArranger.css';
import Area from './Area';
import AreaModel from '../models/Area';
import { DropTarget } from 'react-dnd';

const Types = {
    AREA: 'AREA'
}

const areaArrangerTarget = {
    drop(props, monitor, component){
        const item = monitor.getItem();
        component.handleComponentDrop(new AreaModel());
    }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    };
  }

class ComponentArranger extends Component {
    handleComponentDrop = (component,parentId, isInput) => {
        this.props.handleComponentDrop(component,parentId,isInput);
    }
    handleComponentClick = (component) => (e) => {
        this.props.handleComponentClick(component);
    }
    handleDidNotDrop = (component) => {
        this.props.handleDidNotDrop(component);
    }
    mapAreas = (area,i)=>{
        return (
            <Col key={i}>
                <Area area={area} handleDidNotDrop={this.handleDidNotDrop} handleComponentDrop={this.handleComponentDrop} handleComponentClick={this.handleComponentClick}/>
            </Col>
        )   
    }
    render() {
        return this.props.connectDropTarget(
            <div>
                <Container>
                    <Row>
                        {this.props.components.map(this.mapAreas)}
                    </Row>
                </Container>
            </div>
        )
    }
};

export default DropTarget(Types.AREA, areaArrangerTarget,collect)(ComponentArranger);