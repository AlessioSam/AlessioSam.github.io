(function () {
  const S = window.SITE;
  const page = document.body.dataset.page;
  const $ = (q, el = document) => el.querySelector(q);
  const me = s => s.replace("A. Sampieri", "<b>A. Sampieri</b>");

  const ICONS = {
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zm-6.5 9.6V16c0 1.9 2.9 4 6.5 4s6.5-2.1 6.5-4v-3.4L12 16.2l-6.5-3.6z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  };

  // ---------- shared nav + footer ----------
  const nav = document.createElement("header");
  nav.className = "nav";
  const item = (href, label, key) => `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`;
  nav.innerHTML = `<div class="wrap">
    <a class="logo" href="index.html">AS<span>.</span></a>
    <nav class="menu">${item("index.html", "Home", "home")}${item("research.html", "Research", "research")}${item("journey.html", "Journey", "journey")}</nav>
    <div class="socials">
      <a class="icon" href="${S.links.scholar}" aria-label="Google Scholar" title="Google Scholar">${ICONS.scholar}</a>
      <a class="icon" href="${S.links.github}" aria-label="GitHub" title="GitHub">${ICONS.github}</a>
      <a class="icon" href="${S.links.linkedin}" aria-label="LinkedIn" title="LinkedIn">${ICONS.linkedin}</a>
      <a class="icon" href="mailto:${S.email}" aria-label="Email" title="Email">${ICONS.mail}</a>
    </div></div>`;
  document.body.prepend(nav);
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });

  const foot = document.createElement("footer");
  foot.innerHTML = `<div class="wrap"><span>© ${new Date().getFullYear()} Alessio Sampieri · Rome, Italy</span>
    <span><a href="${S.links.scholar}">Scholar</a> · <a href="${S.links.github}">GitHub</a> · <a href="${S.links.linkedin}">LinkedIn</a> · <a href="mailto:${S.email}">Email</a></span></div>`;
  document.body.append(foot);

  document.querySelectorAll("[data-email]").forEach(a => (a.href = "mailto:" + S.email));

  // ---------- builders ----------
  const links = p => Object.entries(p.links || {}).map(([k, v]) => `<a class="pill" href="${v}" target="_blank" rel="noopener">${k} ↗</a>`).join("");
  const top = p => `<span class="venue">${p.venue}</span>${p.badge ? `<span class="badge">★ ${p.badge}</span>` : ""}`;

  // ---------- HOME ----------
  if (page === "home") {
    const feat = S.pubs.filter(p => p.featured);
    $("#featured").innerHTML = feat.map((p, i) => `
      <article class="paper reveal" style="--d:${(i % 2) * 0.12}s">
        <div class="top">${top(p)}</div>
        <h3>${p.title}</h3>
        ${p.blurb ? `<p class="blurb">${p.blurb}</p>` : ""}
        <div class="authors">${me(p.authors)}</div>
        <div class="links">${links(p)}</div>
      </article>`).join("");
    $("#news").innerHTML = S.news.slice(0, 5).map((n, i) => `<li class="reveal" style="--d:${i * 0.07}s"><span class="d">${n.date}</span><span>${n.text}</span></li>`).join("");
    $("#n-papers").dataset.to = S.pubs.filter(p => !/Thesis/.test(p.venue)).length;

    // rotating words
    const words = ["multilingual LLMs", "human motion", "embodied AI", "machine unlearning"];
    const el = $("#rot");
    let w = 0, c = 0, del = false;
    (function tick() {
      const word = words[w];
      c += del ? -1 : 1;
      el.textContent = word.slice(0, c);
      let t = del ? 45 : 85;
      if (!del && c === word.length) { del = true; t = 1800; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; t = 300; }
      setTimeout(tick, t);
    })();
  }

  // ---------- RESEARCH ----------
  if (page === "research") {
    const state = { topic: "all", selected: false };
    const chips = $("#chips");
    chips.innerHTML = [["all", "All"], ...Object.entries(S.topics)].map(([k, v]) => `<button class="fchip ${k === "all" ? "on" : ""}" data-t="${k}">${v}</button>`).join("");
    chips.addEventListener("click", e => {
      const b = e.target.closest(".fchip"); if (!b) return;
      state.topic = b.dataset.t;
      chips.querySelectorAll(".fchip").forEach(x => x.classList.toggle("on", x === b));
      render();
    });
    $("#sel").addEventListener("change", e => { state.selected = e.target.checked; render(); });

    function render() {
      const list = S.pubs.filter(p => (state.topic === "all" || p.topics.includes(state.topic)) && (!state.selected || p.selected));
      const years = [...new Set(list.map(p => p.year))].sort((a, b) => b - a);
      $("#count").textContent = `${list.length} ${list.length === 1 ? "publication" : "publications"}`;
      $("#pubs").innerHTML = years.map(y => `
        <div class="year-group">
          <div class="yr">${y}</div>
          <div class="plist">${list.filter(p => p.year === y).map((p, i) => `
            <article class="prow reveal" style="--d:${i * 0.06}s">
              <h3>${p.title}</h3>
              <div class="authors">${me(p.authors)}</div>
              <div class="meta">${top(p)}${p.topics.map(t => `<span class="tag">${S.topics[t]}</span>`).join("")}<span class="sp"></span>${links(p)}</div>
            </article>`).join("")}
          </div>
        </div>`).join("");
      observe();
    }
    render();
  }

  // ---------- JOURNEY ----------
  if (page === "journey") {
    $("#tl").innerHTML = '<div class="progress"></div>' + S.journey.map((j, i) => `
      <div class="step ${j.kind} reveal left" style="--d:.05s">
        <div class="node">${j.kind === "edu" ? "🎓" : "💼"}</div>
        <div class="box">
          <div class="when">${j.when}${i === 0 ? '<span class="now-pill">Now</span>' : ""}</div>
          <h3>${j.role}</h3>
          <div><span class="org">${j.org}</span> <span class="place">· ${j.place}</span></div>
          ${j.text ? `<p class="rich">${j.text}</p>` : ""}
        </div>
      </div>`).join("");
    const tl = $("#tl"), bar = $(".progress", tl);
    const upd = () => {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
      bar.style.height = p * (r.height - 12) + "px";
    };
    addEventListener("scroll", upd, { passive: true }); upd();
  }

  // ---------- reveal on scroll + counters ----------
  var io;
  function observe() {
    io = io || new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      if (e.target.dataset.to) count(e.target);
      io.unobserve(e.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal:not(.in), [data-to]").forEach(el => io.observe(el));
  }
  function count(el) {
    const to = +el.dataset.to, t0 = performance.now(), dur = 1400;
    const step = t => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.firstChild.nodeValue = Math.round(to * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  observe();
})();
