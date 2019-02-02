import React, {Component}  from 'react';
import { Card, CardBody ,CardTitle } from 'reactstrap';
import '../styles/Area.css';

class Area extends Component {
    render() {
        return (
            <Card className="Area" onClick={this.props.handleComponentClick(this.props.area)}>
                <CardBody>
                    <CardTitle>Area</CardTitle>
                    {this.props.children}
                </CardBody>
            </Card>
        )
    }
};

export default Area;