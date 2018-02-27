//@flow
import React, { Component } from 'react';
import './App.css';
import Steps from "./components/Steps/Steps";
import WindowBar from "./components/WindowBar/WindowBar";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stuffActions from './actions/stuffActions';
import PropTypes from 'prop-types';

import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import Page_SetUp from "./components/Page_SetUp/Page_SetUp";
import Page_Search from "./components/Page_Search/Page_Search";
import Page_Info from "./components/Page_Info/Page_Info";
import Help_Twitter_App from "./components/Help_Twitter_App/Help_Twitter_App";
const history = createHistory();

type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class App extends Component<Props, State> {

    componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
        console.log('componentWillMount',this.props)
        this.props.stuffActions.getFollowersCycle();
    }

  render() {
    return (
      <div className="App">
          <WindowBar/>
          <ConnectedRouter history={history}>
                    <span>
                        <Route exact path="*" component={Steps}/>
                        <Route exact path="/" component={null}/>
                        <Route exact path="/setup"
                               render={props => <Page_SetUp
                                    submitTwitterApp={this.props.stuffActions.testTwitterApp}
                                    twitter_app={this.props.stuff.twitter_app}
                                    handle={this.props.stuff.handle}
                                    isLoading={this.props.stuff.isLoading | false}
                                    {...props} />} />
                        <Route exact path="/search"
                               render={props => <Page_Search
                                   handle={this.props.stuff.handle}
                                   isLoading={this.props.stuff.isLoading | false}
                                   rateLimit={ ( 15 - this.props.stuff.rate_limit_response.resources.followers["/followers/ids"]["remaining"]) * 6.66}
                                   followers_count={this.props.stuff.verify_credentials_response.followers_count}
                                   followers_cought={this.props.stuff.fetch_followers_history[this.props.stuff.fetch_followers_history.length - 1].sofar}
                                   {...props} />} />
                        <Route exact path="/help_twitter_app" component={Help_Twitter_App}/>
                        <Route exact path="/info" component={Page_Info}/>
                    </span>
          </ConnectedRouter>
      </div>
    );
  }
}

App.propTypes = {
    stuffActions: PropTypes.object,
    test: PropTypes.any
};
function mapStateToProps(state) {
    return {
        test: state.stuff.test,
        stuff: state.stuff
    };
}
function mapDispatchToProps(dispatch) {
    return {
        stuffActions: bindActionCreators(stuffActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);