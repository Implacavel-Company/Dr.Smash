# Dr. Smash! Landing Page V4

Landing page estática para a Dr. Smash! Pub and Burger, construída com HTML, CSS e JavaScript. A V4 preserva a base da V3 e faz as alterações visuais e funcionais pedidas nas últimas referências, sem substituir o framework (o projeto não depende de framework).

## O que mudou na V4

- **Hero cinematográfica de tela cheia:** a hero não usa mais um card estreito/translúcido com a imagem à direita. O canvas ocupa toda a área visual; cada frame é desenhado sem transparência sobre um fundo escuro preenchido derivado da própria cena, e o frame principal permanece nítido. Os 144 frames continuam sincronizados com a rolagem em uma área de aproximadamente `400vh`.
- **Efeito de profundidade:** a composição usa escala, pequeno pan e inclinação controlados pelo progresso dos frames, mais uma camada de fundo desfocada. É um efeito **2.5D** de profundidade/paralaxe, não um modelo 3D real: a mídia recebida contém frames renderizados, mas não contém malha 3D/GLB nem dados de câmera para reconstruir exatamente a cena em 3D.
- **Título reposicionado:** “SMASH. PUB. BURGER.” e as chamadas principais agora aparecem depois da faixa contínua de palavras, abaixo da sequência da hero.
- **Fogo e som:** o efeito de chamas só é ativado no final da sequência da hero, permanece sobre a página de forma sutil e recebe impulso da rolagem. O MP3 fornecido está integrado com volume de 18% e botão identificado como “SOM DO FOGO”. O som começa após o clique explícito, pois navegadores normalmente bloqueiam áudio automático.
- **Catálogo:** os 10 cards configurados usam 10 arquivos de imagem independentes com hashes diferentes; as imagens repetidas foram substituídas. Algumas fotografias foram geradas por IA para diferenciar visualmente os itens e são apenas ilustrativas, não fotografias oficiais nem confirmação de correspondência exata com o produto servido. Essa ressalva permanece na página.
- **Mapa em blocos horizontais:** cabeçalho e horário da unidade ficam numa faixa superior; mapa e painel de ações ficam lado a lado no desktop e empilhados no celular. Ao clicar em “Usar minha localização”, o mapa centraliza a coordenada do visitante imediatamente. Mesmo que a localização do restaurante não seja confirmada, a posição do visitante continua visível.
- **Alternativa manual condicionada:** a área de endereço manual começa recolhida e é aberta automaticamente se a geolocalização falhar ou se a busca manual não encontrar resultado. Também pode ser aberta pelo link “Digitar endereço manualmente”. Cidade e UF não vêm pré-preenchidas para não presumir que o visitante está em Indaiatuba.
- **Fundo da seção de experiência:** removida a palavra gigante “SMASH” desalinhada do fundo. O CTA final e o rodapé foram preservados sem alterações em relação à V3.
- **Horário:** todos os dias, das 10h30 às 23h, conforme o print enviado, fuso `America/Sao_Paulo`, atualizado a cada 30 segundos.

## Executar localmente no Windows

1. Extraia `Dr-Smash-LP-V4.zip` para uma pasta.
2. Execute `TESTAR-LOCALMENTE.bat` com dois cliques.
3. Abra `http://127.0.0.1:8000` no Chrome ou Edge. Deixe o terminal aberto durante o teste.

`ABRIR-LP.bat` pode servir como prévia simples, mas o mapa e a geolocalização são mais confiáveis em `localhost` ou HTTPS.

## Estrutura

- `index.html`: seções e conteúdo acessível.
- `style.css`: layout responsivo, hero e efeitos visuais.
- `script.js`: sequência de frames, áudio, animação de fogo, catálogo, horário, mapa, geocodificação e rota opcional.
- `EDITE-AQUI.js`: configuração central de texto, links, imagens, produtos, horários e serviços.
- `assets/hero-frames/`: 144 WebP da sequência do hambúrguer.
- `assets/fire-frames/`: 17 WebP da sequência de chamas.
- `assets/products/`: imagens independentes dos produtos.
- `assets/audio/dr-smash-fire-ambience.mp3`: áudio original enviado pelo usuário.
- `assets/video/`: MP4 vertical, MP4 16:9 com quadro preenchido por fundo escurecido/desfocado e loop de chamas.
- `docs/`: auditorias, configuração e relatórios por versão.

## Limitações e pré-publicação

O mapa usa Leaflet e serviços públicos OpenStreetMap/Nominatim; o cálculo de rota depende de endpoint externo e não dá trânsito ao vivo. O tempo de trajeto é uma estimativa rodoviária; preparo e despacho continuam sem tempos confirmados pela loja, então a página não inventa um prazo total de entrega. Serviços públicos não oferecem garantia de disponibilidade e precisam ser reavaliados antes de uma campanha comercial com tráfego elevado.

Confirme diretamente com a loja o endereço, telefone, horário em feriados, preços, disponibilidade de cada item e perfis oficiais das redes sociais. Facebook e TikTok continuam desativados até que os respectivos URLs sejam preenchidos em `EDITE-AQUI.js`.

A tentativa de renderizar a V4 pelo Chromium/Playwright neste ambiente foi bloqueada com `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Por esse motivo, o relatório diferencia os testes estáticos e de mídia (executados) da inspeção visual e dos fluxos de geolocalização (que devem ser validados em um navegador comum). Nenhuma captura PNG de uma página supostamente renderizada foi fabricada.

## Relatório

Consulte `docs/RELATORIO_TESTES_V4.md` e `docs/AUDITORIA_CHECKS_V4.json` para os resultados da validação desta versão. Os arquivos e relatórios V3 permanecem no pacote como histórico.


## V5 — ajustes solicitados (12/10/2026)
- Hero com sequência de frames em canvas sem opacidade artificial, preenchendo a área visual.
- Marca “SMASH. PUB. BURGER.” permanece abaixo da faixa contínua.
- Seção de experiência com fundo limpo, sem marca d'água “SMASH”.
- Mapa e informações em blocos horizontais no desktop e empilhados em telas pequenas.
- Formulário manual abre automaticamente se geolocalização, mapa ou busca do endereço falhar.
- Renderização de produtos elimina IDs repetidos; a configuração atual contém 10 IDs e 10 imagens distintas.
- Chamas discretas só após a sequência da hero; som exige clique explícito do visitante por restrição dos navegadores.

Nota técnica: a hero é uma sequência 2.5D de imagens controlada pelo scroll. Não é geometria 3D editável; reconstruir uma malha 3D fiel exige assets 3D ou modelagem adicional.


## V6 — atualização desta entrega

- Hero: removidos o contador de frames, o texto de instrução “ROLE PARA EXPLORAR” e a linha superior de progresso. A sequência continua controlada pelo scroll, com canvas full-bleed e bordas horizontais suavizadas para integrar o frame vertical ao fundo panorâmico.
- Catálogo: 12 cards e caminhos de imagens exclusivos; novo bloqueio de IDs e caminhos de imagem repetidos. Imagem da lata Coca-Cola substituída para exibir o rótulo e imagens de hambúrguer atualizadas para reduzir repetições visuais.
- Foram acrescentados dois conceitos ilustrativos: Smash Picante Jalapeño e Smash Cogumelo & Queijo. Estão como “Consultar” porque não foram confirmados no menu real.
- Consulte `docs/RELATORIO_TESTES_V6.md` e `docs/RELATORIO_TESTES_V6.json` para as verificações desta versão.
