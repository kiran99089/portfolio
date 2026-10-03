// src/lib/introTiming.ts

// Stars are calm until WARP_START
export const WARP_START = 1.0;
// Stars reach maximum speed at WARP_PEAK
export const WARP_PEAK = 2.6;
// Stars are calm again at WARP_END
export const WARP_END = 4.6;

// Navbar + page content start fading in at CONTENT_REVEAL
export const CONTENT_REVEAL = 3.4;
// ...and take CONTENT_FADE seconds to fully appear
export const CONTENT_FADE = 1.2;

// How many times faster the stars move at the peak of the warp
export const WARP_BOOST = 10;

// Moment the page started (shared by galaxy + content)
export const introStart =
  typeof performance !== "undefined" ? performance.now() : 0;