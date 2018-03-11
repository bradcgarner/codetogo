import React from 'react';
import { Field } from 'redux-form';

export default function ChoiceInputs(props) {

  const question = props.question;
  const answers = question.answers;

  const typeAnswer = question.typeAnswer;  

  const optionsList = answers.map((answer,index)=>{
    const optionName = typeAnswer === 'radio' ? 'option' : `${answer.id}`;

    return <div key={index}>
      <Field 
        name={optionName} 
        id={answer.id}
        component='input'
        type={typeAnswer}
        value={answer.id}
        onChange={()=>props.markFormAsTouched()} />
      <label htmlFor={answer.id}>{answer.option}</label>
    </div> ;
    
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