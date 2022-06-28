import React, {Component}  from 'react';
import {Row, Col, Button, Input, InputGroup, InputGroupText} from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * Class for ListCreator
 * @extends Component
 * @author Alistair Quinn
 */
class ListCreator extends Component {
    /** Creates ListCreator */
    constructor(){
        super();
        this.state = {items:[""]};
    }

    /**
     * Handles Input Change
     * @function
     * @param {Event} event
     */
    handleChange = (event) => { 
        let index = event.target.id;
        let items = [...this.state.items];
        items[index] = event.target.value;
        this.setState({items},()=>{
            this.props.handleChange(items);
        });
    }

    /**
     * Adds a string to items
     * @function
     * @param {Event} e
     */
    addItem = (e) => {
        let items = [...this.state.items];
        items.push("");
        this.setState({items});
        this.props.handleChange(items);
    }

    /**
     * Removes an item from the 
     * @param {Event} e
     */
    removeItem = (index) => (e) => {
        let items = [...this.state.items];
        items = [...items.slice(0,index),...items.slice(index+1)];
        this.setState({items});
        this.props.handleChange(items);
    }
    
    /**
     * Maps items to Inputs
     * @param {string} item
     * @param {int} index
     * @param {Array} array
     * @returns {JSX}
     */
    mapItemsToInputs = (item,index,array)=>{
        return (
            <InputGroup key={index}>
                <Input type="text" id={index} onChange={this.handleChange}/>
                <InputGroupText onClick={this.removeItem(index)}>
                    delete
                </InputGroupText>
            </InputGroup>
        )
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
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
    handleChange: PropTypes.func
}

export default ListCreator;