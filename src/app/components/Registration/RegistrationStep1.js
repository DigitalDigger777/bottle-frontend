import React from 'react';
import {render} from 'react-dom';
import { Router } from 'react-router';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Config from '../Config';

import PageBottleBackground from '../PageBottleBackground/PageBottleBackground';


const styles = {
    labelText: {
        color: '#ffffff',
        paddingLeft: 15
    },
    textField: {
        marginBottom: 50
    },
    input: {
        color: '#ffffff',
        border: '1px solid #fff',
        borderRadius: 3,
        padding: '0 10px'
    },
    primaryButton: {
        textAlign: 'center',
        width: '50%'
    }

}

export default class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tel: ''
        };

        this.next = this.next.bind(this);
    }

    telInputChangeHandler(e) {
        this.setState({
            tel: e.target.value
        });
    }

    next(e) {
        console.log(this.state.tel);
        const config = new Config();


        axios.post(config.backendUrl + 'rest/auth/step-1', {
            tel: this.state.tel
        }).then(response => {
            console.log(response.data);
            if (response.data.status === 2) {
                window.localStorage.setItem('userId', response.data.id);
                window.location = '/#/chats';
            } else {
                // alert(response.data.code);
                // original
                // window.location = '/#/registration/enter-code';

                //demo
                window.location = '/#/registration/enter-code/' + response.data.code;
            }

        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <PageBottleBackground>
                <div className="wrap-verif">
                    <TextField
                        hintText="Номер телефона"
                        fullWidth={true}
                        underlineShow={false}
                        style={styles.textField}
                        hintStyle={styles.labelText}
                        inputStyle={styles.input}
                        onChange={ e => this.telInputChangeHandler(e) }/>

                    <div className="text-center">
                        <RaisedButton
                            label="Далее"
                            primary={true}
                            style={styles.primaryButton}
                            onClick={ this.next }
                        />
                    </div>
                </div>
                <div className="footer">
                    Вход
                </div>
            </PageBottleBackground>
        )
    }
}
