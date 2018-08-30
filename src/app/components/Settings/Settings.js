import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../Config';

import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

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

const topPanelTitle     = <span style={styles.titleStyle}>Настройки</span>;
const PanelTopColLeft   = <Link to="/chats" style={styles.leftCol}>Отмена</Link>;
const PanelTopColRight  = <Link to="/chats" style={styles.rightCol}>Готово</Link>;

export default class Settings extends React.Component{

    constructor(props){
        super(props);

        const config = new Config();

        window.localStorage.setItem('process', 'setting');

        let setting = window.localStorage.getItem('setting');

        if (!setting) {

            const defaultSetting = config.defaultSetting;

            window.localStorage.setItem('whomSetting', JSON.stringify(defaultSetting));
            setting = defaultSetting;
        } else {
            setting = JSON.parse(setting);
        }

        const defaultDate = new Date(1998, 7, 24);

        this.state = {
            defaultDate: defaultDate,
            setting:     setting,
            user:        null,
            backendUrl:  config.backendUrl
        };

        this.birthdayChangeHandle = this.birthdayChangeHandle.bind(this);
    }

    componentWillMount(){
        const config = new Config();
        const userFromStorage = JSON.parse(window.localStorage.getItem('user'));

        this.checkSelectOptions(userFromStorage.id, data => {

            let setting = this.state.setting;
            let user    = this.state.user;

            axios({
                method: 'get',
                url: config.backendUrl + 'rest/user/',
                resolveWithFullResponse: true,
                params: {
                    userId: userFromStorage.id
                }
            }).then(response => {

                setting.country = response.data[0].country;
                setting.city    = response.data[0].city;
                setting.gender  = response.data[0].gender ? response.data[0].gender : 'Пол';

                this.setState({
                    user: response.data[0],
                    setting: setting,
                    defaultDate: new Date(response.data[0].birthday.date)
                });

                window.localStorage.setItem('setting', JSON.stringify(setting));

            }).catch(error => {

                console.log('user error', error);

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
        const user = JSON.parse(window.localStorage.getItem('user'));
        const config = new Config();

        this.setState({
            birthday: date
        });

        axios({
            method: 'put',
            url: config.backendUrl + 'rest/user/',
            resolveWithFullResponse: true,
            params: {
                userId: user.id,
                birthDay: date
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    genderChangeHandle(e, value) {
        //console.log(value);
        if (typeof e.target != 'undefined') {
            this.setState({
                gender: value
            });
        }
    }

    render(){
        console.log(this.state.user);

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