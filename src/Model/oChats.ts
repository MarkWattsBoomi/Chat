import { FlowObjectData, FlowObjectDataArray } from "flow-component-model";
import { oChat } from "./oChat";

export class oChatsConfig {
    authorAttribute: string;
    dateAttribute: string;
    contentAttribute: string;
}

export class oChats {
    config: oChatsConfig
    items: oChat[];

    constructor(items: FlowObjectDataArray, config: oChatsConfig) {
        this.config = config;
        this.items = [];
        items?.items?.forEach((item: FlowObjectData) => {
            this.items.push(new oChat(item, this.config));
        });
    }

    getChats() : oChat[] {
        let chats: oChat[] = this.items.sort((a,b) => {
            return a.date.getTime() - b.date.getTime();
        });
        return chats;
    }

    getChat(internalId: string) : oChat {
        let chat: oChat;
        for(let pos = 0 ; pos < this.items.length ; pos++){
            if(this.items[pos].internalId === internalId) {
                chat = this.items[pos];
                break;
            }
        }
        return chat;
    }
}