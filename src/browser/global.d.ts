import {
  CreateNodecgConstructor,
  CreateNodecgInstance,
} from 'ts-nodecg/browser';
import { Configschema } from '../nodecg/generated';
import { MessageMap } from '../nodecg/messages';
import { ReplicantMap } from '../nodecg/replicants';

export type BundleNodecgInstance = CreateNodecgInstance<
  'ajr-relay-layouts',
  Configschema,
  ReplicantMap,
  MessageMap
>;

export type BundleNodecgConstructor = CreateNodecgConstructor<
  'ajr-relay-layouts',
  Configschema,
  ReplicantMap,
  MessageMap
>;

declare global {
  const nodecg: BundleNodecgInstance;

  const NodeCG: BundleNodecgConstructor;
}
