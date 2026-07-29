/* ============================================================
   TANNON HIBSHMAN RACING — SCHEDULE DATA
   ============================================================
   THIS IS THE ONE FILE YOU NEED TO EDIT TO UPDATE THE SITE.

   Every race weekend is one entry below. The website reads this
   file to build:
     - The "Next Race" box on the Home page
     - The full Schedule page
     - The Results page (races with a "result" filled in move here
       automatically)

   You never need to set a status by hand. It's calculated from
   today's date automatically:
     - "Upcoming"        -> before the race weekend starts
     - "Race Weekend"     -> today falls between startDate/endDate
     - "Awaiting Results" -> event is over but no result added yet
     - "Completed"        -> event is over AND a result has been added

   HOW TO ADD A RESULT AFTER A RACE:
   Find the race below and change:
       result: null
   to something like:
       result: {
         class: "ITS",
         finish: "3rd",
         fastestLap: "1:42.311",
         notes: "Great battle all weekend, car ran perfectly.",
         photos: ["images/victory-01.jpg"]
       }
   That's it — the race will automatically show up on the Results
   page with everything filled in, and disappear from "Upcoming."

   HOW TO ADD A NEW RACE:
   Copy one whole { ... } block below, paste it before the closing
   "];", give it a new unique id, and fill in the details.

   Dates must be in "YYYY-MM-DD" format so the site can sort and
   compare them correctly.
   ============================================================ */

const SCHEDULE = [
  {
    id: "pagoda-2026",
    eventName: "Pagoda Hillclimb",
    series: "Blue Mountain Region SCCA",
    track: "Pagoda Hillclimb",
    city: "Reading",
    state: "PA",
    startDate: "2026-06-20",
    endDate: "2026-06-21",
    trackInfoUrl: "https://www.motorsportreg.com/orgs/scca/blue-mountain",
    result: null
  },
  {
    id: "summit-point-july-2026",
    eventName: "MARRS Regional Race Weekend",
    series: "Mid-Atlantic Road Racing Series (MARRS)",
    track: "Summit Point Motorsports Park",
    city: "Summit Point",
    state: "WV",
    startDate: "2026-07-18",
    endDate: "2026-07-19",
    trackInfoUrl: "https://summitpointmp.com",
    result: null
  },
  {
    id: "duryea-2026",
    eventName: "Duryea Hillclimb",
    series: "Blue Mountain Region SCCA",
    track: "Duryea Hillclimb",
    city: "Reading",
    state: "PA",
    startDate: "2026-08-15",
    endDate: "2026-08-16",
    trackInfoUrl: "https://www.motorsportreg.com/orgs/scca/blue-mountain",
    result: null
  },
  {
    id: "summit-point-sept-2026",
    eventName: "MARRS Regional Race Weekend",
    series: "Mid-Atlantic Road Racing Series (MARRS)",
    track: "Summit Point Motorsports Park",
    city: "Summit Point",
    state: "WV",
    startDate: "2026-09-05",
    endDate: "2026-09-07",
    trackInfoUrl: "https://summitpointmp.com",
    result: null
  },
  {
    id: "summit-point-oct-2026",
    eventName: "MARRS Regional Race Weekend",
    series: "Mid-Atlantic Road Racing Series (MARRS)",
    track: "Summit Point Motorsports Park",
    city: "Summit Point",
    state: "WV",
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    trackInfoUrl: "https://summitpointmp.com",
    result: null
  }
];

/* Make available to all pages */
if (typeof module !== "undefined") { module.exports = SCHEDULE; }
