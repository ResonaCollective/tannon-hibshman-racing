/* ============================================================
   TANNON HIBSHMAN RACING — SITE LOGIC
   Reads SCHEDULE / SPONSORS / GALLERY from /data/*.js and renders
   the dynamic parts of every page. Edit the data files, not this
   one, to update site content.
   ============================================================ */

(function () {
  "use strict";

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  function parseDate(str) {
    // "YYYY-MM-DD" -> local Date at midnight
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function today() {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }

  function formatRange(startStr, endStr) {
    const s = parseDate(startStr);
    const e = parseDate(endStr);
    const sameMonth = s.getMonth() === e.getMonth();
    if (startStr === endStr) {
      return { month: MONTHS[s.getMonth()], range: String(s.getDate()), year: s.getFullYear() };
    }
    if (sameMonth) {
      return { month: MONTHS[s.getMonth()], range: `${s.getDate()}–${e.getDate()}`, year: s.getFullYear() };
    }
    return { month: MONTHS[s.getMonth()], range: `${s.getDate()} – ${MONTHS[e.getMonth()]} ${e.getDate()}`, year: s.getFullYear() };
  }

  /** Computes the automatic status of a race entry. */
  function getStatus(race) {
    const t = today();
    const start = parseDate(race.startDate);
    const end = parseDate(race.endDate);
    if (race.result) return "Completed";
    if (t < start) return "Upcoming";
    if (t >= start && t <= end) return "Race Weekend";
    return "Awaiting Results";
  }

  function statusBadgeClass(status) {
    switch (status) {
      case "Upcoming": return "badge-upcoming";
      case "Race Weekend": return "badge-raceweekend";
      case "Awaiting Results": return "badge-awaiting";
      case "Completed": return "badge-completed";
      default: return "badge-upcoming";
    }
  }

  function sortedSchedule() {
    return [...SCHEDULE].sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
  }

  function getNextRace() {
    const t = today();
    const upcoming = sortedSchedule().filter(r => parseDate(r.endDate) >= t);
    return upcoming[0] || null;
  }

  /* ---------------- Nav ---------------- */
  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => links.classList.toggle("open"));
      links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
    }
    // Highlight active page
    const page = document.body.getAttribute("data-page");
    document.querySelectorAll(".nav-links a, .footer-nav a").forEach(a => {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });
    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------- Home: Next Race widget ---------------- */
  function renderNextRace() {
    const el = document.getElementById("next-race-widget");
    if (!el) return;
    const race = getNextRace();
    if (!race) {
      el.innerHTML = `<div class="empty-state">No races currently scheduled. Check back soon.</div>`;
      return;
    }
    const d = formatRange(race.startDate, race.endDate);
    const status = getStatus(race);
    el.innerHTML = `
      <div class="date-block">
        <div class="month">${d.month}</div>
        <div class="day">${d.range}</div>
      </div>
      <div class="next-race-info">
        <div>
          <span class="badge ${statusBadgeClass(status)}">${status}</span>
          <h3 style="margin-top:10px;">${race.eventName}</h3>
          <div class="meta">${race.series} &middot; ${race.track}, ${race.city}, ${race.state}</div>
        </div>
      </div>
      <a class="btn btn-outline btn-sm" href="schedule.html">Full Schedule</a>
    `;
  }

  /* ---------------- Schedule page ---------------- */
  function renderSchedule() {
    const el = document.getElementById("schedule-list");
    if (!el) return;
    const races = sortedSchedule();
    el.innerHTML = races.map(race => {
      const d = formatRange(race.startDate, race.endDate);
      const status = getStatus(race);
      const resultBtn = race.result
        ? `<a class="btn btn-outline btn-sm" href="results.html#${race.id}">View Result</a>`
        : "";
      const trackBtn = race.trackInfoUrl
        ? `<a class="btn btn-primary btn-sm" href="${race.trackInfoUrl}" target="_blank" rel="noopener">Track Info</a>`
        : "";
      return `
        <div class="race-card">
          <div class="date-col">
            <div class="month">${d.month} ${d.year}</div>
            <div class="range">${d.range}</div>
          </div>
          <div>
            <span class="badge ${statusBadgeClass(status)}">${status}</span>
            <h3 style="margin-top:10px;">${race.eventName}</h3>
            <div class="series">${race.series}</div>
            <div class="loc">${race.track}, ${race.city}, ${race.state}</div>
          </div>
          <div class="actions">
            ${trackBtn}
            ${resultBtn}
          </div>
        </div>
      `;
    }).join("");
  }

  /* ---------------- Results page ---------------- */
  function renderResults() {
    const el = document.getElementById("results-list");
    if (!el) return;
    const races = sortedSchedule()
      .filter(r => r.result)
      .sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate));

    if (!races.length) {
      el.innerHTML = `<div class="empty-state">No results posted yet. Add a "result" to a race in data/schedule-data.js and it will show up here automatically.</div>`;
      return;
    }

    const order = sortedSchedule().filter(r => r.result).map(r => r.id);

    el.innerHTML = races.map(race => {
      const d = formatRange(race.startDate, race.endDate);
      const raceNum = order.indexOf(race.id) + 1;
      const r = race.result;
      const photos = (r.photos || []).map(p => `<img src="${p}" alt="${race.eventName} photo" data-lightbox="${p}" data-cap="${race.eventName}">`).join("");
      return `
        <div class="result-card" id="${race.id}">
          <div class="top">
            <div>
              <div class="eyebrow">Race ${raceNum} &middot; ${d.month} ${d.range}, ${d.year}</div>
              <h3 style="margin-top:8px;">${race.eventName}</h3>
              <div class="loc" style="color:var(--gray-light); margin-top:4px;">${race.track}, ${race.city}, ${race.state} &middot; ${race.series}</div>
            </div>
            <span class="badge badge-completed">Completed</span>
          </div>
          <div class="result-stats">
            ${r.class ? `<div><div class="stat-label">Class</div><div class="stat-value">${r.class}</div></div>` : ""}
            ${r.finish ? `<div><div class="stat-label">Finish</div><div class="stat-value">${r.finish}</div></div>` : ""}
            ${r.fastestLap ? `<div><div class="stat-label">Fastest Lap</div><div class="stat-value">${r.fastestLap}</div></div>` : ""}
          </div>
          ${r.notes ? `<p class="result-notes">${r.notes}</p>` : ""}
          ${photos ? `<div class="result-photos">${photos}</div>` : ""}
        </div>
      `;
    }).join("");

    initLightboxTriggers();
  }

  /* ---------------- Gallery page ---------------- */
  function renderGallery() {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;
    const categories = ["All", ...new Set(GALLERY.map(g => g.category))];
    const filterBar = document.getElementById("gallery-filters");
    if (filterBar) {
      filterBar.innerHTML = categories.map((c, i) =>
        `<button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`
      ).join("");
      filterBar.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          renderItems(btn.getAttribute("data-filter"));
        });
      });
    }

    function renderItems(filter) {
      const items = filter === "All" ? GALLERY : GALLERY.filter(g => g.category === filter);
      grid.innerHTML = items.map(g => `
        <div class="gallery-item" data-lightbox="${g.src}" data-cap="${g.caption}">
          <img src="${g.src}" alt="${g.caption}" loading="lazy">
          <div class="cap">${g.caption}</div>
        </div>
      `).join("");
      initLightboxTriggers();
    }
    renderItems("All");
  }

  /* ---------------- Sponsors page ---------------- */
  function renderSponsors() {
    const grid = document.getElementById("sponsor-grid");
    if (!grid) return;
    grid.innerHTML = SPONSORS.map(s => {
      const inner = s.logo ? `<img src="${s.logo}" alt="${s.name}">` : s.name;
      return s.url
        ? `<a class="sponsor-badge" href="${s.url}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="sponsor-badge">${inner}</div>`;
    }).join("");
  }

  function renderSponsorStrip() {
    const el = document.getElementById("sponsor-strip");
    if (!el) return;
    el.innerHTML = SPONSORS.map(s => `<div class="sponsor-badge">${s.name}</div>`).join("");
  }

  /* ---------------- Lightbox ---------------- */
  function initLightboxTriggers() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;
    const img = lb.querySelector("img");
    const cap = lb.querySelector(".cap");
    document.querySelectorAll("[data-lightbox]").forEach(el => {
      el.addEventListener("click", () => {
        img.src = el.getAttribute("data-lightbox");
        cap.textContent = el.getAttribute("data-cap") || "";
        lb.classList.add("open");
      });
    });
  }

  function initLightboxClose() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.querySelector(".lightbox-close").addEventListener("click", () => lb.classList.remove("open"));
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("open"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.classList.remove("open"); });
  }

  /* ---------------- Season stats ---------------- */
  function finishPlace(r) {
    return parseInt(r.result && r.result.finish, 10);
  }

  function seasonStats() {
    const done = SCHEDULE.filter(r => r.result);
    return {
      completed: done.length,
      wins: done.filter(r => finishPlace(r) === 1).length,
      podiums: done.filter(r => finishPlace(r) <= 3).length
    };
  }

  function renderResultsSummary() {
    const el = document.getElementById("results-summary");
    if (!el) return;
    const s = seasonStats();
    if (!s.completed) return;
    el.innerHTML = `
      <div class="stat"><h3>${s.completed}</h3><p>Races Completed</p></div>
      <div class="stat"><h3>${s.wins}</h3><p>Wins</p></div>
      <div class="stat"><h3>${s.podiums}</h3><p>Podium Finishes</p></div>
    `;
  }

  /* ---------------- Quick stats (home) ---------------- */
  function renderQuickStats() {
    const el = document.getElementById("quick-stats");
    if (!el) return;
    const s = seasonStats();
    el.innerHTML = `
      <div class="stat"><h3>${s.completed}</h3><p>Races Completed</p></div>
      <div class="stat"><h3>${s.wins}</h3><p>Wins</p></div>
      <div class="stat"><h3>${s.podiums}</h3><p>Podiums</p></div>
      <div class="stat"><h3>ITS</h3><p>SCCA Class</p></div>
      <div class="stat"><h3>#53</h3><p>Car Number</p></div>
    `;
  }

  function initHeroSound() {
    const btn = document.querySelector(".hero-sound");
    const video = document.querySelector(".hero-video");
    if (!btn || !video) return;
    const label = btn.querySelector(".hero-sound-label");
    btn.addEventListener("click", () => {
      video.muted = !video.muted;
      if (!video.muted) video.play();
      btn.setAttribute("aria-pressed", String(!video.muted));
      btn.setAttribute("aria-label", video.muted ? "Turn sound on" : "Turn sound off");
      label.textContent = video.muted ? "Sound on" : "Sound off";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initHeroSound();
    renderNextRace();
    renderSchedule();
    renderResults();
    renderResultsSummary();
    renderGallery();
    renderSponsors();
    renderSponsorStrip();
    renderQuickStats();
    initLightboxClose();
    initLightboxTriggers();
  });
})();
