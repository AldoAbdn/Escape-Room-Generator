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
                <InputGroupAddon>
                    <InputGroupText onClick={this.removeItem(index)} addonType="append">
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

export default ListCreator;