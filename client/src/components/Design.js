import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Pallet, ComponentArranger, ComponentDetails } from './index';
import Draggable from 'react-draggable';
import Puzzle from './Puzzle';
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
    updateComponent = (component, newComponent) => {
        if(component.inputComponents.length > 0 || component.outputComponents.length > 0){
            this.updateComponent(component, newComponent)
        }
        if (component._id === newComponent._id){
                component = {...component,...newComponent};
                return component;
        }
        for (var list of [component.inputComponents, component.outputComponents]){
            list.forEach((component,index,components)=>{
                components[index] = this.updateComponent(component,newComponent);
            })
        }
        return component;
    }
    findComponent(component,id){
        var foundComponent = null;
        if(component._id===id){
            return component;
        }
        for (var list of [component.inputComponents, component.outputComponents]){
            list.forEach((component,index,components)=>{
                var found = this.findComponent(component);
                if (found!=null){
                    foundComponent = found;
                }
            })
        }
        return foundComponent;
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Pallet handleClick={this.handlePalletItemClick}/>
                    </Col>
                    <Col xs="8">
                        <ComponentArranger handleComponentClick={this.handleComponentClick} components={this.props.state.components}/>            
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