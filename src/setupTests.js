// import 'jest-enzyme'; 
// https://github.com/blainekasten/enzyme-matchers/tree/master/packages/jest-enzyme

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});