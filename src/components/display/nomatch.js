import React from 'react';
import { Redirect } from 'react-router-dom';

export default function NoMatch () {
  // Component function: renders conditionally as subcomponent ONLY if conditions warrant redirecting to the home screen
  
  return ( <Redirect from = '*' to = '/'/> );

};