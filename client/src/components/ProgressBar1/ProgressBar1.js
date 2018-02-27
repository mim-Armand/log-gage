//@flow
import React, { Component } from 'react';
import './ProgressBar1.css';
import PropTypes from 'prop-types';


type Props = {
    foo: number,
    click: null
};
type State = {
    bar: number,
};

class ProgressBar1 extends Component<Props, State> {
  render() {
    return (
        <div className="flexy-column">
            <div className="progress-factor flexy-item">
                <div className="progress-bar">
                    <div className="bar has-rotation has-colors red heat-gradient" role="progressbar" aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100">
                        <div className="tooltip heat-gradient-tooltip"></div>
                        <div className="bar-face face-position roof percentage"></div>
                        <div className="bar-face face-position back percentage"></div>
                        <div className="bar-face face-position floor percentage volume-lights"></div>
                        <div className="bar-face face-position left"></div>
                        <div className="bar-face face-position right"></div>
                        <div className="bar-face face-position front percentage volume-lights shine"></div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

ProgressBar1.propTypes = {
}

export default ProgressBar1;
