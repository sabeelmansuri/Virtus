import React, {Component} from 'react';
import Login from './components/Login.js';
import './Home.css';

class Home extends Component {

    render () {
        return (
            <div>
                <div className="introWrapper">
                    <div className={"intro"}>
                        <p className="introTitle">WELCOME TO VIRTUS</p>
                    </div>
                </div>
                <div className="loginWrapper">
                    <div className="login">
                        <Login />
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;