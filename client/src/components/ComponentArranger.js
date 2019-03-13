import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Component.css';
import '../styles/ComponentArranger.css';
import Area from './AreaDnDSource';
import AreaModel from '../models/Area';
import { DropTarget } from 'react-dnd';
import { ArcherContainer } from 'react-archer';

const Types = {
    AREA: 'AREA'
}

const areaArrangerTarget = {
    drop(props, monitor, component){
        const item = monitor.getItem();
        if(item.component===undefined || item.component===null){
            component.props.addComponent(new AreaModel());
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
        console.log(area);
        if(area.type==='Area'){
            console.log(area.outputComponents);
            let outputComponents = this.props.components.filter((component)=>{
                return area.outputComponents.includes(component._id);
            });
            console.log(outputComponents);
            return (
                <Col key={i} xs="12"> 
                    <Area isTarget findComponent={this.props.findComponent} handleComponentClick={this.props.handleComponentClick} component={area} outputComponents={outputComponents} showModal={this.props.showModal} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} updateComponent={this.props.updateComponent} addRelationship={this.props.addRelationship}/>
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
        console.log('render');
        var classNames;
        if(this.props.isOver && this.props.canDrop){
            classNames="canDrop"
        } else if (this.props.isOver){
            classNames="cantDrop"
        }
        return this.props.connectDropTarget(
            <div className={classNames}>
                <ArcherContainer> 
                <Container className="component-arranger">
                <Row>
                    <Col>
                        <h3>Components</h3>
                    </Col>
                </Row>
                    <Row>
                        {this.props.components.map(this.mapAreas)}
                    </Row>
                </Container>
                </ArcherContainer>
            </div>
        )
    }
};

export default DropTarget(Types.AREA, areaArrangerTarget,collect)(ComponentArranger);