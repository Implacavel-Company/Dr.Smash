# Relatório de retomada e testes — Dr. Smash! V3

**Data:** 11/10/2026, horário de Brasília.

## Resumo executivo

A retomada foi feita a partir dos arquivos já salvos. O pacote original `Dr-Smash-LP-V2.zip` passou no teste CRC do ZIP, mas a pasta V2 que estava extraída no disco estava incompleta; por isso, a V3 foi restaurada a partir do ZIP sem substituir os arquivos V1/V2. O arquivo final da V3 é independente.

| Item | Resultado verificado |
|---|---|
| ZIP V2 original | Íntegro (`unzip -t` sem erros); preservado |
| Frames originais do hambúrguer | 144 PNG, 1080×1920, sequência 001–144 |
| Frames entregues 8K do hambúrguer | 144 JPEG válidos, 4320×7680; ZIP íntegro |
| Frames originais de fogo | 17 imagens, 1920×1080 |
| Frames entregues 8K do fogo | 17 JPEG válidos, 7680×4320; ZIP íntegro |
| Hero em vídeo vertical | MP4/H.264, 1080×1920, 144 frames, 30 fps, 4,8 s; decodificação integral passou |
| Hero em vídeo 16:9 | MP4/H.264, 1920×1080, 144 frames, 30 fps, 4,8 s; decodificação integral passou |
| Loop de fogo | MP4/H.264, 1920×1080, 17 frames, 6 fps, 2,833 s; decodificação integral passou |
| Sequência web | 144 WebP válidos de 1080×1920 e 17 WebP de chamas válidos de 1920×1080 |
| Áudio do usuário | MP3 íntegro, 64,056 s; SHA-256 idêntico à cópia de origem |
| Auditoria automatizada | 39 verificações PASS, zero FAIL |
| Navegador real | Renderização bloqueada pelo ambiente, pendente de validação manual |

## Alterações incluídas na V3

- Canvas da hero com 144 frames, sequência ligada à rolagem (não ao tempo), área de scroll de aproximadamente 400vh, pré-carregamento progressivo, canvas com suporte a DPR e respeito a `prefers-reduced-motion`.
- Chamas em canvas fixo na parte inferior, ativadas ao fim do percurso da hero e influenciadas pela rolagem. O fundo preto das imagens é composto com `mix-blend-mode: screen`.
- MP3 enviado, tocado apenas após interação explícita do visitante e volume configurado em 18%.
- Horários configurados conforme o print: todos os dias das 10h30 às 23h, fuso `America/Sao_Paulo`. O contador é local e atualiza a cada 30 segundos. O print não confirma feriados/exceções nem se o horário de entrega difere do horário da loja.
- Localização primária por clique/permissão, endereço manual como opção secundária recolhida, mapa Leaflet/OpenStreetMap e cálculo de trajeto por OSRM.
- Busca de texto no cardápio, ícones Instagram/Facebook/TikTok/WhatsApp no rodapé e link “Mais canais”.

## Testes efetuados

1. `unzip -t` no ZIP V2 original e nos dois ZIPs de imagens 8K: **PASSOU**.
2. Decodificação PIL de cada frame 8K e WebP individualmente, verificando dimensões: **PASSOU**.
3. `node --check script.js`: **PASSOU**.
4. `node --check EDITE-AQUI.js`: **PASSOU**.
5. Parse do CSS com `tinycss2`: **PASSOU**, sem erros de parse.
6. Inspeção estrutural do HTML: doctype presente, um único H1, IDs sem duplicatas, canvas da hero/fogo, busca, quatro ícones sociais e formulário manual recolhido: **PASSOU**.
7. Referências `data-config`: 57 referências, nenhuma chave ausente. Referências `data-link`: 11, nenhuma chave ausente. Dez produtos configurados; todas as imagens locais referenciadas existem: **PASSOU**.
8. Smoke test HTTP local: `index.html`, CSS, JavaScript, configuração, frames 001/070/144, frame de fogo 17, MP3 e MP4 responderam HTTP 200: **PASSOU**.
9. `ffprobe` confirmou metadados de cada vídeo; `ffmpeg -v error -i ... -f null -` decodificou os três vídeos até o fim sem erro: **PASSOU**.
10. MP3 verificado por `ffprobe`, duração 64,056 s e SHA-256 comparado com a cópia de origem: **PASSOU**.
11. Navegação pelo Chromium/Playwright para `http://127.0.0.1:8765/index.html`: **BLOQUEADA PELO AMBIENTE** com `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Não foi tentado contornar a restrição.

Os resultados de máquina estão em [`AUDITORIA_CHECKS.json`](AUDITORIA_CHECKS.json).

## Pendências e limitações importantes

- **Não foi possível aprovar visualmente a LP**: o Chromium foi bloqueado pelo ambiente. Nenhuma captura de tela PNG de página inteira foi gerada, para não apresentar um mockup como se fosse a página renderizada. Deve ser validada localmente em Chrome/Edge no computador do usuário, em desktop e celular.
- O vídeo do YouTube foi identificado pelo título e descrição indexada, mas a página/transcrição completa não ficou acessível nesta sessão. Foram usados apenas os aspectos pertinentes encontrados na descrição: busca/categorias e fluxo comercial da landing. Não alego reprodução plano a plano do vídeo.
- O upscale 8K é reamostragem Lanczos com nitidez conservadora. A resolução foi aumentada para 4320×7680 e 7680×4320, mas isso **não equivale a reconstrução generativa de detalhe óptico real**.
- O MP4 16:9 mantém o frame original vertical e completa o quadro horizontal com fundo visual desfocado. Não é outpainting da cena.
- OSRM público e os endpoints públicos OSM/Nominatim não oferecem garantia de disponibilidade para uso comercial. O cálculo atual fornece duração do trajeto rodoviário sem trânsito ao vivo; `preparationMinutes` e `operationalMarginMinutes` permanecem `null`, portanto o prazo total não é apresentado como se fosse tempo real. O endpoint público deve ser substituído por um provedor autorizado/adequado antes de produção. Consulte as políticas: https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy, https://operations.osmfoundation.org/policies/tiles/ e https://operations.osmfoundation.org/policies/nominatim/.
- O endereço da loja é o endereço carregado na configuração e ainda deve ser confirmado diretamente com a unidade. Um geocoder público pode posicioná-lo incorretamente ou retorná-lo sem correspondência exata.
- O destino de WhatsApp foi montado a partir do telefone configurado e precisa ser confirmado com a loja antes de publicação. Facebook e TikTok aparecem, mas ficam desativados até os URLs oficiais serem preenchidos em `EDITE-AQUI.js`.
- Nenhuma compra/pagamento real foi enviado; a LP encaminha o pedido à plataforma externa.

## Abrir a LP localmente

Extraia `Dr-Smash-LP-V3.zip` e execute `TESTAR-LOCALMENTE.bat` no Windows. Ele inicia um servidor em `http://127.0.0.1:8000`; mantenha a janela do terminal aberta enquanto testa. Teste a rolagem da hero, as chamas após o fim da hero, o botão de som, estado/contador de horário, botão de localização com permissão aceita e negada, endereço manual, filtros/busca e links.

A execução não continua em segundo plano se a sessão ou o computador forem desligados. Os arquivos atuais, entretanto, foram salvos e empacotados para retomada.
