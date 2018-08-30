import React, {Component} from 'react';
import axios from 'axios';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import PanelTop from '../PanelTop';
import MessagesContent from '../Messages/MessagesContent';
import Config from '../Config';

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

        const config = new Config();

        this.state = {
            RandomUser:     false,
            title:          props.title,
            colLeft:        props.colLeft,
            colRight:       props.colRight,
            content:        props.content,
            chatId:         props.chatId,
            messageText:    '',
            items:          [],
            process:        window.localStorage.getItem('process'),
            user:           JSON.parse(window.localStorage.getItem('user')),
            whomSetting:    JSON.parse(window.localStorage.getItem('whomSetting')),
            backendUrl:     config.backendUrl
        };

        if (typeof props.chatId !== 'undefined') {
            window.localStorage.setItem('chatId', props.chatId);
            window.localStorage.setItem('sendMessageToStack', false);
        }

        this.handleChange       = this.handleChange.bind(this);
        this.changeMessageText  = this.changeMessageText.bind(this);
        this.sendMessage        = this.sendMessage.bind(this);
        this.whomSendMessageProcess = this.whomSendMessageProcess.bind(this);
    }

    componentWillMount() {

        axios({
            method: 'get',
            url: this.state.backendUrl + 'rest/message/',
            resolveWithFullResponse: true,
            params: {
                userId: this.state.user.id,
                chatId: this.state.chatId,
                method: 'LIST'
            }
        }).then(response => {

            if (typeof response.data.message == 'undefined') {
                this.setState({items: response.data})
            }

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
        //const sendMessageToStack = window.localStorage.getItem('sendMessageToStack');

        if (this.state.process != 'whomSend') {
            axios.post(config.backendUrl + 'rest/message/', {
                message: this.state.messageText,
                userId: this.state.user.id,
                chatId: this.state.chatId
            }).then(response => {

                axios({
                    method: 'get',
                    url: config.backendUrl + 'rest/message/',
                    resolveWithFullResponse: true,
                    params: {
                        userId: this.state.user.id,
                        chatId: this.state.chatId,
                        method: 'LIST'
                    }
                }).then(response => {

                    this.setState({
                        items: response.data
                    })

                }).catch(error => {

                });

                //window.location.reload();
            }).catch(error => {

            });
        } else {
            this.whomSendMessageProcess();
            this.setState({
                messageText: ''
            });
        }
    }

    whomSendMessageProcess() {
        let params = {};

        //const isRandom    = window.localStorage.getItem('isRandom');

        if (this.state.whomSetting.isRandom) {
            params.message  = this.state.messageText;
            params.userId   = this.state.user.id;
            params.isRandom = true;
        } else {

            params.message  = this.state.messageText;
            params.userId   = this.state.user.id;
            params.country  = this.state.whomSetting.country.name;
            params.city     = this.state.whomSetting.city.name;
            params.gender   = this.state.whomSetting.gender.id;
            params.ageFrom  = this.state.whomSetting.age.from;
            params.ageTo    = this.state.whomSetting.age.to;
            params.isRandom = this.state.whomSetting.isRandom;
        }

        axios.post(this.state.backendUrl + 'rest/message-stack/ ', params).then(response => {
            // console.log(response);

            let items = this.state.items;
            items.push(response.data.messageStack);

            this.setState({
                items: items
            });
            //window.location.reload();
        }).catch(error => {

        });
    }

    render(){
        // console.log(this.state.items);

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
                            value={this.state.messageText}
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
                            value={this.state.messageText}
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