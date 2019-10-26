import React, {Component} from 'react';
import './Course.css';

class Course extends Component {
    render () {
        return (
            <div>
                <a href={this.props.redirectLink} className="courseLinkWrapper">
                    <div className="courseParent" style={{backgroundColor: this.props.color}}>
                        <div className="courseInfoWrapper">
                            <div className="courseCode" style={{color: this.props.textColor}}>{this.props.courseCode}</div>
                            <div className="courseName" style={{color: this.props.textColor}}>{this.props.courseName}</div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}
export default Course;