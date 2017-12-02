import React from 'react';
import Avatar from 'material-ui/Avatar';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import { Link } from 'react-router-dom';


export default class ChatListItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            message: props.message
        };
        console.log(props.message);
    }

    render() {

        // let msgPhoto = "msg-photo";
        //
        // return (
        //     <Link to="/chats/messages">
        //         <div className="list-item">
        //             <Avatar src={this.props.img}/>
        //             <div className="msg">
        //                 <h5>{this.props.name}</h5>
        //                 <p className={msgPhoto}>{this.props.msg}</p>
        //             </div>
        //             <div className="r-block">
        //                 <i className="material-icons">keyboard_arrow_right</i>
        //                 <span>{this.props.time}</span>
        //             </div>
        //         </div>
        //     </Link>
        // )

        return (
            <Link to={`/chats/messages/` + this.state.message.message.id}>
                <div className="list-item">
                    <Avatar src={this.state.message.message.avatar}/>
                    <div className="msg">
                        <h5>{this.state.message.message.name}</h5>
                        <p>{this.state.message.message.message.message}</p>
                    </div>
                    <div className="r-block">
                        <i className="material-icons">keyboard_arrow_right</i>
                        <span>{this.state.message[1]}</span>
                    </div>
                </div>
            </Link>
        )
    }
}