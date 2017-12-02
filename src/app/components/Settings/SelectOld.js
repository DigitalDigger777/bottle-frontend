import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import {List, ListItem} from 'material-ui/List';

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

        this.state = {
            ageFrom: 18,
            ageTo: 19
        };
        this.handleAgeFrom = this.handleAgeFrom.bind(this);
        this.handleAgeTo = this.handleAgeTo.bind(this);
    }


    handleAgeFrom (event, value) {
        this.setState({ageFrom: value});
        this.setState({ageTo: value + 1});
        window.localStorage.setItem('ageFrom', value);
    };

    handleAgeTo (event, value) {
        this.setState({ageTo: value});
        window.localStorage.setItem('ageTo', value);
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