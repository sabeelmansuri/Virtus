/*
https://github.com/ScaleDrone/react-chat-tutorial/blob/master/src/Input.js
*/

import React, { Component } from 'react';
import './Chat.css';
import Messages from "./Messages";
import Input from "./Input";
import {fdb, db} from "../db";

function randomName() {
  const adjectives = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
    "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
    "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
    "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
    "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
    "ancient", "purple", "lively", "nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class Chat extends Component {
  state = {
    messages: [],
    currentUser: null
  };

  onSendMessage = (message) => {
      console.log(message);
    fdb.collection("messages")
        .add({
          office_hour: this.props.officeHourID,
          text: message,
          time_created: new Date(),
          user: this.state.currentUser.uid
        })
  };

  componentDidMount() {
    db.auth().onAuthStateChanged((user) => {
      this.setState({currentUser: user});
    });

    fdb.collection("messages")
        .where("office_hour", "==", this.props.officeHourID)
        .orderBy("time_created")
        .onSnapshot(querySnapshot => {
          const orderedMessages = querySnapshot.docs.map(doc => {
            return {id: doc.id, doc: doc.data()}
          });
          let joined = this.state.messages.concat(orderedMessages);
          this.setState({messages:joined});
        });
  };


  render() {
    return (
      <div className="App">
        <Messages
          messages={this.state.messages}
          currentMember={this.state.currentUser}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

}

export default Chat;