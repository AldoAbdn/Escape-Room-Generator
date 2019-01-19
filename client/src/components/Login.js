import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="main container">
                <header>
                    <h1 className="title">
                        <Link to="/">Escape Room Generator</Link>
                    </h1>
                </header>
                <footer>
                    <Link to="/about">About</Link>
                    <Link to="/tutorials">Tutorials</Link>
                </footer>
            </div>
        )
    }
};

export default Login;