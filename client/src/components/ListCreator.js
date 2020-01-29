import React, {Component}  from 'react';
import {Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import PropTypes from 'prop-types';
import EscapeRoom from '../models/EscapeRoom';

class ListCreator extends Component {
    constructor(){
        super();
        this.state = {items:[""]};
    }

    handleChange = (event) => { 
        let index = event.target.id;
        let items = [...this.state.items];
        items[index] = event.target.value;
        this.setState({items},()=>{
            this.props.handleChange(items);
        });
    }

    addItem =  (e) => {
        let items = [...this.state.items];
        items.push("");
        this.setState({items});
        this.props.handleChange(items);
    }

    removeItem = (index) => (e) => {
        let items = [...this.state.items];
        items = [...items.slice(0,index),...items.slice(index+1)];
        this.setState({items});
        this.props.handleChange(items);
    }
    
    mapItemsToInputs = (item,index,array)=>{
        return (
            <InputGroup key={index}>
                <Input type="text" id={index} onChange={this.handleChange}/>
                <InputGroupAddon addonType="append">
                    <InputGroupText onClick={this.removeItem(index)}>
                        delete
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        )
    }

    render() {
        let items = this.state.items.map(this.mapItemsToInputs);
        return (
            <Row>
                <Col>
                    <Button onClick={this.addItem}>Add Item</Button>
                    {items}
                </Col>
            </Row>
        )
    }
};

ListCreator.propTypes = {
    saveEscapeRoom: PropTypes.func,
    escapeRoom: PropTypes.instanceOf(EscapeRoom),
    updateDetails: PropTypes.func,
    updateAccessibility: PropTypes.func,
    showModal: PropTypes.func,
    addComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    updateComponent: PropTypes.func,
    addRelationship: PropTypes.func,
    removeRelationship: PropTypes.func
}

export default ListCreator;