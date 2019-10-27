import React, {Component} from 'react';
import Course from "./components/Course.js";
import Popup from 'reactjs-popup';
import AddCourseStudent from './components/AddCourseStudent.js';
import AddCourseTA from './components/AddCourseTA.js';
import './Courses.css';
import {db, fdb} from "./db";

class Courses extends Component {

    colors = ['#333333', '#FFDC53', "#2D3898", "#A41A3C"];
    textColors = ['white', 'black', "white", "white"];

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            courses: []
        };
    }

    componentDidMount(){
        db.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });

        fdb.collection("courses")
            .get()
            .then(querySnapshot => {
                const courses = querySnapshot.docs.map(doc => {
                    return {id: doc.id, doc: doc.data()}
                });
                console.log(courses);
                this.setState({courses});
            });
    };

    getCoursesById(userId) {
        return [{
            courseCode: "CSE 110",
            courseName: "Software Engineering",
            courseId: "1"
        },
            {
                courseCode: "BICD 100",
                courseName: "Genetics",
                courseId: "2"
            },
            {
                courseCode: "CSE 105",
                courseName: "Theory of Computation",
                courseId: "3"
            },
            {
                courseCode: "MATH 20E",
                courseName: "Vector Calculus",
                courseId: "4"
            },]
    }

    isStudent() {
        return true;
    }

    generateRedirectLink(courseId) {
        return "/courses/" + encodeURIComponent(courseId);
    }

    render() {
        let studentAdd = <AddCourseStudent />;
        let taAdd = <AddCourseTA />;

        return (
            <div className="coursesParent">
                <p className="coursesTitle">YOUR COURSES</p>
                <div className="coursesWrapper">
                    {this.state.courses.map((result, index) => (
                        <div key={index}>
                            <Course color={this.colors[index % this.colors.length]}
                                    textColor={this.textColors[index % this.textColors.length]}
                                    courseCode={result.doc.code}
                                    courseName={result.doc.name}
                                    redirectLink={this.generateRedirectLink(result.id)}/>
                        </div>
                    ))}
                    {/*eslint-disable-next-line*/}
                    <Popup trigger={<a><Course color="#FFFFFF" textColor="#7d98f2" courseCode="+" courseName="Add a Course" redirectLink="#"/></a>}
                           modal contentStyle={{height: '300px', width: '500px'}} closeOnDocumentClick>
                        {close => (
                            <div>
                                <button className='closeButton' onClick={close}>&times;</button>
                                {this.isStudent() ? studentAdd : taAdd}
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        );
    }
}
export default Courses;