# Arquitetura técnica — Dr. Smash! V2

## Stack

- HTML5 semântico.
- CSS3 com variáveis de identidade visual e layout responsivo.
- JavaScript puro em IIFE, sem etapa de build.
- `EDITE-AQUI.js` como fonte central das configurações de negócio e aparência.
- Leaflet carregado sob demanda para o mapa interativo.
- Tiles do OpenStreetMap com atribuição.
- Nominatim via solicitação manual iniciada pelo visitante, sem autocomplete.
- Endpoint de roteamento compatível com OSRM opcional, configurável.
- Canvas para partículas com limite de contagem e pausa quando a aba fica oculta.
- Áudio WAV local, sintético e ativado apenas por clique.

## Fluxo de dados

1. `EDITE-AQUI.js` define marca, CTA, produtos, preço de referência, links, tema, pedido mínimo, horários, mapa e configuração opcional de rotas.
2. `script.js` valida caminhos e URLs, aplica dados, monta os cards, manifesto e FAQ.
3. A seção de mapa permanece em modo leve até a pessoa clicar. O código então tenta carregar Leaflet/CSS do CDN e o tile layer.
4. Geolocalização só acontece após clique e permissão do navegador. Endereço manual é validado e enviado ao serviço configurado para geocodificação.
5. Coordenadas ficam em memória durante a sessão; não são escritas em `localStorage`, cookies ou servidor da LP.
6. Se um serviço externo falhar, o visitante ainda pode usar o cardápio e os canais externos.
7. O roteamento rodoviário dentro da página só é calculado se um endpoint compatível com OSRM estiver configurado. Se não estiver, a interface informa que está pendente e oferece a página de rotas OpenStreetMap como alternativa externa.

## Responsabilidades por arquivo

- `index.html`: markup, seções, formulários, controles, semântica e metadados.
- `style.css`: tokens visuais, layout desktop/mobile, cards, estado do mapa, formulários, áudio, partículas e motion.
- `script.js`: comportamento, render, navegação, mapa/geocodificação, estimativas e áudio.
- `EDITE-AQUI.js`: configurações que devem ser alteradas sem procurar no código.
- `assets/products/`: imagens ilustrativas geradas, substituíveis por fotos autorizadas.
- `assets/audio/fire-crackle-synthetic.wav`: ambiência sintética local.
- `backups/v1-originals/`: cópias dos arquivos centrais da V1 antes da evolução.

## Segurança e privacidade

- Atribuição de tiles do OpenStreetMap é visível.
- Não há chave privada de mapa embutida.
- Geolocalização requer clique e permissão explícita.
- Endereço manual é enviado ao geocoder, e isso é informado antes do formulário.
- Não há persistência do endereço ou das coordenadas.
- Os links externos abrem com `target="_blank"` e `rel="noopener noreferrer"`.
- Saída de texto da configuração é aplicada com `textContent`, evitando interpretar texto do negócio como HTML arbitrário.
- Endpoint de roteamento deve usar HTTPS; a interface não declara que rota ou prazo funcionam sem ele.
