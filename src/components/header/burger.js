import React from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export function Burger(props) {
  
  const handleBurgerButton = () => {
    // props.dispatch(actionsDisplay.toggleBurger(props.mode.burger))
    // change this to state
  }
  
    return (
      <i onClick={()=>handleBurgerButton()} className="fa fa-ellipsis-v burgerIcon" aria-hidden="true"></i>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Burger);