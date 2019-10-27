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
            isStudent: true,
            courses: [],
            currentUser: null
        };
    }

    componentDidMount(){
        db.auth().onAuthStateChanged((user) => {
            this.setState({currentUser: user});
            fdb.collection("courses")
                .get()
                .then(querySnapshot => {
                    const courses = querySnapshot.docs.map(doc => {
                        return {id: doc.id, doc: doc.data()}
                    });
                    this.setState({courses});
                });

            if (!this.state.currentUser) {
                console.log("no user");
                this.setState({isStudent: true});
            } else {
                fdb.collection("user_accounts").doc(this.state.currentUser.uid).get().then(user_account => {

                    if (!user_account.exists) {
                        this.setState({isStudent: true});
                    } else {
                        this.setState({isStudent: !user_account.data().is_ta});
                    }
                });
            }
        });
    };


    generateRedirectLink(courseId) {
        return "/courses/" + encodeURIComponent(courseId);
    }

    render() {
        let studentAdd =
            <div>
                <Popup trigger={<a><Course color="#FFFFFF" textColor="#7d98f2" courseCode="+" courseName="Add a Course" redirectLink="#"/></a>}
                       modal contentStyle={{height: '300px', width: '500px'}} closeOnDocumentClick>
                    {close => (
                        <div>
                            <button className='closeButton' onClick={close}>&times;</button>
                            <AddCourseStudent />
                        </div>
                    )}
                </Popup>
            </div>;

        let taAdd =
            <div>
                <Popup trigger={<a><Course color="#FFFFFF" textColor="#7d98f2" courseCode="+" courseName="Add a Course" redirectLink="#"/></a>}
                       modal contentStyle={{height: '300px', width: '500px'}} closeOnDocumentClick>
                    {close => (
                        <div>
                            <button className='closeButton' onClick={close}>&times;</button>
                            <AddCourseTA taId={this.state.currentUser.uid} />
                        </div>
                    )}
                </Popup>
            </div>;

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
                    {this.state.isStudent ? studentAdd : taAdd}
                </div>
            </div>
        );
    }
}
export default Courses;