import React from 'react';

export default class Loading extends React.Component {

  render() {

    return (
      <div className='loadingContainer'>
        <div className='loadingBackground'
          onClick={()=>{}}>
        </div>
        <i className='fa fa-spinner loadingIcon' aria-hidden="true"></i>
      </div>
    );
  }
}