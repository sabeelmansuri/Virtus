import React, {Component} from 'react';
import queryString from 'query-string';
import './OfflineCourse.css';

class OfflineCourse extends Component {
    values = queryString.parse(this.props.location.search);

    getCourseCode() {
        // use this.values.courseId
        return "CSE 110";
    }

    getCourseName() {
        return "Software Engineering";
    }

    render() {
        return (
            <div className="courseHomeParent">
                <p className="courseHomeTitle">{this.getCourseCode()} - {this.getCourseName()}</p>
            </div>
        );
    }
}
export default OfflineCourse;