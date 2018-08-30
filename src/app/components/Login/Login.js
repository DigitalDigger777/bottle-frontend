import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Config from '../Config';
import axios from 'axios';



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
        padding: '0 10px',
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
        width: '70%'
    },
    link: {
        fontWeight: 'bold',
        verticalAlign: 'middle',
    }
}

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.state = {
            user: {
                tel: null,
                password: null
            },
            message: {
                open: false,
                text: ''
            },
            config: new Config()
        }
    }

    handleChangeUser(event, prop){
        let user = this.state.user;
        user[prop] = event.target.value;

        this.setState({
            user: user
        });
    }

    handleClose(){
        let message = this.state.message;
        message.open = false;

        this.setState({
            message: message
        });
    }

    login(){
        axios.post(this.state.config.backendUrl + 'rest/auth/login', {
            tel: this.state.user.tel,
            password: this.state.user.password
        })
            .then(response => {

                if (typeof response.data.error != 'undefined') {

                    this.setState({
                        message: {
                            open: true,
                            text: response.data.error.message
                        }
                    });


                }
                //window.location = '/#/chats';
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        console.log(this.state.message);
        return (
            <PageBottleBackground>
                <div className="wrap-verif">
                    <div style={styles.textField}>
                        <TextField
                            hintText="Телефон"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={(e, prop) => this.handleChangeUser(e, 'tel')}/>
                        <TextField
                            type="password"
                            hintText="Пароль"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={(e, prop) => this.handleChangeUser(e, 'password')}/>
                    </div>

                    <div className="clearfix">
                        <div className="col-50">
                            <Link to="/registration" style={{lineHeight: '28px'}}>Регистрация</Link>
                        </div>
                        <div className="col-50 text-right">
                            <RaisedButton
                                onClick={this.login.bind(this)}
                                label="Далее"
                                primary={true}
                                style={styles.primaryButton} />
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={this.state.message.open}
                    message={this.state.message.text}
                    autoHideDuration={3000}
                />
            </PageBottleBackground>
        )
    }
}