// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only


import type { AvatarDataType } from '../types/Avatar';

export function createAvatarData(
  partialAvatarData: Readonly<Omit<AvatarDataType, 'id'>>
): AvatarDataType {
  return {
    id: crypto.randomUUID(),
    ...partialAvatarData,
  };
}
