# Auditoria de retomada — Dr. Smash! V3

## Estado recuperado
- O arquivo `Dr-Smash-LP-V2.zip` passou em `unzip -t` e contém 35 arquivos. A pasta V2 presente no disco estava incompleta; o V3 foi restaurado a partir do ZIP íntegro, sem modificar os arquivos originais V1/V2.
- 144 frames de hambúrguer foram encontrados com números contínuos 001–144. Os JPEGs 8K existentes medem 4320×7680 e passaram em decodificação/verificação.
- 17 frames de fogo foram encontrados a 1920×1080. O MP3 enviado tem 64,056 s; uma cópia do arquivo duplicado foi integrada.

## Implementações V3
- Canvas de 144 frames controlado pelo scroll e pré-carregamento em lotes; área de scroll 400vh; cap de DPR e fallback `prefers-reduced-motion`.
- Chamas em canvas fixo com `mix-blend-mode: screen`, ativadas no fim da sequência da hero e movidas também pela rolagem.
- MP3 do usuário no controle de áudio explícito. Autoplay não é forçado porque navegadores geralmente exigem gesto do visitante.
- Horários configurados de domingo a sábado, 10h30–23h, com atualização periódica.
- Localização como ação primária; formulário manual recolhido. Rota depende da resposta de serviços externos.
- Rodapé com ícones Instagram, Facebook, TikTok e WhatsApp; Facebook/TikTok aguardam URL oficial.

## Limitações que permanecem
- Referência externa: o vídeo tem o título “Como eu faço o site ANTES de oferecer pro cliente (e por que isso fecha mais vendas)”. A descrição indexada resume 4 fases (prospecção/CRM, documento de produto e design system, MVP e refinamento/apresentação de venda) e descreve uma landing de hamburgueria com filtros, busca, sacola e seleção de região de entrega. Usei como aspectos pertinentes a descoberta do cardápio por categoria e busca, além da organização da experiência comercial. Fonte: https://youtu.be/1-K5OXrNhYE. A página/transcrição completa não foi disponibilizada pela ferramenta nesta sessão, então não afirmo ter revisado cada segundo nem ter reproduzido planos visuais específicos do vídeo.
- O local exato da unidade e a cobertura de delivery ainda precisam de confirmação. O geocoder pode recusar um endereço sem correspondência exata.
- OSRM público é best-effort, não dá trânsito real e não deve ser assumido como serviço de produção. O prazo total não aparece sem tempos de preparo/despacho confirmados.
- O pacote requer teste manual em navegador real com internet para validar serviços externos, permissões, dispositivos e links sociais.


## Fechamento da retomada
- A execução foi retomada a partir dos assets salvos e o WebP 070 corrompido pela interrupção foi regenerado; os 144 WebP foram decodificados e validados um a um.
- O MP3 enviado foi copiado para V3 e o hash SHA-256 bate com o original.
- Os 3 MP4 foram verificados por `ffprobe` e decodificados integralmente com FFmpeg.
- O ZIP V3 foi construído separadamente dos ZIPs 8K e submetido a teste de integridade depois do empacotamento.
- Auditoria automatizada: 39 verificações passaram; 0 falharam. O teste de navegação/renderização Chromium permanece bloqueado com `ERR_BLOCKED_BY_ADMINISTRATOR`; portanto, não foi criada captura de LP para não apresentar imagem falsa como screenshot.
- Relatório detalhado: `docs/RELATORIO_TESTES_V3.md`.
