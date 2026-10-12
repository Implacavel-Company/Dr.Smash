# Relatório de testes — Dr. Smash! V2

Data: 11/10/2026.

## 1. Testes que foram executados

| Verificação | Estado | Resultado |
|---|---|---|
| `node --check script.js` | PASSOU | Nenhum erro de sintaxe. |
| `node --check EDITE-AQUI.js` | PASSOU | Nenhum erro de sintaxe. |
| Carregamento do objeto de configuração em Node.js | PASSOU | `window.DR_SMASH_CONFIG` foi criado e serializado. |
| Parse estático do HTML | PASSOU | Um H1, IDs sem duplicação. |
| Referências `data-config` | PASSOU | 63 referências; nenhuma chave ausente em `EDITE-AQUI.js`. |
| Âncoras internas | PASSOU | Nenhuma âncora quebrada encontrada; exatamente um H1 e nenhum ID duplicado. |
| Recursos locais apontados pelo HTML/config | PASSOU | Nenhum caminho local ausente na inspeção estática, inclusive os 10 cards configurados. |
| Parse CSS (`tinycss2`) | PASSOU | Nenhum erro de parse reportado em 315 regras/nós de topo. |
| Arquivos servidos por HTTP local | PASSOU | `index.html`, CSS, JS, configuração, logo, imagens de produto, WAV e documentação responderam HTTP 200 em servidor Python local. |
| Áudio | PASSOU — arquivo local | WAV estéreo, 22.050 Hz, 14 segundos; botão requer clique. Não foi possível validar auditivamente no navegador neste ambiente. |
| Catálogo | PASSOU — configuração | 10 cards configurados em 7 categorias; imagens locais existem. |
| Horários | PASSOU — fallback seguro | `confirmed: false`; a página não inventa aberto/fechado. |
| Roteamento | DEPENDENTE DE CONFIGURAÇÃO EXTERNA | `routeServiceBaseUrl` está vazio deliberadamente; a distância rodoviária in-page não é declarada ativa. |
| Geocodificação | DEPENDENTE DE SERVIÇO EXTERNO | Configurada para Nominatim após ação do visitante, sem autocomplete; não foi possível executar o fluxo no navegador. |

## 2. Teste de navegador bloqueado pelo ambiente

Foi tentado executar Chromium com Playwright contra `http://127.0.0.1:8765/`. A navegação foi bloqueada pelo ambiente com `net::ERR_BLOCKED_BY_ADMINISTRATOR`. O binário do Chromium também não existe na localização gerenciada pelo Playwright; o Chromium de sistema não pôde navegar para o servidor local devido ao bloqueio.

**Não declaro aprovação de teste visual, responsividade real, clique no mapa, áudio audível ou geolocalização em navegador nesta sessão.** A validação estática e a resposta HTTP local não substituem o teste interativo no navegador. Não foi tentado contornar a política administrativa.

## 3. Casos não executados / dependentes

| Caso | Estado | Razão |
|---|---|---|
| Renderização visual desktop/mobile | BLOQUEADO PELO AMBIENTE | Chromium/Playwright não abriu o servidor local. |
| Interações de filtros e FAQ no navegador | BLOQUEADO PELO AMBIENTE | Exigem navegador executável neste ambiente. |
| Ativação real de áudio em navegador | NÃO EXECUTADO | A estrutura e o arquivo foram verificados, mas o browser foi bloqueado. |
| Permissão de geolocalização concedida/negada | NÃO EXECUTADO | Exige interação do navegador e permissões de sistema. |
| Tiles Leaflet/OSM carregados ao vivo | DEPENDENTE DE SERVIÇO EXTERNO | Bibliotecas e tiles são requisitados sob demanda; o teste interativo foi bloqueado. |
| Nominatim para endereço válido/ambíguo | DEPENDENTE DE SERVIÇO EXTERNO | Requer rede e teste de navegador. |
| Distância/rota calculada na LP | DEPENDENTE DE CONFIGURAÇÃO EXTERNA | Não foi configurado endpoint de roteamento para uso comercial. |
| Tempo total de entrega | DEPENDENTE DE DADOS COMERCIAIS | Tempo de preparo e margem não foram confirmados. |
| Aberto/fechado e countdown | DEPENDENTE DE DADOS COMERCIAIS | Horários oficiais não foram confirmados; é exibido fallback seguro. |
| Canais Brendi/InstaDelivery/Taplink | NÃO EXECUTADO INTERNAMENTE | São links externos; nenhum pedido foi enviado. |

## 4. Instruções de validação local

Em Windows:
1. Extraia o ZIP.
2. Execute `TESTAR-LOCALMENTE.bat`.
3. Abra `http://127.0.0.1:8000`.
4. Teste menu, filtros, FAQ, botão de áudio, carregar mapa, geolocalização com permissão concedida/negada, endereço manual e links de pedido.
5. Teste celular e desktop.
6. Verifique a aba Console/Network do navegador.
7. Antes de usar em produção, configure um provedor de rota adequado, confirme o endereço exato, horários e contato da unidade.

## 5. Limitações conhecidas

- Fotografias oficiais dos produtos não estavam disponíveis no pacote; imagens locais são ilustrativas e identificadas como tal.
- Endpoint de rotas está em branco; o serviço de demonstração OSRM não é assumido como infraestrutura comercial.
- O endereço do registro municipal de 2026 diverge de alguns diretórios que continuam exibindo registro anterior; confirmar direto com a empresa.
- Horários não confirmados; o status da loja não inventa disponibilidade.
- A LP comunica o pedido mínimo de R$ 20,00, mas a imposição real deve ser configurada nas plataformas que recebem o pedido.
- Nominatim e tiles públicos são best-effort, sujeitos a políticas e limites; não são garantidos para tráfego alto.
- A V2 continua sendo uma landing page, não um sistema de delivery: não existe checkout, pagamento, estoque, pedido ou rastreamento próprios.
