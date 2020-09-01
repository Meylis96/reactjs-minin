import React, { Component } from 'react';
import './Quiz.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state = {
        results: {}, // {[id]: success || error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{ [id]: 'success' || 'error' }
        quiz: [
            {   question: 'What is sky color?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Black', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Red', id: 3},
                    {text: 'Green', id: 4}
                ]
            },

            {   question: 'When WW2 ended?',
                rightAnswerId: 4,
                id: 2,
                answers: [
                    {text: '1942', id: 1},
                    {text: '1989', id: 2},
                    {text: '1912', id: 3},
                    {text: '1945', id: 4}
                ]
            }
        ],
    }

    onAnswerClickHandler = (answerId) => {
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if(this.state.answerState[key] === 'success'){
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId){
            if(!results[question.id]) {
                results[question.id] = 'sucess';
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });
            const timeout = window.setTimeout(()=> {
                if(this.isQuizFinished()){
                    this.setState({
                        isFinished: true
                    });
                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout();
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId] : "error"},
                results
            });
        }
    }

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }


    render(){
        return (
            <div className="quiz">
                <div className="quiz__wrapper">
                    <h1>Answer the questions</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;