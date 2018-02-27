//@flow
import React, { Component } from 'react';
import './Spinner.css';
import PropTypes from 'prop-types';


type Props = {
    foo: number,
    isLoading: false
};
type State = {
    bar: number,
};

class Spinner extends Component<Props, State> {
  render() { //TODO: make this joly!
      if(this.props.isLoading) return <h6>Loading</h6>
      return null
  }
}

Spinner.propTypes = {
    icon: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
}

export default Spinner;
