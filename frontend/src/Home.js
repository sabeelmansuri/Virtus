import React, {Component} from 'react';
import './Home.css';
import db, {provider} from "./base";

class Home extends Component {
    handleLoginWithGoogle = () => {
        try{
            db
                .auth()
                .signInWithPopup(provider);
            console.log("Signed in");
        } catch (error){
            alert(error);
        }
    }

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
                        <div className="wrapper">
                            <button className={"btn btn-social btn-google"} onClick={this.handleLoginWithGoogle}>Log In with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;