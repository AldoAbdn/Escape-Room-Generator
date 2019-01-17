import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
    render() {
        return (
            <div className="main container">
                <header>
                    <h1 className="title">
                        <Link to="/">Escape Room Generator</Link>
                    </h1>
                </header>
                <main>
                    {React.cloneElement(this.props.children, this.props)}   
                </main>
                <footer>
                    <a><Link to="/about">About</Link></a>
                    <a><Link to="/tutorials">Tutorials</Link></a>
                </footer>
            </div>
        )
    }
});

export default Main;