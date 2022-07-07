import React, {Component}  from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

/** 
 * Class for Not Found 
 * @extends Component
 * @author Alistair Quinn 
 */
class ImageManager extends Component {
    constructor(props){
        super(props);
        this.state={images:props.images};
    }

    /**
     * Adds a string to items
     * @function
     * @param {Event} e
     */
    addImage = (e) => {
        let images = [...this.state.images];
        images.push("");
        this.setState({images});
        this.props.handleChange(images);
    }

    /**
     * Removes an item from the 
     * @param {Event} e
     */
     removeImage = (index) => (e) => {
        let images = [...this.state.images];
        images = [...images.slice(0,index),...images.slice(index+1)];
        this.setState({images});
        this.props.handleChange(images);
    }

    /**
     * Maps items to Inputs
     * @param {string} item
     * @param {int} index
     * @param {Array} array
     * @returns {JSX}
     */
    mapImageToListItem = (item,index,array)=>{
        return (
        <ListGroupItem key={index}>
            {item}
            <Button onClick={this.removeImage(index)} color="danger" style={{display:'inline', position: 'absolute', right:'2px', top:'0.3rem'}}>
                X
            </Button>
        </ListGroupItem>
        )
    }

    /**
     * React lifecycle method 
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Button onClick={this.addImage}>Add Image</Button>
                        <ListGroup>
                            {this.state.images.map(this.mapImageToListItem)}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
};

ImageManager.propTypes = {
    images:PropTypes.array,
    handleChange:PropTypes.func,
}

export default ImageManager;