#!/usr/bin/env node
import { rm } from 'node:fs/promises';
import glob from 'fast-glob';

const files = await glob([
  'sticker-creator/dist',
  'app/**/*.js',
  'app/*.js',
  'ts/**/*.js',
  'ts/*.js',
  'bundles',
  'tsconfig.tsbuildinfo',
], );

await Promise.all(files.map(file => rm(file, { recursive: true, force: true })));
