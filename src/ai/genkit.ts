
'use server';

/**
 * @fileoverview This file initializes the Genkit AI singleton.
 * It should be imported by all other files that interact with Genkit.
 */

import {genkit, Plugin} from 'genkit';
import {googleAI} from 'genkit/googleai';
import {firebase} from 'genkit/firebase';

const plugins: Plugin<any>[] = [
  googleAI(),
  firebase(), // required for production logging
];

if (process.env.NODE_ENV === 'development') {
  const {genkitEval} = await import('genkit/eval');
  const {dotprompt} = await import('genkit/dotprompt');
  plugins.push(dotprompt());
  plugins.push(genkitEval());
}

// NOTE: The `logLevel` configuration option has been removed in Genkit 1.x
export const ai = genkit({plugins});
