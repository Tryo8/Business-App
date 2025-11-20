export interface ChatMessage {
    id:string;
    text:string;
    userId:string;
    createdAt?:number | string | any;
    messageDelete?: boolean | string;
}