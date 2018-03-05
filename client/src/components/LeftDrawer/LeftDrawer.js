//@flow
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




import moment from 'moment';

const style = {
    marginRight: 10,
};






type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class LeftDrawer extends Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {open: true, dropDownValue: 'default'};
    }
    handleToggle = () => this.setState({open: !this.state.open});
    handleChange = (event, index, value) => this.setState({dropDownValue: value});
    fetchLogGroups = (event: object) => {
        this.props.getLogGroups(this.state.dropDownValue);
        return;
    };
    getLogs( logGroup ){
        this.props.getLogEvents(this.state.dropDownValue, logGroup);
    }
  render() {
    return (
        <div>
            <RaisedButton
                label="Toggle SideBar"
                onClick={this.handleToggle}
            />
            <Drawer
                open={this.state.open}
                docked={false}
                containerClassName="drawer"
                width="42%"
                onRequestChange={(open) => this.setState({open})}
            >
                <Toolbar >
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.dropDownValue} onChange={this.handleChange}>
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
                <List>
                    { this.props.logGroups[this.state.dropDownValue] &&
                        this.props.logGroups[this.state.dropDownValue].map((item, index)=>{
                            return <ListItem
                                onClick={()=>{this.getLogs(item.logGroupName)}}
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
