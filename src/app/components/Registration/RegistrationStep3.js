import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../Config';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import UploadAvatar from 'material-ui/svg-icons/action/account-circle';


import PageBottleBackground from '../PageBottleBackground/PageBottleBackground';

const styles = {
    labelText: {
        color: '#ffffff',
        paddingLeft: 15
    },
    textField: {
        marginBottom: 20,
    },
    input: {
        color: '#ffffff',
        border: '1px solid #fff',
        borderRadius: 3,
        padding: '0 10px'
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
    }
}

export default class RegistrationStep3 extends React.Component{

    constructor(props){
        super(props);


        this.state = {
            acceptRules: false,
            name: '',
            nickname: '',
            password: '',
            city: '',
            birthday: '',
            gender: 0,
            acceptTerms: 0,

        };

        this.nicknameChangeHandle       = this.nicknameChangeHandle.bind(this);
        this.passwordChangeHandle       = this.passwordChangeHandle.bind(this);
        this.cityChangeHandle           = this.cityChangeHandle.bind(this);
        this.birthdayChangeHandle       = this.birthdayChangeHandle.bind(this);
        this.genderChangeHandle         = this.genderChangeHandle.bind(this);
        this.acceptTermsChangeHandle    = this.acceptTermsChangeHandle.bind(this);
        this.handleChange               = this.handleChange.bind(this);
        this.next                       = this.next.bind(this);
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

        this.setState({
            birthday: date
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

    acceptTermsChangeHandle(e) {
        if (typeof e.target != 'undefined') {
            this.setState({
                acceptTerms: e.target.value
            });
        }
    }

    handleChange(e){
        console.log(e.target.checked);
        this.setState({
            acceptRules: e.target.checked
        });
    }

    next() {

        const config = new Config();
        const userId = window.localStorage.getItem('userId');
        const userObject = {
            userId: userId,
            name:           this.state.name,
            nickname:       this.state.nickname,
            password:       this.state.password,
            city:           this.state.city,
            birthday:       this.state.birthday,
            gender:         this.state.gender == 'male' ? 1 : 0,
            acceptTerms:    this.state.acceptRules
        };

        console.log(userObject);

        axios.post(config.backendUrl + 'rest/auth/step-3', userObject).then(data => {
            console.log(data);
            window.location = '/#/chats';
        }).catch(error => {
            console.log(error);
        });
    }

    render(){

        return (
            <PageBottleBackground>
                <div className="wrap-user-data">
                    <div style={styles.textField}>
                        <TextField
                            hintText="Имя Фамилия"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={ e => this.nameChangeHandle(e)}/>
                        <TextField
                            hintText="Никнейм"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={ e => this.nicknameChangeHandle(e) } />
                        <TextField
                            type="password"
                            hintText="Пароль"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={ e => this.passwordChangeHandle(e) } />
                        <TextField
                            hintText="Город"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={ e => this.cityChangeHandle(e) } />
                        <DatePicker
                            hintText="Дата рождения"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={ this.birthdayChangeHandle } />
                        <div className="clearfix group-form">
                            <div className="col-50">
                                <RadioButtonGroup name="shipSpeed" defaultSelected="male" onChange={ this.genderChangeHandle }>
                                    <RadioButton
                                        value="male"
                                        label="M"
                                        labelStyle={styles.labelRadio}
                                        iconStyle={styles.iconRadio}
                                        style={styles.radio}
                                    />
                                    <RadioButton
                                        value="female"
                                        label="Ж"
                                        labelStyle={styles.labelRadio}
                                        iconStyle={styles.iconRadio}
                                        style={styles.radio}
                                    />
                                </RadioButtonGroup>
                            </div>
                            <div className="col-50 text-right">
                                <div className="wrap-uload-ava">
                                    Аватар
                                    <input type="file" style={styles.uploadInput} />
                                </div>
                            </div>
                        </div>
                        <div className="wrap-checkbox-link group-form">
                            <Checkbox
                                label="Принимаю&nbsp;"
                                iconStyle={styles.iconRadio}
                                labelStyle={styles.labelRadio}
                                style={styles.checkbox}
                                onCheck={ e => this.handleChange(e) }
                            />
                            <Link to="/registration/user-agreement" style={styles.link}>условия</Link>
                        </div>
                    </div>
                    <div className="text-center">
                        <RaisedButton
                            label="Далее"
                            primary={true}
                            disabled={!this.state.acceptRules}
                            style={styles.primaryButton}
                            onClick={ this.next } />
                    </div>
                </div>
            </PageBottleBackground>
        )
    }
}