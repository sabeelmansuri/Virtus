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

        e.currentTarget.disabled = true;
        e.currentTarget.style.background = "#72A172";
        e.currentTarget.innerHTML = "✓";
    }

    isStudent() {
        return false;
    }

    acceptQuestion = (e) => {
        e.preventDefault();

        if (e.currentTarget.innerHTML ==="Accept") {
            e.currentTarget.classList.add("active");
            e.currentTarget.innerHTML = "Complete";
        } else {
            e.currentTarget.classList.add("complete");
            e.currentTarget.innerHTML = "Done";
            e.currentTarget.disabled = true;
        }
    }

    render () {
        let addOne = <button className="oneUp" onClick={e => this.addOne(e)}>+1</button>;
        let acceptQ = <button className="acceptQ" onClick={e => this.acceptQuestion(e)}>Accept</button>;

        return (
            <div className="questionWrapper {this.state.status}">
                <div className="votes">
                    <div>{this.state.numUpvotes}</div>
                    {this.isStudent() ? addOne : acceptQ}
                </div>
                <div className="questionText">{this.state.text}</div>
            </div>
        );
    }
}

export default Question;