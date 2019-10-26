import React, {Component} from 'react';
import Course from "./components/Course.js";
import Popup from 'reactjs-popup';
import AddCourseStudent from './components/AddCourseStudent.js';
import AddCourseTA from './components/AddCourseTA.js';
import './Courses.css';

class Courses extends Component {
    colors = ['#333333', '#FFDC53', "#2D3898", "#A41A3C"];
    textColors = ['white', 'black', "white", "white"];

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

    isLive(courseId) {
        // Should return -1 if not live
        return 1;
    }

    isStudent() {
        return true;
    }

    generateRedirectLink(courseId, color, textColor) {
        let base = "/course/" + courseId;

        if (this.isLive(courseId) !== -1) {
            base +=  "/live";
        }

        return base + encodeURIComponent("?color=" + color + "&textColor=" + textColor);
    }

    render() {
        let studentAdd = <AddCourseStudent />;
        let taAdd = <AddCourseTA />;

        return (
            <div className="coursesParent">
                <p className="coursesTitle">YOUR COURSES</p>
                <div className="coursesWrapper">
                    {this.getCoursesById().map((result, index) => (
                        <div key={index}>
                            <Course color={this.colors[index]}
                                    textColor={this.textColors[index]}
                                    courseCode={result.courseCode}
                                    courseName={result.courseName}
                                    redirectLink={this.generateRedirectLink(result.courseId, this.colors[index], this.textColors[index])} />
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