import { STUDIO } from '../studio.config';

// Fonts are intentionally NOT fetched from Google Fonts in this offline/sandboxed environment.
// Shots use system font stacks (e.g. monospace, sans-serif) so rendering works without network.
export const FONT = {
  title: 'sans-serif',
  ui: 'monospace',
  hand: 'sans-serif',
};
