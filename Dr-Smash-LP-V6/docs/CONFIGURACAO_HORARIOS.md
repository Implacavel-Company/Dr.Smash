# Configurar horários da Dr. Smash!

A V4 utiliza o horário visível no print fornecido: todos os dias, das 10h30 às 23h, fuso `America/Sao_Paulo`. Esse dado foi copiado da informação da loja mostrada pelo usuário; feriados, pausas, horário específico de delivery e exceções não estão confirmados.

## Antes de publicar

Confirme com o estabelecimento:
- se o horário de delivery é igual ao mostrado no print;
- feriados, pausas e exceções;
- se há dias especiais ou horários que passam da meia-noite.

A contagem é calculada pela configuração da página, não sincronizada com a plataforma de pedidos.

## Onde editar

No `EDITE-AQUI.js`, localize:

```js
hours: {
  confirmed: true,
  timeZone: "America/Sao_Paulo",
  weekly: [
    { open: "10:30", close: "23:00" }, // domingo
    { open: "10:30", close: "23:00" }, // segunda
    { open: "10:30", close: "23:00" }, // terça
    { open: "10:30", close: "23:00" }, // quarta
    { open: "10:30", close: "23:00" }, // quinta
    { open: "10:30", close: "23:00" }, // sexta
    { open: "10:30", close: "23:00" }  // sábado
  ],
  exceptions: {}
}
```

O índice da lista `weekly` representa:
- `0`: domingo
- `1`: segunda-feira
- `2`: terça-feira
- `3`: quarta-feira
- `4`: quinta-feira
- `5`: sexta-feira
- `6`: sábado

Cada dia deve ser `null` (confirmado fechado) ou um objeto com `open` e `close`, nos formatos `HH:MM`. O array da V4 utiliza os horários indicados no print acima. Para exceções, veja o exemplo ilustrativo a seguir:

```js
weekly: [
  { open: "12:00", close: "22:00" }, // domingo: EXEMPLO
  null,                               // segunda: EXEMPLO de fechado
  { open: "11:30", close: "23:00" }, // terça: EXEMPLO
  { open: "11:30", close: "23:00" },
  { open: "11:30", close: "23:00" },
  { open: "11:30", close: "23:30" },
  { open: "11:30", close: "23:30" }
]
```

Somente depois de validar todos os dias, altere `confirmed: true`.

## Exceções

`exceptions` aceita uma chave por data local `YYYY-MM-DD`. Use um objeto com `open`/`close` para um horário excepcional, ou `null` para fechado. Exemplo ilustrativo:

```js
exceptions: {
  "2026-12-25": null,
  "2026-12-31": { open: "11:00", close: "16:00" }
}
```

Revise e remova exceções expiradas. Horários excepcionais não se atualizam de um sistema externo automaticamente.

## Como a V4 exibe o status

Quando `hours.confirmed` é `true`, calcula ABERTA/FECHADA e minutos para fechamento/próxima abertura usando `America/Sao_Paulo`, atualizando a cada 30 segundos. Se desativado, mostra “HORÁRIOS A CONFIRMAR”. A contagem é derivada da configuração local, não sincronizada com a plataforma de pedidos.
