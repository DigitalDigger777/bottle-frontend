import React, {Component} from 'react';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import IconButton from 'material-ui/IconButton';

import Messages from '../Messages/Messages';

const topPanelTitle = <span>Кому отправим?</span>;
const PanelTopColLeft = <IconButton href="/#/whom-send"><NavigateBefore /></IconButton>;
const PanelTopColRight = <IconButton></IconButton>;

export default class ChatMessages extends React.Component{

    constructor(props){
        super(props);

    }

    render(){

        return (

            <Messages title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} content={false} />
        )
    }
}