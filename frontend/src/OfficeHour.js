import React, {Component} from 'react';
import {fdb} from "./db";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {deleteLiveStream} from "./streaming";

class OfficeHour extends Component {

    CURRENT_USER_ID = "X6zZQfcy7ybnb6pc9vmT1RGopix1";

    constructor() {
        super();
        this.state = {courseId: null, course: null, officeHourId: null, officeHour: null, redirectURL: null};
    }

    componentDidMount() {
        const {courseId, officeHourId} = this.props.match.params;

        fdb.collection("courses")
            .doc(courseId)
            .onSnapshot(course => {

                if (!course.exists) {
                    return;
                }

                course = course.data();

                this.setState({courseId, course})
            });

        fdb.collection("office_hour")
            .doc(officeHourId)
            .onSnapshot(officeHour => {

                if (!officeHour.exists) {
                    return;
                }

                officeHour = officeHour.data();

                this.setState({officeHourId: officeHourId, officeHour})
            });
    }

    deleteOfficeHour = () => {
        const streamId = this.state.officeHour.mux_data.id;
        deleteLiveStream(streamId).then(() => {
            fdb.collection("office_hour")
                .doc(this.state.officeHourId)
                .delete()
                .then(() => {
                    this.setState({redirectURL: "/courses/" + this.state.courseId})
                });
        });
    };

    isStudent() {
        return false;
    }


    render() {
        if (this.state.redirectURL) {
            return <Redirect to={this.state.redirectURL}/>
        }

        if (!this.state.course || !this.state.officeHour)
            return <div/>;


        if (this.state.officeHour.pre_stream) {
            return (
                <Container className={"pt-5"}>
                    <Row>
                        <Col>
                            <h2 className={"text-center mt-5"}>Get ready.</h2>
                            <p className={"text-center mt-5"}>Use your favorite broadcasting software to stream
                                to <code>rtmp://live.mux.com/app</code> using this stream
                                key: <code>{this.state.officeHour.mux_data.stream_key}</code></p>
                            <p className={"text-center"}>Once you start streaming, this page will automatically
                                update.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"text-center mt-4"}>
                            <Button variant={"danger"} onClick={this.deleteOfficeHour}>Cancel stream</Button>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            // If the status is active, this is a live session.
            // If not, this is a recording.
            if (this.state.officeHour.mux_data.status === "active") {
                return (
                    <Container className={"pt-5"}>
                        <Row>
                            <Col>
                                <h2 className={"text-center mt-5"}>You're streaming now.</h2>
                            </Col>
                        </Row>
                    </Container>
                );
            } else {
                return (
                    <Container className={"pt-5"}>
                        <Row>
                            <Col>
                                <h2 className={"text-center mt-5"}>Recording.</h2>
                            </Col>
                        </Row>
                    </Container>
                );
            }
        }

    }
}

export default OfficeHour;