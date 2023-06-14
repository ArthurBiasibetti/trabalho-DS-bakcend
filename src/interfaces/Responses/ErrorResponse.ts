import IMessageResponse from './MessageResponse';

export default interface IErrorResponse extends IMessageResponse {
  stack?: string;
}
