import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Config from '../Config';
import axios from 'axios';

import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Paper from 'material-ui/Paper';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import CameraAlt from 'material-ui/svg-icons/image/camera-alt';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';

import PanelTop from '../PanelTop';
import NavigationBottom from '../NavigationBottom';
import MessagesContent from '../Messages/MessagesContent';

const styles = {

    labelText: {
        color: '#000000',
        paddingLeft: 15
    },
    textField: {
        height: '34px'
    },
    input: {
        color: '#000000',
        border: '1px solid #cdced2',
        borderRadius: '17px',
        height: '34px',
        padding: '0 13px'
    },
    primaryButton: {
        textAlign: 'center',
        width: '50%'
    },
    leftCol: {
        lineHeight: '55px',
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
        marginRight: 0
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: '20px'
    }
};

export default class Messages extends React.Component{

    constructor(props){
        super(props);
        //console.log(props);

        this.handleChange       = this.handleChange.bind(this);
        this.changeMessageText  = this.changeMessageText.bind(this);
        this.sendMessage        = this.sendMessage.bind(this);

        this.state = {
            RandomUser:     false,
            title:          props.title,
            colLeft:        props.colLeft,
            colRight:       props.colRight,
            content:        props.content,
            chatId:         props.chatId,
            messageText:    '',
            items:          []
        };

        if (typeof props.chatId !== 'undefined') {
            window.localStorage.setItem('chatId', props.chatId);
            window.localStorage.setItem('sendMessageToStack', false);
        }
    }

    componentDidMount(){
        const config = new Config();
        const userId = window.localStorage.getItem('userId');

        axios({
            method: 'get',
            url: config.backendUrl + 'rest/message/',
            resolveWithFullResponse: true,
            params: {
                userId: userId,
                chatId: this.state.chatId,
                method: 'LIST'
            }
        }).then(response => {
            console.log(response.data);
            this.setState({items: response.data})

        }).catch(error => {

        });
    }

    handleChange(event, RandomUser){
        this.setState({
            RandomUser: RandomUser
        });
    }

    changeMessageText(event, text) {
        this.setState({
            messageText: text
        });
    }

    sendMessage() {
        const config = new Config();
        const sendMessageToStack = window.localStorage.getItem('sendMessageToStack');

        if (sendMessageToStack === null || sendMessageToStack === 'false') {
            axios.post(config.backendUrl + 'rest/message/', {
                message: this.state.messageText,
                userId: window.localStorage.getItem('userId'),
                chatId: this.state.chatId
            }).then(response => {
                console.log('mmm', response);

                const userId = window.localStorage.getItem('userId');

                axios({
                    method: 'get',
                    url: config.backendUrl + 'rest/message/',
                    resolveWithFullResponse: true,
                    params: {
                        userId: userId,
                        chatId: this.state.chatId,
                        method: 'LIST'
                    }
                }).then(response => {
                    console.log(response.data);
                    this.setState({items: response.data})


                }).catch(error => {

                });

                //window.location.reload();
            }).catch(error => {

            });
        } else {
            let params = {};
            const isRandom = window.localStorage.getItem('isRandom');

            if (isRandom !== null && isRandom === 'true') {
                params.message  = this.state.messageText;
                params.userId   = window.localStorage.getItem('userId');
                params.isRandom = true;
            } else {
                params.message  = this.state.messageText;
                params.userId   = window.localStorage.getItem('userId');
                params.country  = window.localStorage.getItem('settingSelectCountry');
                params.city     = window.localStorage.getItem('settingSelectCity');
                params.gender   = window.localStorage.getItem('settingSelectGenderName') == 'Мужской' ? 0 : 1;
                params.ageFrom  = window.localStorage.getItem('ageFrom');
                params.ageTo    = window.localStorage.getItem('ageTo');
                params.isRandom = false;
            }

            axios.post(config.backendUrl + 'rest/message-stack/ ', params).then(response => {
                console.log(response);
                //window.location.reload();
            }).catch(error => {

            });
        }
    }

    render(){

        if (this.state.items.length == 0) {
            return (
                <div className="messages">
                    <PanelTop title={this.state.title} colLeft={this.state.colLeft} colRight={this.state.colRight}/>
                    <div className="msgs-list" style={{paddingBottom: '20px', paddingTop: '80px'}}>

                    </div>
                    <Paper zDepth={1} className="footer">
                        <IconButton className="btn-camera"><i className="material-icons">camera_alt</i></IconButton>
                        <TextField
                            name="message"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={this.changeMessageText}
                        />
                        <IconButton className="btn-circle" onClick={this.sendMessage}><i className="material-icons">arrow_upward</i></IconButton>

                    </Paper>
                </div>
            )
        } else {
            return (
                <div className="messages">
                    <PanelTop title={this.state.title} colLeft={this.state.colLeft} colRight={this.state.colRight}/>
                    <div className="msgs-list" style={{paddingBottom: '20px', paddingTop: '80px'}}>

                        {this.state.items.map((message, index) => (
                                <MessagesContent key={index} message={message}/>
                            )
                        )}

                    </div>
                    <Paper zDepth={1} className="footer">
                        <IconButton className="btn-camera">
                            <i className="material-icons">camera_alt</i>
                        </IconButton>
                        <TextField
                            name="message"
                            fullWidth={true}
                            underlineShow={false}
                            style={styles.textField}
                            hintStyle={styles.labelText}
                            inputStyle={styles.input}
                            onChange={this.changeMessageText}
                        />
                        <IconButton className="btn-circle" onClick={this.sendMessage}>
                            <i className="material-icons">arrow_upward</i>
                        </IconButton>

                    </Paper>
                </div>
            )
        }
    }
}