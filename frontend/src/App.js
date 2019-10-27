import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav.js';
import Home from './Home.js';
import Courses from './Courses.js';
import LiveCourse from './LiveCourse.js';
import OfflineCourse from './OfflineCourse.js';
import Error from './Error.js';
import './App.css';
import db from "./base";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentDidMount(){
        db.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("onAuthStateChanged true");
                this.setState({loggedIn: true});
            } else {
                console.log("onAuthStateChanged false");
                this.setState({loggedIn: false});
            }
        });
    };



    render() {
        return (
            <Router>
                <Nav isLoggedIn={this.state.loggedIn}/>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/courses" component={Courses}/>
                        <Route path="/course" component={LiveCourse}/>
                        <Route path="/old_course" component={OfflineCourse}/>
                        <Route path="*" component={Error} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
