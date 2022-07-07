import React, {Component}  from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem, Label } from 'reactstrap';
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
        this.InputFile = React.createRef();
    }

    /**
     * Adds a string to items
     * @function
     * @param {Event} e
     */
    addImage = (image) => {
        let images = [...this.state.images];
        images.push(image);
        this.setState({images});
        this.props.handleChange(images);
    }

    /**
     * Handles Button Click
     */
    handleClick = (e) => {
        this.InputFile.current.click();
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
        console.log(item);
        return (
        <ListGroupItem key={index}>
            <image className='img-fluid' src={item}/>
            <Button onClick={this.removeImage(index)} color="danger" style={{display:'inline', position: 'absolute', right:'2px', top:'0.3rem'}}>
                X
            </Button>
        </ListGroupItem>
        )
    }

    /**
     * Handles File Input Change
     * @param {Event} e 
     */
    handleChange = async(e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            try{
                let fileUri = await this.imageToBase64(files[0]);
                this.addImage(fileUri);
            } catch(error){

            }
        }
    }

    /**
     * Converts Image to Base 64 URI
     * https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
     * @param {File} file 
     * @returns 
     */
    imageToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

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
                        <Label for="image">Images</Label>
                        <input id="image" style={{display: "none"}} accept="image/png, image/jpeg" ref={this.InputFile} onChange={this.handleChange} type="file" name="image"/>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Button block onClick={this.handleClick}>Add Image</Button>
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