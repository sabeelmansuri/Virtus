import React, {Component} from 'react';
import './Question.css';

class Question extends Component {
    state = {
        numUpvotes: 0,
        status: "unanswered",
        text: this.props.text
    };

    addOne = (e) => {
        e.preventDefault();
        this.setState({ numUpvotes: this.state.numUpvotes + 1 });
        document.getElementById("oneUp").disabled = true;
        document.getElementById("oneUp").style.background = "#72A172";
        document.getElementById("oneUp").innerHTML = "✓";
    }

    render () {
        return (
            <div className="questionWrapper {this.state.status}">
                <div className="votes">
                    <div>{this.state.numUpvotes}</div>
                    <button className="oneUp" onClick={e => this.addOne(e)}>+1</button>
                </div>
                <div>{this.state.text}</div>
            </div>
        );
    }
}

export default Question;