import { eLoadingState, FlowComponent, FlowField } from "flow-component-model";
import React from "react";
import { CSSProperties } from "react";
import './Chat.css';
import { ChatItem } from "./ChatItem";
import { oChat } from "./Model/oChat";
import { oChats, oChatsConfig } from "./Model/oChats";

declare const manywho: any;

/*
This class shows a chat history.

*/
export default class Chat extends FlowComponent {

    chats: oChats;
    
    constructor(props: any){
        super(props);
        this.moveHappened = this.moveHappened.bind(this);
        this.loadChats = this.loadChats.bind(this);
    }

    async componentDidMount(){
        await super.componentDidMount();   
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        this.loadChats();
    }

    async componentWillUnmount(): Promise<void> {
        (manywho as any).eventManager.removeDoneListener(this.componentId);
    }

    moveHappened(xhr: XMLHttpRequest, request: any) {
        if ((xhr as any).invokeType === 'FORWARD') {
            this.loadChats();
        }
    }

    async loadChats() {
        let conf: oChatsConfig = new oChatsConfig();
        conf.authorAttribute = this.getAttribute("authorAttribute");
        conf.dateAttribute = this.getAttribute("dateAttribute");
        conf.contentAttribute = this.getAttribute("contentAttribute");
        this.chats = new oChats(this.model.dataSource, conf);
        this.forceUpdate();
    }

    render() {
        const style: CSSProperties = {};
        style.width = '100%';
        style.height = '100%';

        if (this.model.visible === false) {
            style.display = 'none';
        }
        if (this.model.width) {
            style.width = this.model.width + 'px';
        }
        if (this.model.height) {
            style.height = this.model.height + 'px';
        }

        let chats: any[] = [];
        this.chats?.getChats()?.forEach((chat: oChat) => {
            chats.push(
                <ChatItem 
                    key = {chat.internalId}
                    chats = {this}
                    chatId = {chat.internalId}
                />
            );
        });
        return (
            <div
                className='chat'
                style={style}
                title={this.model.label}
            >
                {chats}
            </div>
        );
    }
}

manywho.component.register('Chat', Chat);