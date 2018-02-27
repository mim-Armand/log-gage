//@flow
import React, { Component } from 'react';
import './Help_Twitter_App.css';

type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class Help_Twitter_App extends Component<Props, State> {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div className="help-container">
          You will need valid Twitter developer credentials in the form of a set of consumer and access tokens/keys. You can get these <a href="https://apps.twitter.com/" target="_new">here</a>.
      </div>
    );
  }
}

export default Help_Twitter_App;
