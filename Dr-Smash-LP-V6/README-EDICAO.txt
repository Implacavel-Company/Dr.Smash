DR. SMASH! — LANDING PAGE V4
============================

ESTE É O PACOTE DA LANDING PAGE, NÃO UM SISTEMA DE DELIVERY.
O cliente escolhe o produto na landing page e finaliza o pedido na plataforma externa.

COMO TESTAR NO WINDOWS
----------------------
1. Extraia o ZIP inteiro para uma pasta.
2. Dê dois cliques em TESTAR-LOCALMENTE.bat.
3. Abra http://127.0.0.1:8000 se o navegador não abrir sozinho.
4. Para encerrar o servidor, volte ao terminal e pressione Ctrl+C.

ABRIR-LP.bat abre o HTML pelo disco e serve apenas para prévia. Geolocalização
e chamadas de rede de mapas podem exigir localhost ou HTTPS.

ONDE EDITAR AS INFORMAÇÕES COMUNS
---------------------------------
Abra somente EDITE-AQUI.js.

1. EMPRESA E CONTATO
   Procure "brand". Nome, telefone, endereço e link para o mapa ficam ali.
   Confirme o telefone e o endereço com a empresa antes de divulgar.

2. TEXTOS
   "hero" controla o título e a apresentação principal.
   "menuSection" controla o texto do cardápio.
   "manifesto" controla o bloco de experiência da marca.
   "orderChannels" controla os textos da seção de pedidos.
   "faq" controla as perguntas frequentes.
   "footer" controla textos do rodapé.
   Altere somente o texto entre aspas, preservando a estrutura.

3. CORES
   Procure "theme". Os valores são códigos de cores HTML como "#F4512A".
   O layout usa preto, grafite, metal, laranja e vermelho-fogo.

4. LINKS DE PEDIDO E REDES SOCIAIS
   Procure "urls". Mantenha o endereço completo, começando com https://.
   Brendi, InstaDelivery, Taplink e Instagram são canais externos.
   A LP não recebe pedidos, cartão nem pagamento.

5. PRODUTOS E PREÇOS
   Procure "products". Cada produto tem nome, categoria, preço de referência,
   descrição, selo e imagem local. Confirme tudo no Brendi antes de divulgar.
   Os valores do site podem ficar desatualizados; o Brendi é o canal de pedido.

6. IMAGENS
   As imagens em assets/products/ são imagens ilustrativas geradas por IA,
   não fotos oficiais. Para trocar uma:
   a) Obtenha uma fotografia autorizada do cliente.
   b) Coloque em assets/products/ usando nome sem espaços.
   c) Altere o caminho "image" do produto no EDITE-AQUI.js.
   d) Atualize a nota de imagens ilustrativas do index.html e teste a imagem.
   A logo oficial preserva o arquivo original e está em assets/dr-smash-logo.webp.

7. PEDIDO MÍNIMO
   A configuração delivery.minimumOrderBRL está em 20. A LP apenas comunica
   o valor informado; ela NÃO consegue impedir pedidos abaixo de R$ 20,00 nas
   plataformas externas. Essa regra precisa ser configurada e confirmada em
   cada sistema de pedidos.

8. HORÁRIOS
   O print fornecido mostra todos os dias, das 10h30 às 23h. Essa informação foi
   configurada em hours.weekly e hours.confirmed está true. Confirme com a unidade
   se feriados, pausas ou horário de delivery diferem antes de publicar. Leia
   docs/CONFIGURACAO_HORARIOS.md.

9. MAPA E GEOLOCALIZAÇÃO
   A localização só é solicitada depois que a pessoa clica em "Usar minha
   localização" e o navegador pede permissão. O ponto do visitante é centralizado
   de imediato; se a busca de localização falhar, o formulário manual abre sozinho.
   O mapa usa Leaflet + tiles OpenStreetMap e mostra a atribuição.
   Leia docs/CONFIGURACAO_MAPS.md antes de usar em produção com tráfego elevado.
   O serviço público de geocodificação tem limites; não implemente autocomplete
   usando a API pública do Nominatim.
   O endereço de destino digitado é enviado ao serviço de geocodificação; a
   página não o grava em banco nem no armazenamento local.

10. DISTÂNCIA E TEMPO DE ENTREGA
    delivery.routeServiceBaseUrl aponta para o OSRM público de demonstração apenas
    para protótipo. Ele não tem SLA nem dados de trânsito ao vivo; antes da produção,
    use serviço próprio ou provedor autorizado para uso comercial. Configure também
    preparationMinutes e operationalMarginMinutes com dados confirmados para somar
    um prazo operacional estimado ao tempo do trajeto.
    Também é necessário confirmar preparationMinutes e operationalMarginMinutes
    para exibir uma estimativa total. A estimativa nunca garante prazo real.

11. ÁUDIO E EFEITOS VISUAIS
    O botão "SOM DO FOGO" ativa/desativa o MP3 enviado após clique explícito.
    O áudio do usuário está em assets/audio/dr-smash-fire-ambience.mp3. Ele começa
    apenas após clique. A sequência do hambúrguer usa 144 WebP e as chamas usam 17 WebP;
    os JPEGs 8K são entregues separadamente; os MP4 de prévia ficam em assets/video/.
    Não remova atribuições do mapa nem as mensagens de privacidade.

CUIDADOS
--------
- Faça backup antes de uma mudança maior.
- Preserve aspas, vírgulas e chaves.
- Não coloque senhas, tokens ou chaves privadas no JavaScript público.
- Não invente horários, área de entrega ou prazo de chegada.
- Não apresente imagens ilustrativas como fotografias reais.
- Não altere os arquivos de backup v1-originals; eles são referência.

DOCUMENTAÇÃO
------------
README.md: visão geral e publicação.
docs/AUDITORIA_V2.md: fontes, limites e dados de negócio.
docs/ARQUITETURA_V2.md: componentes e decisões técnicas.
docs/CONFIGURACAO_MAPS.md: mapa, geocodificação e roteamento.
docs/CONFIGURACAO_HORARIOS.md: preenchimento do horário real.
docs/RELATORIO_TESTES_V2.md: testes executados e pendências.
docs/CHANGELOG.md: resumo das mudanças da V1 para V2.
