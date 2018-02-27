//@flow
import React, { Component } from 'react';
import './Page_Info.css';


type Props = {
    foo: number,
    click: null
};
type State = {
    bar: number,
};

class Page_Info extends Component<Props, State> {
  render() {
      console.log(this.props)
    return (
        <h1>Info!</h1>
    );
  }
}

export default Page_Info;
