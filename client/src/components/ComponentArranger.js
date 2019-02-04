import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/ComponentArranger.css';
import Area from './ComponentDnDTarget';
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
    mapAreas = (area,i)=>{
        return (
            <Col key={i}>
                <Area component={area} handleDidNotDrop={this.props.handleDidNotDrop} handleComponentDrop={this.props.handleComponentDrop} handleComponentClick={this.props.handleComponentClick}/>
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