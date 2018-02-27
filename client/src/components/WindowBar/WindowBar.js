//@flow
/*global remote, isElectron*/
/*eslint no-undef: "error"*/
import React, { Component } from 'react';
import './WindowBar.css';

type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class WindowBar extends Component<Props, State> {
    constructor(props){
        super(props);
        this.minimize = this.minimize.bind(this);
        this.maximize = this.maximize.bind(this);
    }
  minimize(){ if(isElectron) remote.getCurrentWindow().close(); }
  maximize(){ if(isElectron) remote.getCurrentWindow().setSimpleFullScreen( ! remote.getCurrentWindow().isSimpleFullScreen() ); }
  render() {
    return (
      <div className="window-bar">
          <span className="right-block">
              <a onClick={this.minimize}><i className="btns fa fa-caret-circle-down fa-xs"></i></a>
              <a onClick={this.maximize}><i className="btns fa fa-caret-circle-up fa-xs"></i></a>
          </span>
          <span className="left-block"><i className="fab fa-twitter"></i>  TwiTool.</span>
      </div>
    );
  }
}

export default WindowBar;
