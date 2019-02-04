import React, {Component}  from 'react';
import { Card, CardBody ,CardTitle } from 'reactstrap';
import '../styles/ComponentTarget.css';
import { DropTarget } from 'react-dnd';
import Puzzle from '../models/Puzzle';
import ComponentDnDSource from './ComponentDnDSource';

const Types = {
    COMPONENT: 'COMPONENT'
}

const componentTarget = {
    drop(props,monitor,component){
        if (monitor.didDrop()){
            return;
        }
        const item = monitor.getItem();
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
    handleComponentDrop(item, position,isInput=true){
        var component = null;
        if (item.id!=undefined){
            alert(item.id);
            switch(item.id){
                case 'Puzzle':
                    component = new Puzzle();
            }
        } else {
            component = item;
        }
        this.props.handleComponentDrop(component,this.props.component._id,isInput);
    }
    handleDidNotDrop = (component) => {
        this.props.handleDidNotDrop(component);
    }
    render() {
        return this.props.connectDropTarget(
            <div key={this.props.component._id}>
                <Card className={this.props.component.type} onClick={this.props.handleComponentClick(this.props.component)}>
                    <CardBody>
                        <CardTitle>{this.props.component.type}</CardTitle>
                        {this.props.component.inputComponents.map((component,i)=>{
                            return(<ComponentDnDSource isTarget handleComponentDrop={this.props.handleComponentDrop} handleComponentClick={this.props.handleComponentClick} handleDidNotDrop={this.props.handleDidNotDrop} key={i} component={component} id={component.type}/>)
                        })}
                    </CardBody>
                </Card>
            </div>
        )
    }
};

export default DropTarget(Types.COMPONENT, componentTarget, collect)(AreaDnDTarget);