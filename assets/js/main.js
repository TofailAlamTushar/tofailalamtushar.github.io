/* =====================================================================
   Portfolio behaviour — vanilla JS, no dependencies.
   1. Apply site-config.js values   2. Guard placeholder links
   3. Navigation                    4. Case-study dialogs
   5. Small UI helpers              6. Local setup banner
   ===================================================================== */
(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  if (!window.SITE_CONFIG) {
    console.warn("[portfolio] site-config.js did not load — check that it sits next to index.html.");
  }

  var isPlaceholder = function (value) {
    return typeof value === "string" && value.indexOf("YOUR_") !== -1;
  };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Apply configuration ---------- */
  function applyConfig() {
    // Text values
    $$("[data-config-text]").forEach(function (el) {
      var key = el.getAttribute("data-config-text");
      if (config[key] !== undefined && config[key] !== "") el.textContent = String(config[key]);
    });

    // Link values ("" hides the link entirely)
    $$("[data-config-href]").forEach(function (el) {
      var key = el.getAttribute("data-config-href");
      if (!(key in config)) return;
      var value = config[key];
      if (value === "" || value === null) {
        var item = el.closest("li") || el;
        item.hidden = true;
        return;
      }
      if (key === "email") {
        el.setAttribute("href", isPlaceholder(value) ? "mailto:YOUR_EMAIL" :
          "mailto:" + value + "?subject=" + encodeURIComponent("Project inquiry"));
      } else {
        el.setAttribute("href", value);
      }
    });

    // CV links
    if (config.cvFile) {
      $$("[data-config-cv]").forEach(function (el) { el.setAttribute("href", config.cvFile); });
    }

    // Brand initials from name
    var mark = $("[data-config-initials]");
    if (mark && config.name && !isPlaceholder(config.name)) {
      var initials = config.name.trim().split(/\s+/).map(function (p) { return p.charAt(0); }).join("").slice(0, 2).toUpperCase();
      if (initials) mark.textContent = initials;
    }

    // Document title + footer year
    if (config.name && !isPlaceholder(config.name)) {
      document.title = document.title.replace(/YOUR_NAME/g, config.name);
    }
    $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  /* ---------- 2. Placeholder links ----------
     Any link whose URL still contains YOUR_ is disabled instead of leading
     visitors to a broken page. */
  function guardPlaceholders() {
    $$("a[href]").forEach(function (a) {
      if (!isPlaceholder(a.getAttribute("href"))) return;
      a.classList.add("is-placeholder");
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("title", "Link coming soon");
      a.removeAttribute("target");
      var note = document.createElement("span");
      note.className = "visually-hidden";
      note.textContent = " (coming soon)";
      a.appendChild(note);
    });
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a.is-placeholder");
      if (a) e.preventDefault();
    });
  }

  /* ---------- 3. Navigation ---------- */
  function initNav() {
    var toggle = $(".nav__toggle");
    var menu = $("#nav-menu");
    var header = $(".site-header");
    if (!toggle || !menu) return;

    function setOpen(open, returnFocus) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      if (!open && returnFocus) toggle.focus();
      if (open) {
        var first = $("a", menu);
        if (first) first.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", false);
    });

    // Close after choosing a link (mobile)
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && toggle.getAttribute("aria-expanded") === "true") setOpen(false, false);
    });

    // Esc closes, focus returns to the toggle
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false, true);
    });

    // Click outside closes
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false, false);
    });

    // Reset when resizing back to desktop
    var mq = window.matchMedia("(min-width: 921px)");
    var onChange = function () { if (mq.matches) setOpen(false, false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange); else mq.addListener(onChange);

    // Header border on scroll
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Active section highlighting
    var links = $$(".nav__links a");
    var sections = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); }).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      var current = null;
      for (var i = 0; i < sections.length; i++) { if (visible[sections[i].id]) { current = sections[i].id; break; } }
      if (!current) return;
      links.forEach(function (a) {
        if (a.getAttribute("href") === "#" + current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- 4. Case-study dialogs ---------- */
  function initDialogs() {
    var supported = typeof HTMLDialogElement === "function";
    var lastTrigger = null;

    $$("[data-dialog-open]").forEach(function (btn) {
      btn.setAttribute("aria-haspopup", "dialog");
      btn.addEventListener("click", function () {
        var dialog = document.getElementById(btn.getAttribute("data-dialog-open"));
        if (!dialog) return;
        lastTrigger = btn;
        if (supported) dialog.showModal(); else dialog.setAttribute("open", "");
        document.body.classList.add("dialog-open");
        var body = $(".case__body", dialog);
        if (body) body.scrollTop = 0;
      });
    });

    $$("dialog.case").forEach(function (dialog) {
      var close = function () {
        if (supported) dialog.close(); else { dialog.removeAttribute("open"); onClosed(); }
      };
      var onClosed = function () {
        document.body.classList.remove("dialog-open");
        if (lastTrigger) lastTrigger.focus();
      };
      $$("[data-dialog-close]", dialog).forEach(function (b) { b.addEventListener("click", close); });
      dialog.addEventListener("close", onClosed);
      // Click on the backdrop (outside the inner panel) closes
      dialog.addEventListener("click", function (e) {
        if (e.target === dialog) close();
      });
    });
  }

  /* ---------- 5. Small UI helpers ---------- */
  function initCopyEmail() {
    var btn = $("[data-copy-email]");
    if (!btn) return;
    var label = $("[data-copy-label]", btn);
    if (!config.email || isPlaceholder(config.email)) {
      btn.disabled = true;
      btn.setAttribute("title", "Email address not configured yet");
      return;
    }
    btn.addEventListener("click", function () {
      var done = function (ok) {
        label.textContent = ok ? "Copied to clipboard" : "Copy failed — use the link above";
        setTimeout(function () { label.textContent = "Copy email address"; }, 2500);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(config.email).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
    label.setAttribute("aria-live", "polite");
  }

  function initToTop() {
    var btn = $(".to-top");
    if (!btn) return;
    var onScroll = function () { btn.hidden = window.scrollY < 700; };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      var brand = $(".brand");
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  function initReveal() {
    if (reducedMotion || !("IntersectionObserver" in window)) return;
    var targets = $$(".section__head, .skill-group, .project, .service, .timeline__item, .education, .contact__panel, .about__facts");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach(function (el) {
      // Only animate things below the first screen, so nothing visible "pops" on load
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal");
        io.observe(el);
      }
    });
  }

  /* ---------- 6. Local setup banner (localhost only) ---------- */
  function initDevBanner() {
    var host = location.hostname;
    var isLocal = host === "localhost" || host === "127.0.0.1" || host === "" || host === "0.0.0.0";
    if (!isLocal) return;

    var missing = [];
    ["name", "email", "github", "linkedin", "upwork", "fiverr"].forEach(function (k) {
      if (isPlaceholder(config[k])) missing.push(k);
    });
    if (!config.cvReady) missing.push("cvReady (add your real CV)");
    var placeholderLinks = $$("a.is-placeholder").length;
    var head = document.head.innerHTML;
    if (head.indexOf("YOUR_") !== -1) missing.push("&lt;head&gt; meta tags in index.html");

    if (!missing.length && !placeholderLinks) return;
    var banner = $(".dev-banner");
    if (!banner) return;
    banner.innerHTML = "<strong>Setup mode (visible on localhost only):</strong> still to fill in — <code>" +
      missing.join("</code>, <code>") + "</code>" +
      (placeholderLinks ? ". " + placeholderLinks + " link(s) are disabled until their YOUR_… URL is replaced." : ".");
    banner.hidden = false;
  }

  applyConfig();
  guardPlaceholders();
  initNav();
  initDialogs();
  initCopyEmail();
  initToTop();
  initReveal();
  initDevBanner();
})();
