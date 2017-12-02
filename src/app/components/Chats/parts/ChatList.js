import React from 'react';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatListItem from './ChatListItem';
import axios from 'axios';
import autobahn from 'autobahn';
// import Websocket from 'react-websocket';
import Config from '../../Config';


// const usersData =[
//     {
//         name: 'Гордеев Иван',
//         msg: 'Нажав на кнопку «Написать реферат», вы лично создаете уникальный текст, причем именно от вашего нажатия на кнопку зависит, какой именно текст получится — таким образом, авторские права на реферат принадлежат только вам.',
//         msgPhoto: '',
//         time: 'Сегодня, 12:03',
//         img: 'img/user-1.png',
//     },
//     {
//         name: 'Мараканская Екатерина',
//         msg: 'Контент по-прежнему устойчив к изменениям спроса. Целевая аудитория синхронизирует общественный побочный PR-эффект. Создание приверженного покупателя программирует ребрендинг.',
//         msgPhoto: '',
//         time: 'Вчера, 00:32',
//         img: 'img/user-2.png',
//     },
//     {
//         name: 'Марк Яснаускис',
//         msg: 'Представляется логичным, что медийная реклама индуктивно масштабирует креатив.',
//         msgPhoto: '',
//         time: '29 марта, 11:30',
//         img: 'img/user-3.png',
//     },
//     {
//         name: 'Марк Яснаускис',
//         msg: '',
//         time: '10 августа 2016, 11:30',
//         img: 'img/user-4.png',
//         display: 'fff'
//     }
// ];

//usersData.forEach(function(item, i) {
//    if(item.msg===''){
//        item.msgPhoto='displayico';
//        alert(item.msgPhoto);
//    }
//});


export default class ChatList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            chatSocketConnection: null,
            status: {
                message: 'Please wait...'
            }
        }
    }

    componentDidMount(){
        const config = new Config();
        const userId = window.localStorage.getItem('userId');

        axios.get(config.backendUrl + 'rest/chat/', {
            params: {
                userId: userId,
                method: 'LIST'
            }
        })
            .then(response => {
               console.log('ssss', response);

               if (typeof response.data.message == 'undefined') {
                   this.setState({
                       items: response.data
                   });
               } else {
                   this.setState({
                       status: {
                           message: 'Нет чатов'
                       }
                   });
               }
            })
            .catch(error => {
                console.log(error);
            });
        // let conn = new WebSocket('ws://localhost:8080');
        // console.log(conn);
        // conn.onopen = function(e) {
        //     console.log("Connection established!");
        //     conn.send('Hello World!');
        // };
        //
        // conn.onmessage = function(e) {
        //     console.log(e.data);
        // };


        // this.state.chatSocketConnection = new autobahn.Connection({
        //     url: 'ws://127.0.0.1:8080'
        // });
        // //console.log(this.state.chatSocketConnection);
        // this.state.chatSocketConnection.onopen = (session) => {
        //     console.log('send');
        //     session.call('chatlist/chat_list', {"t1": 1, "t2": 2}).then(
        //         (result) => {
        //             console.log('rpc valid', result);
        //         },
        //         (error, desc) => {
        //             console.log('rpc error', result);
        //         }
        //     );
        //     this.state.chatSocketConnection.send('ssss');
        // };
        // this.state.chatSocketConnection.open();
        // this.state.chatSocketConnection.onerror = (error) => {
        //     console.log(error);
        // };
        // this.state.chatSocketConnection.onclose = (error) => {
        //     console.log('close', error);
        // };

        //console.log('mmmm');

        // axios({
        //     method: 'get',
        //     url: config.backendUrl + 'rest/chat/',
        //     resolveWithFullResponse: true,
        //     params: {
        //         userId: userId,
        //         method: 'LIST'
        //     }
        // }).then(response => {
        //     console.log(response.data, 's12');
        //
        //     this.setState({items: response.data});
        //     //this.state.chatSocket.close();
        // }).catch(error => {
        //
        // });
    }

    componentWillUnmount(){
        console.log('unmount');
        // this.state.chatSocketConnection.close();
    }

    render(){


        if (this.state.items.length === 0) {
            return (
                <div className="wrap-content">
                    <div className="chat-list">
                        {this.state.status.message}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="wrap-content">
                    <div className="chat-list">
                        {this.state.items.map((message, index) => (
                                <div key={index}>
                                    <ChatListItem message={message} />
                                    <Divider />
                                </div>
                            )
                        )}
                    </div>
                </div>
            );
        }
    }
}