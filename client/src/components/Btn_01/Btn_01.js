//@flow
import React, { Component } from 'react';
import './Btn_01.css';
import PropTypes from 'prop-types';


type Props = {
    foo: number,
    click: null
};
type State = {
    bar: number,
};

class Btn01 extends Component<Props, State> {
  render() {
    return (
        <button className="button button--sacnite button--round-l" onClick={()=>this.props.click(this.props.route)}>
            <i className={"btns fa fa-2x fa-" + this.props.icon}></i>
            <span>Set-Up.</span>
        </button>
    );
  }
}

Btn01.propTypes = {
    click: PropTypes.func.isRequired,
    icon: PropTypes.string
}

export default Btn01;
