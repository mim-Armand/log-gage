import React from 'react';
import ReactDOM from 'react-dom';
import Btn_01 from './Btn_01';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Steps />, div);
});
