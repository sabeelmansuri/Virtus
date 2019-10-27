import React, {Component} from 'react';
import {db, fdb} from "./db";
import {Badge, Button, Col, Container, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {deleteLiveStream} from "./streaming";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import ScrollArea from "@xico2k/react-scroll-area";
import Chat from "./components/Chat";
import Question from "./components/Question";
import ReactHLS from 'react-hls';
import "./OfficeHour.css";
import moment from "moment";

class OfficeHour extends Component {

    constructor() {
        super();
        this.state = {
            courseId: null, course: null, officeHourId: null, officeHour: null, redirectURL: null, questionInput: '',
            chatInput: '',
            questionArray: [],
            currentUser: null,
            isStudent: true,
        };
    }

    checkSubmit(e) {
        e.preventDefault();
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();

            fdb.collection("questions").add({
                office_hour: this.state.officeHourId,
                status: "new",
                text: this.state.questionInput,
                time_created: new Date(),
                upvotes: 0
            });

            this.setState({questionInput: ""});
        }
    }

    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        const {courseId, officeHourId} = this.props.match.params;

        db.auth().onAuthStateChanged((user) => {
            this.setState({currentUser: user});
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

        fdb.collection("courses")
            .doc(courseId)
            .onSnapshot(course => {

                if (!course.exists) {
                    this.setState({redirectURL: "/courses"});
                    return;
                }

                course = course.data();

                this.setState({courseId, course})
            });

        fdb.collection("office_hour")
            .doc(officeHourId)
            .onSnapshot(officeHour => {

                if (!officeHour.exists) {
                    this.setState({redirectURL: "/courses"});
                    return;
                }

                officeHour = officeHour.data();

                this.setState({officeHourId: officeHourId, officeHour}, () => {
                    fdb.collection("questions")
                        .where("office_hour", "==", this.state.officeHourId)
                        .orderBy("time_created")
                        .onSnapshot(querySnapshot => {
                            console.log("called");
                            const orderedQuestions = querySnapshot.docs.map(doc => {
                                return {id: doc.id, doc: doc.data()}
                            });
                            this.setState({questionArray: orderedQuestions});
                        });
                })
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

    getButtonColor = (status) => {
        if (this.props.isStudent) {
            return "#51a13a";
        } else {
            if (status === "new") {
                return "#51a13a";
            } else if (status === "active") {
                return "#51a13a";
            } else {
                return "#000000";
            }
        }
    }

    getBackgroundColor = (status) => {
        if (status === "new") {
            return "#b7c3ed";
        } else if (status === "active") {
            return "#FFDC53";
        } else {
            return "#51a13a";
        }
    };

    getButtonText = (status) => {
        if (this.state.isStudent) {
            return "+1";
        } else {
            if (status === "new") {
                return "Accept";
            } else if (status === "active") {
                return "Complete";
            } else {
                return "Done";
            }
        }
    };

    renderLiveCourseSession() {
        const listStyle = {
            display: "flex",
            flexWrap: "nowrap",
            padding: "0",
            margin: "0",
            marginBottom: "10px",
            alignItems: "center"
        };

        const listItem = {
            flex: "1",
            textAlign: "center"
        };

        let deleteStreamBtn = <Col>
            <Button variant={"danger"} onClick={this.deleteOfficeHour}>Cancel stream</Button>
        </Col>;

        return (
            <div className={"container-fluid p-4"}>
                <Row className={"mt-5"}>
                    <Col>
                        <h2>{this.state.course.code} - {this.state.course.name} <Badge variant="danger"
                                                                                       style={{fontSize: "50%"}}>Live</Badge>
                        </h2>
                    </Col>
                </Row>

                <Row className={"mt-4"}>
                    <Col sm={12} md={6}>
                        <div>
                            <ReactHLS autoplay={true}
                                      url={"https://stream.mux.com/" + this.state.officeHour.mux_data.playback_ids[0].id + ".m3u8"}/>
                        </div>
                    </Col>
                    <Col md={{span: 4}}>
                        <div>
                            <Tabs className="tabs">
                                <TabList style={listStyle}>
                                    <Tab style={listItem}>Questions</Tab>
                                    <Tab style={listItem}>Chat</Tab>
                                </TabList>

                                <TabPanel>
                                    <ScrollArea innerClassName="questionContainer" height="400px">
                                        {this.state.questionArray.map((result, index) => (
                                            <div key={index}>
                                                <Question text={result.doc.text}
                                                            status={result.doc.status}
                                                            numUpvotes={result.doc.upvotes}
                                                            isStudent={this.state.isStudent}
                                                            id={result.id}
                                                            buttonColor={this.getButtonColor(result.doc.status)}
                                                            buttonText={this.getButtonText(result.doc.status)}
                                                            backgroundColor={this.getBackgroundColor(result.doc.status)}/>
                                            </div>))}
                                    </ScrollArea>
                                    <textarea rows="4"
                                              name="questionInput"
                                              value={this.state.questionInput}
                                              className="askQuestion"
                                              onChange={e => this.change(e)}
                                              onKeyUp={e => this.checkSubmit(e)}
                                              placeholder="Want something covered? Ask a question"/>
                                </TabPanel>
                                <TabPanel className="chatTab" height="400px">
                                    <Chat officeHourID={this.state.officeHourId}/>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }

    renderRecording() {
        const listStyle = {
            display: "flex",
            flexWrap: "nowrap",
            padding: "0",
            margin: "0",
            marginBottom: "10px",
            alignItems: "center"
        };

        const listItem = {
            flex: "1",
            textAlign: "center"
        };

        return (
            <div className={"container p-4"}>
                <Row className={"mt-5"}>
                    <Col>
                        <h2>{this.state.course.code} - {moment(this.state.officeHour.time_created.toDate()).format("MMMM Do, h:mm a")}
                            <Badge className={"ml-4"} variant="secondary" style={{fontSize: "50%"}}>Recording</Badge>
                        </h2>
                    </Col>
                </Row>

                <Row className={"mt-4"}>
                    <Col>
                        <div>
                            <ReactHLS autoplay={true}
                                      url={"https://stream.mux.com/" + this.state.officeHour.mux_assets_data.playback_ids[0].id + ".m3u8"}/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    getGreeting() {
        if (this.state.officeHour.mux_data.type === "video.live_stream.connected" || this.state.officeHour.mux_data.type === "video.live_stream.recording" || this.state.officeHour.mux_data.type === "video.live_stream.active") {
            return "Connecting..."
        }

        return "Get ready.";
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
                            <h2 className={"text-center mt-5"}>{this.getGreeting()}</h2>
                            <p className={"text-center mt-5"}>Use your favorite broadcasting software to stream
                                to <code>rtmp://live.mux.com/app</code> using this stream
                                key: <code>{this.state.officeHour.mux_data.stream_key}</code></p>
                            <p className={"text-center"}>Once you start streaming, this page will automatically
                                update.</p>
                        </Col>
                    </Row>
                    {/*<Row>*/}
                    {/*    <Col className={"text-center mt-4"}>*/}
                    {/*        <Button variant={"danger"} onClick={this.deleteOfficeHour}>Cancel stream</Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Container>
            );
        } else {
            // If the status is active, this is a live session.
            // If not, this is a recording.
            if (this.state.officeHour.mux_data.status === "active") {
                return this.renderLiveCourseSession();
                // return (
                //     <Container className={"pt-5"}>
                //         <Row>
                //             <Col>
                //                 <h2 className={"text-center mt-5"}>You're streaming now.</h2>
                //             </Col>
                //         </Row>
                //     </Container>
                // );
            } else {
                return this.renderRecording();
            }
        }

    }
}

export default OfficeHour;