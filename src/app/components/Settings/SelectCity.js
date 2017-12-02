import React, {Component} from 'react';
import Config from '../Config';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import {List, ListItem} from 'material-ui/List';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';

import PanelTop from '../PanelTop';
import NavigationBottom from '../NavigationBottom';

const styles = {

    leftCol: {
        lineHeight: '64px',
        color: '#ffffff',
        fontSize: '16px',
        marginTop: 0,
        marginLeft: 0
    },
    rightCol: {
        lineHeight: '64px',
        color: '#ffffff',
        fontSize: '16px',
        marginTop: 0,
        marginRight: 0,
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: '20px'
    }
};

const topPanelTitle = <span style={styles.titleStyle}>Город</span>;
const PanelTopColLeft = <IconButton href={window.localStorage.getItem('settingRedirectUrl')}><NavigateBefore /></IconButton>;
const PanelTopColRight = <div style={{width: 40}}></div>;

export default class SelectCity extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            items: []
        };

        this.selectCity = this.selectCity.bind(this);
    }

    componentDidMount(){
        const config = new Config();
        const userId = window.localStorage.getItem('userId');

        axios({
            method: 'get',
            url: config.backendUrl + 'rest/city/',
            resolveWithFullResponse: true,
            params: {
                method: 'LIST'
            }
        }).then(response => {
            // console.log(response.data);
            this.setState({items: response.data})
        }).catch(error => {

        });
    }

    selectCity(cityId, name) {
        const settingRedirectUrl = window.localStorage.getItem('settingRedirectUrl');

        window.localStorage.setItem('settingSelectCityId', cityId);
        window.localStorage.setItem('settingSelectCity', name);

        if (!settingRedirectUrl) {
            window.location = '/#/settings';
        } else {
            window.location = settingRedirectUrl;
        }
    }

    render(){

        return (
            <div>

                <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} />

                <div className="wrap-content">
                    <List className="select-list">
                        { this.state.items.map((city, index) => (
                            <ListItem key={index} primaryText={city.name} onClick={(id, name) => this.selectCity(city.id, city.name)}/>
                        ))}
                    </List>
                </div>

                <NavigationBottom active={2} />
            </div>
        )
    }
}