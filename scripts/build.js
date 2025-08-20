//@ts-check

import { exists, exec } from './utils.js';
import { createBuilder } from '@overextended/fx-utils';

const watch = process.argv.includes('--watch');
const web = await exists('./web');
const dropLabels = ['$BROWSER'];

if (!watch) dropLabels.push('$DEV');

createBuilder(
  watch,
  {
    keepNames: true,
    legalComments: 'inline',
    bundle: true,
    treeShaking: true,
  },
  [
    {
      name: 'server',
      options: {
        platform: 'node',
        target: ['node22'],
        format: 'cjs',
        dropLabels: [...dropLabels, '$CLIENT'],
      },
    },
    {
      name: 'client',
      options: {
        platform: 'browser',
        target: ['es2021'], 
        format: 'iife',
        dropLabels: [...dropLabels, '$SERVER'],
      },
    },
  ],
  async (outfiles) => {
    if (web && !watch) await exec("cd ./web && vite build");
  }
);

if (web && watch) await exec("cd ./web && vite build --watch");
