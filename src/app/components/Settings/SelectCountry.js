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

const topPanelTitle = <span style={styles.titleStyle}>Страна</span>;
const PanelTopColLeft = <IconButton href={window.localStorage.getItem('settingRedirectUrl')}><NavigateBefore /></IconButton>;
const PanelTopColRight = <div style={{width: 40}}></div>;

export default class SelectCountry extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            items: []
        };

        this.selectCountry = this.selectCountry.bind(this);
    }

    componentDidMount(){
        const config = new Config();
        const userId = window.localStorage.getItem('userId');

        axios({
            method: 'get',
            url: config.backendUrl + 'rest/country/',
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

    selectCountry(countryId, name) {
        const settingRedirectUrl = window.localStorage.getItem('settingRedirectUrl');
        window.localStorage.setItem('settingSelectCountryId', countryId);
        window.localStorage.setItem('settingSelectCountry', name);

        if (!settingRedirectUrl) {
            window.location = '/#/settings';
        } else {
            window.location = settingRedirectUrl;
        }

    }

    render(){
        if (this.state.items.length > 0) {
            return (
                <div>

                    <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight}/>

                    <div className="wrap-content">
                        <List className="select-list">
                            { this.state.items.map((country, index) => (
                                <ListItem key={index} primaryText={country.name} onClick={ (id, name) => this.selectCountry(country.id, country.name) } />
                            ))}

                        </List>
                    </div>

                    <NavigationBottom active={2}/>
                </div>
            )
        } else {
            return (
                <div>Load...</div>
            );
        }
    }
}