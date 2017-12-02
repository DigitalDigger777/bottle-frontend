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
import axios from 'axios';
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
    },
    cardStyle: {
        marginBottom: 15
    }
};

const topPanelTitle = '';
const PanelTopColLeft = <div></div>;
const PanelTopColRight = <IconButton href="/#/whom-send"><ContentCreate /></IconButton>;

const noMessageContent = () => (

    <div className="no-message">
        <h3 className="text-center">Никто ничего не прислал</h3>
        <h5 className="text-center">Потяните экран чтобы обновить</h5>
    </div>
);

const subtitle = () => (
    <div>
        <div style={{fontSize: '10px', marginBottom: '3px'}}>Тблилиси, Грузия</div>
        <div>
            <ErrorOutline color='#F5A523' style={styles.smallIcon} />
            <ErrorOutline color='#F5A523' style={styles.smallIcon} />
            <ErrorOutline color='#CECECE' style={styles.smallIcon} />
        </div>
    </div>
);

const CardWithAvatar = () => (
    <div>
        <Card style={styles.cardStyle}>
            <CardHeader
                title="Гордеев Иван, 27 лет"
                subtitle={subtitle()}
                avatar="img/user-3.png"
            />
            <CardMedia>
                <img src="img/women-longboard.png" />
            </CardMedia>
            <CardActions className="text-center">
                <div className="clearfix" style={{marginRight: '0px', marginBottom: '15px', marginTop: '15px'}}>
                    <div className="pull-left">
                        <FlatButton
                            label="Принять"
                            backgroundColor="#68B514"
                            labelStyle={styles.labelStyle1}
                            style={styles.btnStyle1}
                        />
                    </div>
                    <div className="pull-right">
                        <FlatButton
                            label="Удалить"
                            backgroundColor="#D0011B"
                            labelStyle={styles.labelStyle1}
                            style={styles.btnStyle1}
                        />
                    </div>
                </div>
                <div>
                    <FlatButton
                        label="Подать жалобу"
                        labelStyle={styles.labelStyle2}
                        icon={<ErrorOutline color='#F5A523'/>}
                    />
                </div>

            </CardActions>
        </Card>
        <Card style={styles.cardStyle}>
            <CardHeader
                title="Гордеев Иван, 27 лет"
                subtitle={subtitle()}
                avatar="img/user-3.png"
            />
            <CardMedia>
                <img src="img/women-longboard.png" />
            </CardMedia>
            <CardActions className="text-center">
                <div className="clearfix" style={{marginRight: '0px', marginBottom: '15px', marginTop: '15px'}}>
                    <div className="pull-left">
                        <FlatButton
                            label="Принять"
                            backgroundColor="#68B514"
                            labelStyle={styles.labelStyle1}
                            style={styles.btnStyle1}
                        />
                    </div>
                    <div className="pull-right">
                        <FlatButton
                            label="Удалить"
                            backgroundColor="#D0011B"
                            labelStyle={styles.labelStyle1}
                            style={styles.btnStyle1}
                        />
                    </div>
                </div>
                <div>
                    <FlatButton
                        label="Подать жалобу"
                        labelStyle={styles.labelStyle2}
                        icon={<ErrorOutline color='#F5A523'/>}
                    />
                </div>

            </CardActions>
        </Card>
        <Card style={styles.cardStyle}>
            <CardHeader
                title="Гордеев Иван, 27 лет"
                subtitle={subtitle()}
                avatar="img/user-3.png"
            />
            <CardMedia>
                <img src="img/women-longboard.png" />
            </CardMedia>
            <CardActions className="text-center">
                <div className="clearfix" style={{marginRight: '0px', marginBottom: '15px', marginTop: '15px'}}>
                    <div className="pull-left">
                        <FlatButton
                            label="Принять"
                            backgroundColor="#68B514"
                            labelStyle={styles.labelStyle1}
                            style={styles.btnStyle1}
                        />
                    </div>
                    <div className="pull-right">
                        <FlatButton
                            label="Удалить"
                            backgroundColor="#D0011B"
                            labelStyle={styles.labelStyle1}
                            style={styles.btnStyle1}
                        />
                    </div>
                </div>
                <div>
                    <FlatButton
                        label="Подать жалобу"
                        labelStyle={styles.labelStyle2}
                        icon={<ErrorOutline color='#F5A523'/>}
                    />
                </div>

            </CardActions>
        </Card>
    </div>

);

export default class ReceiveMessage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            config: new Config()
        }
    }

    componentWillMount(){
        //axios.get('');
    }

    render(){

        return (
            <div>

                <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} />

                <div className="wrap-content">
                    <div className="wrap-card">
                        {CardWithAvatar()}
                    </div>

                </div>

                <NavigationBottom active={0} />
            </div>
        )
    }
}