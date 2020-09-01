import React from 'react';
import './ActiveQuiz.scss';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className="activeQuiz">
        <p className="activeQuiz__question">
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp; 
                {props.question}
            </span>
            <small>{props.answerNumber} out of { props.quizLength }</small>
        </p>

        <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz;