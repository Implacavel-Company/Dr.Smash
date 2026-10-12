# DR. SMASH! — Auditoria, estratégia e arquitetura da V1

Data da pesquisa: 11/10/2026  
Escopo: Landing Page estática de apresentação e encaminhamento de pedidos para Dr. Smash! em Indaiatuba.

## 1. Resumo executivo

A V1 foi concebida como uma landing page de conversão, não como um novo sistema de delivery. O CTA primário direciona para o cardápio Brendi de Indaiatuba; o InstaDelivery e o Taplink ficam como caminhos secundários, sem simular um checkout interno. Essa escolha evita inventar fluxo de pagamento, taxas, prazos, cupons, disponibilidade ou status de pedido.

A identidade visual parte do material enviado: preto texturizado, tipografia de impacto, letras vermelhas/laranja e chamas, com a assinatura “PUB AND BURGER”. A LP reaproveita a logo original em ativo otimizado, usa laranja-fogo como cor principal e creme como cor de texto. Não adiciona avaliações, depoimentos, descontos, urgência ou escassez não comprovados.

## 2. Auditoria das fontes

### 2.1 Instagram

URL fornecida: https://www.instagram.com/dr.smashindaiatuba/

A tentativa de abrir diretamente o perfil falhou na ferramenta de consulta automatizada (cache miss). Resultados secundários identificam o handle `@dr.smashindaiatuba`, mas não permitem afirmar que todos os posts, Stories, destaques ou links da bio foram inspecionados. A página fica configurada como canal social na LP; conteúdo visual não acessível não foi presumido.

### 2.2 Taplink

URL fornecida: https://drsmash.taplink.ws/ com parâmetros UTM/FBCLID.

O destino não pôde ser carregado pela ferramenta de consulta, por isso não foi possível inventariar com segurança suas abas, botões, janelas, links, nem verificar diretamente a observação de dois endereços físicos. O link é mantido como destino secundário configurável, sem declarar que seus controles foram testados.

### 2.3 Cardápio Brendi — fonte principal do catálogo

URL: https://menu.brendi.com.br/drsmashindaiatuba

A página foi acessível e apresentou:
- Nome listado: Dr Smash Burger.
- Localidade resumida: Vila Teller, Indaiatuba.
- Pedido mínimo exibido: R$ 20,00.
- Faixa de entrega exibida no momento da indexação: 0–52 min.
- Cashback anunciado na plataforma: 1%.
- Categorias: Box Paizão, Combos Matadores, Ultra Smash Burger, Burgers Artesanais 160g, Porções Campeãs, Sobremesas e Bebidas Geladinhas.
- Botões e recursos do catálogo: busca, categorias, cards de produtos, detalhes de produtos e plataforma de pedido/login, quando acessíveis na página pública.

Esses dados podem mudar. A LP não promete prazo, cashback ou pedido mínimo, pois são condições operacionais da plataforma, não garantias da landing page. O CTA leva ao Brendi para conferir opções e concluir o pedido.

Produtos/preços vistos na página de Indaiatuba durante a auditoria:
- Box — 2 x Smash Rock 2.0: a partir de R$ 99,90; descrição inclui dois Smash Rock, batata cheddar/bacon, 10 nuggets e Coca-Cola 2 L ou Zero; a página informa que serve duas pessoas.
- Box Churras Grill: de R$ 139,90 por R$ 129,90 na página consultada.
- Box Cheddar Melt: de R$ 139,90 por R$ 129,90 na página consultada.
- Box 3 x Smash PCQ: a partir de R$ 129,90.
- Start Combo PCQ: a partir de R$ 29,90.
- Combo Smash Rock 2.0: a partir de R$ 47,90.
- Combo Cheddar Melt: a partir de R$ 47,90.
- Combo Smash Churrasco: a partir de R$ 53,90.
- Combo Smash Salada Bacon: a partir de R$ 48,90.
- Combo Dr. Smash 3.0: a partir de R$ 56,90.
- Smash PCQ 1.0: a partir de R$ 18,90.
- Ultra Smash Rock 2.0: a partir de R$ 35,90.
- Smash Salada Bacon 2.0: a partir de R$ 36,90.
- Ultra Smash Cheddar Melt 2.0: a partir de R$ 35,90.
- Smash Churrasco 2.0: a partir de R$ 41,90.
- Ultra Dr. Smash 3.0: a partir de R$ 44,90.
- Burgers artesanais 160 g listados: Dr. Crispy a partir de R$ 39,90; Dr. F.B.I a partir de R$ 39,90; Suprema a partir de R$ 43,90; Dr. Churras Bacon a partir de R$ 43,90.
- Porções visíveis: fritas a partir de R$ 25,90; onion rings a partir de R$ 24,90; fritas com cheddar e bacon a partir de R$ 43,90; fritas com Catupiry e bacon a partir de R$ 43,90; meia onion com fritas a partir de R$ 43,90; nuggets de 5 unidades a partir de R$ 9,00, 10 unidades a partir de R$ 22,00 e 15 unidades a partir de R$ 29,00.
- Sobremesas: Milk Shake Nutella + Ovomaltine R$ 27,90; Milk Shake de Paçoca R$ 24,90; Dr Coffee Smash R$ 23,90.
- Bebidas visíveis: suco de laranja R$ 14,00; Coca-Cola 2 L R$ 19,90; Coca-Cola Zero 2 L R$ 19,90; Coca-Cola Original 350 ml R$ 8,90; Coca-Cola sem açúcar 350 ml R$ 8,90; água com/sem gás 510 ml R$ 5,00; Spaten 355 ml R$ 13,00; Corona 330 ml R$ 16,00; Heineken 330 ml R$ 15,00.

