import React from 'react';
import {render} from 'react-dom';
import { Router } from 'react-router';
import Config from '../Config';
import axios from 'axios';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import PageBottleBackground from '../PageBottleBackground/PageBottleBackground';

const styles = {
    labelText: {
        color: '#ffffff',
        paddingLeft: 15
    },
    textField: {
        marginBottom: 50,
    },
    input: {
        color: '#ffffff',
        border: '1px solid #fff',
        borderRadius: 3,
        padding: '0 10px'
    },
    primaryButton: {
        textAlign: 'center',
        width: '50%',
        marginBottom: 30
    },
    flatButton: {
        fontSize: '14px',
        textTransform: 'normal'
    },
    snackbar: {
        textAlign: 'center'
    }
}

export default class RegistrationStep2 extends React.Component {

    constructor(props) {
        super(props);

        this.handleTouchTap     = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.codeChangeHandler  = this.codeChangeHandler.bind(this);
        this.next               = this.next.bind(this);

        this.state = {
            open: false,
            code: '',
            tmpCode: typeof props.match.params.code != 'undefined' ? props.match.params.code : ''
        };
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    };

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };

    codeChangeHandler(e) {

        if (typeof e.target != 'undefined') {
            this.setState({
                code: e.target.value
            });
        }

    }

    next() {
        //index.html#/registration/enter-user-data

        const config = new Config();

        axios.post(config.backendUrl + 'rest/auth/step-2', {
            code: this.state.code
        }).then(response => {
            // console.log(response.data);
            window.localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location = '/#/registration/enter-user-data';
            //window.localStorage.setItem('userId', data.data.userId);
        }).catch(error => {
            console.log(error);
        });
    }

    render(){
        return(
            <PageBottleBackground>
                <div className="wrap-verif">
                    <div style={{color:'#ffffff'}}>код: {this.state.tmpCode}</div>
                    <TextField
                        hintText="Код из СМС"
                        fullWidth={true}
                        underlineShow={false}
                        style={styles.textField}
                        hintStyle={styles.labelText}
                        inputStyle={styles.input}
                        onChange={ e => this.codeChangeHandler(e) } />
                    <div className="text-center">
                        <RaisedButton
                            label="Далее"
                            primary={true}
                            style={styles.primaryButton}
                            onClick={ this.next } />
                        <div>
                            <FlatButton
                                label="Выслать код повторно"
                                onTouchTap={() => this.handleTouchTap()}
                                primary={true}
                                labelStyle={styles.flatButton} />
                        </div>
                    </div>
                    <Snackbar
                        open={this.state.open}
                        message="Код выслан"
                        autoHideDuration={3000}
                        contentStyle={styles.snackbar}
                        onRequestClose={() => this.handleRequestClose()}
                    />
                </div>
                <div className="footer">
                    Вход
                </div>
            </PageBottleBackground>
        )
    }

}