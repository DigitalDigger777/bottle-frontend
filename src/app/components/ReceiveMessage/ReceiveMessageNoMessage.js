import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';

import PanelTop from '../PanelTop';
import NavigationBottom from '../NavigationBottom';
import Config from '../Config';

const styles = {

    labelStyle1: {
        color: '#ffffff',
        textTransform: 'none'
    },
    labelStyle2: {
        color: '#9B9A9B',
        textTransform: 'none'
    },
    btnStyle1: {
        minWidth: '150px'
    },
    smallIcon: {
        width: 16,
        height: 16,
    }
};

const topPanelTitle = '';
const PanelTopColLeft = <div></div>;
const PanelTopColRight = <IconButton href="/#/whom-send"><ContentCreate /></IconButton>;

const noMessageContent = () => (
    <a href="/#/receive-message" style={{display: 'block'}}>
        <div className="no-message">
            <h3 className="text-center">Никто ничего не прислал</h3>
            <h5 className="text-center">Потяните экран чтобы обновить</h5>
        </div>
    </a>
);

export default class ReceiveMessageNoMessage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            config: new Config()
        }
    }

    render(){

        return (
            <div>

                <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} />

                <div className="wrap-content">
                    <div className="wrap-card">
                        {noMessageContent()}
                    </div>

                </div>

                <NavigationBottom active={0} />
            </div>
        )
    }
}