A V1 destaca apenas um subconjunto desses produtos. As descrições e os preços estão concentrados em `EDITE-AQUI.js`, para atualização manual simples. Todos os cards direcionam para o cardápio; eles não fingem abrir um produto específico nem criar um pedido dentro da LP.

A URL Brendi foi repetida duas vezes no pedido inicial; foi analisada uma vez para evitar duplicação.

### 2.4 InstaDelivery

URL fornecida: https://instadelivery.com.br/drsmash1

A página abriu sem conteúdo útil na ferramenta de consulta (a plataforma depende de JavaScript para montar a interface). A busca de imagens encontrou um logo circular Dr. Smash hospedado no CDN público do InstaDelivery, mas não foi possível inspecionar confiavelmente o catálogo, carrinho, métodos de pagamento ou as etapas de finalização. Por isso o link é disponibilizado como canal secundário configurável, sem alegar que o fluxo interno foi testado.

### 2.5 Endereço e telefone: divergências documentais

Foi localizada uma publicação oficial do Município de Indaiatuba, edição de 11/05/2026, registrando alteração de endereço aprovada para DR. SMASH BURGER LTDA, CNPJ 46.744.054/0001-62, para `Rua Alberto Santos Dumont, 1660`. A lista municipal de serviços também relaciona esse número com telefone `(19) 98227-4475`. Essa é a referência mais recente localizada durante a auditoria e foi usada na V1.

Outras páginas do diretório municipal ainda listam `Rua Pedro de Toledo, 1302` ou `1308`, com telefone diferente. Isso sugere registros antigos ou informações divergentes; não se presume que sejam unidades simultâneas. A página Brendi informa apenas Vila Teller, Indaiatuba. A V1 usa o endereço do registro municipal mais recente e o telefone associado à listagem de serviços, mas os dois devem ser confirmados diretamente com o estabelecimento antes de um lançamento público definitivo. A observação do briefing sobre dois endereços no Taplink não pôde ser verificada diretamente.

### 2.6 Logo/JPEG enviado

Arquivo original: `Dr.Smash.jpg`, 874 × 743 px, RGB, JPEG (~131 KB). A imagem contém o logotipo “DR SMASH! / PUB AND BURGER”, letras laranja/vermelhas com contorno escuro, chamas e fundo preto texturizado.

Foi criada uma versão de 1748 × 1486 px com upscale Lanczos, redução moderada de ruído e ajustes leves de contraste/cor/nitidez. O desenho não foi recriado; o arquivo original está preservado em `assets/dr-smash-logo-original.jpg`, a versão PNG aprimorada fica em `assets/dr-smash-logo-aprimorado.png` e a versão WebP otimizada usada na página é `assets/dr-smash-logo.webp`. A variante gerada por IA não é usada como logo oficial para preservar o desenho original.

## 3. Auditoria do HTML de protótipo enviado

Arquivo: `Dr. Smash — Protótipo de pedidos (1).html`.

### Estrutura constatada
- Documento único, com CSS e JavaScript embutidos.
- Interface mobile-first limitada por `#app { max-width: 480px }`.
- Dados de produtos em um array JavaScript.
- Navegação por estado de tela no cliente: início, produto, sacola, checkout, rastreio, pedidos anteriores e perfil.
- Cards e customizações são montados por concatenação de strings e `innerHTML`.
- O estado da sacola e dos pedidos fica apenas em memória JavaScript; não existe API, persistência de pedidos ou integração real de pagamento nesse HTML.

### Funcionalidades demonstrativas que não podem ser confundidas com sistemas reais
O próprio arquivo marca entrega, cashback e endereços como exemplos. Também contém:
- Cupom `COME10` identificado como exemplo.
- Taxa de entrega fixa de R$ 6,00 como exemplo.
- Endereço “Rua Exemplo, 123”.
- Prazos fixos e estimados explicitamente como exemplos.
- Um botão para avançar o status de pedido em modo demonstração.
- Perfil, saldo de cashback, histórico de pedidos e número do pedido simulados em memória.
- Opções de pagamento que não integram nenhum gateway.

