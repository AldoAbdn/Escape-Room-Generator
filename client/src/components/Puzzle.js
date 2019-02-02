import React, {Component}  from 'react';
import { Card, CardBody ,CardTitle } from 'reactstrap';
import Dragabble from 'react-draggable';

class Puzzle extends Component {
    render() {
        return (
            <Dragabble bounds="parent">
                <Card
                    className={this.props.className + " Puzzle"} 
                    style={this.props.style}
                    onMouseDown={this.props.onMouseDown}
                    onMouseUp={this.props.onMouseUp}
                    onTouchStart={this.props.onTouchStart}
                    onTouchEnd={this.props.onTouchEnd}
                    style={{width:'10%'}}
                    >
                    <CardBody>
                        <CardTitle>Puzzle</CardTitle>
                    </CardBody>
                </Card>
            </Dragabble>
        )
    }
};

export default Puzzle;