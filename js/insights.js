/* =========================================================
   Insights — monta a listagem, o bloco da home e, dentro de cada
   artigo, os botões de compartilhar e os "leia também".
   Depende de js/posts.js (carregar antes).
   ========================================================= */
(function () {
  "use strict";
  var posts = window.QLEVE_POSTS || [];
  var root = document.body.getAttribute("data-root") || "";
  var MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fmtDate(iso) { var p = iso.split("-"); return parseInt(p[2], 10) + " " + MESES[parseInt(p[1], 10) - 1] + " " + p[0]; }
  function postUrl(p) { return root + "insights/" + p.slug + ".html"; }

  function card(p, featured) {
    return '<article class="post-card' + (featured ? " post-card--featured" : "") + ' reveal in">' +
      '<a class="post-card-img" href="' + postUrl(p) + '" tabindex="-1" aria-hidden="true"><img src="' + root + p.cover + '" alt="" loading="lazy" width="1088" height="571"></a>' +
      '<div class="post-card-body">' +
      '<div class="post-meta"><span class="pill pill--green">' + esc(p.category) + "</span><span>" + fmtDate(p.date) + "</span><span>" + p.minutes + " min de leitura</span></div>" +
      '<h3><a href="' + postUrl(p) + '">' + esc(p.title) + "</a></h3>" +
      "<p>" + esc(p.excerpt) + "</p>" +
      '<a class="link-arrow" href="' + postUrl(p) + '">Ler artigo</a>' +
      "</div></article>";
  }

  // ---- Listagem (insights.html) ----
  var list = document.getElementById("insights-list");
  var filters = document.getElementById("insights-filters");
  if (list) {
    var cats = ["Todos"].concat(posts.map(function (p) { return p.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var current = "Todos";
    function render() {
      var shown = posts.filter(function (p) { return current === "Todos" || p.category === current; });
      list.innerHTML = shown.length
        ? shown.map(function (p, i) { return card(p, i === 0 && current === "Todos"); }).join("")
        : '<p class="muted">Nenhum artigo nesta categoria ainda.</p>';
    }
    if (filters) {
      filters.innerHTML = cats.map(function (c) {
        return '<button type="button" class="chip" aria-pressed="' + (c === current) + '">' + esc(c) + "</button>";
      }).join("");
      filters.addEventListener("click", function (e) {
        var b = e.target.closest(".chip"); if (!b) return;
        current = b.textContent;
        filters.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        render();
      });
    }
    render();
  }

  // ---- Bloco "últimos artigos" (home) ----
  var home = document.getElementById("home-insights");
  if (home) home.innerHTML = posts.slice(0, 3).map(function (p) { return card(p, false); }).join("");

  // ---- Página de artigo ----
  var slug = document.body.getAttribute("data-post");
  if (slug) {
    var url = location.href.split("#")[0].split("?")[0];
    var me = posts.filter(function (p) { return p.slug === slug; })[0];
    var title = me ? me.title : document.title;
    var share = document.getElementById("post-share");
    if (share) {
      share.innerHTML =
        '<span class="share-label">Compartilhar</span>' +
        '<a class="share-btn share-btn--in" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url) + '">LinkedIn</a>' +
        '<a class="share-btn" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(title + " " + url) + '">WhatsApp</a>' +
        '<button class="share-btn" type="button" id="copy-link">Copiar link</button>';
      document.getElementById("copy-link").addEventListener("click", function (e) {
        var btn = e.currentTarget;
        var done = function () { btn.textContent = "Link copiado"; setTimeout(function () { btn.textContent = "Copiar link"; }, 2000); };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, done); else done();
      });
    }
    var rel = document.getElementById("post-related");
    if (rel) rel.innerHTML = posts.filter(function (p) { return p.slug !== slug; }).slice(0, 2).map(function (p) { return card(p, false); }).join("");
  }
})();
