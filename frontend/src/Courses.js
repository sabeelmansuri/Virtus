import React from 'react';
import Course from "./components/Course.js";
import './Courses.css';

function Courses() {
    return (
        <div className="coursesParent">
            <p className="coursesTitle">YOUR COURSES</p>
            <div className="coursesWrapper">
                <Course color="#333333" textColor="white" courseCode = "CSE 110" courseName="Software Engineering" redirectLink="#"/>
                <Course color="#FFDC53" textColor="black" courseCode="BICD 100" courseName="Genetics" redirectLink="#"/>
                <Course color="#2D3898" textColor="white" courseCode = "CSE 105" courseName="Theory of Computation" redirectLink="#"/>
                <Course color="#A41A3C" textColor="white" courseCode = "MATH 20E" courseName="Vector Calculus" redirectLink="#"/>
                <Course color="#FFFFFF" textColor="#7d98f2" courseCode = "+" courseName="Add a Course" redirectLink="#"/>
            </div>
        </div>
    );
}
export default Courses;