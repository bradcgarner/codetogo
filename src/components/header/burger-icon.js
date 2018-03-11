import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export function BurgerIcon(props) {
  // Component function: Just an icon that renders a burger, on click displays menu
  
  const handleBurgerButton = () => {
    console.log('clicked')
    props.dispatch(actionsDisplay.toggleMenu())
  }
  
    return (
      <div className='burger-icon-container' 
        onClick={()=>handleBurgerButton()} >
      <i 
        className="fas fa-ellipsis-v burger-icon" aria-hidden="true">
      </i>
      </div>
    );
}

export const mapStateToProps = state => ({
  display: state.display,
  user: state.user,
})

export default connect(mapStateToProps)(BurgerIcon);