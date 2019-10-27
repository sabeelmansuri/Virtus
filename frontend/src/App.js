import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav.js';
import Home from './Home.js';
import Courses from './Courses.js';
import CourseDetail from './CourseDetail.js';
import Error from './Error.js';
import './App.css';
import OfficeHour from "./OfficeHour";
import {db} from './db';

class App extends Component {
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

    render() {
        return (
            <Router>
                <Nav isLoggedIn={this.state.loggedIn}/>
                <div>
                    <Switch>
                        <Route path="/courses/:courseId/oh/:officeHourId" component={OfficeHour}/>
                        <Route path="/courses/:courseId" component={CourseDetail}/>
                        <Route path="/courses" component={Courses}/>
                        <Route exact path="/" component={Home}/>
                        <Route path="*" component={Error}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
