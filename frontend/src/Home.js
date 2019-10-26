import React, {Component} from 'react';
import Login from './components/Login.js';
import './Home.css';

class Home extends Component {

    render () {
        return (
            <div>
                <div className="introWrapper">
                    <div className={"intro"}>
                        <p className="introTitle" style={{fontSize: "20px"}}><span style={{fontSize: "50px"}}>WELCOME TO VIRTUS</span><br /><br />
                            <span style={{fontSize: "30px"}}>Virtus is moving office hours to your screen.</span><br /> <br /> We're going from crowded offices and scheduling conflicts to in-home livestreams and on-demand recordings. Office hours have never been more accessible or scalable.
                        </p>
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