## Descrição

Com base em @frontend/.cursor/rules/react-patterns.mdc, execute a tarefa abaixo:

Crie uma página que recebe relatos de problemas urbanos para uma prefeitura. Utilize design limpo e moderno, utilizando tons de branco, verde-esmeralda e gradientes para criar uma UI agradável.

Na página, deve haver 2 seções de form:
1. Inserir endereço do problema (Rua, Numero, Bairro e CEP (opcional))
2. Descrição do problema (contendo título e descrição)

Abaixo do form deve haver um botão para enviar a solicitação, que só deve ser habilitado caso todos os campos obrigatórios tenham sido preencidos.

Ao clicar no botão que envia o formulário, será enviada uma request HTTP para a rota `POST - localhost:3000/report` com o body no seguinte formato:

```json
{
    "title": "Ponto de ônibus sem cobertura expõe idosos ao sol e chuva",
    "description": "O ponto de ônibus em frente ao Hospital Municipal não tem cobertura nem banco. Pacientes, muitos deles idosos e com dificuldade de locomoção, precisam esperar o ônibus em pé e expostos ao sol forte ou à chuva. Solicitamos instalação de abrigo com urgência.",
    "address": {
      "zipCode": "38400-902",
      "neighborhood": "Fundinho",
      "street": "Avenida Pará",
      "addressNumber": "1720"
    }
  }
```

Enquanto a requisição estiver pendente, exiba uma animação de carregamento bem visível no form. Após a requisição ser feita com sucesso, redirecione o usuário para uma página de sucesso (que contém uma tela verde fullscreen com um texto de sucesso + ícone de checkmark no centro, e um botão para enviar novo formulário, que redirecionará o usuário à pagina de envio de solicitação)