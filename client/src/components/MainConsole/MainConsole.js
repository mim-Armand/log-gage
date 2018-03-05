//@flow
/*global remote, isElectron*/
/*eslint no-undef: "error"*/
import React, { Component } from 'react';
import './MainConsole.css';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRedo from 'material-ui/svg-icons/content/redo';
import LinearProgress from 'material-ui/LinearProgress';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';





import moment from 'moment';








type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class MainConsole extends Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {};
    }
    toggleLeftDrawer = () => {
        this.props.toggleLeftDrawer()
    };
  render() {
      let currentLogGroup = this.props.currentLogGroupName;
      let currentLogEvent = this.props.logEvents[ currentLogGroup ];
    return (
        <div>

            <Toolbar >
                <ToolbarGroup>
                    <ToolbarTitle text="Expand for more settings >>" />
                    <RaisedButton label="Select Log groups and Profiles" onClick={this.toggleLeftDrawer} />
                </ToolbarGroup>
            </Toolbar>







            <List>
                <Subheader>{currentLogGroup}</Subheader>
                <Divider inset={false} />

            { ( !currentLogEvent || currentLogEvent.length == 0 ) &&
            <Card>
                <CardHeader
                    title="No Log Events"
                    subtitle="This log Group and Log Stream has not yet received any log events."
                    actAsExpander={true}
                    showExpandableButton={true}
                />

                <CardText expandable={true}>
                    Selected log group is:<br/>
                    <h2>{currentLogGroup}</h2>
                    <p>No log event was found for the selected log group..<br/>
                        This may be because a new log-stream was added or perhaps nothing was ever logged to the group.</p>
                </CardText>
            </Card>
            }
            {  currentLogEvent && this.props.logEvents[ this.props.currentLogGroupName ].map((item, index)=>{
                return (
                    <span key={index}>
                        <ListItem
                            primaryText={moment(item.timestamp).calendar()}
                            secondaryText="message:"
                            secondaryTextLines={2}
                        ></ListItem>
                        <p className="log-text">{item.message}</p>
                <Divider inset={true} />
                    </span>
                )
            }) }


            </List>










        </div>
    );
  }
}

export default MainConsole;
