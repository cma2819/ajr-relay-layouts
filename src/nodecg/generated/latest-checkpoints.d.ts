/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type LatestCheckpoints = {
	segment: {
		game: number;
		index: number;
	};
	times: {
		rank: number;
		time: string;
		diffInSeconds: number;
	}[];
} | null;
