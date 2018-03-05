import React from 'react';
import ReactDOM from 'react-dom';
import TextInput from './LeftDrawer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WindowBar />, div);
});
