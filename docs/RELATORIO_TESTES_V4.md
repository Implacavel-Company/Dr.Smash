# Relatório de testes — Dr. Smash! Landing Page V4

**Data:** 12/10/2026 (horário de Brasília)  
**Fonte:** arquivos V3 preservados; as alterações foram feitas em uma cópia independente V4.

## Resultado

| Verificação | Resultado |
|---|---|
| Testes estáticos e de mídia | **31 aprovados, 0 falhas** |
| Sintaxe JavaScript (`script.js`, `EDITE-AQUI.js`) | Passou com `node --check` |
| Parse HTML e IDs | 328 tags analisadas, 57 IDs, sem IDs duplicados, um único H1 |
| Configuração HTML | 54 chaves `data-config` resolvidas; referências `data-link` configuradas |
| CSS | Parse com `tinycss2`, sem erros de sintaxe detectados |
| Recursos locais e links internos | Caminhos locais/âncoras válidos; `#social-link-pending` é placeholder intencional para redes sem URL oficial e o JS cancela o clique nesses links desativados |
| Hero | 144 WebP válidos; ordem do canvas/faixa/título verificada estaticamente; scroll configurado para 400vh |
| Efeito do fogo | 17 WebP válidos; ativação no final da sequência e resposta à rolagem verificadas no código |
| Áudio enviado | MP3 de 64,056 s; SHA-256 idêntico ao arquivo MP3 fornecido pelo usuário |
| Catálogo | 10 produtos; 10 caminhos e 10 hashes de imagem diferentes |
| Vídeo hero 16:9 | MP4/H.264, 1920×1080, 144 frames, 30 fps, 4,8 s; decodificação integral passou |
| Vídeo hero vertical | MP4/H.264, 1080×1920, 144 frames, 30 fps, 4,8 s; decodificação integral passou |
| Loop das chamas | MP4/H.264, 1920×1080, 17 frames, 6 fps, 2,833 s; decodificação integral passou |
| Smoke test HTTP | 11 recursos centrais responderam HTTP 200, incluindo CSS, JS, config, frames, imagens, MP3 e MP4 |
| Horário | Configuração verificada para todos os dias, 10h30–23h, fuso `America/Sao_Paulo` |
| CTA final e rodapé | Comparação exata do HTML da seção final até o fim do documento confirmou que o conteúdo permanece idêntico à V3 |

Os detalhes de cada teste estão em `AUDITORIA_CHECKS_V4.json`.

## Alterações verificadas no código

1. A sequência do hambúrguer usa um canvas full-bleed opaco, com um frame principal nítido e fundo preenchido derivado da cena. A rolagem continua determinando o frame, com um pequeno efeito de escala, inclinação e paralaxe.
2. O título “SMASH. PUB. BURGER.” foi movido para abaixo da faixa contínua. A hero fica visualmente dedicada ao hambúrguer.
3. O watermark gigante “SMASH” foi removido da seção de experiência. O CTA final e o rodapé foram preservados.
4. O mapa foi reorganizado em blocos horizontais no desktop, com empilhamento responsivo em telas estreitas. A posição do visitante é centralizada imediatamente antes da tentativa de geocodificar a loja. Se a geolocalização falhar, a aba manual abre automaticamente; a aba também pode ser aberta pelo link.
5. As imagens repetidas do catálogo foram substituídas por imagens distintas. Continuam ilustrativas, não fotografias oficiais.
6. O botão de áudio está identificado como “SOM DO FOGO”, com volume configurado em 18%. O navegador precisa de clique explícito para iniciar a reprodução.

## Validações pendentes / limitações

- **Renderização visual real bloqueada:** tentei abrir a versão local em Chromium/Playwright, mas a navegação retornou `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Portanto, não pude conferir visualmente a página completa em desktop/celular nem produzir uma captura PNG verdadeira da LP. O relatório não trata testes estáticos como aprovação visual.
- **Geolocalização e serviços externos:** dependem de permissão do visitante, conexão e disponibilidade do Leaflet, tiles OpenStreetMap, Nominatim e OSRM. O teste de navegador real não pôde ser executado neste ambiente. Teste no Chrome/Edge usando `localhost` ou HTTPS.
- **ETA de entrega:** a interface mostra apenas a estimativa rodoviária retornada pelo serviço externo. Não há trânsito ao vivo nem duração operacional de preparo/despacho confirmada pela loja; o site não inventa o tempo total.
- **3D real:** a mídia recebida é uma sequência de imagens renderizadas, não uma cena 3D com malha e câmera. A V4 implementa efeito 2.5D (paralaxe, escala e inclinação) mantendo a sequência controlada pelo scroll. Não alego que uma malha 3D real foi reconstruída.
- **Perfis sociais:** Facebook e TikTok permanecem desativados até os URLs oficiais serem definidos. Confirme endereço, telefone, horários excepcionais e imagens de produtos antes da publicação comercial.

## Teste no computador

Extraia `Dr-Smash-LP-V4.zip`, execute `TESTAR-LOCALMENTE.bat` e abra `http://127.0.0.1:8000`. Teste a rolagem do frame 001 ao 144, o fogo após o fim da hero, o botão de áudio, localização permitida/negada, busca de endereço manual, filtros do catálogo e links do rodapé.
