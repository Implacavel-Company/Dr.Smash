# Configuração do mapa, geocodificação e rotas

## O que funciona sem chave

- A camada do mapa usa Leaflet e tiles OpenStreetMap depois de clique em “Carregar mapa interativo”.
- Atribuição `© OpenStreetMap contributors` é exibida no mapa.
- O navegador pode fornecer localização após clique e permissão.
- O visitante pode informar CEP, rua, número, bairro, cidade e UF manualmente; a aba manual começa recolhida e abre automaticamente quando a geolocalização falha, ou pode ser expandida pelo link dedicado.
- O endereço digitado é enviado ao geocoder para localizar coordenadas; a página não o salva.
- Quando um endereço possui resultados ambíguos, o visitante precisa selecionar o resultado, em vez de uma escolha silenciosa.
- A página segue oferecendo os canais de pedidos se o mapa falhar.

## Configuração central

Arquivo: `EDITE-AQUI.js`.

- `maps.tileUrl`: URL dos tiles; mantenha o formato `{z}/{x}/{y}` e um provedor adequado.
- `maps.geocodingBaseUrl`: serviço de geocodificação compatível.
- `maps.initialCenter`: centro visual aproximado de Indaiatuba para a vista inicial. Isto não é o pin da unidade.
- `maps.geocodingMinimumIntervalMs`: intervalo local de no mínimo 1200 ms entre solicitações.
- `delivery.routeServiceBaseUrl`: base de um endpoint de roteamento compatível com OSRM. Na V4 aponta para o servidor público de demonstração e deve ser substituída antes de produção comercial.
- `delivery.preparationMinutes` e `delivery.operationalMarginMinutes`: minutos confirmados pela empresa; deixe `null` até serem conhecidos.

## Limites do roteador atualmente configurado

A URL de demonstração `router.project-osrm.org` não é infraestrutura garantida e suas orientações de uso restringem o servidor demo a usos razoáveis/não comerciais. Não é apropriado configurar silenciosamente esse endpoint em uma landing page comercial.

Para preparar o site para produção:
1. Operar uma instância OSRM própria ou selecionar um provedor que permita o uso comercial pretendido.
2. Confirmar CORS, HTTPS, capacidade e termos adequados.
3. Configurar a base em `delivery.routeServiceBaseUrl`, sem a rota `/route/v1/...` no final. O código adiciona esse trecho.
4. Testar `route/v1/driving/{lon1},{lat1};{lon2},{lat2}?overview=full&geometries=geojson`.
5. Confirmar o tempo de preparo e a margem antes de exibir um tempo operacional total.

O roteamento não retorna trânsito em tempo real. A duração exibida é somente uma estimativa do trajeto rodoviário; não inclui preparo, despacho nem disponibilidade de entregador. A área de atendimento ainda deve ser confirmada no canal de pedido.

## Nominatim público

A implementação não tem autocomplete. A busca é acionada pelo visitante e limita localmente as chamadas. As restrições públicas do Nominatim incluem máximo absoluto de 1 solicitação/segundo para uso pesado, identificação adequada, atribuição e proibição de autocomplete client-side com o endpoint público.

**A limitação é agregada por aplicação**, não apenas por navegador. O intervalo de 1,2 s dentro de uma sessão não garante que o tráfego total do domínio esteja abaixo do limite. Para produção com mais tráfego, use um provedor com termos adequados ou opere sua própria infraestrutura/geocoder. Não submeta dados sensíveis ao serviço.

## Tiles OpenStreetMap

A URL usa HTTPS, e a atribuição está visível. Os servidores oficiais têm capacidade limitada e disponibilidade best-effort, sem SLA; não faça pré-busca de regiões. Para operação comercial em maior escala, avalie um provedor de tiles apropriado ou infraestrutura própria. Deixe `maps.tileUrl` configurável.

## Privacidade e fallback

- Só solicita geolocalização após clique; não força permissão.
- A alternativa de endereço manual pode ser aberta a qualquer momento e é expandida automaticamente quando a localização falha.
- Coordenadas e endereço são mantidos apenas na memória da página.
- O fallback de rota leva à página OpenStreetMap Directions quando as coordenadas estão disponíveis.
- Se o endereço exato da loja não puder ser confirmado pela resposta do geocoder, o sistema mantém o ponto do visitante visível/centralizado, não cria um pin de loja não validado e não calcula rota.

## Fontes oficiais consultadas

- Leaflet Quick Start: https://leafletjs.com/examples/quick-start/
- OSM Tile Usage Policy: https://operations.osmfoundation.org/policies/tiles/
- Nominatim Usage Policy: https://operations.osmfoundation.org/policies/nominatim/
- OSRM demo server guidance: https://github.com/Project-OSRM/osrm-backend/wiki/Demo-server
