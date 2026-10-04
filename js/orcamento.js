/* =========================================================
   Formulário de orçamento — sem backend.
   Monta a mensagem e abre WhatsApp ou e-mail.
   Aceita pré-preenchimento: orcamento.html?segmento=energy&modelo=PFC%2010-300
   ========================================================= */
(function () {
  "use strict";
  var form = document.getElementById("form-orcamento");
  if (!form) return;
  var cfg = (window.QLEVE && window.QLEVE.config) || { whatsapp: "5551980172774", email: "contato@qlevefiber.com.br" };
  var msg = document.getElementById("form-msg");
  var via = "whatsapp";

  // ---- Pré-preenchimento pela URL ----
  var params = new URLSearchParams(location.search);
  var seg = params.get("segmento");
  var modelo = params.get("modelo");
  if (seg && form.segmento.querySelector('option[value="' + seg + '"]')) form.segmento.value = seg;
  if (modelo) {
    form.modelo.value = modelo;
    var m = modelo.match(/^(PF[CQ])\s*(\d{2})-(\d{3})/);
    if (m) {
      form.querySelector(m[1] === "PFC" ? "#topo-c" : "#topo-q").checked = true;
      form.comprimento.value = parseInt(m[2], 10) + " m";
      form.carga.value = parseInt(m[3], 10) + " daN";
      if (!seg) form.segmento.value = "energy";
    }
    var pu = modelo.match(/^PU\s*0?(\d)/);
    if (pu) {
      form.comprimento.value = pu[1] + " m";
      if (!seg) form.segmento.value = "urban";
    }
  }

  form.querySelectorAll('button[type="submit"]').forEach(function (b) {
    b.addEventListener("click", function () { via = b.getAttribute("data-via"); });
  });

  function val(name) {
    var el = form.elements[name];
    if (!el) return "";
    if (el.length && el[0] && el[0].type === "radio") {
      for (var i = 0; i < el.length; i++) if (el[i].checked) return el[i].value;
      return "";
    }
    if (el.tagName === "SELECT") return el.value ? el.options[el.selectedIndex].text : "";
    return el.value.trim();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.textContent = "";
    var missing = [];
    ["nome", "empresa", "email", "telefone"].forEach(function (n) {
      var el = form.elements[n];
      var ok = el.value.trim() !== "" && (n !== "email" || /\S+@\S+\.\S+/.test(el.value));
      el.closest(".field").classList.toggle("has-error", !ok);
      if (!ok) missing.push(el.labels[0].textContent);
    });
    if (missing.length) {
      msg.textContent = "Preencha: " + missing.join(", ") + ".";
      form.querySelector(".has-error input").focus();
      return;
    }

    var lines = [
      "*Pedido de orçamento – site Qleve Fiber*",
      "",
      "Nome: " + val("nome"),
      "Empresa: " + val("empresa"),
      "E-mail: " + val("email"),
      "Telefone: " + val("telefone"),
      "",
      "Segmento: " + (val("segmento") || "não informado"),
      "Topo: " + val("topo"),
      "Comprimento: " + (val("comprimento") || "a definir"),
      "Carga nominal: " + (val("carga") || "a definir"),
      "Quantidade: " + (val("quantidade") || "não informada"),
      "Modelo de referência: " + (val("modelo") || "–"),
      "Padrão da distribuidora: " + (val("padrao") || "–"),
      "Acessórios: " + (val("acessorios") || "–"),
      "Local de entrega: " + (val("local") || "não informado"),
      "Prazo e cronograma: " + (val("prazo") || "–")
    ];
    if (val("mensagem")) lines.push("", "Observações: " + val("mensagem"));
    var text = lines.join("\n");

    if (via === "email") {
      var subject = "Orçamento de postes em PRFV – " + val("empresa");
      location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text.replace(/\*/g, ""));
    } else {
      window.open("https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    }
  });
})();