Por isso, a V1 não reutiliza esse checkout demonstrativo. Em vez disso, a página apresenta o negócio e encaminha para canais externos de pedido. Esse escopo é mais honesto e reduz o risco de sugerir que um pagamento ou pedido tenha sido enviado quando nada foi transmitido.

## 4. Direção visual e CRO

### Elementos preservados
- Fundo escuro e textura.
- Logo original e identidade de chama.
- Laranja/vermelho como destaque, creme para leitura e tons metálicos.
- Tipografia de impacto para títulos e fonte sem serifa para texto.
- Linguagem de pub/burger; não foi convertida em uma hamburgueria genérica.

### Melhorias de UX/UI implementadas
- Hero com proposta de valor direta e CTA primário.
- CTA de cardápio visível em header, hero, seção de produtos e barra mobile.
- Produtos destacados com categoria, preço, descrição e link para a plataforma.
- Filtros de categoria para explorar os itens da LP.
- Seção de canais de pedido separando Brendi, InstaDelivery e Taplink.
- Seção de localização/telefone e CTA de Maps.
- FAQ com respostas honestas sobre onde se faz o pedido e como tratar os preços.
- Microinterações discretas, hover, animação suave e respeito à preferência `prefers-reduced-motion`.
- Navegação mobile acessível e botões com área de toque adequada.
- SEO sem inventar horários, avaliações ou descontos.

### Limites comerciais
A LP favorece conversão ao encurtar o caminho para os canais de pedido, mas não garante vendas. Não foi possível testar conversão real, checkout dos terceiros ou disponibilidade de produtos em tempo real. Não foram introduzidas avaliações/depoimentos de clientes, nem alegações de “mais vendido” fora do que a página fonte identificou como destaque.

## 5. Arquitetura da V1

- `index.html`: estrutura semântica, SEO e seções.
- `style.css`: identidade visual, layout e responsividade.
- `script.js`: render dos destaques, filtros, navegação mobile, FAQ e leitura da configuração.
- `EDITE-AQUI.js`: fonte central de textos, links, endereço/telefone, cores, produtos, filtros e seções.
- `assets/`: logo original e versão tratada/otimizada.
- `README-EDICAO.txt`: instruções leigas de edição e execução.
- `docs/`: este relatório, registro de testes e itens pendentes.

A V1 é estática; não exige Flask, banco de dados, npm ou build. Não existe painel administrativo ou pagamento no pacote. As alterações mais comuns da LP são feitas em `EDITE-AQUI.js`; imagens novas precisam ser colocadas em `assets/` e indicadas nesse arquivo.

## 6. Referências consultadas

1. Instagram fornecido (não foi possível extrair a página diretamente): https://www.instagram.com/dr.smashindaiatuba/
2. Taplink fornecido (acesso automatizado não disponível): https://drsmash.taplink.ws/
3. Brendi Indaiatuba, catálogo principal: https://menu.brendi.com.br/drsmashindaiatuba
4. InstaDelivery fornecido (página depende de JavaScript para renderizar): https://instadelivery.com.br/drsmash1
5. Diário/Imprensa Oficial do Município de Indaiatuba, edição de 11/05/2026, alteração de endereço: https://indaiatuba.sp.gov.br/download/72473/
6. Lista municipal de serviços, endereço e telefone: https://www.indaiatuba.sp.gov.br/desenvolvimento-economico-industria-comercio-e-turismo/turismo/servicos/
7. Lista municipal de Fast Food/Hamburgueria com registro de endereço anterior: https://www.indaiatuba.sp.gov.br/desenvolvimento-economico-industria-comercio-e-turismo/turismo/gastronomia/fast-food-hamburgueria/


## 7. Próximos passos recomendados (fora do escopo imediato da V1)

### Antes de publicar em campanha
1. Confirmar com o estabelecimento se o endereço e telefone usados são os atuais e se o Taplink lista mais de uma unidade ativa.
2. Testar, em celular, os links Brendi, InstaDelivery, Instagram e Taplink, verificando a unidade selecionada e as opções de entrega/retirada.
3. Substituir as ilustrações vetoriais dos cards por fotos oficiais autorizadas, se a empresa fornecer as imagens reais.
4. Definir o domínio da LP e configurar `og:image` com URL absoluta.
5. Confirmar os preços destacados e atualizar `EDITE-AQUI.js` se necessário.

### Evolução opcional
- V1.1: adicionar fotos reais e, se desejado, importar um cardápio completo mediante uma fonte atualizada e autorizada.
- V1.2: medir cliques nos CTAs com um mecanismo de analytics aprovado pelo cliente e configurado com os avisos/consentimentos necessários.
- Futuras iterações: SEO local mais detalhado, páginas específicas por unidade somente se os endereços e canais forem confirmados, e novos componentes de campanha quando existirem ofertas reais.

Essas melhorias não foram inventadas como funcionalidades já concluídas; ficam como etapas futuras, sujeitas a confirmação e configuração.
