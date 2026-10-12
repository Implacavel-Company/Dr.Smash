# Changelog — Dr. Smash! V1 → V2

## V2 — 11/10/2026

### Visual e assets
- Mantida a logo original; criado PNG aprimorado por ampliação/nitidez/contraste conservadores, e WebP otimizado derivado dos mesmos pixels. A logo reinterpretada por IA da V1 foi arquivada para referência e não é usada como marca.
- Elevada a direção visual com surfaces metálicas, reflexos contidos, contorno de fogo, progresso de rolagem e estado visual de interação.
- Adicionadas quatro imagens locais WebP geradas por IA para cards; sua natureza ilustrativa está informada no site e na documentação.
- Adicionado Canvas de brasas com limite de partículas, pause em aba oculta e desativação para `prefers-reduced-motion`.
- Adicionado áudio WAV local sintético, sem reprodução automática e com controle de ligar/desligar e fade de volume.

### Mapa e entrega
- Mapa Leaflet/OpenStreetMap carregado sob demanda e com atribuição visível.
- Geolocalização com consentimento explícito no gesto e estados de erro.
- Formulário manual e geocodificação sem autocomplete.
- Seleção de resultado em caso de ambiguidade.
- Cálculo inline de rota preparado para endpoint OSRM apropriado, mas não habilitado por padrão; o servidor demo não foi tratado como infraestrutura de uma loja comercial.
- Link externo de rotas OpenStreetMap disponível quando coordenadas são resolvidas.
- Status e countdown de horário implementados; desligados até confirmação da empresa.
- Mensagem do pedido mínimo de R$ 20,00, sem fingir impor a regra ao checkout externo.

### Qualidade e documentação
- Backup dos arquivos centrais V1 em `backups/v1-originals/`.
- Criados relatórios de auditoria, arquitetura, mapas, horários, testes e instruções.
- Não introduzido checkout próprio, login, pagamento, cashback, pedidos simulados nem rastreamento falso.


## V3 — 11/10/2026

### Hero e mídia
- Adicionada sequência de 144 frames WebP com canvas controlado pelo scroll em área 400vh, DPR limitado e suporte a `prefers-reduced-motion`.
- Adicionados 17 frames WebP de chamas em canvas fixo, ativados ao concluir a sequência da hero e com interação visual à rolagem.
- Integrado o MP3 de ambiência enviado pelo usuário no botão de som explícito.
- Gerados pacotes de frames upscale 8K e MP4 vertical/16:9 do hambúrguer, além de MP4 de chamas. A versão 16:9 preserva o conteúdo vertical com preenchimento de fundo desfocado; não é outpainting generativo.

### Funcionalidade
- Ativado o horário exibido no print: todos os dias, das 10h30 às 23h, com atualização local do status e contador.
- Priorizado o botão de geolocalização e recolhido o formulário manual como alternativa.
- Configurado roteador OSRM público apenas para protótipo, com aviso de que não dá trânsito ao vivo nem SLA; preparo/margem continuam sem valor para não inventar prazo total.
- Acrescentada busca textual no cardápio e ícones sociais; links Facebook/TikTok ficam desativados até confirmação dos perfis oficiais.

### Auditoria
- Restaurado V3 a partir do ZIP V2 íntegro, preservando V1/V2 e corrigindo o frame WebP 070 que tinha gravação incompleta após interrupção.
- Sintaxe JS/CSS, estrutura HTML, referências locais, imagens, MP3 e decodificação de vídeo passaram nos testes estáticos.
- Teste de renderização Chromium bloqueado pelo ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`); não é declarado teste visual/interativo aprovado.

## V4 — Hero em tela cheia, mapa e produtos

- Reorganizada a hero em canvas full-bleed com fundo opaco preenchido, frame central nítido, movimento de paralaxe/escala leve ligado à rolagem e título abaixo da faixa contínua.
- Mantido o ciclo de 144 frames e respeitado `prefers-reduced-motion`.
- O fogo inicia após a sequência hero, fica sutil na base e reage mais à rolagem; botão e status do áudio do fogo ficam identificados.
- Reorganizado o mapa em painel horizontal; ao solicitar geolocalização, centraliza primeiro a coordenada do visitante. Falhas no navegador/serviço abrem automaticamente o endereço manual.
- Substituídas imagens repetidas por 10 arquivos de produto visualmente distintos.
- Removido o watermark “SMASH” da seção de experiência; CTA final e rodapé preservados.
- Inspeção real de navegador continuou bloqueada pelo ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`), registrada no relatório em vez de declarada como aprovada.
