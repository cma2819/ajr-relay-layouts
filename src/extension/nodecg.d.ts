import { NodeCG } from '../../../../types/server';
import { CreateNodecgInstance } from 'ts-nodecg/server';

import { ReplicantMap } from '../nodecg/replicants';
import { MessageMap } from '../nodecg/messages';
import { Configschema } from '../nodecg/generated/configschema';

export type NodeCG = CreateNodecgInstance<
  'ajr-relay-layouts',
  Configschema,
  ReplicantMap,
  MessageMap
>;
