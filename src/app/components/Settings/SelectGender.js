import React, {Component} from 'react';
import axios from 'axios';
import Config from '../Config';
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

const topPanelTitle = <span style={styles.titleStyle}>Пол</span>;
const PanelTopColLeft = <IconButton href={window.localStorage.getItem('settingRedirectUrl')}><NavigateBefore /></IconButton>;
const PanelTopColRight = <div style={{width: 40}}></div>;

export default class selectGender extends React.Component{

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
            config:         new Config(),
            user:           JSON.parse(user)
        };

        this.selectGender = this.selectGender.bind(this);
    }

    selectGender(gender, name) {
        const settingRedirectUrl = window.localStorage.getItem('settingRedirectUrl');

        if (this.state.process == 'whomSend') {
            let whomSendSetting = this.state.whomSetting;

            whomSendSetting.gender.id   = gender;
            whomSendSetting.gender.name = name;

            window.localStorage.setItem('whomSetting', JSON.stringify(whomSendSetting));
        }

        if (this.state.process == 'setting') {
            let setting = this.state.setting;

            if (setting.gender === null) {
                setting.gender = {id: 0, name: ''};
            }

            setting.gender.id   = gender;
            setting.gender.name = name;

            axios.put(this.state.config.backendUrl + 'rest/user/', {
                userId: this.state.user.id,
                gender: gender
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

        return (
            <div>

                <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} />

                <div className="wrap-content">
                    <List className="select-list">
                        <ListItem primaryText="Мужской" onClick={ (gender, name) => this.selectGender(0, "Мужской")}/>
                        <ListItem primaryText="Женский" onClick={ (gender, name) => this.selectGender(1, "Женский")} />
                    </List>
                </div>

                <NavigationBottom active={2} />
            </div>
        )
    }
}