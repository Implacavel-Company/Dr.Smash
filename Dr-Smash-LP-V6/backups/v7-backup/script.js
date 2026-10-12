/* DR. SMASH! — interactions. Edit common content in EDITE-AQUI.js. */
(() => {
  "use strict";
  const cfg = window.DR_SMASH_CONFIG;
  if (!cfg) {
    console.error("EDITE-AQUI.js não carregou. Verifique o caminho do arquivo.");
    return;
  }

  document.documentElement.classList.add("js-ready");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function validHref(value, allowTel = false) {
    const raw = String(value || "").trim();
    if (allowTel && /^tel:\+?[0-9]+$/.test(raw)) return raw;
    try {
      const url = new URL(raw, window.location.href);
      if (url.protocol === "https:" || url.protocol === "http:") return url.href;
    } catch (_) {}
    return "#";
  }

  // Keep local asset paths relative so the bundle works both on hosting and
  // when index.html is opened from disk for a quick preview.
  function validAssetSrc(value) {
    const raw = String(value || "").trim();
    if (/^assets\/[a-z0-9._/-]+$/i.test(raw) && !raw.includes("..")) return raw;
    try {
      const url = new URL(raw, window.location.href);
      if (url.protocol === "https:" || url.protocol === "http:") return url.href;
    } catch (_) {}
    return "";
  }

  function getPath(path) {
    return path.split(".").reduce((acc, key) => acc && acc[key], cfg);
  }

  function applyConfiguration() {
    const cssVars = {
      background: "--bg",
      surface: "--surface",
      surfaceRaised: "--surface-raised",
      text: "--text",
      muted: "--muted",
      primary: "--primary",
      primaryBright: "--primary-bright",
      secondary: "--secondary",
      border: "--border",
      metal: "--metal",
      metalHighlight: "--metal-highlight",
      focus: "--focus"
    };
    Object.entries(cssVars).forEach(([key, cssName]) => {
      if (cfg.theme?.[key]) document.documentElement.style.setProperty(cssName, cfg.theme[key]);
    });

    $$("[data-config]").forEach((element) => {
      const value = getPath(element.dataset.config);
      if (value !== undefined && value !== null) element.textContent = value;
    });

    const logo = validAssetSrc(cfg.brand?.logo);
    if (logo) $$(".brand-mark, .hero-logo").forEach((img) => {
      img.src = logo;
      if (img.classList.contains("hero-logo")) img.alt = `${cfg.brand.name} ${cfg.brand.descriptor}`;
    });

    $$("[data-link]").forEach((anchor) => {
      const key = anchor.dataset.link;
      const value = key === "map" ? cfg.brand?.mapUrl : cfg.urls?.[key];
      anchor.href = validHref(value);
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    });
    $$('[data-link="taplink"]').forEach((el) => { el.hidden = cfg.orderChannels?.showTaplink === false; });
    $$('[data-link="instagram"]').forEach((el) => { el.hidden = cfg.orderChannels?.showInstagram === false; });

    $$('[data-social]').forEach((anchor) => {
      const key = anchor.dataset.social;
      const raw = String(cfg.urls?.[key] || '').trim();
      let href = '';
      try { const parsed = new URL(raw); if (parsed.protocol === 'https:' || parsed.protocol === 'http:') href = parsed.href; } catch (_) {}
      if (href) {
        anchor.href = href;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.removeAttribute('aria-disabled');
        anchor.classList.remove('is-pending');
      } else {
        anchor.href = '#social-link-pending';
        anchor.setAttribute('aria-disabled', 'true');
        anchor.classList.add('is-pending');
        anchor.addEventListener('click', (event) => event.preventDefault());
      }
    });

    if (cfg.location?.showAddress) {
      const el = $("#location-address");
      if (el) el.textContent = cfg.brand.address || "";
    } else {
      $("#location-address")?.closest(".location-detail")?.remove();
    }

    if (cfg.location?.showPhone && cfg.brand?.phoneLabel && cfg.brand?.phoneLink) {
      const phone = $("#phone-link");
      if (phone) {
        phone.textContent = cfg.brand.phoneLabel;
        phone.href = validHref(cfg.brand.phoneLink, true);
      }
    } else {
      $("#phone-detail")?.remove();
    }

    Object.entries(cfg.sections || {}).forEach(([section, enabled]) => {
      const elements = document.querySelectorAll(`[data-section="${CSS.escape(section)}"]`);
      elements.forEach((el) => {
        el.hidden = !enabled;
        el.setAttribute("aria-hidden", enabled ? "false" : "true");
      });
    });

    document.title = `${cfg.brand.name} — ${cfg.brand.descriptor} | ${cfg.brand.locality}`;
    const year = $("#current-year");
    if (year) year.textContent = String(new Date().getFullYear());

    // Keep local business structured data in sync with the editable source.
    const schema = $("#restaurant-schema");
    if (schema) {
      try {
        const data = JSON.parse(schema.textContent);
        data.name = `${cfg.brand.name} — ${cfg.brand.descriptor}`;
        const digits = String(cfg.brand.phoneLabel || "").replace(/\D/g, "");
        data.telephone = digits.length === 11
          ? `+55 ${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7)}`
          : (digits ? `+55 ${digits}` : undefined);
        data.address.streetAddress = String(cfg.brand.address || "").split("—")[0].trim();
        data.sameAs = [cfg.urls?.instagram].filter(Boolean);
        data.hasMenu = cfg.urls?.brendi || "";
        schema.textContent = JSON.stringify(data);
      } catch (error) {
        console.warn("Dados estruturados não puderam ser atualizados.", error);
      }
    }
  }

  const categoryNames = {
    smash: "Smash burgers", combos: "Combos", boxes: "Boxes",
    porcoes: "Porções", sobremesas: "Sobremesas",
    artesanais: "Burgers artesanais", bebidas: "Bebidas"
  };

  function foodIllustration(variant) {
    // Decorative vector illustrations, not actual product photographs.
    if (variant === "box") {
      return `<svg viewBox="0 0 300 160" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="150" cy="140" rx="88" ry="9" fill="#000" opacity=".42"/>
        <path d="M57 79 137 42 243 71 162 108Z" fill="#F45A32" stroke="#FF9A6D" stroke-width="3"/>
        <path d="M57 79v42l105 30v-43z" fill="#B72F1E" stroke="#F45A32" stroke-width="3"/>
        <path d="M162 108v43l81-39V71z" fill="#D63D24" stroke="#F45A32" stroke-width="3"/>
        <path d="M90 78 146 52 204 70 150 97Z" fill="#24201E" stroke="#F3A344" stroke-width="3"/>
        <path d="M104 76q6-26 31-25 18-16 32-2 18-4 24 12l-4 10-69 18z" fill="#D9833D" stroke="#F5B866" stroke-width="3"/>
        <path d="m101 86 60 17 17-8-61-20z" fill="#8B3020"/><path d="m115 99 50 14-4 7-50-14z" fill="#F2B84A"/>
      </svg>`;
    }
    if (variant === "fries") {
      return `<svg viewBox="0 0 300 160" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="150" cy="137" rx="80" ry="9" fill="#000" opacity=".4"/>
        <g stroke="#C5802A" stroke-width="3" stroke-linejoin="round">
          <path d="m77 36 17-8 26 76-18 8z" fill="#F6C95E"/><path d="m110 25 18-3 12 82-18 3z" fill="#FFDE7A"/>
          <path d="M143 18h18v86h-18z" fill="#F6BF4A"/><path d="m171 28 18 3-10 78-18-2z" fill="#FFDB71"/>
          <path d="m197 37 17 8-24 65-17-7z" fill="#F2B842"/>
          <path d="M65 99q12-22 32-7 15-22 35-3 14-17 34-1 18-19 35-1 21-8 31 9l-15 28H79z" fill="#D95A27" stroke="#F26B2A" stroke-width="4"/>
          <path d="M78 119q40-10 72 0t68 0l-7 17H86z" fill="#F7F0E8" stroke="#E7CDB8" stroke-width="3"/>
        </g></svg>`;
    }
    if (variant === "shake") {
      return `<svg viewBox="0 0 300 160" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="150" cy="140" rx="54" ry="8" fill="#000" opacity=".4"/>
        <path d="M102 45h96l-10 82q-2 11-12 11h-50q-12 0-13-11z" fill="#D9D0CC" stroke="#F4E6D7" stroke-width="3"/>
        <path d="M108 56h84l-8 63q-1 8-10 8h-50q-9 0-10-8z" fill="#5B2E1F"/>
        <path d="M103 41q6-20 26-14 17-22 33-6 20-21 39 0 20-6 24 20l-3 9H105z" fill="#D98E52" stroke="#FCE1A6" stroke-width="3"/>
        <path d="m124 23 14-14 5 29m20-15 12-13" stroke="#FFF2DC" stroke-width="4" stroke-linecap="round"/>
        <path d="M191 95 220 123m-12-2 12 2 1-12" fill="none" stroke="#F8F1E5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    }
    const seeds = `<g fill="#FFF0C4"><ellipse cx="105" cy="38" rx="3" ry="1.3" transform="rotate(-20 105 38)"/><ellipse cx="133" cy="30" rx="3" ry="1.3" transform="rotate(18 133 30)"/><ellipse cx="160" cy="38" rx="3" ry="1.3"/><ellipse cx="185" cy="31" rx="3" ry="1.3" transform="rotate(25 185 31)"/><ellipse cx="204" cy="43" rx="3" ry="1.3"/></g>`;
    return `<svg viewBox="0 0 300 160" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="140" rx="92" ry="9" fill="#000" opacity=".48"/>
      <path d="M73 84q-8-50 77-52 82 0 78 52l-9 12H81z" fill="#D9833D" stroke="#F5B866" stroke-width="3"/>
      ${seeds}
      <path d="M78 88q12-15 25-5 13-13 26-3 16-15 31-2 17-13 29-2 19-4 33 11l-9 10H84z" fill="#76A64C" stroke="#95C76B" stroke-width="2"/>
      <path d="M78 88h144l-17 17-16-6-18 11-23-11-16 9-22-9-16 4z" fill="#F5B84F" stroke="#FFE09A" stroke-width="2"/>
      <path d="M81 104q3-12 17-11 47-8 105 2 15 4 16 15l-9 13H90z" fill="#4A2118" stroke="#9A4A28" stroke-width="3"/>
      <path d="M89 107q49-12 122 0" stroke="#D27635" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M76 119q2 18 22 20h103q19-2 23-20l-4 13q-5 18-24 18h-93q-21-2-25-18z" fill="#C47A37" stroke="#F0B566" stroke-width="3"/>
    </svg>`;
  }

  const normalizeSearch = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  let activeProductCategory = "all";
  function renderProducts(activeCategory) {
    if (typeof activeCategory === "string") activeProductCategory = activeCategory;
    const grid = $("#product-grid");
    const filters = $("#product-filters");
    if (!grid || !filters) return;
    const query = normalizeSearch($("#product-search")?.value || "");

    filters.replaceChildren();
    (cfg.productFilters || []).forEach((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button";
      button.textContent = filter.label;
      button.setAttribute("aria-pressed", String(filter.id === activeProductCategory));
      button.addEventListener("click", () => renderProducts(filter.id));
      filters.append(button);
    });

    const seenProductIds = new Set();
    const seenImageSources = new Set();
    const products = (cfg.products || []).filter((product) => {
      const uniqueId = String(product.id || product.name || "").trim().toLowerCase();
      const imageSource = String(product.image || "").trim().toLowerCase();
      if (!uniqueId || seenProductIds.has(uniqueId)) return false;
      // A mesma foto não deve aparecer em dois cards diferentes.
      if (imageSource && seenImageSources.has(imageSource)) return false;
      seenProductIds.add(uniqueId);
      if (imageSource) seenImageSources.add(imageSource);
      const inCategory = activeProductCategory === "all" || product.category === activeProductCategory;
      const searchable = normalizeSearch([product.name, product.description, product.category, product.badge].filter(Boolean).join(" "));
      return inCategory && (!query || searchable.includes(query));
    });
    grid.replaceChildren();
    if (!products.length) {
      const empty = document.createElement("p");
      empty.className = "empty-products";
      empty.textContent = query ? "Nenhum item encontrado nesta busca. Tente outro termo ou consulte o cardápio completo." : "Nenhum destaque nesta categoria. Consulte o cardápio completo.";
      grid.append(empty);
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card reveal-on-scroll";
      card.dataset.art = product.art || "burger";

      const art = document.createElement("div");
      art.className = "product-art";
      const visual = product.image ? document.createElement("img") : null;
      if (visual) {
        visual.src = validAssetSrc(product.image);
        visual.alt = `Imagem ilustrativa gerada para apresentação de ${product.name}; não é fotografia oficial.`;
        visual.loading = "lazy";
        visual.decoding = "async";
        visual.style.cssText = "width:100%;height:100%;object-fit:cover;position:relative;z-index:1";
        visual.addEventListener("error", () => {
          visual.remove();
          art.insertAdjacentHTML("beforeend", foodIllustration(product.art || "burger"));
        }, { once: true });
        art.append(visual);
      } else {
        art.innerHTML = foodIllustration(product.art || "burger");
      }

      if (product.badge) {
        const badge = document.createElement("span");
        badge.className = "product-badge";
        badge.textContent = product.badge;
        art.append(badge);
      }

      const body = document.createElement("div");
      body.className = "product-body";
      const category = document.createElement("span");
      category.className = "product-category";
      category.textContent = categoryNames[product.category] || "Destaque";
      const title = document.createElement("h3");
      title.className = "product-title";
      title.textContent = product.name;
      const description = document.createElement("p");
      description.className = "product-description";
      description.textContent = product.description;

      const bottom = document.createElement("div");
      bottom.className = "product-bottom";
      const price = document.createElement("div");
      price.className = "product-price";
      const priceLabel = document.createElement("small");
      priceLabel.textContent = product.priceQualifier || "Valor no cardápio";
      const priceValue = document.createElement("strong");
      priceValue.textContent = product.price;
      price.append(priceLabel, priceValue);
      const order = document.createElement("a");
      order.className = "product-order";
      order.href = validHref(cfg.urls?.brendi);
      order.target = "_blank";
      order.rel = "noopener noreferrer";
      order.setAttribute("aria-label", `Consultar ${product.name} no cardápio Brendi`);
      order.innerHTML = '<span aria-hidden="true">↗</span>';
      bottom.append(price, order);
      body.append(category, title, description, bottom);
      card.append(art, body);
      grid.append(card);
    });
    observeRevealItems();
  }

  function renderManifesto() {
    const root = $("#manifesto-points");
    if (!root) return;
    root.replaceChildren();
    (cfg.manifesto?.points || []).forEach((point) => {
      const row = document.createElement("article");
      row.className = "manifesto-point reveal-on-scroll";
      const number = document.createElement("span");
      number.className = "manifesto-number";
      number.textContent = point.number;
      const group = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = point.title;
      const text = document.createElement("p");
      text.textContent = point.text;
      group.append(title, text);
      row.append(number, group);
      root.append(row);
    });
  }

  function renderFaq() {
    const root = $("#faq-list");
    if (!root) return;
    root.replaceChildren();
    (cfg.faq || []).forEach((item, index) => {
      const details = document.createElement("details");
      details.className = "faq-item";
      details.open = index === 0;
      const summary = document.createElement("summary");
      summary.className = "faq-question";
      const question = document.createElement("span");
      question.textContent = item.question;
      const plus = document.createElement("span");
      plus.setAttribute("aria-hidden", "true");
      plus.textContent = "+";
      summary.append(question, plus);
      const answer = document.createElement("p");
      answer.className = "faq-answer";
      answer.textContent = item.answer;
      details.append(summary, answer);
      root.append(details);
    });
  }

  function observeRevealItems() {
    const items = $$(".reveal-on-scroll:not(.is-observed)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible", "is-observed"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    items.forEach((item) => {
      item.classList.add("is-observed");
      observer.observe(item);
    });
  }

  function setupMobileNavigation() {
    const button = $("#menu-toggle");
    const nav = $("#main-nav");
    if (!button || !nav) return;
    const close = () => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menu");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      button.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
      nav.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
    $$("a", nav).forEach((link) => link.addEventListener("click", close));
    window.addEventListener("resize", () => { if (window.innerWidth > 800) close(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  }


  // ============================================================
  // SISTEMA DE ROLAGEM CINEMATOGRÁFICA E PROGRESSO
  // ============================================================
  function setupScrollExperience() {
    const bar = $("#scroll-progress");
    const heroArt = $(".hero-art");
    let framePending = false;
    const update = () => {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(() => {
        framePending = false;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        if (bar) bar.style.width = `${progress * 100}%`;
        if (heroArt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          const offset = Math.min(24, window.scrollY * 0.035);
          heroArt.style.translate = `0 ${offset}px`;
        }
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  // ============================================================
  // SISTEMA DE PARTÍCULAS DE BRASAS
  // Pausa quando a aba fica oculta; desativa com movimento reduzido.
  // ============================================================
  function setupEmberParticles() {
    const canvas = $("#ember-canvas");
    if (!canvas || cfg.particles?.enabled === false) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) { canvas.hidden = true; return; }

    let width = 0;
    let height = 0;
    let particles = [];
    let raf = 0;
    let lastDraw = 0;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const amount = mobile
      ? Math.min(18, cfg.particles?.mobileCount || 15)
      : Math.min(48, cfg.particles?.desktopCount || 42);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: amount }, () => makeParticle(true));
    };
    const makeParticle = (initial = false) => ({
      x: Math.random() * Math.max(width, 1),
      y: initial ? Math.random() * Math.max(height, 1) : height + Math.random() * 32,
      radius: .6 + Math.random() * (mobile ? 1.15 : 1.7),
      speed: .18 + Math.random() * .58,
      drift: (Math.random() - .5) * .38,
      phase: Math.random() * Math.PI * 2,
      alpha: .18 + Math.random() * .48
    });
    const draw = (time) => {
      raf = 0;
      if (document.hidden || reduced.matches) return;
      if (time - lastDraw < 33) { raf = requestAnimationFrame(draw); return; }
      lastDraw = time;
      context.clearRect(0, 0, width, height);
      const scrollEnergy = Math.min(1.8, 1 + window.scrollY / 4000);
      for (const part of particles) {
        part.y -= part.speed * scrollEnergy;
        part.x += part.drift + Math.sin(time / 1400 + part.phase) * .16;
        if (part.y < -10) Object.assign(part, makeParticle(false));
        if (part.x < -8) part.x = width + 5;
        if (part.x > width + 8) part.x = -5;
        const alpha = part.alpha * (.65 + Math.sin(time / 470 + part.phase) * .35);
        context.beginPath();
        context.fillStyle = `rgba(255, ${90 + Math.round(Math.random() * 85)}, 41, ${Math.max(.05, alpha)})`;
        context.shadowColor = "rgba(255, 87, 37, .65)";
        context.shadowBlur = part.radius * 4.5;
        context.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    const start = () => { if (!raf && !document.hidden && !reduced.matches) raf = requestAnimationFrame(draw); };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; context.clearRect(0, 0, width, height); };
    resize();
    start();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    reduced.addEventListener?.("change", (event) => event.matches ? stop() : start());
  }

  // ============================================================
  // ÁUDIO AMBIENTE — inicia apenas depois de clique explícito.
  // ============================================================
  function setupAmbientAudio() {
    const button = $("#sound-toggle");
    const label = $("#sound-toggle-label");
    if (!button || cfg.audio?.enabled === false) {
      if (button) button.hidden = true;
      return;
    }
    const audio = new Audio(validAssetSrc(cfg.audio?.source) || "assets/audio/fire-crackle-synthetic.wav");
    audio.loop = true;
    audio.preload = "auto";
    audio.load();
    audio.volume = 0;
    let active = false;
    let fadeRaf = 0;
    const targetVolume = Math.max(0, Math.min(.24, Number(cfg.audio?.volume ?? .18)));
    const setUI = (on) => {
      active = on;
      button.classList.toggle("is-on", on);
      button.setAttribute("aria-pressed", String(on));
      button.setAttribute("aria-label", on ? "Desativar som do fogo" : "Ativar som do fogo");
      if (label) label.textContent = on ? (cfg.audio?.labelOn || "SOM DO FOGO: LIGADO") : (cfg.audio?.labelOff || "SOM DO FOGO: DESLIGADO");
    };
    const fade = (target, thenPause = false) => {
      if (fadeRaf) cancelAnimationFrame(fadeRaf);
      const startVolume = audio.volume;
      const startAt = performance.now();
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420;
      const step = (now) => {
        const progress = duration ? Math.min(1, (now - startAt) / duration) : 1;
        audio.volume = startVolume + (target - startVolume) * progress;
        if (progress < 1) fadeRaf = requestAnimationFrame(step);
        else {
          fadeRaf = 0;
          if (thenPause) { audio.pause(); audio.currentTime = 0; }
        }
      };
      fadeRaf = requestAnimationFrame(step);
    };
    button.addEventListener("click", async () => {
      if (active) {
        setUI(false);
        fade(0, true);
        return;
      }
      try {
        // `play()` is called directly inside the user gesture to satisfy browser autoplay policies.
        await audio.play();
        setUI(true);
        fade(targetVolume);
      } catch (error) {
        setUI(false);
        const status = $("#sound-feedback");
        if (status) status.textContent = "O navegador não permitiu iniciar o áudio. Tente novamente.";
        console.warn("Áudio ambiente não pôde ser iniciado:", error);
      }
    });
    audio.addEventListener("error", () => {
      button.disabled = true;
      button.title = "O arquivo de áudio local não pôde ser carregado.";
      if (label) label.textContent = "ÁUDIO INDISPONÍVEL";
    });
    setUI(false);
  }


  // ============================================================
  // SEQUÊNCIA DA HERO CONTROLADA PELO SCROLL (144 FRAMES WEBP)
  // Pré-carregamento em lotes; nunca fica dependente de um único draw.
  // ============================================================
  function setupHeroSequence() {
    const stage = $("#hero-sequence-scroll");
    const sticky = $("#hero-sequence-sticky");
    const canvas = $("#burger-sequence-canvas");
    if (!stage || !sticky || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;
    const frameLayer = document.createElement("canvas");
    const frameLayerCtx = frameLayer.getContext("2d", { alpha: true, desynchronized: true });
    if (!frameLayerCtx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const total = 144;
    const frames = Array(total).fill(null);
    const loaded = Array(total).fill(false);
    let width = 0, height = 0, dpr = 1, target = 0, current = 0;
    let raf = 0, active = false, lastDrawn = -1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = sticky.getBoundingClientRect();
      width = Math.max(1, rect.width || window.innerWidth);
      height = Math.max(1, rect.height || window.innerHeight);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(true);
    };
    const loadFrame = (index) => new Promise(resolve => {
      if (loaded[index]) { resolve(); return; }
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { frames[index] = img; loaded[index] = true; if (Math.abs(index - Math.round(current)) < 2) draw(true); resolve(); };
      img.onerror = () => { loaded[index] = true; console.warn(`Frame da hero indisponível: ${index + 1}`); resolve(); };
      img.src = `assets/hero-frames/frame-${String(index + 1).padStart(3, "0")}.webp`;
    });
    // First frames are urgent; the rest download sequentially in small batches.
    const preload = async () => {
      await Promise.all(Array.from({ length: 12 }, (_, i) => loadFrame(i)));
      for (let start = 12; start < total; start += 8) {
        await Promise.all(Array.from({ length: Math.min(8, total - start) }, (_, j) => loadFrame(start + j)));
      }
    };
    const nearestFrame = (index) => {
      const center = Math.max(0, Math.min(total - 1, Math.round(index)));
      if (frames[center]) return frames[center];
      for (let step = 1; step < total; step++) {
        if (center - step >= 0 && frames[center - step]) return frames[center - step];
        if (center + step < total && frames[center + step]) return frames[center + step];
      }
      return null;
    };
    const draw = (force = false) => {
      if (!ctx || width <= 0 || height <= 0) return;
      const frameIndex = Math.round(current);
      if (!force && frameIndex === lastDrawn) return;
      // Opaque full-bleed canvas: no translucent frame/card and no black bars.
      ctx.save();
      ctx.filter = "none";
      ctx.fillStyle = "#080909";
      ctx.fillRect(0, 0, width, height);
      const img = nearestFrame(frameIndex);
      if (img && img.naturalWidth) {
        const mobile = width <= 700;
        const ratio = img.naturalWidth / img.naturalHeight;
        const progress = Math.max(0, Math.min(1, current / (total - 1)));

        // Soft, edge-to-edge cinematic backdrop derived from the current frame.
        const coverScale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
        const bgW = img.naturalWidth * coverScale * 1.035;
        const bgH = img.naturalHeight * coverScale * 1.035;
        const sway = (progress - .5) * width * .018;
        ctx.save();
        ctx.filter = `blur(${Math.max(26, Math.min(42, width * .025))}px) saturate(.44) brightness(.42) contrast(1.05)`;
        ctx.globalAlpha = .90;
        ctx.drawImage(img, (width - bgW) / 2 - sway, (height - bgH) / 2, bgW, bgH);
        ctx.restore();

        // Darken just enough for premium contrast without washing out the food.
        const shade = ctx.createLinearGradient(0, 0, 0, height);
        shade.addColorStop(0, "rgba(4,5,5,.24)");
        shade.addColorStop(.55, "rgba(4,5,5,.34)");
        shade.addColorStop(1, "rgba(4,5,5,.48)");
        ctx.fillStyle = shade;
        ctx.fillRect(0, 0, width, height);

        const glow = ctx.createRadialGradient(width * .52, height * .52, 5, width * .52, height * .52, Math.max(width, height) * .58);
        glow.addColorStop(0, "rgba(244,81,42,.10)");
        glow.addColorStop(.55, "rgba(130,32,14,.04)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        // Main frame stays perfectly sharp and opaque, nearly full screen height.
        // Small scale/tilt/pan changes add a restrained 2.5D camera sensation.
        const foregroundHeight = height * (mobile ? .91 : 1.02);
        const foregroundWidth = Math.min(foregroundHeight * ratio, width * (mobile ? .96 : .64));
        const foregroundH = foregroundWidth / ratio;
        const scale = 1.015 + Math.sin(progress * Math.PI) * .028;
        const centerX = width * (mobile ? .5 : .54) + Math.sin(progress * Math.PI * 2) * width * .012;
        const centerY = height * .49 + Math.sin(progress * Math.PI * 2) * height * .012;
        // Render the sharp foreground to one reusable transparent layer and feather only
        // its left/right edges. This removes the hard rectangular portrait boundary while
        // preserving the entire vertical exploded-burger composition.
        const layerW = Math.max(1, Math.round(foregroundWidth * dpr));
        const layerH = Math.max(1, Math.round(foregroundH * dpr));
        if (frameLayer.width !== layerW || frameLayer.height !== layerH) {
          frameLayer.width = layerW;
          frameLayer.height = layerH;
        }
        frameLayerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        frameLayerCtx.clearRect(0, 0, foregroundWidth, foregroundH);
        frameLayerCtx.filter = "brightness(1.06) contrast(1.08) saturate(1.08)";
        frameLayerCtx.drawImage(img, 0, 0, foregroundWidth, foregroundH);
        frameLayerCtx.filter = "none";
        frameLayerCtx.globalCompositeOperation = "destination-in";
        const edgeMask = frameLayerCtx.createLinearGradient(0, 0, foregroundWidth, 0);
        edgeMask.addColorStop(0, "rgba(0,0,0,0)");
        edgeMask.addColorStop(.12, "rgba(0,0,0,1)");
        edgeMask.addColorStop(.88, "rgba(0,0,0,1)");
        edgeMask.addColorStop(1, "rgba(0,0,0,0)");
        frameLayerCtx.fillStyle = edgeMask;
        frameLayerCtx.fillRect(0, 0, foregroundWidth, foregroundH);
        frameLayerCtx.globalCompositeOperation = "source-over";
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((progress - .5) * -.009);
        ctx.scale(scale, scale);
        ctx.shadowColor = "rgba(244,81,42,.12)";
        ctx.shadowBlur = Math.min(18, width * .01);
        ctx.drawImage(frameLayer, -foregroundWidth / 2, -foregroundH / 2, foregroundWidth, foregroundH);
        ctx.restore();

        // Small vignette keeps the frame edges integrated with the black page.
        const vignette = ctx.createRadialGradient(width * .5, height * .48, Math.min(width, height) * .2, width * .5, height * .48, Math.max(width, height) * .7);
        vignette.addColorStop(.58, "rgba(0,0,0,0)");
        vignette.addColorStop(1, "rgba(0,0,0,.42)");
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
        ctx.filter = "none";
        lastDrawn = frameIndex;
      }
      ctx.restore();
    };
    const stageProgress = () => {
      const stageTop = stage.getBoundingClientRect().top + window.scrollY;
      const maxTravel = Math.max(1, stage.offsetHeight - sticky.offsetHeight);
      return Math.max(0, Math.min(1, (window.scrollY - stageTop) / maxTravel));
    };
    const tick = () => {
      raf = 0;
      if (document.hidden) return;
      const p = stageProgress();
      target = p * (total - 1);
      current = reduced.matches ? target : current + (target - current) * .22;
      if (Math.abs(target - current) < .08) current = target;
      draw();
      // Fire overlay activates only at the end of the hamburger's scroll sequence.
      const threshold = stage.getBoundingClientRect().top + window.scrollY + stage.offsetHeight - sticky.offsetHeight - 2;
      const fireActive = window.scrollY >= threshold;
      const wasFireActive = document.body.classList.contains("fire-sequence-active");
      document.body.classList.toggle("fire-sequence-active", fireActive);
      if (fireActive !== wasFireActive) window.dispatchEvent(new CustomEvent("drsmash:fire-state", { detail: { active: fireActive } }));
      if (Math.abs(target - current) >= .08 || stageProgress() > 0 && stageProgress() < 1) raf = requestAnimationFrame(tick);
    };
    const requestTick = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", () => { resize(); requestTick(); }, { passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = 0; } else requestTick(); });
    reduced.addEventListener?.("change", requestTick);
    resize();
    requestTick();
    preload();
  }

  // ============================================================
  // CHAMAS NO RODAPÉ DA TELA: começam após o fim da sequência da hero.
  // A rolagem acelera/interage com a sequência; blend screen remove o preto.
  // ============================================================
  function setupFireSequence() {
    const canvas = $("#ember-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const total = 17;
    const frames = Array(total).fill(null);
    let width = 0, height = 0, dpr = 1, phase = 0, raf = 0, lastTime = 0, lastScroll = window.scrollY, scrollImpulse = 0, scrollDirection = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const loadAll = () => frames.forEach((_, i) => {
      const img = new Image(); img.decoding = "async";
      img.onload = () => { frames[i] = img; };
      img.onerror = () => console.warn(`Frame de chamas indisponível: ${i + 1}`);
      img.src = `assets/fire-frames/fire-${String(i + 1).padStart(2, "0")}.webp`;
    });
    const draw = (time) => {
      raf = 0;
      if (document.hidden || reduced.matches || !document.body.classList.contains("fire-sequence-active")) return;
      if (lastTime) phase += Math.min(48, Math.max(0, time - lastTime)) * .0022;
      lastTime = time;
      const index = Math.floor(phase) % total;
      const img = frames[index] || frames.find(Boolean);
      ctx.clearRect(0, 0, width, height);
      if (img?.naturalWidth) {
        // Keep the flame band at the bottom; the source's black background is
        // visually removed via CSS mix-blend-mode: screen.
        const drawHeight = width * (img.naturalHeight / img.naturalWidth);
        scrollImpulse *= .92;
        const sway = Math.sin(phase * .82) * width * .006 + scrollDirection * scrollImpulse * width * .008;
        const rise = scrollImpulse * height * .018;
        ctx.globalAlpha = width < 700 ? .38 : .42;
        ctx.drawImage(img, sway, height - drawHeight - rise, width, drawHeight * (1 + scrollImpulse * .035));
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };
    const start = () => { if (!raf && !reduced.matches && document.body.classList.contains("fire-sequence-active")) raf = requestAnimationFrame(draw); };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; lastTime = 0; ctx.clearRect(0, 0, width, height); };
    window.addEventListener("scroll", () => {
      const scrollDelta = window.scrollY - lastScroll;
      const delta = Math.abs(scrollDelta);
      if (delta) scrollDirection = Math.sign(scrollDelta);
      lastScroll = window.scrollY;
      phase += Math.min(180, delta) * .026;
      scrollImpulse = Math.min(1, scrollImpulse + delta / 240);
      if (document.body.classList.contains("fire-sequence-active")) start();
      else stop();
    }, { passive: true });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    window.addEventListener("drsmash:fire-state", event => event.detail?.active ? start() : stop());
    reduced.addEventListener?.("change", event => event.matches ? stop() : start());
    resize(); loadAll();
  }

  // ============================================================
  // STATUS DA LOJA E CONTAGEM REGRESSIVA
  // Não mostra ABERTA/FECHADA enquanto a empresa não confirmar horários.
  // ============================================================
  function setupStoreHours() {
    const status = $("#store-status");
    const countdown = $("#store-countdown");
    const card = $(".operation-status-card");
    if (!status || !countdown) return;
    const hoursCfg = cfg.hours || {};
    if (!hoursCfg.confirmed || !Array.isArray(hoursCfg.weekly) || hoursCfg.weekly.length !== 7 ||
        !hoursCfg.weekly.some(Boolean)) {
      status.textContent = "HORÁRIOS A CONFIRMAR";
      countdown.textContent = "O horário oficial ainda não foi confirmado pela empresa. Consulte o canal de pedidos.";
      return;
    }
    const tz = hoursCfg.timeZone || "America/Sao_Paulo";
    const weekdayKeys = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    const dateFmt = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
    const parse = (value) => {
      if (!/^\d{2}:\d{2}$/.test(String(value || ""))) return null;
      const [h, m] = value.split(":").map(Number);
      return (h <= 23 && m <= 59) ? h * 60 + m : null;
    };
    const getState = () => {
      const now = new Date();
      const parts = Object.fromEntries(fmt.formatToParts(now).map(p => [p.type, p.value]));
      const day = weekdayKeys[parts.weekday];
      const minute = Number(parts.hour) * 60 + Number(parts.minute);
      const date = dateFmt.format(now);
      const exception = hoursCfg.exceptions?.[date];
      const today = exception === null ? null : (exception || hoursCfg.weekly[day]);
      const yesterday = hoursCfg.weekly[(day + 6) % 7];
      const open = parse(today?.open);
      const close = parse(today?.close);
      const prevOpen = parse(yesterday?.open);
      const prevClose = parse(yesterday?.close);
      const overnightFromYesterday = prevOpen !== null && prevClose !== null && prevClose <= prevOpen && minute < prevClose;
      const isOpen = today && open !== null && close !== null
        ? (close > open ? minute >= open && minute < close : minute >= open || minute < close)
        : Boolean(overnightFromYesterday);
      let remaining = 0;
      let label = "";
      if (isOpen) {
        const target = (close > open) ? close : (minute >= open ? close + 1440 : close);
        remaining = Math.max(0, target - minute);
        label = "ABERTA AGORA";
      } else {
        label = "FECHADA AGORA";
        let best = Infinity;
        for (let offset = 0; offset <= 7; offset++) {
          const candidateDay = (day + offset) % 7;
          const [baseYear, baseMonth, baseDay] = date.split("-").map(Number);
          const calendarDate = new Date(Date.UTC(baseYear, baseMonth - 1, baseDay + offset));
          const dateKey = `${calendarDate.getUTCFullYear()}-${String(calendarDate.getUTCMonth() + 1).padStart(2, "0")}-${String(calendarDate.getUTCDate()).padStart(2, "0")}`;
          const special = hoursCfg.exceptions?.[dateKey];
          const dayCfg = special === null ? null : (special || hoursCfg.weekly[candidateDay]);
          const start = parse(dayCfg?.open);
          if (start === null) continue;
          let delta = offset * 1440 + start - minute;
          if (delta <= 0) delta += (offset === 0 ? 1440 : 0);
          if (delta > 0 && delta < best) best = delta;
        }
        remaining = Number.isFinite(best) ? best : null;
      }
      return { isOpen, remaining, label };
    };
    const update = () => {
      const state = getState();
      status.textContent = state.label;
      card?.classList.toggle("is-open", state.isOpen);
      card?.classList.toggle("is-closed", !state.isOpen);
      if (state.remaining === null) countdown.textContent = "Próxima abertura não configurada.";
      else {
        const hrs = Math.floor(state.remaining / 60);
        const mins = state.remaining % 60;
        countdown.textContent = state.isOpen
          ? `Fechamento previsto em ${hrs ? `${hrs}h ` : ""}${mins} min · horário configurado localmente`
          : `Próxima abertura em ${hrs ? `${hrs}h ` : ""}${mins} min · horário configurado localmente`;
      }
    };
    update();
    window.setInterval(update, 30000);
  }

  // ============================================================
  // MAPA / GEOLOCALIZAÇÃO / GEOCODIFICAÇÃO / ROTAS
  // OpenStreetMap + Leaflet. Geocoding only happens after a user action.
  // ============================================================
  function setupLocationTools() {
    const loadButton = $("#load-map");
    const mapState = $("#map-state");
    const retryMapButton = $("#retry-map");
    const mapMessage = $("#map-message");
    const mapFallback = $("#map-fallback");
    const mapElement = $("#real-map");
    const locationButton = $("#use-my-location");
    const form = $("#address-form");
    const routeResult = $("#route-result");
    const externalDirections = $("#external-directions");
    if (!loadButton || !mapElement || !mapMessage) return;

    const mapsCfg = cfg.maps || {};
    const state = {
      loadingLeaflet: false,
      leafletReady: false,
      map: null,
      layer: null,
      storeCoords: null,
      visitorCoords: null,
      selectedCoords: null,
      storeLabel: "",
      visitorLabel: "",
      lastGeocodeAt: 0,
      storeGeocodeAttempted: false,
      geocodeCache: new Map()
    };
    const cityCenter = Array.isArray(mapsCfg.initialCenter) ? mapsCfg.initialCenter : [-23.08, -47.21];
    const setMessage = (message, type = "info") => {
      mapMessage.textContent = message;
      mapMessage.dataset.state = type;
    };
    const manualDetails = $("#manual-address-details");
    const manualTrigger = $("#show-manual-address");
    const revealManualAddress = (message) => {
      if (manualDetails) {
        manualDetails.hidden = false;
        manualDetails.open = true;
      }
      if (message) setMessage(message, "error");
      window.setTimeout(() => $("#address-street")?.focus({ preventScroll: true }), 60);
    };
    manualTrigger?.addEventListener("click", () => {
      if (manualDetails) {
        manualDetails.hidden = false;
        manualDetails.open = !manualDetails.open;
      }
      if (manualDetails?.open) $("#address-street")?.focus({ preventScroll: true });
    });
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const normalizeText = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const validCoords = point => point && Number.isFinite(Number(point.lat)) && Number.isFinite(Number(point.lon)) &&
      Math.abs(Number(point.lat)) <= 90 && Math.abs(Number(point.lon)) <= 180;
    const updateDirectionsLink = () => {
      if (!externalDirections || !state.storeCoords || !state.selectedCoords) {
        if (externalDirections) externalDirections.hidden = true;
        return;
      }
      const a = state.storeCoords;
      const b = state.selectedCoords;
      const route = `${a.lat},${a.lon};${b.lat},${b.lon}`;
      externalDirections.href = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${encodeURIComponent(route)}`;
      externalDirections.hidden = false;
    };
    const setMapState = value => { if (mapState) mapState.textContent = value; };
    const loadScript = src => new Promise((resolve, reject) => {
      if (window.L) { resolve(); return; }
      let existing = document.querySelector('script[data-leaflet-loader="true"]');
      if (existing?.dataset.failed === "true") {
        existing.remove();
        existing = null;
      }
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", () => reject(new Error("A biblioteca do mapa não pôde ser carregada.")), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.leafletLoader = "true";
      script.onload = () => { script.dataset.loaded = "true"; resolve(); };
      script.onerror = () => {
        script.dataset.failed = "true";
        reject(new Error("A biblioteca do mapa não pôde ser carregada."));
      };
      document.head.append(script);
    });
    const ensureMap = async () => {
      if (state.leafletReady) return;
      if (state.loadingLeaflet) {
        while (state.loadingLeaflet) await wait(100);
        if (state.leafletReady) return;
      }
      state.loadingLeaflet = true;
      loadButton.disabled = true;
      loadButton.textContent = "CARREGANDO MAPA…";
      setMapState("CARREGANDO MAPA");
      try {
        if (!document.querySelector('link[data-leaflet-css="true"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          link.dataset.leafletCss = "true";
          document.head.append(link);
        }
        await loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
        if (!window.L) throw new Error("Leaflet não ficou disponível.");
        mapFallback.hidden = true;
        mapElement.hidden = false;
        state.map = window.L.map(mapElement, { scrollWheelZoom: false, zoomControl: true }).setView(cityCenter, mapsCfg.initialZoom || 12);
        state.layer = window.L.tileLayer(mapsCfg.tileUrl || "https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          minZoom: 5, maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
        }).addTo(state.map);
        state.layer.on("tileerror", () => {
          setMessage("O mapa-base não respondeu. Confira a conexão e tente carregar os tiles novamente. Os canais de pedido continuam disponíveis.", "error");
          if (retryMapButton) retryMapButton.hidden = false;
        });
        state.layer.on("load", () => {
          setMapState("MAPA CARREGADO · OPENSTREETMAP");
          if (retryMapButton) retryMapButton.hidden = true;
        });
        state.map.on("click", () => { /* Map taps do not send or store address data. */ });
        state.leafletReady = true;
        loadButton.hidden = true;
        setMapState("MAPA INTERATIVO");
        setMessage("Mapa carregado. Para calcular uma rota, permita a localização ou informe o endereço manualmente.");
        // Leaflet may initialize before the container finishes its CSS transition.
        window.setTimeout(() => state.map?.invalidateSize(), 80);
      } catch (error) {
        loadButton.disabled = false;
        loadButton.textContent = "TENTAR CARREGAR MAPA NOVAMENTE";
        setMapState("MAPA INDISPONÍVEL");
        setMessage("Não foi possível carregar a biblioteca ou os tiles do mapa. Tente novamente; os canais de pedido continuam disponíveis.", "error");
        console.warn("Mapa não carregou:", error);
      } finally {
        state.loadingLeaflet = false;
      }
    };
    const geocode = async (query, store = false) => {
      const base = validHref(mapsCfg.geocodingBaseUrl || "https://nominatim.openstreetmap.org/search");
      if (base === "#") throw new Error("Serviço de geocodificação não configurado.");
      const cacheKey = `${store ? "store" : "destination"}:${normalizeText(query)}`;
      if (state.geocodeCache.has(cacheKey)) return state.geocodeCache.get(cacheKey);
      const since = Date.now() - state.lastGeocodeAt;
      const minInterval = Math.max(1100, Number(mapsCfg.geocodingMinimumIntervalMs || 1200));
      if (since < minInterval) await wait(minInterval - since);
      const url = new URL(base);
      url.searchParams.set("q", query);
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("limit", store ? "1" : "3");
      state.lastGeocodeAt = Date.now();
      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Geocodificação indisponível (HTTP ${response.status}).`);
      const results = await response.json();
      if (!Array.isArray(results) || !results.length) throw new Error("O endereço não foi encontrado. Revise rua, número, bairro e cidade.");
      const mapResults = results.filter(item => Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon)));
      if (!mapResults.length) throw new Error("O provedor não retornou coordenadas válidas.");
      if (store) {
        const result = mapResults[0];
        const address = result.address || {};
        const fullText = normalizeText(result.display_name || "");
        const roadText = normalizeText(address.road || address.pedestrian || address.residential || "");
        const houseNumber = normalizeText(address.house_number || "");
        const cityText = normalizeText(address.city || address.town || address.municipality || address.village || "");
        const requestedStreet = normalizeText((cfg.brand?.address || "").split("—")[0]);
        const requestedRoad = requestedStreet.replace(/,\s*\d+.*$/, "").trim();
        const expectedNumber = (requestedStreet.match(/,\s*(\d+)/) || [])[1];
        // Require street, street number and city evidence before creating an exact store pin.
        if (!roadText || (!roadText.includes(requestedRoad) && !requestedRoad.includes(roadText))) {
          throw new Error("O mapa não confirmou o nome exato da rua da unidade. A marcação da loja ficou pendente de validação.");
        }
        if (expectedNumber && houseNumber !== expectedNumber) {
          throw new Error("O mapa não confirmou o número exato do endereço da unidade. A marcação precisa ser validada pela empresa.");
        }
        if (!cityText.includes("indaiatuba") && !fullText.includes("indaiatuba")) {
          throw new Error("O resultado do mapa não confirmou Indaiatuba. A marcação da loja foi bloqueada por segurança.");
        }
      }
      state.geocodeCache.set(cacheKey, mapResults);
      return mapResults;
    };
    const upsertMarker = (point, kind, label) => {
      if (!state.leafletReady || !state.map || !validCoords(point)) return;
      const L = window.L;
      const coords = [Number(point.lat), Number(point.lon)];
      const isStore = kind === "store";
      const icon = L.divIcon({
        className: `drsmash-map-marker ${isStore ? "is-store" : "is-visitor"}`,
        html: `<span>${isStore ? "DR" : "VOCÊ"}</span>`,
        iconSize: isStore ? [42, 30] : [46, 30],
        iconAnchor: [isStore ? 21 : 23, 15]
      });
      if (point._marker) {
        point._marker.setLatLng(coords).setIcon(icon);
        return;
      }
      const marker = L.marker(coords, { icon, keyboard: true, title: label || (isStore ? "Local da unidade" : "Local informado pelo visitante") }).addTo(state.map);
      marker.bindPopup(document.createTextNode(label || (isStore ? "Endereço da unidade (geocodificado)" : "Endereço/localização informada pelo visitante")));
      point._marker = marker;
      return marker;
    };
    const fitMarkers = () => {
      if (!state.map || !window.L) return;
      const points = [state.storeCoords, state.selectedCoords].filter(validCoords);
      if (points.length > 1) {
        state.map.fitBounds(window.L.latLngBounds(points.map(p => [Number(p.lat), Number(p.lon)])), { padding: [35, 35], maxZoom: 15 });
      } else if (points.length === 1) {
        state.map.setView([Number(points[0].lat), Number(points[0].lon)], 15);
      }
    };
    const ensureStoreCoords = async () => {
      if (validCoords(state.storeCoords)) return state.storeCoords;
      const streetAddress = String(cfg.brand?.address || "Rua Alberto Santos Dumont, 1660").split("—")[0].trim();
      const address = `${streetAddress}, Indaiatuba, São Paulo, Brasil`;
      setMessage("Confirmando a localização da unidade a partir do endereço configurado…");
      const results = await geocode(address, true);
      state.storeCoords = { lat: Number(results[0].lat), lon: Number(results[0].lon), label: results[0].display_name };
      state.storeLabel = results[0].display_name;
      upsertMarker(state.storeCoords, "store", "Local da Dr. Smash! (endereço localizado pelo provedor; confirme no mapa)");
      return state.storeCoords;
    };
    const renderRouteUnavailable = () => {
      if (!routeResult) return;
      routeResult.hidden = false;
      routeResult.replaceChildren();
      const strong = document.createElement("strong");
      strong.textContent = "Ponto localizado. Cálculo rodoviário nesta página ainda não está configurado.";
      const text = document.createElement("p");
      text.textContent = "A rota rodoviária está temporariamente indisponível. O serviço externo pode falhar ou limitar consultas. Confira a rota no OpenStreetMap e confirme a cobertura de entrega no canal oficial.";
      routeResult.append(strong, text);
      if (externalDirections && validCoords(state.storeCoords) && validCoords(state.selectedCoords)) {
        updateDirectionsLink();
        externalDirections.textContent = "ABRIR ROTAS NO OPENSTREETMAP ↗";
        externalDirections.hidden = false;
      } else if (externalDirections) {
        externalDirections.hidden = true;
      }
    };
    const calculateRoute = async () => {
      if (!validCoords(state.storeCoords) || !validCoords(state.selectedCoords)) {
        renderRouteUnavailable();
        setMessage("A localização foi marcada, mas a rota não pode ser calculada porque ainda falta confirmar os dois pontos.", "error");
        return false;
      }
      updateDirectionsLink();
      const routeBase = String(cfg.delivery?.routeServiceBaseUrl || "").trim();
      if (!routeBase) {
        renderRouteUnavailable();
        setMessage("O destino foi localizado, mas o serviço de rotas não está configurado. Use o canal de pedidos para confirmar a entrega.", "error");
        return false;
      }
      let parsed;
      try { parsed = new URL(routeBase); } catch (_) {
        renderRouteUnavailable();
        setMessage("O endereço do serviço de rotas está inválido. A localização continua marcada no mapa.", "error");
        return false;
      }
      const localDevelopmentRoute = parsed.protocol === "http:" && ["localhost", "127.0.0.1"].includes(parsed.hostname);
      if (parsed.protocol !== "https:" && !localDevelopmentRoute) {
        setMessage("O serviço de rotas precisa utilizar HTTPS.", "error");
        renderRouteUnavailable();
        return false;
      }
      setMessage("Calculando a rota rodoviária…");
      if (routeResult) { routeResult.hidden = false; routeResult.textContent = "Calculando rota…"; }
      try {
        const [store, dest] = [state.storeCoords, state.selectedCoords];
        const apiUrl = `${parsed.href.replace(/\/$/, "")}/route/v1/driving/${store.lon},${store.lat};${dest.lon},${dest.lat}?overview=full&geometries=geojson`;
        const response = await fetch(apiUrl, { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`O serviço de rota respondeu HTTP ${response.status}.`);
        const data = await response.json();
        const route = data.routes?.[0];
        if (data.code !== "Ok" || !route || !Number.isFinite(route.distance) || !Number.isFinite(route.duration)) {
          throw new Error("O serviço não encontrou uma rota rodoviária.");
        }
        if (state.routeLine) state.routeLine.remove();
        state.routeLine = window.L.geoJSON(route.geometry, { style: { color: "#F4512A", weight: 5, opacity: .86, lineCap: "round" } }).addTo(state.map);
        state.map.fitBounds(state.routeLine.getBounds(), { padding: [30, 30] });
        routeResult.replaceChildren();
        const title = document.createElement("strong");
        title.textContent = "Rota rodoviária calculada";
        const distanceKm = (route.distance / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
        const durationMin = Math.ceil(route.duration / 60);
        const pText = document.createElement("p");
        pText.textContent = "Estimativa do trajeto por estrada retornada por um serviço externo. Não considera trânsito ao vivo, preparo, despacho nem disponibilidade de entregador.";
        const metrics = document.createElement("div");
        metrics.className = "route-metrics";
        const distanceBadge = document.createElement("span");
        distanceBadge.textContent = `${distanceKm} km por estrada`;
        const timeBadge = document.createElement("span");
        timeBadge.textContent = `${durationMin} min de trajeto (estimativa)`;
        metrics.append(distanceBadge, timeBadge);
        routeResult.append(title, pText, metrics);
        if (Number.isFinite(cfg.delivery?.preparationMinutes) && Number.isFinite(cfg.delivery?.operationalMarginMinutes)) {
          const total = durationMin + Number(cfg.delivery.preparationMinutes) + Number(cfg.delivery.operationalMarginMinutes);
          const note = document.createElement("p");
          note.textContent = `Previsão operacional preliminar: cerca de ${total} minutos (trajeto + preparo e margem configurados pela loja). Não é rastreamento em tempo real.`;
          routeResult.append(note);
        } else {
          const note = document.createElement("p");
          note.textContent = "O tempo de entrega completo depende do preparo e despacho da loja, que ainda não foram confirmados. Por enquanto, esta estimativa cobre apenas o trajeto rodoviário.";
          routeResult.append(note);
        }
        setMessage("Rota calculada. Confirme a disponibilidade de delivery diretamente na plataforma oficial.");
        return true;
      } catch (error) {
        renderRouteUnavailable();
        setMessage(`${error.message} A localização continua marcada; confira também a plataforma oficial.`, "error");
        return false;
      }
    };
    const chooseDestination = async (point, label) => {
      await ensureMap();
      if (!state.leafletReady || !state.map) throw new Error("O mapa não ficou disponível. Tente novamente ou informe o endereço manualmente.");
      state.selectedCoords = { lat: Number(point.lat), lon: Number(point.lon), label: label || point.label };
      state.visitorLabel = label || "";
      upsertMarker(state.selectedCoords, "visitor", label || "Destino");
      // Center the visitor immediately, even if the store geocoding/route service fails.
      state.map.setView([Number(state.selectedCoords.lat), Number(state.selectedCoords.lon)], 14, { animate: true, duration: .6 });
      updateDirectionsLink();
      try {
        await ensureStoreCoords();
        fitMarkers();
        updateDirectionsLink();
        await calculateRoute();
        return true;
      } catch (error) {
        if (state.map && validCoords(state.selectedCoords)) {
          state.map.setView([Number(state.selectedCoords.lat), Number(state.selectedCoords.lon)], 14, { animate: true, duration: .6 });
        }
        renderRouteUnavailable();
        setMessage(`Sua localização foi encontrada e está marcada no mapa. Não foi possível confirmar a posição exata da unidade para montar a rota: ${error.message}`, "error");
        return false;
      }
    };
    const showGeocodeChoices = (results, query) => {
      const old = $("#geocode-choices");
      old?.remove();
      const wrapper = document.createElement("div");
      wrapper.id = "geocode-choices";
      wrapper.className = "geocode-choices";
      const label = document.createElement("label");
      label.textContent = "Encontramos mais de um endereço. Selecione o correto:";
      label.className = "geo-choice-label";
      const select = document.createElement("select");
      select.id = "geocode-choice-select";
      select.setAttribute("aria-label", "Escolha o endereço encontrado");
      results.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = item.display_name;
        select.append(option);
      });
      label.append(select);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button button-primary";
      button.textContent = "CONFIRMAR ENDEREÇO ESCOLHIDO";
      button.addEventListener("click", async () => {
        button.disabled = true;
        const chosen = results[Number(select.value)];
        try { await chooseDestination({ lat: chosen.lat, lon: chosen.lon, label: chosen.display_name }, chosen.display_name); }
        catch (error) { setMessage(error.message, "error"); }
        finally { button.disabled = false; }
      });
      wrapper.append(label, button);
      form?.after(wrapper);
      setMessage("Escolha o resultado que corresponde ao endereço informado. Nenhuma localização foi salva.", "info");
    };

    loadButton.addEventListener("click", ensureMap);
    retryMapButton?.addEventListener("click", () => {
      if (state.layer) {
        setMapState("TENTANDO CARREGAR MAPA");
        setMessage("Tentando novamente carregar o mapa-base…");
        state.layer.redraw();
      } else {
        ensureMap();
      }
    });
    locationButton?.addEventListener("click", async () => {
      if (!navigator.geolocation) {
        revealManualAddress("Este navegador não oferece geolocalização. O formulário manual foi aberto para você continuar.");
        return;
      }
      locationButton.disabled = true;
      setMessage("Solicitando sua localização. O navegador pedirá autorização; você pode negar e usar o formulário manual.");
      try {
        await ensureMap();
        if (!state.leafletReady) {
          revealManualAddress("Não foi possível carregar o mapa. O formulário manual foi aberto; confira a conexão ou informe seu endereço.");
          return;
        }
        const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false, timeout: 12000, maximumAge: 60000
        }));
        const point = { lat: Number(position.coords.latitude), lon: Number(position.coords.longitude), label: "Localização deste dispositivo" };
        if (!validCoords(point)) throw new Error("O navegador retornou coordenadas inválidas.");
        await chooseDestination(point, "Sua localização (coordenadas temporárias nesta sessão)");
      } catch (error) {
        let message = error?.message || "Localização indisponível.";
        if (typeof error?.code === "number") {
          message = ({
            1: "Permissão de localização negada. Digite seu endereço manualmente se preferir.",
            2: "O dispositivo não conseguiu determinar a localização. Tente novamente ou digite o endereço.",
            3: "A localização demorou demais. Tente novamente ou digite o endereço."
          })[error.code] || message;
        }
        revealManualAddress(`${message} O formulário para informar o endereço foi aberto automaticamente.`);
      } finally {
        locationButton.disabled = false;
      }
    });

    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const oldChoices = $("#geocode-choices");
      oldChoices?.remove();
      if (!form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form).entries());
      const bits = [
        values.street, values.number, values.neighborhood,
        [values.city, values.state].filter(Boolean).join(" - "),
        values.cep ? `CEP ${values.cep}` : "",
        values.complement ? `Complemento ${values.complement}` : "",
        "Brasil"
      ].filter(Boolean);
      const query = bits.join(", ");
      const submit = $("#geocode-address");
      submit.disabled = true;
      setMessage("Buscando o endereço informado no serviço de mapas…");
      try {
        await ensureMap();
        if (!state.leafletReady) {
          revealManualAddress("O mapa não carregou. O endereço continua preenchido; tente novamente quando houver conexão.");
          return;
        }
        const results = await geocode(query, false);
        if (results.length > 1) {
          showGeocodeChoices(results, query);
          return;
        }
        await chooseDestination({ lat: results[0].lat, lon: results[0].lon, label: results[0].display_name }, results[0].display_name);
      } catch (error) {
        revealManualAddress(error.message || "Não foi possível localizar o endereço. Revise os campos ou use a plataforma oficial.");
      } finally {
        submit.disabled = false;
      }
    });

    // Clarifies that city-center map view is only a starting view, not the store pin.
    if (mapMessage) mapMessage.textContent = "Use sua localização para marcar sua posição no mapa. Se o navegador não localizar você, o formulário manual será aberto.";
  }

  // ============================================================
  // PEDIDO MÍNIMO — comunicação; a validação real fica na plataforma.
  // ============================================================
  function applyCommercialDisclosure() {
    const value = $("#minimum-order-value");
    if (value && cfg.delivery) {
      const amount = Number(cfg.delivery.minimumOrderBRL);
      const formatted = Number.isFinite(amount)
        ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount)
        : "";
      const template = String(cfg.delivery.minimumOrderMessage || "Consulte o pedido mínimo na plataforma.");
      value.textContent = formatted ? template.replaceAll("{{valor}}", formatted) : "Consulte o pedido mínimo na plataforma.";
    }
  }

  applyConfiguration();
  $("#product-search")?.addEventListener("input", () => renderProducts(activeProductCategory));
  renderProducts("all");
  renderManifesto();
  renderFaq();
  setupMobileNavigation();
  observeRevealItems();
  setupScrollExperience();
  setupHeroSequence();
  setupFireSequence();
  setupAmbientAudio();
  setupStoreHours();
  setupLocationTools();
  applyCommercialDisclosure();
})();
