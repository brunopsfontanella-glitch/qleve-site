# Site Qleve Fiber — modelo

Site estático (HTML + CSS + JS, sem build). Abra `index.html` com duplo clique ou publique a pasta em qualquer hospedagem.

## Páginas
| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home: banner, segmentos, Por que PRFV, números, processo, visão, CTA |
| `a-qleve.html` | Empresa, visão (postes → vergalhões → perfis), fábrica |
| `segmentos.html` | Visão geral dos 4 segmentos |
| `qleve-energy.html`, `qleve-urban.html`, `qleve-connect.html`, `qleve-industrial.html` | Uma página por segmento |
| `produtos.html` | Linhas PFC, PFQ e PU, desenho técnico, comparativo |
| `qualidade.html` | Processo em 8 etapas, controles, ensaios |
| `orcamento.html` | Formulário que abre WhatsApp ou e-mail (sem backend) |
| `contato.html` | Dados de contato e mapa |
| `blog.html` + `blog/*.html` | Blog: listagem com filtro por categoria e uma página por artigo |

## Onde editar
- **Menu, rodapé, WhatsApp, e-mail e endereço:** `js/site.js` (objetos `CONFIG` e `NAV`). Vale para todas as páginas.
- **Faixa "versão modelo" no topo:** `CONFIG.showDraftNote` em `js/site.js`.
- **Cores e estilos:** variáveis no topo de `css/style.css`.
- **Formulário de orçamento:** `js/orcamento.js`. Aceita pré-preenchimento: `orcamento.html?segmento=energy&modelo=PFC%2010-300`.

## Blog: como publicar um artigo
1. Copie  para  (ex.: ) e troque título, resumo, data, categoria e o texto.
2. Coloque a capa em  (JPG, proporção ~1,9:1, ex. 1200×630). O LinkedIn não exibe bem WebP na prévia.
3. Adicione o artigo no topo de . A listagem, o bloco da home e o "Leia também" se atualizam sozinhos.
4. Publique (git push). Para compartilhar, use o botão LinkedIn dentro do artigo.

As tags Open Graph usam o endereço completo do site (). Ao mudar para o domínio definitivo, trocar esse endereço nos arquivos de  e em .

## Marcações do modelo
- <span>`a preencher` / `a definir`</span> (selo amarelo): dado ainda não fornecido (peso, engastamento, laudos, vida útil, linha PU etc.).
- `*` ao lado de um valor: dado do folder que a engenharia precisa validar.

## Idiomas (PT/EN/ES)
O seletor já aparece no cabeçalho; EN e ES estão desativados. Para ativar:
1. Criar as pastas `en/` e `es/` com as páginas traduzidas, `<html lang="en">` e `<body data-root="../">`.
2. Em `js/site.js`, marcar `LANGS_AVAILABLE.en = true` (e `es`). Os textos de menu e rodapé já estão traduzidos no objeto `T`.

## Pendências antes da versão final
- Logo em vetor (o atual foi reconstruído de imagem pequena).
- Confirmar se `assets/fotos/postes-patio.jpg` é produção própria.
- Validação da engenharia: tabelas PFC/PFQ, linha PU, referências dos ensaios.
- Fotos reais da fábrica e da produção.
