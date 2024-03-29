// Copyright 2024 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as RemoteConfig from '../RemoteConfig';
import type { ConversationType } from '../state/ducks/conversations';
import { isSignalConnection } from './getSignalConnections';

export function areNicknamesEnabled(): boolean {
  return RemoteConfig.getValue('desktop.nicknames') === 'TRUE';
}

export function canHaveNicknameAndNote(
  conversation: ConversationType
): boolean {
  return (
    areNicknamesEnabled() &&
    conversation.type === 'group' &&
    !isSignalConnection(conversation) &&
    !conversation.isMe
  );
}
