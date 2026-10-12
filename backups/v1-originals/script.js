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
      border: "--border"
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
      const el = document.querySelector(`[data-section="${CSS.escape(section)}"]`);
      if (el) {
        el.hidden = !enabled;
        el.setAttribute("aria-hidden", enabled ? "false" : "true");
      }
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
    porcoes: "Porções", sobremesas: "Sobremesas"
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

  function renderProducts(activeCategory = "all") {
    const grid = $("#product-grid");
    const filters = $("#product-filters");
    if (!grid || !filters) return;

    filters.replaceChildren();
    (cfg.productFilters || []).forEach((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button";
      button.textContent = filter.label;
      button.setAttribute("aria-pressed", String(filter.id === activeCategory));
      button.addEventListener("click", () => renderProducts(filter.id));
      filters.append(button);
    });

    const products = (cfg.products || []).filter((product) =>
      activeCategory === "all" || product.category === activeCategory
    );
    grid.replaceChildren();
    if (!products.length) {
      const empty = document.createElement("p");
      empty.className = "empty-products";
      empty.textContent = "Nenhum destaque nesta categoria. Consulte o cardápio completo.";
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
        visual.alt = `Foto de ${product.name}`;
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
      priceLabel.textContent = "Valor no cardápio";
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

  applyConfiguration();
  renderProducts("all");
  renderManifesto();
  renderFaq();
  setupMobileNavigation();
  observeRevealItems();
})();
