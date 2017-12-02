import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { Link } from 'react-router-dom';

import PanelTop from '../PanelTop';
import NavigationBottom from '../NavigationBottom';
import ChatList from './parts/ChatList';

const styles = {
    leftCol: {
        lineHeight: '64px',
        color: '#ffffff',
        fontSize: 16,
        marginTop: 0, marginLeft: '0'
    }
};

const topPanelTitle = "";
const PanelTopColLeft = <Link to="/#/chats" style={styles.leftCol}>Изменить</Link>;
const PanelTopColRight = <IconButton href="/#/whom-send"><ContentCreate /></IconButton>;

const Chats = () => (
    <div>
        <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} />
        <ChatList />
        <NavigationBottom active={1}/>
    </div>
);

export default Chats;