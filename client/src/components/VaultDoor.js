import React, { Component } from 'react';

import "./VaultDoor.css"

const questions = [
    {
        question: "What is your mother's maiden name?",
        answer: "Correct",
    },
    {
        question: "Where did you attend high school?",
        answer: "Correct",
    },
    {
        question: "What is your zip code?",
        answer: "79345",
    },
    {
        question: "Since when were you employed?",
        answer: "2013",
    },
    {
        question: "What was the name of your childhood pet?",
        answer: "Correct",
    },
    {
        question: "What is your phone number ending in 0616?",
        answer: "+1 (555)-896-0616",
    },
    {
        question: "In what city does your nearest sibling live?",
        answer: "Correct",
    },
    {
        question: "In what city did you meet your spouse/significant other?",
        answer: "Correct",
    },
]

class VaultDoor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionIndex: 0,
            timerId: -1,
            timeRemaing: 30,
            correctGuard: false,
            message: "",
        }
    }
    render() {
        return <div className="vault-door">
            <h1>Vault Door</h1>
            {this.renderQuestion()}
        </div>
    }

    getTime = () => {
        const now = Date.now()
        if (this.endTime && this.endTime >= now ) {
            this.setState({timeRemaing: Math.ceil((this.endTime - now) / 1000)}, () => {
                this.timeOutId = setTimeout(this.getTime, 470);
            });
        } else {
            this.setState({ message: "You ran out of time.", questionIndex: 0 });
        }
    }

    renderQuestion = () => {
        switch (this.state.questionIndex) {
            case 0:
                return <>
                    {this.state.message && <div className="question alert">{this.state.message}</div>}
                    <div className="question">Enter your ID number:</div>
                    <div className="question">
                        ID - 
                        <button onClick={() => {this.setState({correctGuard: true, questionIndex: 1})}}>EI1120</button>
                        <button onClick={() => {this.setState({correctGuard: false, questionIndex: 1})}}>Other</button>
                    </div>
                </>
            case 1: 
                return <>
                    <div className="question">Enter your password or recover your password:</div>
                    <div className="question">
                        Password: 
                        <button onClick={() => {this.setState({questionIndex: 0})}}>Incorrect</button>
                        <button onClick={() => {
                            this.endTime = Date.now() + 30 * 1000;
                            this.getTime();
                            this.setState({
                                questionIndex: 2,
                                questions: [...questions].sort((a, b) => Math.random() - 0.5).slice(0, -3),
                            });
                        }}>Forgot Password</button>
                    </div>
                </>
            case 2: 
            case 3: 
            case 4: 
                console.log(this.state.questions);
                const question = this.state.questions[this.state.questionIndex - 2]
                return <>
                    <div className="question">{question.question}</div>
                    <div className="question">
                        {this.state.correctGuard && (
                            <button  onClick={() => {
                                if (this.state.questionIndex == 4) {
                                    clearTimeout(this.timeOutId);
                                }
                                this.setState(state => ({questionIndex: state.questionIndex + 1}));
                            }}>
                                {question.answer}
                            </button>
                        )}
                        <button onClick={() => {
                            this.setState({
                                questionIndex: 0,
                                message: "That answer was incorrect!",
                            });
                            clearTimeout(this.timeOutId);
                        }}>Wrong Answer</button></div>
                    <div className="question">Time Remaing: {this.state.timeRemaing}</div>
                </>
            case 5: 
                return <>
                    <div className="question">Password Reset - Enter the vault when ready!</div>
                    <div className="question">
                        <button onClick={() => {
                            this.props.socket.emit("setRoomState", {roomCode: this.props.room, state: 60});
                        }}>Enter</button>
                    </div>
                </>
        }
    }
}

export default VaultDoor;