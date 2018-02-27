import React from 'react';
import ReactDOM from 'react-dom';
import Help_Twitter_App from './Help_Twitter_App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Help_Twitter_App />, div);
});
