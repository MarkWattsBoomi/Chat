import { FlowObjectData } from "flow-component-model";
import { oChatsConfig } from "./oChats";

export class oChat {
    internalId: string;
    objectData: FlowObjectData;
    author: string;
    date: Date;
    content: string;

    constructor(item: FlowObjectData, config: oChatsConfig) {
        this.internalId = item.internalId;
        this.objectData = item;
        this.author = item.properties[config.authorAttribute].value as string;
        this.date = new Date(item.properties[config.dateAttribute].value as string);
        this.content = item.properties[config.contentAttribute].value as string;
    }

}