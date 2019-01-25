import React, {Component}  from 'react';

class EscapeRoomDesigner extends Component {
    constructor(){
        super();
        this.state = {id: null};
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        this.setState({id:id});
    }
    render() {
        return (
            <div className="main container">
                <header>
                    <h1 className="title">
                      EscapeRoomDesigner
                    </h1>
                </header>
                <footer>
           

                </footer>
            </div>
        )
    }
};

export default EscapeRoomDesigner;