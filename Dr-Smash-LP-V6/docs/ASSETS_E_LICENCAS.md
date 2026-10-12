# Assets e licenças

- `assets/dr-smash-logo-original.jpg`: arquivo de marca fornecido pelo usuário, preservado.
- `assets/dr-smash-logo-aprimorado.png`: versão 2x processada conservadoramente a partir do JPEG original (ampliação Lanczos, contraste/cor leves, Unsharp Mask moderado; sem redesenho).
- `assets/dr-smash-logo.webp`: versão WebP comprimida da imagem aprimorada original para uso no site.
- A variação reinterpretada por IA que existia no pacote V1 está guardada separadamente em `backups/v1-originals/dr-smash-logo-aprimorado-v1-generated.png` e não é usada como identidade oficial.
- `assets/products/*.webp`: imagens de produtos geradas por IA para este projeto e otimizadas localmente. Não são fotos oficiais e não devem ser anunciadas como representação exata da comida servida. Substitua-as por imagens fornecidas/autorizadas pelo cliente antes de campanhas que dependam de fidelidade de produto.
- `assets/audio/dr-smash-fire-ambience.mp3`: MP3 de ambiência fornecido pelo usuário e incorporado à V4. A reprodução é acionada por clique, respeitando a política de autoplay dos navegadores.
- `assets/audio/fire-crackle-synthetic.wav`: ambiência sintetizada da V2 preservada como alternativa local; não é a fonte de áudio principal da V4.
- Map tiles: OpenStreetMap, sujeitos à atribuição e à política de uso dos tiles. A página mantém o crédito visível.
- Leaflet: biblioteca de código aberto carregada do CDN quando a pessoa pede o mapa. Verifique a versão/licença e a disponibilidade do CDN no ambiente de publicação.

O catálogo e textos comerciais devem ser revisados pelo proprietário antes de divulgação. Fotos reais requerem autorização de uso.

- `assets/hero-frames/frame-001.webp` até `frame-144.webp`: conversão otimizada dos 144 frames originais 1080×1920 para WebP da sequência de scroll.
- `assets/fire-frames/fire-01.webp` até `fire-17.webp`: conversão otimizada dos 17 frames de chamas da fonte 1920×1080.
- Entregas de mídia separadas: os JPEGs 8K são upscales Lanczos com nitidez conservadora (4320×7680 para hambúrguer, 7680×4320 para chamas), não detalhe generativo nativo; os MP4 estão em H.264 e foram decodificados integralmente em teste.
