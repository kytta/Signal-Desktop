// Copyright 2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import fs from 'fs/promises';
import { pathExists } from 'fs-extra';
import path from 'path';
import type { AfterPackContext } from 'electron-builder';

export async function afterPack({
  appOutDir,
  packager,
  electronPlatformName,
}: AfterPackContext): Promise<void> {
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const { productFilename } = packager.appInfo;

  const frameworkDir = path.join(
    appOutDir,
    `${productFilename}.app`,
    'Contents',
    'Frameworks',
    'Electron Framework.framework'
  );

  const versionsDir = path.join(frameworkDir, 'Versions');
  const currentVersion = path.join(versionsDir, 'Current');

  let subFolders: Array<string>;
  if (await pathExists(currentVersion)) {
    subFolders = await fs.readdir(currentVersion);
  } else {
    console.error(`${currentVersion} not found`);
    subFolders = [];
  }
  for (const folder of subFolders) {
    const sourcePath = path.join(currentVersion, folder);
    const targetPath = path.join(frameworkDir, folder);

    console.log(
      'Replacing electron framework symlink with real folder',
      sourcePath
    );
    fs.rmSync(targetPath);

    // eslint-disable-next-line no-await-in-loop
    await fs.rename(sourcePath, targetPath);
  }

  console.log('Removing duplicate electron framework', versionsDir);
  fs.rmSync(versionsDir);
}
