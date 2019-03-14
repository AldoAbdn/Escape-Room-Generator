import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Component.css';
import '../styles/ComponentArranger.css';
import Area from './AreaDnDSource';
import AreaModel from '../models/Area';
import { DropTarget } from 'react-dnd';
import { ArcherContainer } from 'react-archer';
import LineTo from 'react-lineto';

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
    constructor(){
        super()
        this.state = {refs:[]}
    }
    mapAreas = (area,i)=>{
        if(area.type==='Area'){
            console.log(area.outputComponents);
            let outputComponents = this.props.components.filter((component)=>{
                return area.outputComponents.includes(component._id);
            });
            console.log(outputComponents);
            return (
                <Col key={area._id} xs="12"> 
                    <Area addRef={this.addRef} isTarget findComponent={this.props.findComponent} handleComponentClick={this.props.handleComponentClick} component={area} outputComponents={outputComponents} showModal={this.props.showModal} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} updateComponent={this.props.updateComponent} addRelationship={this.props.addRelationship}/>
                </Col>
            )  
        }
    }
    addRef = (ref)=>{
        console.log(ref);
        if(ref!=undefined){
            console.log(this.state.refs.push(ref));
            this.setState({refs:[...this.state.refs,ref]},(refs)=>{
                console.log(this.state);
            });
        }
    }
    componentDidUpdate(props,state) {
        if(JSON.stringify(this.props.components)!==JSON.stringify(props.components)){
            this.setState({render:true});
        } else if(this.state.refs.length!=state.refs.length) {
            window.requestAnimationFrame(()=>{

            });
        }
    }
    update = () => this.forceUpdate()
    componentDidMount() {
        window.addEventListener('scroll', this.update, true);
        window.addEventListener('resize', this.update);
    }
      
    componentWillUnmount() {
        window.removeEventListener('scroll', this.update);
        window.removeEventListener('resize', this.update)
    }

    render() {
        console.log('render');
        var classNames;
        if(this.props.isOver && this.props.canDrop){
            classNames="canDrop"
        } else if (this.props.isOver){
            classNames="cantDrop"
        }
        let lines = [];
        this.props.components.forEach((component,index,array)=>{
            console.log(this.props.components);
            if(component!=undefined && component.inputComponents!=undefined && component.type!="Area"){
                let inputComponents = component.inputComponents;
                let outputComponents = component.outputComponents;
                inputComponents.forEach((inputComponent,index,array)=>{
                    inputComponent = this.props.findComponent(inputComponent);
                    lines.push(<LineTo key={index} from={component._id} to={inputComponent._id} borderColor={"#007bff"}/>);
                });
                outputComponents.forEach((outputComponent,index,array)=>{
                    outputComponent = this.props.findComponent(outputComponent);
                    lines.push(<LineTo key={index} from={component._id} to={outputComponent._id} borderColor={"#28a745"}/>)
                });
            }
        });
        return this.props.connectDropTarget(
            <div className={classNames}>
                {lines}
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
            </div>
        )
    }
};

export default DropTarget(Types.AREA, areaArrangerTarget,collect)(ComponentArranger);