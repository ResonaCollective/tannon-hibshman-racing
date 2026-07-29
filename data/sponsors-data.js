/* ============================================================
   TANNON HIBSHMAN RACING — SPONSOR DATA
   ============================================================
   Add, remove, or edit sponsors here. If you have a logo image,
   drop the file into the images/sponsors/ folder and point
   "logo" at it (e.g. "images/sponsors/tirerack.png"). Leave
   "logo" as null to show a clean text badge instead.
   ============================================================ */

const SPONSORS = [
  { name: "Tire Rack", logo: null, url: "https://www.tirerack.com" },
  { name: "Hoosier Racing Tire", logo: null, url: "https://www.hoosiertire.com" },
  { name: "Hawk Performance", logo: null, url: "https://www.hawkperformance.com" },
  { name: "Rotary Performance", logo: null, url: "" },
  { name: "Boss Bottle", logo: null, url: "" }
];

if (typeof module !== "undefined") { module.exports = SPONSORS; }
