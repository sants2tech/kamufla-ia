# Configuração e solução de problemas

## OpenAI, OpenRouter e Venice
Configure a URL base, chave válida e um modelo habilitado na conta. O aplicativo envia uma solicitação `POST /chat/completions` com streaming ativado.

## Ollama
1. Instale e execute Ollama no computador.
2. Baixe um modelo, por exemplo: `ollama pull llama3.2`.
3. Use `http://localhost:11434/v1` como URL base e o nome exato do modelo.
4. Se ocorrer erro CORS, permita a origem do navegador nas configurações do Ollama ou execute o aplicativo localmente.
5. Não exponha o serviço Ollama diretamente à internet sem autenticação e proteção de rede.

## Erros comuns
- **401/403:** chave ausente, inválida ou sem permissão.
- **404:** endpoint ou modelo incorreto.
- **429:** limite de requisições ou créditos atingido.
- **Failed to fetch / CORS:** endpoint indisponível, bloqueio de origem ou política de rede.
- **Resposta vazia:** verifique compatibilidade com Chat Completions e SSE.

## Comparação
Ative **Comparar modelos** e informe de 2 a 5 IDs separados por vírgula. Cada modelo gera uma chamada individual; o provedor pode cobrar cada uma.

## Limitações
Esta versão é estática: não possui autenticação multiusuário, banco remoto, proxy de API, sincronização entre dispositivos, upload de arquivos ou execução de ferramentas externas.
