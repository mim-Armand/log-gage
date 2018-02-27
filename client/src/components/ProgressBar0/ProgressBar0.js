//@flow
import React, { Component } from 'react';
import './ProgressBar0.css';
import PropTypes from 'prop-types';


type Props = {
    foo: number,
    click: null
};
type State = {
    bar: number,
};

class ProgressBar0 extends Component<Props, State> {
  render() {
    return (
        <div className="simpelProgressBar">
            <small>{this.props.title || "Progress:"}  </small>
            <progress value={this.props.value || 0} max={this.props.max || 100}> {this.props.value || 0} / {this.props.max || 100} </progress>
        </div>
    );
  }
}

ProgressBar0.propTypes = {
}

export default ProgressBar0;
