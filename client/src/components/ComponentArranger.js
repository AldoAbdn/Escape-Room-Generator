import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Component.css';
import '../styles/ComponentArranger.css';
import Area from './AreaDnDSource';
import AreaModel from '../models/Area';
import { DropTarget } from 'react-dnd';

const Types = {
    AREA: 'AREA'
}

const areaArrangerTarget = {
    drop(props, monitor, component){
        const item = monitor.getItem();
        if(item.component===undefined || item.component===null){
            component.props.handleComponentDrop(new AreaModel());
        }
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
        if(area.type==='Area'){
            return (
                <Col key={i}> 
                    <Area isTarget findComponent={this.props.findComponent} component={area} handleDidNotDrop={this.props.handleDidNotDrop} handleComponentDrop={this.props.handleComponentDrop} handleComponentClick={this.props.handleComponentClick}/>
                </Col>
            )  
        }
    }
    componentDidUpdate(props){
        if(JSON.stringify(this.props.components)!==JSON.stringify(props.components)){
            this.setState({render:true});
        }
    }
    render() {
        var classNames;
        if(this.props.isOver && this.props.canDrop){
            classNames="canDrop"
        } else if (this.props.isOver){
            classNames="cantDrop"
        }
        return this.props.connectDropTarget(
            <div className={classNames}>
                <Container className="component-arranger">
                    <Row>
                        {this.props.components.map(this.mapAreas)}
                    </Row>
                </Container>
            </div>
        )
    }
};

export default DropTarget(Types.AREA, areaArrangerTarget,collect)(ComponentArranger);