import React, {Component} from 'react';
import './Home.css';
import {db, provider} from './db';
import {GoogleLoginButton} from "react-social-login-buttons";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        db.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });
    };

    handleLoginWithGoogle = () => {
        try {
            db
                .auth()
                .signInWithPopup(provider);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        if (this.state.loggedIn) {
            window.location = "/courses";
            return;
        }

        return (
            <div>
                <div className="introWrapper">
                    <div className={"intro"}>
                        <p className="introTitle" style={{fontSize: "20px"}}><span style={{fontSize: "50px"}}>WELCOME TO VIRTUS</span><br/><br/>
                            <span style={{fontSize: "30px"}}>Virtus is moving office hours to your screen.</span><br/>
                            <br/> We're going from crowded offices and scheduling conflicts to in-home livestreams and
                            on-demand recordings. Office hours have never been more accessible or scalable.
                        </p>
                    </div>
                </div>
                <div className="loginWrapper">
                    <div className="login">
                        <div className="wrapper">
                            <GoogleLoginButton onClick={this.handleLoginWithGoogle}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;