import {Component} from "react";
import React from "react";

class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const messageFromMe = (this.props.currentMember.uid === message.doc.user);
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
        <div className="Message-content">
        <div className="username">
            {this.props.currentMember.username}
          </div>
          <div className="text">{message.doc.text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;