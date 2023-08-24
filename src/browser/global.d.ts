import { CreateNodecgConstructor, CreateNodecgInstance } from 'ts-nodecg/browser';

export type BundleNodecgInstance = CreateNodecgInstance<
  '<bundle-name>',
  Configschema,
  ReplicantMap,
  MessageMap
>;

export type BundleNodecgConstructor = CreateNodecgConstructor<
  '<bundle-name>',
  Configschema,
  ReplicantMap,
  MessageMap
>;

declare global {
  const nodecg: BundleNodecgInstance;

  const NodeCG: BundleNodecgConstructor;
}