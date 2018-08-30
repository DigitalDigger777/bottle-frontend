import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';

import Slider from 'material-ui/Slider';
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

export default class SelectOld extends React.Component{

    constructor(props){
        super(props);

        const whomSetting = window.localStorage.getItem('whomSetting');
        const setting = window.localStorage.getItem('setting');
        const process = window.localStorage.getItem('process') ? window.localStorage.getItem('process') : 'whomSend';

        this.state = {
            process:        process,
            whomSetting:    JSON.parse(whomSetting),
            setting:        JSON.parse(setting),
            ageFrom: 18,
            ageTo: 19
        };
        this.handleAgeFrom = this.handleAgeFrom.bind(this);
        this.handleAgeTo = this.handleAgeTo.bind(this);
    }


    handleAgeFrom (event, value) {
        this.setState({ageFrom: value});
        this.setState({ageTo: value + 1});
        //window.localStorage.setItem('ageFrom', value);

        if (this.state.process == 'whomSend') {
            let whomSendSetting = this.state.whomSetting;

            whomSendSetting.age.from = value;
            //whomSendSetting.country.name = name;

            window.localStorage.setItem('whomSetting', JSON.stringify(whomSendSetting));
        }

        if (this.state.process == 'setting') {
            let setting = this.state.setting;

            setting.age.from   = value;
            //setting.country.name = name;

            window.localStorage.setItem('setting', JSON.stringify(setting));
        }

    };

    handleAgeTo (event, value) {
        this.setState({ageTo: value});
        //window.localStorage.setItem('ageTo', value);

        if (this.state.process == 'whomSend') {
            let whomSendSetting = this.state.whomSetting;

            whomSendSetting.age.to = value;
            //whomSendSetting.country.name = name;

            window.localStorage.setItem('whomSetting', JSON.stringify(whomSendSetting));
        }

        if (this.state.process == 'setting') {
            let setting = this.state.setting;

            setting.age.to   = value;
            //setting.country.name = name;

            window.localStorage.setItem('setting', JSON.stringify(setting));
        }
    };

    render(){

        return (
            <div>

                <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} />

                <div className="wrap-content">
                    <div style={{width: '90%', marginLeft: '5%'}}>
                        <Slider
                            min={18}
                            max={100}
                            step={1}
                            value={this.state.ageFrom}
                            onChange={this.handleAgeFrom }
                        />
                        <p>
                            <span>{'Возраст от: '}</span>
                            <span>{this.state.ageFrom}</span>
                        </p>

                        <Slider
                            min={19}
                            max={100}
                            step={1}
                            value={this.state.ageTo}
                            onChange={this.handleAgeTo }
                        />
                        <p>
                            <span>{'Возраст до: '}</span>
                            <span>{this.state.ageTo}</span>
                        </p>
                    </div>
                </div>

                <NavigationBottom active={2} />
            </div>
        )
    }
}