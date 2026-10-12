# Dr. Smash! V2 — auditoria das fontes e decisões de negócio

Data da consolidação: 11/10/2026.

## 1. Base de implementação

O ZIP `Dr-Smash-LP-V1(2).zip` foi tratado como base oficial. Foram inspecionados os arquivos `index.html`, `style.css`, `script.js`, `EDITE-AQUI.js`, os três relatórios existentes e os recursos de logo. Os arquivos centrais originais foram copiados para `backups/v1-originals/` antes das alterações.

A V1 já tinha uma página estática responsiva, menu mobile, cards e filtros de produtos, manifesto, canais de pedido externos, localização, FAQ, configurações centralizadas e documentação. Esses elementos foram preservados e ampliados.

O HTML antigo de protótipo de delivery é citado no relatório anterior da V1: ele tinha sacola, checkout, cupom, taxa, endereço, prazo, cashback e status em memória, explicitamente marcados como exemplo. A V2 não recupera esse checkout fictício e não sugere que pedidos/pagamentos sejam enviados pela LP.

## 2. Identidade visual

A logo original `assets/dr-smash-logo-original.jpg` foi preservada. `assets/dr-smash-logo-aprimorado.png` foi criada por processamento conservador da imagem original (ampliação 2x, contraste/cor e nitidez leves, sem redesenho por IA); `assets/dr-smash-logo.webp` é a variante WebP otimizada derivada dessa mesma imagem original. A variante reinterpretada por IA que constava na V1 foi preservada separadamente em `backups/v1-originals/dr-smash-logo-aprimorado-v1-generated.png` e não é usada como marca na V2.

Direção visual:
- Preto profundo e carvão como superfícies dominantes.
- Grafite e metal escurecido para superfícies secundárias.
- Laranja/vermelho-fogo alinhados à logo como cor de ação.
- Creme/branco quente para texto de leitura.
- Textura pontilhada, iluminação de brasas, bordas metálicas e efeitos moderados.
- Canvas de partículas com densidade controlada e respeito a `prefers-reduced-motion`.

## 3. Imagens dos produtos

O V1 usava ilustrações vetoriais decorativas. Foram adicionadas quatro artes de alimentos geradas por IA e convertidas para WebP local otimizado, usadas nos cards como imagens ilustrativas. Elas não vieram do restaurante e não são fotos oficiais nem representações garantidas dos produtos reais. Essa limitação foi incluída no texto visível da seção e nos atributos `alt`.

Quando a empresa fornecer fotos autorizadas, elas devem substituir as artes em `assets/products/`, e a nota de ilustração deve ser atualizada.

## 4. Produtos e plataformas de pedido

Fontes:
- Brendi Indaiatuba: https://menu.brendi.com.br/drsmashindaiatuba
- InstaDelivery: https://instadelivery.com.br/drsmash1
- Taplink: https://drsmash.taplink.ws/
- Instagram: https://www.instagram.com/dr.smashindaiatuba/

A auditoria V1 conseguiu ler dados textuais de parte do catálogo Brendi, incluindo nomes, descrições e preços de referência de burgers, combos, boxes, porções e milk shakes. Esses valores permanecem sujeitos à alteração pelo estabelecimento e pela plataforma. A LP remete ao Brendi para verificar disponibilidade, personalização e preço atual.

Instagram e Taplink não foram integralmente navegáveis pela ferramenta de consulta automatizada; não alegamos ter testado todos os seus links, abas, janelas ou fluxos. A página InstaDelivery também não entregou todos os seus estados internos de forma verificável. Por isso os links permanecem como canais de saída, sem promessa sobre seu checkout.

## 5. Endereço e contato

O Diário/Imprensa Oficial do Município de Indaiatuba, edição de 11/05/2026, registra uma alteração de endereço aprovada para DR. SMASH BURGER LTDA, com endereço Rua Alberto Santos Dumont, 1660 — Cidade Nova I. Fonte: https://indaiatuba.sp.gov.br/download/72473/

Outros diretórios públicos ainda exibem Rua Pedro de Toledo, 1302 e telefone diferente: https://www.indaiatuba.sp.gov.br/desenvolvimento-economico-industria-comercio-e-turismo/turismo/gastronomia/fast-food-hamburgueria/

A V1 incluiu (19) 98227-4475, associado a uma listagem municipal de serviços, mas os diretórios são divergentes. A V2 conserva o dado mais recente que já vinha configurado; **endereço e telefone devem ser confirmados diretamente com a empresa antes do lançamento público**. Não configuramos duas unidades, porque a existência de dois endereços não pôde ser confirmada.

## 6. Horários, pedido mínimo e entrega

- O pedido mínimo de R$ 20,00 foi pedido explicitamente na especificação da V2 e também apareceu no registro anterior do catálogo. Ele é comunicado como valor informado, mas a LP não consegue impor esta regra no carrinho externo.
- Nenhum horário semanal foi confirmado diretamente com a empresa. A página mostra “HORÁRIOS A CONFIRMAR”, não inventa status “aberta”/“fechada” e não mostra uma contagem regressiva fictícia. O mecanismo de horário fica pronto para ser habilitado após preenchimento verificado.
- Não foi inventada área de cobertura, taxa, prazo de preparação nem prazo garantido de entrega.
- Distância rodoviária e duração dentro da LP dependem de endpoint roteador configurado. A distância em linha reta não é chamada de distância por estrada.

## 7. Serviços de mapas e restrições

A V2 usa Leaflet para visualização e tiles OpenStreetMap com atribuição visível. Os recursos de mapa só são carregados quando a pessoa solicita o mapa.

A geocodificação Nominatim é acionada por ação explícita, sem autocomplete, com limitação local de pelo menos 1,2 s entre chamadas. Isso não garante que o tráfego agregado do domínio permaneça dentro dos limites públicos; para produção comercial com maior volume é necessário avaliar um provedor apropriado ou operar a própria infraestrutura.

Políticas oficiais consultadas:
- OpenStreetMap tiles: https://operations.osmfoundation.org/policies/tiles/
- Nominatim: https://operations.osmfoundation.org/policies/nominatim/
- OSRM demo server: https://github.com/Project-OSRM/osrm-backend/wiki/Demo-server

A infraestrutura pública de tiles é best-effort e pode ser bloqueada, não é um SLA. A política Nominatim veda autocomplete client-side usando o servidor público e limita uso pesado; exige atribuição. O servidor demo OSRM é destinado a usos de demonstração/uso razoável não comercial e não foi configurado como roteador de produção para a loja. Por esse motivo `delivery.routeServiceBaseUrl` permanece vazio, e a página declara que o cálculo inline precisa de endpoint apropriado.

## 8. Conversão e escopo

- CTA primário direciona para o Brendi.
- InstaDelivery e Taplink ficam disponíveis como canais alternativos.
- Cards remetem ao cardápio geral, evitando URLs de produto inventadas.
- O CTA mobile continua visível em telas pequenas sem cobrir conteúdo essencial.
- O FAQ explica que a finalização ocorre fora da LP.
- A V2 não cria avaliações, depoimentos, escassez ou descontos não confirmados.

A landing page foi estruturada para simplificar o caminho ao pedido, mas não promete vendas ou conversão quantitativa: isso depende de oferta, audiência, tráfego, disponibilidade e operação real.
