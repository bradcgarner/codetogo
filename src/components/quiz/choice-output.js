import React from 'react';
import { Field } from 'redux-form';

export default function ChoiceOutput(props) {

  const question = props.question;
  const answers = question.answers;
  const choices = Array.isArray(props.choices) ? props.choices : [] ;

  const typeAnswer = question.typeAnswer;  

  const symbolCorrect = 
    typeAnswer === 'radio' ?  
      <i className="far fa-check-circle"></i> :
    typeAnswer === 'checkbox' ? 
      <i className="far fa-check-square"></i> : 
      <i className="fas fa-check"></i> ;
    
  const symbolIncorrect = <i className="fas fa-times"></i> ;
  
  const optionsList = answers.map((answer,index)=>{        
    return <div key={index}>
      {choices[index].correct === true ?
        symbolCorrect : symbolIncorrect }
        <label>{answer.option}</label>
      </div>;
  });

  const options = question.typeAnswer === 'text' ?
    <Field 
      className="questionOptions questionTextInput"
      name='textInput' 
      id='textInput'
      component='input'
      placeholder='type your answer here'
      onChange={()=>props.markFormAsTouched()} /> :
    <div className="questionOptions">{optionsList}</div> 

    return (options);
}