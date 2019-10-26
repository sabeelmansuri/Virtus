import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home.js';
import Courses from './Courses.js';
import LiveCourse from './LiveCourse.js';
import OfflineCourse from './OfflineCourse.js';
import Error from './Error.js';
import './App.css';

function App() {
  return (
      <Router>
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

export default App;
