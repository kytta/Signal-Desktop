// Copyright 2023 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only



import { isValidUuid } from '../util/isValidUuid';
import * as log from '../logging/log';
import type { LoggerType } from './Logging';

export type StoryDistributionIdString = string & {
  __story_distribution_id: never;
};

export function isStoryDistributionId(
  value?: string
): value is StoryDistributionIdString {
  return isValidUuid(value);
}

export function generateStoryDistributionId(): StoryDistributionIdString {
  return crypto.randomUUID() as StoryDistributionIdString;
}

export function normalizeStoryDistributionId(
  distributionId: string,
  context: string,
  logger: Pick<LoggerType, 'warn'> = log
): StoryDistributionIdString {
  const result = distributionId.toLowerCase();

  if (!isStoryDistributionId(result)) {
    logger.warn(
      'Normalizing invalid story distribution id: ' +
        `${distributionId} to ${result} in context "${context}"`
    );

    // Cast anyway we don't want to throw here
    return result as unknown as StoryDistributionIdString;
  }

  return result;
}
