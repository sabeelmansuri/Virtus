import React, {Component} from 'react';
import './AddCourseTA.css';
import {toast} from "react-toastify";
import {fdb} from "../db";

class AddCourseTA extends Component {
    state = {
        courseCode: '',
        courseName: '',
        courseId: ''
    };

    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.courseCode.length === 0 || this.state.courseName.length === 0) {
            toast.error("Please enter a valid course code and name.");
            return;
        }

        toast.success("Creating your course!");

        fdb.collection("courses").add({
            code: this.state.courseCode,
            name: this.state.courseName,
            ta: fdb.collection("user_accounts").doc(this.props.taId)
        }).then(docRef => {
            let cId = docRef.id;
            this.setState({courseId: cId});
            toast.success("Your class has been created!");
            document.getElementById("displayCode").style.display = 'block';
        });
    }

    render () {
        return (
            <div>
                <div className="addCourseTAHeading">Enter your course's code</div>
                <input
                    autoComplete = 'off'
                    placeholder="e.g. BIMM 101"
                    type = 'text'
                    className ='taInput'
                    name = 'courseCode'
                    value = {this.state.courseCode}
                    onChange={e => this.change(e)}/>
                <div className="addCourseTAHeading">Enter your course's name</div>
                <input
                    autoComplete = 'off'
                    placeholder="e.g. Molecular Biology"
                    type = 'text'
                    className ='taInput'
                    name = 'courseName'
                    value = {this.state.courseName}
                    onChange={e => this.change(e)}/>
                <button className='createButton' onClick={e => this.onSubmit(e)}>Create</button>
                <div id="displayCode">Students can join your course using the code: <b>{this.state.courseId}</b> </div>
            </div>
        );
    }
}
export default AddCourseTA;