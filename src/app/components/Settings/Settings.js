import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../Config';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import UploadAvatar from 'material-ui/svg-icons/action/account-circle';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import DropDownMenu from 'material-ui/DropDownMenu';

import PanelTop from '../PanelTop';
import NavigationBottom from '../NavigationBottom';

const styles = {
    labelText: {
        paddingLeft: 15,
        color: 'rgba(0, 0, 0, 0.87)'
    },
    textField: {

    },
    input: {
        color: 'rgba(0, 0, 0, 0.87)',
        borderRadius: 3,
        padding: '0 10px',
        textAlign: 'right',
    },
    radio: {
        display: 'inline-block',
        width: 60
    },
    labelRadio: {
        color: '#ffffff'
    },
    iconRadio: {
        marginRight: 8,
    },
    checkbox: {
        display: 'table-cell',
        heigh: '29px',
        verticalAlign: 'middle',
        width: 'auto',
        lineHeight: '29px'
    },
    uploadInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    primaryButton: {
        textAlign: 'center',
        width: '50%'
    },
    link: {
        fontWeight: 'bold',
        verticalAlign: 'middle',
    },
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

const topPanelTitle = <span style={styles.titleStyle}>Настройки</span>;
const PanelTopColLeft = <Link to="/chats" style={styles.leftCol}>Отмена</Link>;
const PanelTopColRight = <Link to="/chats" style={styles.rightCol}>Готово</Link>;

export default class Settings extends React.Component{

    constructor(props){
        super(props);

        const defaultDate = new Date(1998, 7, 24);;

        this.state = {
            defaultDate: defaultDate,
            user: null
        }

        this.birthdayChangeHandle = this.birthdayChangeHandle.bind(this);
    }

    componentDidMount(){
        const config = new Config();
        const userId = window.localStorage.getItem('userId');

        this.checkSelectOptions(userId, data => {
            window.localStorage.removeItem('settingSelectCountryId');
            window.localStorage.removeItem('settingSelectCityId');
            window.localStorage.removeItem('settingSelectGender');

            axios({
                method: 'get',
                url: config.backendUrl + 'rest/user/',
                resolveWithFullResponse: true,
                params: {
                    userId: userId
                }
            }).then(data => {
                console.log(data);
                this.setState({
                    user: data.data[0],
                    defaultDate: new Date(data.data[0].birthday.date)
                })
            }).catch(error => {

            });
        });
    }

    checkSelectOptions(userId, callback)
    {
        const config = new Config();

        const countryId = window.localStorage.getItem('settingSelectCountryId');
        const cityId    = window.localStorage.getItem('settingSelectCityId');
        const gender    = window.localStorage.getItem('settingSelectGender');

        let params = {
            userId: userId
        };

        if (countryId) {
            params.countryId = countryId;
        }

        if (cityId) {
            params.cityId = cityId;
        }

        if (gender !== null) {
            params.gender = gender;
        }

        axios({
            method: 'put',
            url: config.backendUrl + 'rest/user/',
            resolveWithFullResponse: true,
            params: params
        }).then(callback).catch(error => {
            console.log(error);
        });
    }

    nameChangeHandle(e) {
        if (typeof e.target != 'undefined') {
            this.setState({
                name: e.target.value
            });
        }
    }

    nicknameChangeHandle(e) {
        if (typeof e.target != 'undefined') {
            this.setState({
                nickname: e.target.value
            });
        }
    }

    passwordChangeHandle(e) {
        if (typeof e.target != 'undefined') {
            this.setState({
                password: e.target.value
            });
        }
    }

    cityChangeHandle(e) {
        if (typeof e.target != 'undefined') {
            this.setState({
                city: e.target.value
            });
        }
    }

    birthdayChangeHandle(e, date) {
        const userId = window.localStorage.getItem('userId');
        const config = new Config();

        this.setState({
            birthday: date
        });

        axios({
            method: 'put',
            url: config.backendUrl + 'rest/user/',
            resolveWithFullResponse: true,
            params: {
                userId: userId,
                birthDay: date
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    genderChangeHandle(e, value) {
        console.log(value);
        if (typeof e.target != 'undefined') {
            this.setState({
                gender: value
            });
        }
    }

    render(){

        if (this.state.user) {
            return (
                <div>

                    <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight}/>

                    <div className="wrap-content">
                        <div className="text-center">
                            <div className="wrap-uload-ava">
                                <Avatar src="img/user-5.png" size={56}/>
                                <input type="file" style={styles.uploadInput}/>
                                <div>Изменить аватар</div>
                            </div>
                        </div>
                        <div>
                            <Divider />
                            <div className="group-input">
                                <TextField
                                    hintText="Имя Фамилия"
                                    value={ this.state.user.name }
                                    underlineShow={false}
                                    onChange={ e => this.nameChangeHandle(e) }
                                />
                                <Divider />
                                <TextField
                                    hintText="Никнейм"
                                    value={ this.state.user.nickname }
                                    underlineShow={false}
                                    onChange={ e => this.nicknameChangeHandle(e) }
                                />
                                <Divider />
                                <div className="input-row clearfix">
                                    <div className="col-60">
                                        <div className="my-label">
                                            Дата рождения
                                        </div>
                                    </div>
                                    <div className="col-40">
                                        <DatePicker
                                            hintText="Дата рождения"
                                            fullWidth={true}
                                            underlineShow={false}
                                            style={styles.textField}
                                            hintStyle={styles.labelText}
                                            inputStyle={styles.input}
                                            defaultDate={this.state.defaultDate}
                                            onChange={ this.birthdayChangeHandle }
                                        />
                                    </div>
                                </div>
                                <Divider style={{width: '100%'}}/>
                                <div className="input-row clearfix">
                                    <div className="col-60">
                                        <div className="my-label">
                                            Пол
                                        </div>
                                    </div>
                                    <div className="col-40">
                                        <div className="text-right">
                                            <Link to="/settings/gender">{this.state.user.gender === 0 ? 'Мужской' : 'Женский'}</Link>
                                        </div>
                                        <ChevronRight style={{position: 'absolute', right: '0', top: '12px'}}/>
                                    </div>
                                </div>
                                <Divider style={{width: '100%'}}/>
                                <div className="input-row clearfix">
                                    <div className="col-60">
                                        <div className="my-label">
                                            Страна
                                        </div>
                                    </div>
                                    <div className="col-40">
                                        <div className="text-right">
                                            <Link to="/settings/country">{this.state.user.country ? this.state.user.country.name : 'Страна'}</Link>
                                        </div>
                                        <ChevronRight style={{position: 'absolute', right: '0', top: '12px'}}/>
                                    </div>
                                </div>
                                <Divider style={{width: '100%'}}/>
                                <div className="input-row-city clearfix">
                                    <div className="col-40">
                                        <div className="my-label">
                                            Город
                                        </div>
                                    </div>
                                    <div className="col-60">
                                        <div className="text-right">
                                            <Link to="/settings/city">{this.state.user.city ? this.state.user.city.name : 'Город'}</Link>
                                        </div>
                                        <ChevronRight style={{position: 'absolute', right: '0', top: '12px'}}/>
                                    </div>
                                </div>
                                <Divider style={{width: '100%'}}/>

                            </div>
                            <Divider style={{width: '100%', marginBottom: '20px'}}/>
                            <Divider style={{width: '100%'}}/>
                            {/*<div className="group-input">*/}
                                {/*<div className="input-row clearfix">*/}
                                    {/*<div className="col-60">*/}
                                        {/*<div className="my-label">*/}
                                            {/*Социальные сети*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-40">*/}
                                        {/*<ChevronRight style={{position: 'absolute', right: '0', top: '12px'}}/>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<Divider style={{width: '100%', marginBottom: '20px'}}/>*/}
                            {/*<Divider style={{width: '100%'}}/>*/}
                            {/*<div className="group-input">*/}
                                {/*<div className="input-row clearfix">*/}
                                    {/*<div className="col-60">*/}
                                        {/*<div className="my-label">*/}
                                            {/*Настроить уведомления*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-40">*/}
                                        {/*<ChevronRight style={{position: 'absolute', right: '0', top: '12px'}}/>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<Divider style={{width: '100%'}}/>*/}

                        </div>
                    </div>
                    <NavigationBottom active={2}/>
                </div>
            )
        } else {
            return (
                <div>Load...</div>
            )
        }
    }
}