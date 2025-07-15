
'use server';

/**
 * @fileoverview This file initializes the Genkit AI singleton.
 * It should be imported by all other files that interact with Genkit.
 */

import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {enableFirebaseTelemetry} from '@genkit-ai/firebase';

const plugins: Plugin<any>[] = [
  googleAI(),
  enableFirebaseTelemetry(), // required for production logging
];

if (process.env.NODE_ENV === 'development') {
  const {genkitEval, dotPrompt} = await import('genkit');
  plugins.push(dotPrompt());
  plugins.push(genkitEval());
}

// NOTE: The `logLevel` configuration option has been removed in Genkit 1.x
export const ai = genkit({plugins});
