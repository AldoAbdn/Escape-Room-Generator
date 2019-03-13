import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Pallet, ComponentArranger, ComponentDetails } from './index';
import Area from '../models/Area';

class Design extends Component {
    constructor(props){
        super(props);
        this.state = {selected: {}};
    }
    handlePalletItemClick = (item) => {
        switch(item){
            case 'Area':
                var components = this.props.state.components;
                components.push(new Area());
                this.props.handleChange(components);
                break;
            default:
                return;
        }
    }
    handleComponentClick = (component,callback) => (e) => {
        e.stopPropagation();
        this.setState({selected:component});
        if(callback!=null){
            callback();
        }
    }
    handleComponentDrop = (component, parentId, isInput = true) => {
        let components = [...this.props.state.components];
        let searchResult = this.findComponent(component._id);
        if(parentId != null){
            components = this.addRelationship(component._id,parentId,isInput)
            if(searchResult==null){
                let parent = this.findComponent(parentId);
                if(parent.type!=='Area'){
                    let area = components.find((comp)=>{
                        if(comp.type==='Area'){
                            return comp.outputComponents.find((com)=>{
                                return com === parentId;
                            });
                        } else {
                            return false;
                        }
                    });
                    if(area!==undefined){
                        components = this.addRelationship(component._id,area._id,false);
                    }
                }
                components.push(component);
            } else {
                components = this.updateComponent(component);
            }
            this.props.handleChange(components);
        } else {
            components.push(component);
            this.props.handleChange(components);
        }
    }
    handleDidNotDrop = (component) => {
        var components = this.removeComponent(component._id);
        console.log(components);
        this.props.handleChange(components);
    }
    //Changes state on input change
    handleComponentDetailsChange = (state) => { 
        var newComponent = {...this.state.selected, ...state};
        var components = [...this.props.state.components];
        components = this.updateComponent(newComponent);
        this.props.handleChange(components);
        this.setState({selected:newComponent});
    }
    updateComponent = (newComponent) => {
        let id = newComponent._id;
        let components = [...this.props.state.components];
        let i = components.findIndex(component=>component._id===id);
        components[i] = newComponent;
        return components;
    }
    findComponent = (id)=>{
        let components = [...this.props.state.components];
        let found = null;
        components.forEach((component,index,components)=>{
            if(component._id===id){
                found = component;
                return found;
            }
        });
        return found;
    }
    removeComponent = (id)=>{
        let components = [...this.props.state.components];
        components = this.removeRelationships(id).filter(component=>component._id!=id);
        return components;
    }
    removeRelationships = (id)=>{
        let components = [...this.props.state.components];
        components.forEach((component,index,components)=>{
            components[index].inputComponents = component.inputComponents.filter(inputId=>inputId!==id);
            components[index].outputComponents = component.outputComponents.filter(outputId=>outputId!==id);
        })
        return components;
    }
    addRelationship = (componentId,parentId,isInput)=>{
        let components = [...this.props.state.components];
        components.forEach((component,index,components)=>{
            if(component._id===parentId){
                if(isInput){
                    if(component.inputComponents.indexOf(componentId)===-1)
                        component.inputComponents.push(componentId);
                } else {
                    if(component.outputComponents.indexOf(componentId)===-1)
                        component.outputComponents.push(componentId);
                }
            }
        })
        return components;
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col md="2">
                        <Pallet handleClick={this.handlePalletItemClick}/>
                    </Col>
                    <Col md="8">
                        <ComponentArranger findComponent={this.findComponent} handleDidNotDrop={this.handleDidNotDrop} handleComponentDrop={this.handleComponentDrop} handleComponentClick={this.handleComponentClick} components={this.props.state.components}/>            
                    </Col>
                    <Col md="2">
                        <ComponentDetails selected={this.state.selected} handleChange={this.handleComponentDetailsChange}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;