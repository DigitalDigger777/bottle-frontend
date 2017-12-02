import React, {Component} from 'react';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Avatar from 'material-ui/Avatar';
import Config from '../Config';
import axios from 'axios';

import Messages from '../Messages/Messages';

const topPanelTitle = <Avatar src="/img/user-3.png" />;
const PanelTopColLeft = <IconButton href="/#/chats"><NavigateBefore /></IconButton>;
const PanelTopColRight = <IconButton href="/#/whom-send"><ContentCreate /></IconButton>;

export default class ChatMessages extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            chatId: props.match.params.chatId,
            items: []
        }
    }



    render(){
        return (
            <Messages title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} content={true} chatId={this.state.chatId}/>
        );
    }
}