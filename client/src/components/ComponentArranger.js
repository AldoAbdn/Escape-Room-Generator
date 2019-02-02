import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/ComponentArranger.css';
import Area from './Area';
import Puzzle from './Puzzle';
import { DropTarget } from 'react-dnd';

const Types = {
    COMPONENT: 'COMPONENT'
}

const componentArrangerTarget = {
    drop(props, monitor, component){
        const item = monitor.getItem();
        console.log(item);
        component.newArea();
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
    newArea(){
        alert('new area');
    }
    handleComponentClick = (component) => (e) => {
        this.props.handleComponentClick(component);
    }
    mapAreas = (area,i)=>{
        return (
            <Col key={i}>
                <Area area={area} handleComponentClick={this.handleComponentClick}>
                    <Puzzle/>
                </Area>
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

export default DropTarget(Types.COMPONENT, componentArrangerTarget,collect)(ComponentArranger);