export interface IMessage {
  userId: string;
  text: string;
  timestamp: string;
  failedStatus?: boolean;
}
