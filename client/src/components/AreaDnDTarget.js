import React, {Component}  from 'react';
import { Card, CardBody ,CardTitle } from 'reactstrap';
import '../styles/ComponentTarget.css';
import { DropTarget, XYCoord } from 'react-dnd';
import Puzzle from '../models/Puzzle';
import ComponentDnDSource from './ComponentDnDSource';

const Types = {
    COMPONENT: 'COMPONENT'
}

const componentTarget = {
    drop(props,monitor,component){
        if (monitor.didDrop() || !component){
            return;
        }
        const item = monitor.getItem();
        if (item.position === undefined){
            item.position = {top:0,left:0};
        } else {
            const delta = monitor.getDifferenceFromInitialOffset()
            item.position.left = Math.round(item.position.left + delta.x);
            item.position.top = Math.round(item.position.top + delta.y);
        }
        console.log(item);


        component.handleComponentDrop(item);
        return {moved:true};
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow:true}),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}

class AreaDnDTarget extends Component {
    handleComponentDrop(item,isInput=false){
        var component = null;
        if (item.id!=undefined && item._id === undefined){
            switch(item.id){
                case 'Puzzle':
                    component = new Puzzle();
                    component.position = item.position;
                    break;
            }
        } else {
            component = item;
        }
        this.props.handleComponentDrop(component,this.props.component._id,isInput);
    }
    render() {
        return this.props.connectDropTarget(
            <div key={this.props.component._id}>
                <Card className={this.props.component.type} onClick={this.props.handleComponentClick(this.props.component)}>
                    <CardBody>
                        <CardTitle>{this.props.component.type}</CardTitle>
                        {this.props.component.outputComponents.map((component,i)=>{
                            return(<ComponentDnDSource isRoot isTarget handleComponentDrop={this.props.handleComponentDrop} handleComponentClick={this.props.handleComponentClick} handleDidNotDrop={this.props.handleDidNotDrop} key={i} component={component} id={component.type}/>)
                        })}
                    </CardBody>
                </Card>
            </div>
        )
    }
};

export default DropTarget(Types.COMPONENT, componentTarget, collect)(AreaDnDTarget);