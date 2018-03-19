//@flow
/* eslint-disable */
// TODO: re-enable es-lint: we disabled it as we are working on prod release pipeline and in prod es-lint warns change to err and prevent the release!
import React, { Component } from 'react';
import './App.css';
import Steps from "./components/Steps/Steps";
import WindowBar from "./components/WindowBar/WindowBar";
import LeftDrawer from "./components/LeftDrawer/LeftDrawer";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stuffActions from './actions/stuffActions';
import PropTypes from 'prop-types';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'; // TODO: add toggle for light/dark
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import Page_SetUp from "./components/Page_SetUp/Page_SetUp";
import Page_Search from "./components/Page_Search/Page_Search";
import Page_Info from "./components/Page_Info/Page_Info";
import Help_Twitter_App from "./components/Help_Twitter_App/Help_Twitter_App";
import MainConsole from "./components/MainConsole/MainConsole";
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
        this.props.stuffActions.getAWSProfiles();
    }

    NoProfile = ()=>{
        return (
            <div>
                <p><h1>No AWS Profile was found!</h1>
                    Please Google <b>"AWS Profiles"</b> to find-out what they are and how to add AWS configuration files to your system.<br/><br/>
                    Then come back here to see the magic!<br/>
                    <small>This software uses built-in AWS CLI/SDK credentials to transfer your cloud-watch events and logs to you safely and securly.<br/>
                        Hence the reason why it won't work without AWS CLI configurations being set up correctly in your system.<br/>
                        It's easy and fast! Just set it up and come back!</small>
                </p>
            </div>
        )
    }

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className="App">
              <WindowBar/>
              { this.props.stuff.awsProfiles.length < 1 &&
                <this.NoProfile/>
              }
              { this.props.stuff.awsProfiles.length > 0 &&
                  <LeftDrawer
                      awsProfiles =         { this.props.stuff.awsProfiles             }
                      logGroups =           { this.props.stuff.logGroups               }
                      isLoading =           { this.props.stuff.isLoading               }
                      isOpen =              { this.props.stuff.leftDrawerOpen          }
                      getLogGroups =        { this.props.stuffActions.getLogGroups     }
                      getLogEvents =        { this.props.stuffActions.getLogEvents     }
                      toggleLeftDrawer =    { this.props.stuffActions.toggleLeftDrawer }
                      autoRefresh      =    { true }
                      autoRefreshInt   =    { 5454 }
                  />
              }
              { this.props.stuff.awsProfiles.length > 0 &&
                  <MainConsole
                      logEvents =           { this.props.stuff.logEvents               }
                      currentLogGroupName = { this.props.stuff.currentLogGroupName     }
                      toggleLeftDrawer =    { this.props.stuffActions.toggleLeftDrawer }
                      isLoading           = { this.props.stuff.isLoading               }
                      searchInPage        = { this.props.stuffActions.searchInPage     }
                  />
              }
              {/*<ConnectedRouter history={history}>*/}
                        {/*<span>*/}
                            {/*<Route exact path="*" component={Steps}/>*/}
                            {/*<Route exact path="/" component={null}/>*/}
                            {/*<Route exact path="/setup"*/}
                                   {/*render={props => <Page_SetUp*/}
                                        {/*submitTwitterApp={this.props.stuffActions.testTwitterApp}*/}
                                        {/*getAWSProfiles={this.props.stuffActions.getAWSProfiles}*/}
                                        {/*twitter_app={this.props.stuff.twitter_app}*/}
                                        {/*handle={this.props.stuff.handle}*/}
                                        {/*isLoading={this.props.stuff.isLoading | false}*/}
                                        {/*{...props} />} />*/}
                            {/*<Route exact path="/search"*/}
                                   {/*render={props => <Page_Search*/}
                                       {/*handle={this.props.stuff.handle}*/}
                                       {/*isLoading={this.props.stuff.isLoading | false}*/}
                                       {/*rateLimit={ ( 15 - this.props.stuff.rate_limit_response.resources.followers["/followers/ids"]["remaining"]) * 6.66}*/}
                                       {/*followers_count={this.props.stuff.verify_credentials_response.followers_count}*/}
                                       {/*followers_cought={this.props.stuff.fetch_followers_history[this.props.stuff.fetch_followers_history.length - 1].sofar}*/}
                                       {/*{...props} />} />*/}
                            {/*<Route exact path="/help_twitter_app" component={Help_Twitter_App}/>*/}
                            {/*<Route exact path="/info" component={Page_Info}/>*/}
                        {/*</span>*/}
              {/*</ConnectedRouter>*/}
          </div>
        </MuiThemeProvider>
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