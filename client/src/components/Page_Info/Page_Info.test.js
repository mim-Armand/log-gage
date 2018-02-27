import React from 'react';
import ReactDOM from 'react-dom';
import Page_Info from './Page_Info';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Steps />, div);
});
