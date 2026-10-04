/* =========================================================
   Qleve Fiber — cabeçalho, menu, rodapé e WhatsApp
   Um único lugar para o menu: editar NAV abaixo.
   Funciona abrindo os HTML com duplo clique (sem servidor).
   ========================================================= */
(function () {
  "use strict";

  // ---- Configuração geral -------------------------------------------------
  var CONFIG = {
    // Faixa "versão modelo" no topo. Desligar (false) na versão final.
    showDraftNote: true,
    whatsapp: "5551980172774",
    whatsappLabel: "(51) 98017-2774",
    email: "contato@qlevefiber.com.br",
    address: "R. Nelson Teichmann, 58 – Distrito Industrial<br>Cachoeirinha/RS – CEP 94930-625 – Brasil",
    hours: "Seg a sex, 8h às 18h"
  };

  // ---- Idioma -------------------------------------------------------------
  // O modelo sai só em PT. Para EN/ES: criar as pastas /en e /es com as mesmas
  // páginas traduzidas, <html lang="en"> / <html lang="es"> e data-root="../".
  var htmlLang = (document.documentElement.lang || "pt").slice(0, 2);
  var LANG = { pt: 1, en: 1, es: 1 }[htmlLang] ? htmlLang : "pt";
  var LANGS_AVAILABLE = { pt: true, en: false, es: false };

  var T = {
    pt: {
      home: "Home", company: "A Qleve", segments: "Segmentos", products: "Produtos", quality: "Qualidade",
      quote: "Orçamento", contact: "Contato", quoteCta: "Peça um orçamento", allSegments: "Visão geral dos segmentos",
      allProducts: "Visão geral", menu: "Abrir menu", soon: "Em preparação",
      sig: "Compósitos para o que precisa durar.",
      footerAbout: "Indústria de compósitos em PRFV. Postes de fibra de vidro conforme ABNT NBR 16989:2021, com atendimento nacional e internacional.",
      nav: "Navegação", contactH: "Contato", rights: "Todos os direitos reservados.",
      draft: "<strong>Versão modelo</strong> para apresentação aos sócios · dados técnicos sujeitos a validação da engenharia",
      waText: "Olá! Vim pelo site da Qleve Fiber e gostaria de mais informações."
    },
    en: {
      home: "Home", company: "About Qleve", segments: "Markets", products: "Products", quality: "Quality",
      quote: "Quote", contact: "Contact", quoteCta: "Request a quote", allSegments: "All markets",
      allProducts: "Overview", menu: "Open menu", soon: "Coming soon",
      sig: "Composites built to last.",
      footerAbout: "FRP composites manufacturer. Fiberglass poles per ABNT NBR 16989:2021, serving Brazil and international markets.",
      nav: "Navigation", contactH: "Contact", rights: "All rights reserved.",
      draft: "<strong>Draft version</strong> · technical data pending engineering validation",
      waText: "Hello! I found Qleve Fiber's website and would like more information."
    },
    es: {
      home: "Inicio", company: "La Qleve", segments: "Segmentos", products: "Productos", quality: "Calidad",
      quote: "Cotización", contact: "Contacto", quoteCta: "Solicite una cotización", allSegments: "Todos los segmentos",
      allProducts: "Visión general", menu: "Abrir menú", soon: "En preparación",
      sig: "Compuestos para lo que debe durar.",
      footerAbout: "Industria de compuestos en PRFV. Postes de fibra de vidrio según ABNT NBR 16989:2021, con atención nacional e internacional.",
      nav: "Navegación", contactH: "Contacto", rights: "Todos los derechos reservados.",
      draft: "<strong>Versión modelo</strong> · datos técnicos sujetos a validación de ingeniería",
      waText: "¡Hola! Vi el sitio de Qleve Fiber y me gustaría más información."
    }
  }[LANG];

  // ---- Menu ---------------------------------------------------------------
  var NAV = [
    { id: "home", href: "index.html", label: T.home },
    { id: "empresa", href: "a-qleve.html", label: T.company },
    {
      id: "segmentos", href: "segmentos.html", label: T.segments, children: [
        { href: "qleve-energy.html", label: "Qleve Energy", sub: "Distribuidoras e cooperativas de energia" },
        { href: "qleve-urban.html", label: "Qleve Urban", sub: "Iluminação pública e condomínios" },
        { href: "qleve-connect.html", label: "Qleve Connect", sub: "CFTV, conectividade e cidades inteligentes" },
        { href: "qleve-industrial.html", label: "Qleve Industrial", sub: "Indústria, litoral e infraestrutura" },
        { href: "segmentos.html", label: T.allSegments }
      ]
    },
    {
      id: "produtos", href: "produtos.html", label: T.products, children: [
        { href: "produtos.html#pfc", label: "Linha PFC", sub: "Topo circular · 9 a 11 m" },
        { href: "produtos.html#pfq", label: "Linha PFQ", sub: "Topo quadrado · 9 a 11 m" },
        { href: "produtos.html#pu", label: "Linha PU", sub: "Urbana · 4, 6 e 8 m" },
        { href: "produtos.html#detalhes", label: "Detalhes construtivos", sub: "Engastamento, identificação, furação" },
        { href: "produtos.html#logistica", label: "Logística", sub: "Transporte, armazenagem e manuseio" }
      ]
    },
    {
      id: "qualidade", href: "qualidade.html", label: T.quality, children: [
        { href: "qualidade.html#processo", label: "Processo de fabricação", sub: "Enrolamento filamentar em 8 etapas" },
        { href: "qualidade.html#controles", label: "Controles de qualidade", sub: "Rastreabilidade por lote" },
        { href: "qualidade.html#ensaios", label: "Ensaios", sub: "Conforme ABNT NBR 16989:2021" }
      ]
    },
    { id: "contato", href: "contato.html", label: T.contact }
  ];

  var body = document.body;
  var root = body.getAttribute("data-root") || "";
  var current = body.getAttribute("data-page") || "";
  var path = location.pathname.split("/").pop() || "index.html";

  function url(href) { return root + href; }
  function waLink(text) { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text || T.waText); }

  // ---- Cabeçalho ----------------------------------------------------------
  function desktopNav() {
    return '<nav class="nav" aria-label="Principal"><ul>' + NAV.map(function (item) {
      var cur = item.id === current ? ' aria-current="page"' : "";
      if (!item.children) return '<li><a href="' + url(item.href) + '"' + cur + ">" + item.label + "</a></li>";
      return '<li><a href="' + url(item.href) + '"' + cur + ">" + item.label + ' <span class="caret" aria-hidden="true">▾</span></a>' +
        '<ul class="dropdown">' + item.children.map(function (c) {
          return '<li><a href="' + url(c.href) + '"><b>' + c.label + "</b>" + (c.sub ? "<small>" + c.sub + "</small>" : "") + "</a></li>";
        }).join("") + "</ul></li>";
    }).join("") + "</ul></nav>";
  }

  function mobileNav() {
    return '<div class="mobile-nav" id="mobile-nav"><ul>' + NAV.map(function (item, i) {
      var cur = item.id === current ? ' aria-current="page"' : "";
      var row = '<div class="m-row"><a href="' + url(item.href) + '"' + cur + ">" + item.label + "</a>";
      if (!item.children) return "<li>" + row + "</div></li>";
      return "<li>" + row + '<button class="m-expand" type="button" aria-expanded="false" aria-controls="msub-' + i + '" aria-label="' + item.label + '">▾</button></div>' +
        '<div class="m-sub" id="msub-' + i + '">' + item.children.map(function (c) {
          return '<a href="' + url(c.href) + '"><b>' + c.label + "</b>" + (c.sub ? "<small>" + c.sub + "</small>" : "") + "</a>";
        }).join("") + "</div></li>";
    }).join("") + "</ul>" +
      '<a class="btn btn--primary" href="' + url("orcamento.html") + '">' + T.quoteCta + "</a>" +
      langSwitch() + "</div>";
  }

  function langSwitch() {
    return '<div class="lang" aria-label="Idioma">' + ["pt", "en", "es"].map(function (l) {
      var label = l.toUpperCase();
      if (l === LANG) return '<span class="is-active" aria-current="true">' + label + "</span>";
      if (!LANGS_AVAILABLE[l]) return '<span class="is-soon" title="' + T.soon + '">' + label + "</span>";
      return '<a href="' + url(l + "/" + path) + '" hreflang="' + l + '">' + label + "</a>";
    }).join("") + "</div>";
  }

  var headerHTML =
    (CONFIG.showDraftNote ? '<div class="draft-note">' + T.draft + "</div>" : "") +
    '<header class="site-header"><div class="container header-inner">' +
    '<a class="brand" href="' + url("index.html") + '"><img src="' + url("assets/logo/qleve-fiber-logo.png") + '" alt="Qleve Fiber" width="89" height="46"></a>' +
    desktopNav() +
    '<div class="header-actions">' + langSwitch() +
    '<a class="btn btn--primary" href="' + url("orcamento.html") + '">' + T.quoteCta + "</a>" +
    '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="' + T.menu + '"><span></span></button>' +
    "</div></div></header>" + mobileNav();

  // ---- Rodapé -------------------------------------------------------------
  var segs = NAV[2].children.slice(0, 4);
  var footerHTML =
    '<footer class="site-footer"><div class="container"><div class="footer-grid">' +
    '<div class="footer-brand"><img src="' + url("assets/logo/qleve-fiber-logo-branco.png") + '" alt="Qleve Fiber" width="123" height="64">' +
    '<p class="sig">' + T.sig + "</p><p>" + T.footerAbout + "</p></div>" +
    "<div><h4>" + T.nav + "</h4><ul>" + NAV.map(function (n) { return '<li><a href="' + url(n.href) + '">' + n.label + "</a></li>"; }).join("") +
    '<li><a href="' + url("orcamento.html") + '">' + T.quote + "</a></li></ul></div>" +
    "<div><h4>" + T.segments + "</h4><ul>" + segs.map(function (s) { return '<li><a href="' + url(s.href) + '">' + s.label + "</a></li>"; }).join("") + "</ul></div>" +
    "<div><h4>" + T.contactH + "</h4><ul>" +
    "<li>" + CONFIG.address + "</li>" +
    '<li><a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp ' + CONFIG.whatsappLabel + "</a></li>" +
    '<li><a href="mailto:' + CONFIG.email + '">' + CONFIG.email + "</a></li>" +
    "<li>" + CONFIG.hours + "</li>" +
    '<li>LinkedIn · Instagram <span class="tbd">a preencher</span></li></ul></div>' +
    "</div>" +
    '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " Qleve Fiber Indústria de Transformação Ltda. " + T.rights + "</span><span>qlevefiber.com.br</span></div>" +
    "</div></footer>";

  var waHTML =
    '<a class="wa-float" href="' + waLink() + '" target="_blank" rel="noopener" aria-label="WhatsApp ' + CONFIG.whatsappLabel + '">' +
    '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.5 10.5 0 0 1-1.7-5.7C5.1 9.9 10 5.2 16 5.2s10.9 4.7 10.9 10.6S22 26.4 16 26.4zm6-7.9c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg></a>';

  // ---- Montagem -----------------------------------------------------------
  var h = document.getElementById("site-header");
  var f = document.getElementById("site-footer");
  if (h) h.outerHTML = headerHTML;
  if (f) f.outerHTML = footerHTML;
  body.insertAdjacentHTML("beforeend", waHTML);
  document.documentElement.classList.remove("no-js");

  // Expor para outras páginas (formulário de orçamento)
  window.QLEVE = { config: CONFIG, waLink: waLink, lang: LANG };

  // ---- Comportamento do menu mobile ---------------------------------------
  var toggle = document.querySelector(".menu-toggle");
  function setOpen(open) {
    var hdr = document.querySelector(".site-header");
    if (open && hdr) body.style.setProperty("--nav-top", hdr.getBoundingClientRect().bottom + "px");
    body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  if (toggle) {
    toggle.addEventListener("click", function () { setOpen(!body.classList.contains("nav-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    document.querySelectorAll(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
  }
  document.querySelectorAll(".m-expand").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sub = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      sub.classList.toggle("is-open", open);
    });
  });

  // ---- Animação de entrada ------------------------------------------------
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }
})();
