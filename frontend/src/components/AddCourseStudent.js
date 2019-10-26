import React, {Component} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddCourseStudent.css';

class AddCourseStudent extends Component {
    state = {
        courseId: ''
    };

    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    addCourse(courseId) {
        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.courseId.length === 0) {
            toast.error("Please enter a course Id.");
            return;
        }
        if(this.addCourse(this.state.courseId) === true) {
            window.location.reload(true);
        } else {
            toast.error("Please enter a course Id.");
            return;
        }
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