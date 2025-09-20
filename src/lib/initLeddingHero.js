// Init “Ledding” para el Hero (respeta reduced motion)
import Ledding from './ledding/ledding.js';
import { BottomRightAligner, CenterAligner } from './ledding/aligners/Aligners.js';
import { logoPattern } from './ledding/patterns/logo.js';
import { Direction, Pattern } from './ledding/utils/constants.js';
import { SquareRenderer } from './ledding/renderers/SquareRenderer.js';

export default function initLeddingHero() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const target = '#ledding-animation-container';
  if (prefersReduced || !document.querySelector(target)) return;

  new Ledding(target, {
    ledSize: 25,
    ledGap: 4,
    renderer: SquareRenderer,
    scaleToFit: false,
    artPattern: logoPattern,
    aligner: CenterAligner,
    colors: {
      background: 'rgba(20, 24, 32, 0)',
      base: 'rgba(45, 55, 72, 1)',
      states: {
        1: 'rgba(255, 0, 0, 1)',
        2: 'rgba(255, 0, 0, 1)',
        3: 'rgba(255, 0, 0, 1)',
      },
    },
    fps: 30,
    animation: {
      scroll:    { direction: Direction.TO_RIGHT,  speed: 15 },
      ignition:  { pattern: Pattern.CASCADE,      direction: Direction.TO_BOTTOM, delay: 0.5 },
      extinction:{ pattern: Pattern.CASCADE,      direction: Direction.TO_TOP,    delay: 1.1, step: 8 },
    },
    transitions: {
      ignition:  { min: 0.05, randomize: false },
      extinction:{ min: 0.1,  randomize: false },
      morph:     { min: 0.1,  randomize: false },
    },
    grid: { fill: false, lifespan: 60 },
  });
}
