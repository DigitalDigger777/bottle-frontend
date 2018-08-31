import React, {Component} from 'react';
import Config from '../Config';
import axios from 'axios';

import IconButton from 'material-ui/IconButton';
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

        const whomSetting = window.localStorage.getItem('whomSetting');
        const setting = window.localStorage.getItem('setting');
        const process = window.localStorage.getItem('process') ? window.localStorage.getItem('process') : 'whomSend';
        const user = window.localStorage.getItem('user');

        this.state = {
            process:        process,
            whomSetting:    JSON.parse(whomSetting),
            setting:        JSON.parse(setting),
            items:          [],
            config:         new Config(),
            user:           JSON.parse(user)
        };

        this.selectCountry = this.selectCountry.bind(this);
    }

    componentDidMount(){
        const config = new Config();

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

        if (this.state.process == 'whomSend') {
            let whomSendSetting = this.state.whomSetting;

            whomSendSetting.country.id   = countryId;
            whomSendSetting.country.name = name;

            window.localStorage.setItem('whomSetting', JSON.stringify(whomSendSetting));
        }

        if (this.state.process == 'setting') {
            let setting = this.state.setting;

            if (setting.country === null) {
                setting.country = {id: 0, name: ''};
            }

            setting.country.id   = countryId;
            setting.country.name = name;

            axios.put(this.state.config.backendUrl + 'rest/user/', {
                userId: this.state.user.id,
                countryId: countryId
            })
                .then(response => {

                    window.localStorage.setItem('setting', JSON.stringify(setting));
                })
                .catch(error => {
                    console.log(error);
                });

        }

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