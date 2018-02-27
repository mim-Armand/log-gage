import React from 'react';
import ReactDOM from 'react-dom';
import TextInput from './WindowBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WindowBar />, div);
});
