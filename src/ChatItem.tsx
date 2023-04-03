import React from "react";
import Chat from "./Chat";
import { oChat } from "./Model/oChat";
import './Chat.css';


export class ChatItem extends React.Component<any,any> {
    
    constructor(props: any) {
        super(props);
    }

    render() {
        let chats: Chat = this.props.chats;
        let chat: oChat = chats.chats.getChat(this.props.chatId);
        let className: string = "chat-item";
        if(chat.author === chats.currentUser){
            className += " chat-item-me"
        }
        else {
            className += " chat-item-other"
        }
        return (
            <div
                className={className}
            >
                <div
                    className="chat-item-title"
                >
                    <span
                        className="chat-item-title-date"
                    >
                        {chat.date.toLocaleString()}
                    </span>
                    <span
                        className="chat-item-title-author"
                    >
                        {chat.author}
                    </span>
                </div>
                <div
                    className="chat-item-body"
                >
                    <span
                        className="chat-item-body-text"
                    >
                        {chat.content}
                    </span>
                </div>
                
            </div>
        );
    }
}