::: {align="center"}
# DR SMASH

### Website Development Project

**A digital experience developed by IMPLACÁVEL Technology**

[Português](#português) · [English](#english)
:::

------------------------------------------------------------------------

# Português

## 1. Sobre o projeto

O **Dr. Smash!** é uma landing page responsiva para a hamburgueria Dr.
Smash! Pub and Burger, em Indaiatuba/SP. O site apresenta a marca, uma
seleção de produtos, canais oficiais de pedido e informações de
localização. A interface inclui uma sequência visual de hambúrguer
controlada pela rolagem e um arquivo central para editar o conteúdo.

> **Status:** landing page implementada para apresentação e validação.
> Antes de publicar ou divulgar, confirme com o estabelecimento os
> conteúdos comerciais, preços, imagens, endereço, horários e direitos
> de uso dos materiais.

## 2. Objetivos

-   Estabelecer uma presença digital profissional para a marca.
-   Organizar as informações de forma clara e fácil de explorar.
-   Priorizar consistência visual e navegação intuitiva.
-   Oferecer uma experiência responsiva em computadores, tablets e
    smartphones.
-   Manter uma base que possa receber melhorias futuras, conforme o
    escopo acordado.

## 3. Princípios de desenvolvimento

  -----------------------------------------------------------------------
  Princípio                           Aplicação
  ----------------------------------- -----------------------------------
  **UI/UX**                           Hierarquia visual clara e navegação
                                      pensada para facilitar a
                                      compreensão do conteúdo.

  **Responsividade**                  Layout preparado para diferentes
                                      dimensões de tela, conforme a
                                      implementação.

  **Consistência visual**             Uso coerente dos elementos de
                                      interface e da apresentação da
                                      marca.

  **Manutenibilidade**                Organização do código para
                                      facilitar correções e evolução.

  **Evolução planejada**              Possibilidade de adicionar seções e
                                      integrações após definição dos
                                      requisitos.
  -----------------------------------------------------------------------

## 4. Escopo e funcionalidades

O site inclui:

-   Landing page de página única com navegação por seções.
-   Hero cinematográfica com Canvas e 144 frames WebP sincronizados com a
    rolagem.
-   Vitrine com 12 produtos, busca textual e filtros por categoria.
-   Links externos para pedidos, Instagram, WhatsApp e localização.
-   Mapa baseado em OpenStreetMap/Leaflet, carregado sob demanda.
-   Controle opcional de áudio, efeitos visuais de fogo e FAQ.
-   Layout responsivo, navegação móvel, link para pular ao conteúdo e
    estilos de movimento reduzido.

O site não processa pagamentos nem recebe pedidos diretamente: os links
levam a plataformas externas. Produtos, descrições e preços exibidos
são uma vitrine resumida e devem ser conferidos no cardápio oficial.

## 5. Tecnologias

-   **Frontend:** HTML5, CSS3 e JavaScript, sem framework.
-   **Estilização:** CSS próprio, com media queries e variáveis CSS.
-   **Animação:** Canvas 2D e `requestAnimationFrame`.
-   **Fontes:** Google Fonts (Anton e Inter).
-   **Mapa:** Leaflet via CDN e tiles do OpenStreetMap.
-   **Servidor local:** Python `http.server`; não há dependências npm.
-   **Hospedagem / deploy:** não configurados neste pacote.

## 6. Como executar localmente

Não é necessário instalar dependências. A aplicação fica no diretório
`Dr-Smash-LP-V6/`.

No Windows, execute `TESTAR-LOCALMENTE.bat` para iniciar um servidor
local na porta 8000 e abrir o site. `ABRIR-LP.bat` abre o HTML
diretamente; alguns recursos podem funcionar melhor via servidor.

Como alternativa, com Python instalado:

``` bash
cd Dr-Smash-LP-V6
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`. No Windows, `py -m
http.server 8000` também funciona quando o launcher `py` está disponível.

## 7. Configuração e segurança

-   O site não precisa de `.env` nem de credenciais para rodar localmente.
-   Textos, links, produtos, preços e opções de seções ficam em
    `Dr-Smash-LP-V6/EDITE-AQUI.js`.
-   Não coloque senhas, tokens ou chaves privadas nesse arquivo: ele é
    JavaScript público enviado ao navegador.
-   Confirme as informações comerciais e os direitos de uso dos materiais
    antes de publicar.

## 8. Estrutura do repositório

Arquivos e diretórios principais da aplicação:

``` text
Dr-Smash-LP-V6/
├── README.md
└── Dr-Smash-LP-V6/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── EDITE-AQUI.js
    ├── assets/
    │   ├── audio/
    │   ├── fire-frames/       # 17 frames WebP
    │   ├── hero-frames/       # 144 frames WebP
    │   ├── products/
    │   └── video/
    ├── docs/
    ├── backups/
    ├── ABRIR-LP.bat
    └── TESTAR-LOCALMENTE.bat
```

O README está na raiz; a aplicação fica na subpasta `Dr-Smash-LP-V6/`.

## 9. Qualidade e validação

O relatório `Dr-Smash-LP-V6/docs/RELATORIO_TESTES_V6.md` registra 25
verificações aprovadas, incluindo sintaxe JavaScript, configuração,
integridade dos assets, estrutura HTML e smoke test HTTP. O relatório
também ressalta que os testes automatizados não substituem a conferência
visual manual em desktop, tablet e celular. Este projeto não possui
processo de build nem suíte npm.

Antes de publicar, teste links e navegação em navegadores reais, confira
a legibilidade em diferentes telas e valide produtos, preços, dados da
unidade e direitos de uso das imagens.

## 10. Publicação e propriedade intelectual

Este repositório destina-se à organização e ao desenvolvimento do
projeto. A publicação do site, o uso da marca e dos materiais do
estabelecimento, a transferência do código e os direitos de exploração
devem seguir os acordos firmados entre as partes.

A ausência de uma licença de código aberto **não** equivale a uma
autorização para copiar, modificar, distribuir ou reutilizar o projeto.

## 11. Responsável pelo desenvolvimento

**IMPLACÁVEL Technology**\
Digital Solutions · Technology · Design · Growth

Projeto de landing page do Dr. Smash! Pub and Burger.

------------------------------------------------------------------------

# English

## 1. Project overview

**Dr. Smash!** is a responsive landing page for Dr. Smash! Pub and
Burger, a burger restaurant in Indaiatuba, São Paulo, Brazil. The site
introduces the brand, showcases selected menu items, links to official
ordering channels, and provides location information. It includes a
scroll-controlled burger frame sequence and a central JavaScript file
for editable content.

> **Status:** implemented landing page for presentation and validation.
> Before publication, confirm commercial information, prices, images,
> address, opening hours, and usage rights with the business.

## 2. Project objectives

-   Establish a professional digital presence for the brand.
-   Present information clearly and make it easy to navigate.
-   Prioritize visual consistency and intuitive navigation.
-   Provide a responsive experience across desktop, tablet, and mobile
    devices.
-   Maintain a foundation for future improvements within an agreed
    scope.

## 3. Development principles

  -----------------------------------------------------------------------
  Principle                           Application
  ----------------------------------- -----------------------------------
  **UI/UX**                           Clear visual hierarchy and
                                      navigation designed to make content
                                      easier to understand.

  **Responsiveness**                  Layout designed for different
                                      screen sizes, subject to the actual
                                      implementation.

  **Visual consistency**              Consistent interface elements and
                                      brand presentation.

  **Maintainability**                 Code organization that supports
                                      troubleshooting and future
                                      development.

  **Planned evolution**               Potential for additional sections
                                      and integrations after requirements
                                      are defined.
  -----------------------------------------------------------------------

## 4. Scope and features

The website includes:

-   A single-page landing site with section navigation.
-   A cinematic hero using Canvas and 144 WebP frames synchronized to
    page scrolling.
-   A showcase of 12 products with text search and category filters.
-   External links for ordering, Instagram, WhatsApp, and location.
-   An OpenStreetMap/Leaflet map loaded on demand.
-   Optional audio controls, fire visual effects, and an FAQ.
-   Responsive layouts, mobile navigation, a skip link, and reduced
    motion styles.

The site does not process payments or accept orders directly: ordering
links open external platforms. Product details and prices are summaries
and should be checked against the official menu.

## 5. Technology stack

-   **Frontend:** HTML5, CSS3, and JavaScript (no framework).
-   **Styling:** custom CSS with media queries and CSS variables.
-   **Animation:** Canvas 2D and `requestAnimationFrame`.
-   **Fonts:** Google Fonts (Anton and Inter).
-   **Map:** Leaflet via CDN and OpenStreetMap tiles.
-   **Local server:** Python `http.server`; no npm dependencies.
-   **Hosting / deployment:** not configured in this package.

## 6. Run locally

No project dependencies need to be installed. The application directory
is `Dr-Smash-LP-V6/`.

On Windows, run `TESTAR-LOCALMENTE.bat` to start a local server on port
8000 and open the site. `ABRIR-LP.bat` opens the HTML directly; some
features may work better when served locally.

Alternatively, with Python installed:

``` bash
cd Dr-Smash-LP-V6
python -m http.server 8000
```

Then visit `http://localhost:8000`. On Windows, `py -m http.server
8000` also works if the `py` launcher is installed.

## 7. Configuration and security

-   The site does not require a `.env` file or credentials to run
    locally.
-   Text, links, products, prices, and section options are configured in
    `Dr-Smash-LP-V6/EDITE-AQUI.js`.
-   Do not put passwords, tokens, or private API keys in this file: it
    is public JavaScript delivered to the browser.
-   Verify business information and usage rights before publication.

## 8. Repository structure

Main application files and folders:

``` text
Dr-Smash-LP-V6/
├── README.md
└── Dr-Smash-LP-V6/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── EDITE-AQUI.js
    ├── assets/
    │   ├── audio/
    │   ├── fire-frames/       # 17 WebP frames
    │   ├── hero-frames/       # 144 WebP frames
    │   ├── products/
    │   └── video/
    ├── docs/
    ├── backups/
    ├── ABRIR-LP.bat
    └── TESTAR-LOCALMENTE.bat
```

The README is at the repository root; the application is in the
`Dr-Smash-LP-V6/` subdirectory.

## 9. Quality assurance

The report `Dr-Smash-LP-V6/docs/RELATORIO_TESTES_V6.md` records 25
passing checks, including JavaScript syntax, configuration, asset
integrity, HTML structure, and an HTTP smoke test. It also notes that
automated checks do not replace manual visual testing on desktop,
tablet, and mobile. This project has no build process or npm test suite.

Before publication, test links and navigation in real browsers, verify
readability across screen sizes, and confirm menu details, business
information, and image usage rights.

## 10. Release and intellectual property

This repository is intended to organize and develop the project. Website
publication, use of the business's brand and materials, code transfer, and
commercial exploitation rights should follow the agreements between the
parties.

The absence of an open-source license **does not** grant permission to
copy, modify, distribute, or reuse the project.

## 11. Development

**IMPLACÁVEL Technology**\
Digital Solutions · Technology · Design · Growth

Landing page project for Dr. Smash! Pub and Burger.

------------------------------------------------------------------------

::: {align="center"}
**IMPLACÁVEL Technology**\
*Building digital experiences with purpose.*
:::
