import React, {Component} from 'react';
import queryString from 'query-string';

class LiveCourse extends Component {
    values = queryString.parse(this.props.location.search);

    render() {
        return (
            <div>
                LiveCourse Page
            </div>
        )
    }
}
export default LiveCourse;