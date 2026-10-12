/*
===============================================================================
EDITE-AQUI.JS — CONFIGURAÇÕES DA LANDING PAGE DR. SMASH!
===============================================================================
Este é o arquivo principal para alterações simples.

Você pode alterar:
- textos, títulos e chamadas para ação;
- imagens e cores;
- links de pedido, Instagram, mapa e telefone;
- produtos apresentados na LP e seus preços;
- seções que devem aparecer.

Regras:
1. Mantenha as aspas e as vírgulas da estrutura JavaScript.
2. Para ocultar uma seção, altere true para false.
3. Os produtos e preços são vitrines resumidas. O cardápio Brendi é a fonte do
   pedido e deve ser consultado para confirmar valores/opções no momento da compra.
4. Não informe promoções, horários ou endereços diferentes sem validação do cliente.
5. Imagens de produtos: coloque o arquivo em /assets e informe seu caminho no
   campo "image". Se ficar vazio, a LP exibe uma ilustração vetorial decorativa.
6. Este arquivo não recebe cartões, pagamentos ou pedidos. Os botões direcionam
   para plataformas de pedidos externas, que processam o pedido.
===============================================================================
*/
window.DR_SMASH_CONFIG = {
  brand: {
    name: "DR. SMASH!",
    descriptor: "PUB AND BURGER",
    locality: "INDAIATUBA • SP",
    logo: "assets/dr-smash-logo.webp",
    phoneLabel: "(19) 98227-4475",
    phoneLink: "tel:+5519982274475",
    address: "Rua Alberto Santos Dumont, 1660 — Cidade Nova I, Indaiatuba/SP",
    mapUrl: "https://www.openstreetmap.org/search?query=Rua%20Alberto%20Santos%20Dumont%201660%20Indaiatuba%20SP"
  },

  navigation: {
    cardapio: "Cardápio",
    experiencia: "A experiência",
    comoPedir: "Como pedir",
    localizacao: "Localização",
    cta: "FAZER PEDIDO"
  },

  urls: {
    instagram: "https://www.instagram.com/dr.smashindaiatuba/",
    brendi: "https://menu.brendi.com.br/drsmashindaiatuba",
    instaDelivery: "https://instadelivery.com.br/drsmash1",
    taplink: "https://drsmash.taplink.ws/",
    whatsapp: "https://wa.me/5519982274475",
    // Preencha apenas depois de confirmar os perfis oficiais da unidade.
    facebook: "",
    tiktok: ""
  },

  theme: {
    background: "#080909",
    surface: "#141515",
    surfaceRaised: "#1D1F1F",
    text: "#F7F2EC",
    muted: "#B8B3AF",
    primary: "#F4512A",
    primaryBright: "#FF7041",
    secondary: "#FFB15A",
    border: "#373737",
    metal: "#808681",
    metalHighlight: "#D7D9D4",
    focus: "#FFD4A8"
  },

  sections: {
    hero: true,
    products: true,
    manifesto: true,
    orderChannels: true,
    location: true,
    faq: true,
    finalCta: true
  },

  hero: {
    eyebrow: "PUB AND BURGER • INDAIATUBA",
    kicker: "O CARDÁPIO DA CASA",
    titleLine1: "SMASH.",
    titleLine2: "PUB.",
    titleLine3: "BURGER.",
    description: "Do smash clássico às boxes para dividir. Escolha seus favoritos e finalize o pedido no cardápio oficial.",
    primaryLabel: "VER CARDÁPIO E PEDIR",
    secondaryLabel: "EXPLORAR DESTAQUES",
    stamp: "SABOR SEM DISFARCE",
    frameCaption: "ORIGINAL ATTITUDE / 01",
    frameFooter: "EST. DR.SMASH",
    localityFootnote: "Indaiatuba, SP",
    brandFootnote: "SMASH • PUB • BURGER"
  },

  products: [
    {
      id: "box-rock",
      name: "Box — 2 x Smash Rock 2.0",
      category: "boxes",
      priceQualifier: "A partir de",
      price: "R$ 99,90",
      description: "Dois Smash Rock, batata cheddar bacon, 10 nuggets e Coca-Cola 2 L ou Zero. Serve 2 pessoas, conforme o cardápio.",
      badge: "PARA DIVIDIR",
      art: "box",
      image: "assets/products/box-rock.webp"
    },
    {
      id: "smash-rock",
      name: "Ultra Smash Rock 2.0",
      category: "smash",
      priceQualifier: "A partir de",
      price: "R$ 35,90",
      description: "Duas carnes smash de 80 g, cheddar, bacon crocante, onion rings e barbecue no brioche.",
      badge: "ROCK 2.0",
      art: "burger",
      image: "assets/products/ultra-smash-rock.webp"
    },
    {
      id: "pcq",
      name: "Smash PCQ 1.0",
      category: "smash",
      priceQualifier: "A partir de",
      price: "R$ 18,90",
      description: "Pão, carne smash e cheddar, com maionese artesanal da casa.",
      badge: "O CLÁSSICO",
      art: "single",
      image: "assets/products/smash-pcq.webp"
    },
    {
      id: "cheddar-melt",
      name: "Ultra Smash Cheddar Melt 2.0",
      category: "smash",
      priceQualifier: "A partir de",
      price: "R$ 35,90",
      description: "Duas carnes smash, cheddar cremoso e cebola caramelizada no pão brioche.",
      badge: "CHEDDAR",
      art: "cheddar",
      image: "assets/products/cheddar-melt.webp"
    },
    {
      id: "combo-rock",
      name: "Combo Smash Rock 2.0",
      category: "combos",
      priceQualifier: "A partir de",
      price: "R$ 47,90",
      description: "Smash Rock 2.0, batata e Coca-Cola lata, conforme as opções do cardápio.",
      badge: "COMBO",
      art: "combo",
      image: "assets/products/combo-rock.webp"
    },
    {
      id: "churrasco",
      name: "Smash Churrasco 2.0",
      category: "smash",
      priceQualifier: "A partir de",
      price: "R$ 41,90",
      description: "Duas carnes smash, cheddar, bacon, cebola empanada e maionese grill defumada.",
      badge: "DEFUMADO",
      art: "burger",
      image: "assets/products/smash-churrasco.webp"
    },
    {
      id: "fritas",
      name: "Porção de Fritas Crocantes",
      category: "porcoes",
      priceQualifier: "A partir de",
      price: "R$ 25,90",
      description: "Batata frita crocante e dourada, acompanhada de maionese artesanal da casa.",
      badge: "PORÇÃO",
      art: "fries",
      image: "assets/products/fritas-cheddar-bacon.webp"
    },
    {
      id: "milkshake",
      name: "Milk Shake Nutella + Ovomaltine",
      category: "sobremesas",
      price: "R$ 27,90",
      description: "Milk shake de 440 ml com Nutella e pedaços de Ovomaltine.",
      badge: "SOBREMESA",
      art: "shake",
      image: "assets/products/milkshake.webp"
    },
    {
      id: "dr-crispy",
      name: "Dr. Crispy",
      category: "artesanais",
      priceQualifier: "A partir de",
      price: "R$ 39,90",
      description: "Burger artesanal de 160 g. Consulte ingredientes, opções e disponibilidade no cardápio Brendi.",
      badge: "ARTESANAL 160 G",
      art: "burger",
      image: "assets/products/dr-crispy.webp"
    },
    {
      id: "coca-350",
      name: "Coca-Cola Original 350 ml",
      category: "bebidas",
      price: "R$ 8,90",
      description: "Lata gelada. Confirme a opção e disponibilidade no cardápio Brendi.",
      badge: "BEBIDA",
      art: "combo",
      image: "assets/products/coca-350.webp"
    },
    {
      id: "smash-picante",
      name: "Smash Picante Jalapeño",
      category: "smash",
      priceQualifier: "PREÇO NO CARDÁPIO",
      price: "Consultar",
      description: "Sugestão ilustrativa com jalapeños tostados, queijo derretido e molho picante. Confirme ingredientes e disponibilidade na plataforma oficial.",
      badge: "PICANTE",
      art: "burger",
      image: "assets/products/smash-picante.webp"
    },
    {
      id: "smash-cogumelo",
      name: "Smash Cogumelo & Queijo",
      category: "smash",
      priceQualifier: "PREÇO NO CARDÁPIO",
      price: "Consultar",
      description: "Sugestão ilustrativa com cogumelos salteados, queijo derretido e molho cremoso. Confirme ingredientes e disponibilidade na plataforma oficial.",
      badge: "COGUMELOS",
      art: "burger",
      image: "assets/products/smash-cogumelo.webp"
    }
  ],

  productFilters: [
    { id: "all", label: "TODOS" },
    { id: "smash", label: "SMASH" },
    { id: "combos", label: "COMBOS" },
    { id: "boxes", label: "BOXES" },
    { id: "porcoes", label: "PORÇÕES" },
    { id: "sobremesas", label: "SOBREMESAS" },
    { id: "artesanais", label: "ARTESANAIS" },
    { id: "bebidas", label: "BEBIDAS" }
  ],

  menuSection: {
    eyebrow: "ESCOLHA SUA PRÓXIMA MORDIDA",
    titleIntro: "DESTAQUES DO",
    titleAccent: "CARDÁPIO.",
    description: "Destaques do cardápio Brendi. Confira valores, opções e disponibilidade atualizados na plataforma oficial antes de pedir.",
    fullMenuLabel: "CARDÁPIO COMPLETO",
    bottomEyebrow: "A COZINHA TE ESPERA",
    bottomTitle: "ACHOU SEU FAVORITO?",
    bottomButton: "ABRIR CARDÁPIO",
    disclaimer: "Preços de referência consultados em 11/10/2026; podem mudar. As imagens são ilustrativas, geradas para esta apresentação e não são fotografias oficiais dos produtos. Confirme preço, opções e disponibilidade na plataforma antes de finalizar."
  },

  manifesto: {
    eyebrow: "A EXPERIÊNCIA",
    title: "FOGO NA CHAPA. PERSONALIDADE EM CADA DETALHE.",
    body: "A Dr. Smash reúne a energia de pub com uma carta de smash burgers, combos, boxes, porções, sobremesas e bebidas. A LP destaca alguns itens; as opções completas e personalizações ficam no cardápio de pedidos.",
    points: [
      { number: "01", title: "SMASH BURGERS", text: "Clássicos, versões duplas e combinações marcantes." },
      { number: "02", title: "COMBOS & BOXES", text: "Opções individuais e caixas para compartilhar." },
      { number: "03", title: "DO SALGADO AO DOCE", text: "Porções, milk shakes e bebidas no mesmo cardápio." }
    ]
  },

  orderChannels: {
    eyebrow: "SEU PEDIDO, SEU CAMINHO",
    title: "ESCOLHA ONDE PEDIR.",
    description: "Acesse uma das plataformas de pedidos. Produtos, opções, disponibilidade, entrega e valores finais são confirmados na plataforma escolhida.",
    primaryLabel: "PEDIR PELO BRENDI",
    secondaryLabel: "ABRIR INSTADELIVERY",
    tertiaryLabel: "OUTROS LINKS E CANAIS",
    showTaplink: true,
    showInstagram: true
  },

  location: {
    eyebrow: "ENCONTRE A DR. SMASH",
    titleLead: "INDAIATUBA,",
    titleAccent: "SP.",
    description: "Toque em usar minha localização para centralizar o mapa. Se não for possível localizar você, o endereço manual abrirá automaticamente.",
    addressLabel: "ENDEREÇO PUBLICADO",
    phoneLabelHeading: "TELEFONE",
    mapButton: "ABRIR NO MAPS",
    orderLinkLabel: "CONSULTAR PEDIDOS",
    showAddress: true,
    showPhone: true
  },

  // ============================================================
  // CONFIGURAÇÃO DO PEDIDO MÍNIMO
  // ============================================================
  delivery: {
    minimumOrderBRL: 20,
    minimumOrderMessage: "Pedido mínimo informado: {{valor}}. Confira as condições no canal de pedidos.",
    preparationMinutes: null,
    operationalMarginMinutes: null,
    // Endpoint público para protótipo/teste; não tem SLA nem trânsito ao vivo.
    // Em produção, substitua por um serviço de rotas adequado ao uso comercial.
    routeServiceBaseUrl: "https://router.project-osrm.org"
  },

  // ============================================================
  // CONFIGURAÇÃO DOS HORÁRIOS DA LOJA
  // Preencha somente após confirmação direta da empresa.
  // weekly: domingo (0) a sábado (6); horários "HH:MM" ou null para fechado.
  // ============================================================
  hours: {
    confirmed: true,
    timeZone: "America/Sao_Paulo",
    // Horários informados no print da loja: todos os dias, 10h30 às 23h.
    weekly: [
      { open: "10:30", close: "23:00" },
      { open: "10:30", close: "23:00" },
      { open: "10:30", close: "23:00" },
      { open: "10:30", close: "23:00" },
      { open: "10:30", close: "23:00" },
      { open: "10:30", close: "23:00" },
      { open: "10:30", close: "23:00" }
    ],
    exceptions: {}
  },

  // ============================================================
  // CONFIGURAÇÃO DE MAPA E GEOCODIFICAÇÃO ABERTA
  // Tile OSM é exibido com atribuição. Endpoints públicos não têm SLA.
  // O geocoding só é solicitado depois de ação do visitante; sem autocomplete.
  // ============================================================
  maps: {
    tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    geocodingBaseUrl: "https://nominatim.openstreetmap.org/search",
    initialCenter: [-23.0816, -47.2101],
    initialZoom: 12,
    geocodingMinimumIntervalMs: 1200
  },

  // ============================================================
  // SISTEMA DE ÁUDIO AMBIENTE
  // MP3 de ambiência fornecido pelo usuário; playback habilitado por clique explícito.
  // ============================================================
  audio: {
    enabled: true,
    source: "assets/audio/dr-smash-fire-ambience.mp3",
    volume: 0.18,
    labelOn: "SOM DO FOGO: LIGADO",
    labelOff: "SOM DO FOGO: DESLIGADO"
  },

  // ============================================================
  // SISTEMA DE PARTÍCULAS
  // ============================================================
  particles: {
    enabled: true,
    desktopCount: 42,
    mobileCount: 15
  },

  faqSection: {
    eyebrow: "DÚVIDAS RÁPIDAS",
    titleLine1: "SEM MISTÉRIO.",
    titleLine2: "SÓ SMASH."
  },

  finalCta: {
    eyebrow: "VAI DE DR. SMASH?",
    title: "PARTIU PEDIR.",
    button: "VER CARDÁPIO"
  },

  faq: [
    {
      question: "Onde vejo o cardápio completo?",
      answer: "Abra o cardápio Brendi pelos botões desta página. A plataforma reúne categorias, descrições, preços e opções disponíveis no momento do pedido."
    },
    {
      question: "A LP recebe meu pedido ou pagamento?",
      answer: "Não. Esta página apresenta a marca e alguns destaques. O pedido é concluído na plataforma de delivery escolhida; a LP não coleta pagamentos."
    },
    {
      question: "Os preços mostrados aqui são finais?",
      answer: "Os valores são os que estavam publicados no cardápio consultado durante a montagem da V1. Confirme sempre o preço, as opções e a disponibilidade na plataforma antes de concluir o pedido."
    },
    {
      question: "Como confirmo entrega ou retirada?",
      answer: "Selecione a unidade e consulte as condições diretamente na plataforma de pedidos. Taxas, prazos e disponibilidade podem variar."
    }
  ],

  footer: {
    brandLine: "SMASH • PUB • BURGER",
    locality: "INDAIATUBA, SP",
    instagramLabel: "Instagram",
    brendiLabel: "Cardápio",
    instaDeliveryLabel: "InstaDelivery",
    taplinkLabel: "Mais canais",
    copyright: "Dr. Smash! Pub and Burger",
    backToTop: "VOLTAR AO TOPO ↑",
    note: "Valores, produtos e disponibilidade podem mudar. Confirme as informações no canal de pedidos antes de finalizar."
  }
};
