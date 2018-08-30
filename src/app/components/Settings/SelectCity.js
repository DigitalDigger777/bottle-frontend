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

const topPanelTitle = <span style={styles.titleStyle}>Город</span>;
const PanelTopColLeft = <IconButton href={window.localStorage.getItem('settingRedirectUrl')}><NavigateBefore /></IconButton>;
const PanelTopColRight = <div style={{width: 40}}></div>;

export default class SelectCity extends React.Component{

    constructor(props){
        super(props);

        const whomSetting = window.localStorage.getItem('whomSetting');
        const setting = window.localStorage.getItem('setting');
        const process = window.localStorage.getItem('process') ? window.localStorage.getItem('process') : 'whomSend';

        this.state = {
            process:        process,
            whomSetting:    JSON.parse(whomSetting),
            setting:        JSON.parse(setting),
            items:          []
        };

        this.selectCity = this.selectCity.bind(this);
    }

    componentDidMount(){
        const config = new Config();

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

        if (this.state.process == 'whomSend') {
            let whomSendSetting = this.state.whomSetting;

            whomSendSetting.city.id   = cityId;
            whomSendSetting.city.name = name;

            window.localStorage.setItem('whomSetting', JSON.stringify(whomSendSetting));
        }

        if (this.state.process == 'setting') {
            let setting = this.state.setting;

            setting.city.id   = cityId;
            setting.city.name = name;

            window.localStorage.setItem('setting', JSON.stringify(setting));
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