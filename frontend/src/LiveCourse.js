import React, {Component} from 'react';
import queryString from 'query-string';
import "./LiveCourse.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ScrollArea from '@xico2k/react-scroll-area';
import Question from './components/Question.js';

class LiveCourse extends Component {
    values = queryString.parse(this.props.location.search);

    state = {
        questionInput: '',
        chatInput: '',
        questionArray: [<Question text="yo"/>]
    };

    getCourseCode() {
        // use this.values.courseId
        return "CSE 110";
    }

    getCourseName() {
        return "Software Engineering";
    }

    checkSubmit(e) {
        e.preventDefault();
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();

            let newQuestion = <Question text={this.state.questionInput}/>;
            this.setState(prevState => ({questionArray: [...prevState.questionArray, newQuestion]}));
            this.setState({questionInput: ""});
        }
    }

    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

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
            <div>
                <div className="courseHomeParent">
                    <p className="courseHomeTitle">{this.getCourseCode()} - {this.getCourseName()}</p>
                </div>

            <div className="videoWrapper">
                <video width="95%" className='vid' controls autoPlay>
                    <source src="#"/>
                </video>
            </div>
            <div className="featureWrapper">
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
                                        {result}
                                    </div>))}
                            </ScrollArea>
                            <textarea rows="4"
                                      name="questionInput"
                                      value = {this.state.questionInput}
                                      className="askQuestion"
                                      onChange={e => this.change(e)}
                                      onKeyUp={e => this.checkSubmit(e)}
                                      placeholder="Want something covered? Ask a question"/>
                        </TabPanel>
                        <TabPanel>
                            Chat
                        </TabPanel>
                    </Tabs>
                </div>
             </div>
            </div>
        );
    }
}
export default LiveCourse;