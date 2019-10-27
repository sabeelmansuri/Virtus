import React, {Component} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddCourseStudent.css';
import {fdb} from "../db";

class AddCourseStudent extends Component {
    state = {
        courseId: ''
    };

    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    addCourse = (courseId) => {
        fdb.collection("courses").doc(courseId).get().then ((doc) => {
            if (doc.exists) {
                let old_students = doc.data().students;
                if (old_students === undefined) {
                    old_students = [this.props.studentId];
                } else {
                    old_students.push(this.props.studentId);
                }
                fdb.collection("courses").doc(courseId).set({
                    code: doc.data().code,
                    name: doc.data().name,
                    students: old_students,
                    ta: doc.data().ta
                });
                toast.success("You've been enrolled! Refresh the page to see your new course");
            } else {
                toast.error("Please enter a valid course id.",);
            }
        }).catch(function(error) {
            toast.error("Please enter a valid course id.");
        });

    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.courseId.length === 0) {
            toast.error("Please enter a course id.");
            return;
        }
        this.addCourse(this.state.courseId);
    }

    render () {
        return (
            <div>
                <div className="addCourseStudentHeading">Enter the code provided by your instructor</div>
                <input
                    autoComplete = 'off'
                    type = 'text'
                    className ='studentInput'
                    name = 'courseId'
                    value = {this.state.courseId}
                    onChange={e => this.change(e)}/>
                <button className='enrollButton' onClick={e => this.onSubmit(e)}>Enroll</button>
            </div>
        );
    }
}
export default AddCourseStudent;