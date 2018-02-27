//@flow
import React, { Component } from 'react';
import './Page_Search.css';
import ProgressBar0 from "../ProgressBar0/ProgressBar0";
import ProgressBar1 from "../ProgressBar1/ProgressBar1";


type Props = {
    foo: number,
    click: null
};
type State = {
    bar: number,
};

class Page_Search extends Component<Props, State> {
  render() {
      // console.log(this.props)
    return (
        <div>
            <ProgressBar0 value={this.props.rateLimit || 0} title={`Api Rate Limits: ${this.props.rateLimit}%`}/>
            <ProgressBar0 value={this.props.followers_cought || 0} max={this.props.followers_count || 0 } title={`This batch catch: ${this.props.followers_cought} / ${this.props.followers_count}`} />
            <h5>add the progress bars etc.</h5>
            <ProgressBar1 progress="45"/>
        </div>
    );
  }
}

export default Page_Search;
