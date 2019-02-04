import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Pallet, ComponentArranger, ComponentDetails } from './index';
import Draggable from 'react-draggable';
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
            default:
                return;
        }
    }
    handleComponentClick = (component) => {
        this.setState({selected:component});
    }
    handleComponentDrop = (component, parentId, isInput = true) => {
        var components = [...this.props.state.components];
        if(parentId == null){
            components.push(component);
            this.props.handleChange(components);
            return;
        } else {
            components.forEach((rootComponent,index,components)=>{
                components[index] = this.removeComponent(rootComponent,component._id);
                components[index] = this.addComponent(rootComponent,parentId,isInput,component);
            })
            this.props.handleChange(components);
        }
    }
    handleDidNotDrop = (component) => {
        var components = [...this.props.state.components]
        components.forEach((rootComponent,index,components)=>{
            components[index] = this.removeComponent(rootComponent,component._id);
        })
    }
    //Changes state on input change
    handleComponentDetailsChange = (state) => { 
        var newComponent = {...this.props.selected, ...state};
        var components = [...this.props.state.components];
        components.forEach((component,index,components)=>{
            components[index] = this.updateComponent(component, newComponent);
        });
        this.props.handleChange(components);
        components.forEach((component,index,components)=>{
            newComponent = this.findComponent(component,newComponent._id);
        })

        this.setState({selected:newComponent});
    }
    updateComponent = (rootComponent, newComponent) => {
        if (rootComponent._id === newComponent._id){
            rootComponent = {...rootComponent,...newComponent};
            return rootComponent;
        }
        else if(rootComponent.inputComponents.length > 0 || rootComponent.outputComponents.length > 0){
            for (var list of [rootComponent.inputComponents, rootComponent.outputComponents]){
                list.forEach((component,index,components)=>{
                    components[index] = this.updateComponent(component,newComponent);
                })
            }
        }
        return rootComponent;
    }
    findComponent(rootComponent,id){
        var foundComponent = null;
        if(rootComponent._id===id){
            return rootComponent;
        }
        for (var list of [rootComponent.inputComponents, rootComponent.outputComponents]){
            list.forEach((component,index,components)=>{
                var found = this.findComponent(component);
                if (found!=null){
                    foundComponent = found;
                }
            })
        }
        return foundComponent;
    }
    removeComponent(rootComponent,id){
        if (rootComponent._id === id){
            rootComponent = null;
            return rootComponent;
        }
        else if(rootComponent.inputComponents.length > 0 || rootComponent.outputComponents.length > 0){
            for (var list of [rootComponent.inputComponents, rootComponent.outputComponents]){
                list.forEach((component,index,components)=>{
                    if(component === null || component._id === id){
                        components.pop(index);
                    } else {
                        component = this.removeComponent(component,id);
                    }
                })
            }
        }
        return rootComponent;
    }
    addComponent(rootComponent,parentId,isInput,newComponent){
        if (rootComponent._id === parentId){
            if(isInput){
                rootComponent.inputComponents.push(newComponent);
            } else {
                rootComponent.outputComponents.push(newComponent);
            }
            return rootComponent;
        }
        else if(rootComponent.inputComponents.length > 0 || rootComponent.outputComponents.length > 0){
            for (var list of [rootComponent.inputComponents, rootComponent.outputComponents]){
                list.forEach((component,index,components)=>{
                    if(component._id === parentId){
                        if(isInput){
                            component.inputComponents.push(newComponent);
                        }else {
                            component.outputComponents.push(newComponent);   
                        }
                        components[index] = component;
                    } else {
                        component = this.addComponent(component,parentId,isInput,newComponent);
                    }
                })
            }
        }
        return rootComponent;
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Pallet handleClick={this.handlePalletItemClick}/>
                    </Col>
                    <Col xs="8">
                        <ComponentArranger handleDidNotDrop={this.handleDidNotDrop} handleComponentDrop={this.handleComponentDrop} handleComponentClick={this.handleComponentClick} components={this.props.state.components}/>            
                    </Col>
                    <Col>
                        <ComponentDetails selected={this.state.selected} handleChange={this.handleComponentDetailsChange}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;