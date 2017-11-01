import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';

export function Burger(props) {
  
  const handleBurgerButton = () => {
    props.dispatch(actionsMode.toggleBurger(props.mode.burger))
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