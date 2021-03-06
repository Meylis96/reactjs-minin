import React from 'react';
import './FinishedQuiz.scss';
import Button from '../UI/Button/Button';


const FinishedQuiz = props => {
    const sucessCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'sucess') {
            total++;
        } 

        return total;
    }, 0);
    return (
        <div className="finishedQuiz">
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times incorrect' : 'fa-check correct',
                        props.results[quizItem.id]

                    ];
                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>

            <p>Correct: {sucessCount} out of {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Try again</Button>
                <Button type="successes">Go to test list</Button>
            </div>
        </div>
    )
}

export default FinishedQuiz;