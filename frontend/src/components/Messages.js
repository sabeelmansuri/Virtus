import {Component} from "react";
import React from "react";

class Messages extends Component {
  render() {
    console.log(this.props);
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = false;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
        <div className="Message-content">
        <div className="username">
            {this.props.currentMember.username}
          </div>
          <div className="text">{message}</div>
        </div>
      </li>
    );
  }
}

export default Messages;