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
    handleComponentClick = (component) => (e) => {
        e.stopPropagation();
        this.setState({selected:component});
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
        }
    }
    handleDidNotDrop = (component) => {
        var components = this.removeComponent(component._id);
        this.props.handleChange(components);
    }
    //Changes state on input change
    handleComponentDetailsChange = (state) => { 
        var newComponent = {...this.state.selected, ...state};
        var components = [...this.props.state.components];
        components = this.updateComponent(newComponent);
        this.props.handleChange(components);
        this.setState({selected:newComponent},()=>{alert('updates')});
    }
    updateComponent = (newComponent) => {
        let id = newComponent._id;
        let components = [...this.props.state.components];
        components.forEach((component,index,components)=>{
            if(component._id===id){
                components[index] = newComponent;
            }
        });
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
        components.forEach((component,index,components)=>{
            if(component._id===id){
                components.pop(index);
            } else {
                let relationships = [component.inputComponents,component.outputComponents];
                relationships.forEach((list,index,lists)=>{
                    list.forEach((componentId,index,componentIds)=>{
                        if(componentId===id){
                            componentIds.pop(index);
                        }
                    })
                })
            }
        });
        return components;
    }
    removeRelationship = (componentId,parentId,isInput)=>{
        let components = [...this.props.state.components];
        components.forEach((component,index,components)=>{
            if(component._id===parentId){
                if(isInput){
                    component.inputComponents.forEach((id,index,ids)=>{
                        if(id===componentId){
                            ids.pop(index);
                        }
                    })
                } else {
                    component.outputComponents.forEach((id,index,ids)=>{
                        if(id===componentId){
                            ids.pop(index);
                        }
                    })
                }
            }
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
        console.log('designrender');
        console.log(this.state);
        return (
            <Container>
                <Row>
                    <Col xs="2">
                        <Pallet handleClick={this.handlePalletItemClick}/>
                    </Col>
                    <Col xs="8">
                        <ComponentArranger findComponent={this.findComponent} handleDidNotDrop={this.handleDidNotDrop} handleComponentDrop={this.handleComponentDrop} handleComponentClick={this.handleComponentClick} components={this.props.state.components}/>            
                    </Col>
                    <Col xs="2">
                        <ComponentDetails selected={this.state.selected} handleChange={this.handleComponentDetailsChange}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;