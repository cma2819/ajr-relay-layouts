import { Message } from './generated';

export type MessageMap = {
  'message:set': {
    data: Message,
    result: boolean;
  },
  'message:get': {
    result: Message;
  },
  'twitch:mark': {
    result: boolean;
  },
  'twitch:logout': {}
};
