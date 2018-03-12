//@flow
/* eslint-disable */
// TODO: re-enable es-lint: we disabled it as we are working on prod release pipeline and in prod es-lint warns change to err and prevent the release!
/*global remote, isElectron*/
/*eslint no-undef: "error"*/
import React, { Component } from 'react';
import './LeftDrawer.css';
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
import TextField from 'material-ui/TextField';
import Fuse from 'fuse.js';





import moment from 'moment';

const style = {
    marginRight: 10,
};

class LeftDrawer extends Component<Props, State> {

    constructor(props){
        super(props);
        this.state = {
            dropDownValue: 'default',
            logGroupSearchValue: "",
            logGroups: [],
            filteredLogGroups: [],
            currentLogEvent: "",
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({logGroups: nextProps.logGroups})
    }

    componentDidMount(){
        this.setState({
            filteredLogGroups: this.props.logGroups[ this.state.dropDownValue ]
        }, ()=>{
            if (this.props.autoRefresh ) {
                setInterval( ()=>{ this.getLogs() }, this.props.autoRefreshInt)
            }
        });
    }

    toggleLeftDrawer = () => {
        this.props.toggleLeftDrawer()};

    dropDownChanged = (event, index, value) => {
        this.setState({
            dropDownValue: value,
            filteredLogGroups: this.filterLogGroups( this.state.logGroupSearchValue, value)
        });
    }

    searchLogGroups = (event) => {
        this.setState({
            logGroupSearchValue: event.target.value,
            filteredLogGroups: this.filterLogGroups( event.target.value )
        });
    };

    fetchLogGroups = (event: object) => {
        this.props.getLogGroups(this.state.dropDownValue);
    };

    logItemSelected(logGroup ){
        this.setState({currentLogEvent: logGroup}, ()=>{
            this.getLogs();
        });
    }

    getLogs(){ if ( ! this.state.currentLogEvent ) return;
        this.props.getLogEvents(this.state.dropDownValue, this.state.currentLogEvent);
    }

    filterLogGroups(string, profileName){
        let currentLogGroup = this.props.logGroups[ ( profileName || this.state.dropDownValue ) ];
        if ( !string || string == "" ) return currentLogGroup;
        let options = {
            // caseSensitive: true,
            // tokenize: true,
            shouldSort: true,
            findAllMatches: true,
            // includeScore: true,
            // includeMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "logGroupName",
                "arn"
            ]
        };
        let fuse = new Fuse(currentLogGroup, options);
        return fuse.search(string);
    }

  render() {
    return (
        <div>
            <Drawer
                open={this.props.isOpen}
                docked={false}
                containerClassName="drawer"
                width="42%"
                onRequestChange={this.toggleLeftDrawer}
            >
                <Toolbar >
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.dropDownValue} onChange={this.dropDownChanged}>
                            <MenuItem checked={true} primaryText="AWS Profiles" disabled={true} leftIcon={<b>¶</b>}/>
                            <Divider />
                            { //TODO: test if array is empty show a man page and link to AWS docs to create profiles, if only one item ( default ) don't show the drop-down ( just metion default profile in use )
                                this.props.awsProfiles.map((item, index)=>{
                                    return(
                                        <MenuItem key={index} value={item} primaryText={item} />
                                    )
                                })
                            }
                        </DropDownMenu>
                        <FloatingActionButton style={style} mini={true} backgroundColor={"#fff"} onClick={this.fetchLogGroups}>
                            <ContentRedo />
                        </FloatingActionButton>
                    </ToolbarGroup>
                </Toolbar>
                { this.props.isLoading.logGroups &&
                <LinearProgress mode="indeterminate" />
                }
                <Divider inset={true} />
                <TextField
                    hintText="String / Hash"
                    floatingLabelText="Search Log Groups"
                    onChange={this.searchLogGroups}
                />
                <List>
                    { ( this.props.logGroups[this.state.dropDownValue] &&
                        this.state.filteredLogGroups) &&
                        this.state.filteredLogGroups.map((item, index)=>{
                            return <ListItem
                                onClick={()=>{this.logItemSelected(item.logGroupName)}}
                                key={item.logGroupName}
                                primaryText={
                                    <span className="truncate">{item.logGroupName.match(/[^\/]+$/)[0]}</span>
                                }
                                secondaryText={
                                    <span><small className="truncate">Added @ {moment(item.creationTime).calendar()}</small>
                                        {
                                            item.storedBytes > 0 &&
                                            <Chip className="left-drawer-chips" backgroundColor="#8C2925">
                                                {`${item.storedBytes} Bytes`}
                                            </Chip>
                                        }
                                        { item.metricFilterCount > 0 && <Chip className="left-drawer-chips" backgroundColor="#BF7300">{`${item.metricFilterCount}MFC`}</Chip>}
                                    </span>
                                    }
                                leftAvatar={
                                    <Avatar
                                        color={pinkA200} backgroundColor={transparent}
                                        // style={{left: 2}}
                                    >
                                        {index}
                                    </Avatar>
                                    }
                                // rightAvatar={}
                                />
                        })
                    }
                </List>
            </Drawer>
        </div>
    );
  }
}

export default LeftDrawer;
