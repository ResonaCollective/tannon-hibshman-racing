/* ============================================================
   TANNON HIBSHMAN RACING — GALLERY DATA
   ============================================================
   Add new photos here. "category" must be one of:
   "On Track", "Victory Lane", "Paddock", "Behind the Scenes",
   "Family", "Car"
   ============================================================ */

const GALLERY = [
  {
    src: "images/tannon-main.jpg",
    category: "Paddock",
    caption: "Sunset in the paddock with the #53 Mazda RX-7."
  },
  {
    src: "images/on-track-01.jpg",
    category: "On Track",
    caption: "Car #53 through the esses at Summit Point Motorsports Park."
  },
  {
    src: "images/on-track-02.jpg",
    category: "On Track",
    caption: "Chasing the apex at Summit Point."
  },
  {
    src: "images/victory-02.jpg",
    category: "Victory Lane",
    caption: "Tannon with the #53 Mazda RX-7 after the race."
  },
  { src: "images/hillclimb-531-side.jpg", category: "On Track", caption: "Hillclimb run in the Mazda RX-7." },
  { src: "images/hillclimb-531-fence.jpg", category: "On Track", caption: "Rotating through a corner at the hillclimb." },
  { src: "images/on-track-03.jpg", category: "On Track", caption: "The #53 on track." },
  { src: "images/on-track-04.jpg", category: "On Track", caption: "Side profile of the #53 at speed." },
  { src: "images/on-track-05.jpg", category: "On Track", caption: "Turning in." },
  { src: "images/on-track-06.jpg", category: "On Track", caption: "The #53 on the move." },
  { src: "images/on-track-rear.jpg", category: "On Track", caption: "Heading into the next corner." },
  { src: "images/helmet-roof.jpg", category: "Behind the Scenes", caption: "Getting ready before a session." },
  { src: "images/gearing-up.jpg", category: "Behind the Scenes", caption: "Gearing up before a run." },
  { src: "images/detail-scca.jpg", category: "Car", caption: "SCCA Club Racing decal on the nose." },
  { src: "images/detail-wheel.jpg", category: "Car", caption: "Never Give Up, on the center console of the #53." }
];

if (typeof module !== "undefined") { module.exports = GALLERY; }
