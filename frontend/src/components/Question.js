import React, {Component} from 'react';
import './Question.css';

class Question extends Component {
    state = {
        numUpvotes: 0,
        status: "unanswered",
        text: this.props.text,
        backgroundColor: "#b7c3ed"
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

        if (e.currentTarget.innerHTML ==="Answer") {
            e.currentTarget.innerHTML = "Finish";
            this.setState({backgroundColor: "#FFDC53"});
        } else {
            e.currentTarget.classList.add("complete");
            this.setState({backgroundColor: "#51a13a"});
            e.currentTarget.innerHTML = "Done!";
            e.currentTarget.disabled = true;
        }
    }

    render () {
        let addOne = <button className="oneUp" onClick={e => this.addOne(e)}>+1</button>;
        let acceptQ = <button className="acceptQ" onClick={e => this.acceptQuestion(e)}>Answer</button>;

        return (
            <div className="questionWrapper" style={{background: this.state.backgroundColor}}>
                <div className="questionTextWrapper">
                    <div className="questionText">{this.state.text}</div>
                </div>
                <div className="actionsWrapper">
                    <div>{this.state.numUpvotes}</div>
                    {this.isStudent() ? addOne : acceptQ}
                </div>
            </div>
        );
    }
}

export default Question;