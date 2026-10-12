# DR. SMASH! — Relatório de validação da V1

Data: 11/10/2026

## 1. Testes executados e resultados

| Verificação | Resultado | Detalhe |
|---|---|---|
| Sintaxe JavaScript — `script.js` | PASSOU | `node --check script.js` sem erros. |
| Sintaxe JavaScript — `EDITE-AQUI.js` | PASSOU | `node --check EDITE-AQUI.js` sem erros. |
| Carregamento da configuração | PASSOU | `EDITE-AQUI.js` foi executado em Node com objeto `window` de teste; encontrou 8 produtos e 6 estados de seção. |
| Parse de HTML | PASSOU | Python HTMLParser processou o documento sem tags abertas remanescentes. |
| Título e hierarquia | PASSOU | Um H1; o HTML tem title e description. |
| IDs duplicados | PASSOU | Nenhum ID duplicado identificado. |
| Âncoras internas | PASSOU | Todos os destinos de links internos encontrados existem no documento. |
| Rótulos/alt | PASSOU | Nenhum botão vazio sem aria-label/texto; imagens do HTML possuem alt. |
| Recursos locais | PASSOU | Os 3 usos da logo no HTML apontam para asset existente. |
| HTTP local de arquivos | PASSOU | `index.html`, `style.css`, `script.js`, `EDITE-AQUI.js` e o WebP responderam HTTP 200 em servidor local Python. |
| Categorias de produto | PASSOU | 8 cards previstos em 5 categorias: Smash, Combos, Boxes, Porções e Sobremesas. |
| URLs de saída | CONFIGURADAS | Brendi, InstaDelivery, Taplink, Instagram e Maps usam HTTPS; os fluxos internos das plataformas não foram concluídos/testados. |
| Campos configuráveis | PASSOU | As 60 referências `data-config` do HTML possuem valores correspondentes em `EDITE-AQUI.js`. |

## 2. Testes que não puderam ser confirmados nesta execução

O navegador Chromium no ambiente automatizado foi bloqueado ao tentar abrir URLs locais (`ERR_BLOCKED_BY_ADMINISTRATOR`) e a execução headless também falhou por restrição do ambiente gráfico/GPU. Por isso não declaro teste visual automatizado completo, medição real de Core Web Vitals ou teste cross-browser concluído aqui.

Recomenda-se abrir `ABRIR-LP.bat` ou `TESTAR-LOCALMENTE.bat` num Windows e conferir desktop/celular. Os controles de filtro, menu mobile, FAQ e CTAs estão implementados em JavaScript. As 60 referências `data-config` foram cruzadas com a configuração central e não há referências sem valor. A validação por interação real no navegador ficou limitada pelo ambiente de execução disponível.

## 3. Links externos

- Brendi: `https://menu.brendi.com.br/drsmashindaiatuba`
- InstaDelivery: `https://instadelivery.com.br/drsmash1`
- Taplink: `https://drsmash.taplink.ws/`
- Instagram: `https://www.instagram.com/dr.smashindaiatuba/`
- Maps: link de pesquisa para Rua Alberto Santos Dumont, 1660, Indaiatuba/SP.

As URLs fornecidas foram preservadas. Não foi possível testar o fluxo de compra, opções de pagamento ou a navegação interna do Taplink/InstaDelivery na ferramenta automatizada. Nenhum pedido ou pagamento foi submetido.

## 4. Pendências para o lançamento público

1. Confirmar diretamente com a empresa o endereço/telefone exibido, pois diretórios públicos têm registros divergentes e a página Taplink não pôde ser auditada diretamente.
2. Confirmar se existem duas unidades ativas e seus destinos corretos. A V1 usa apenas o endereço mais recente encontrado em fonte municipal.
3. Confirmar preços, disponibilidade e promoções antes de divulgar a página.
4. Inserir fotos oficiais dos produtos caso o cliente disponibilize arquivos autorizados. A V1 usa ilustrações vetoriais decorativas nos cards, não fotos fictícias.
5. Após definir o domínio de produção, definir `og:image` como URL absoluta para compartilhamento social.
6. Testar os links e a navegação em Android/iPhone, desktop e um navegador secundário antes de investir em tráfego.

## 5. Resumo de escopo

A V1 é um site estático de marketing e encaminhamento para pedido. Não possui banco de dados, painel de administração, sincronização de catálogo, checkout, pagamento, carrinho, pedido interno, cupons, cálculo de entrega nem rastreamento real. Isso é intencional: o pedido continua nas plataformas já usadas pelo estabelecimento.
