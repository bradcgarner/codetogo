import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export function BurgerIcon(props) {
  // Component function: Just an icon that renders a burger, on click displays menu
  
  const handleBurgerButton = () => {
    props.dispatch(actionsDisplay.toggleMenu())
  }
  
    return (
      <i onClick={()=>handleBurgerButton()} className="fa fa-ellipsis-v burgerIcon" aria-hidden="true"></i>
    );
}

export const mapStateToProps = state => ({
  display: state.display,
  user: state.user,
})

export default connect(mapStateToProps)(BurgerIcon);