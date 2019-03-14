import React, {Component}  from 'react';
import {Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

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
            this.props.handleChange(this.state.items);
        });
    }

    addItem =  (e) => {
        this.setState({items:this.state.items.push("")})
    }

    removeItem = (index) => (e) => {
        this.setState({items:[...this.state.items.slice(0,index),...this.state.items.slice(index)]});
    }
    
    mapItemsToInputs = (item,index,array)=>{
        return (
            <InputGroup>
                <Input type="text" id={index} onChange={this.handleChange}/>
                <InputGroupAddon>
                    <InputGroupText onClick={this.removeItem(index)} addonType="append">
                        delete
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        )
    }

    render() {
        let items = this.state.items;
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

export default ListCreator;