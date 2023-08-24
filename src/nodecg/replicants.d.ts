import { Asset } from './asset';
import { Message, Timekeeping, TwitchCredential } from './generated';

type ReplicantMap = {
  'assets:logo': Asset[];
  'assets:sponsor-logo': Asset[];
  'assets:background-image': Asset[];
  timekeeping: Timekeeping;
  message: Message;
  twitchCredential: TwitchCredential;
};

export {
  Timekeeping,
  Message,
  ReplicantMap
};
