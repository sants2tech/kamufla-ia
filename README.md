# Kamufla IA

Assistente multimodelo em **português brasileiro**, com interface de chat responsiva em um único `index.html`.

Projeto independente com referência conceitual ao [G0DM0D3](https://github.com/elder-plinius/G0DM0D3). Não é afiliado à OpenAI, OpenRouter, Venice ou Ollama.

## Recursos
- Provedores OpenAI, OpenRouter, Venice e Ollama (API compatível com OpenAI).
- Respostas em streaming.
- Comparação paralela de 2 a 5 modelos do provedor selecionado.
- Perfis AutoTune: equilibrado, criativo e preciso.
- Histórico local, exportação e importação JSON.
- Configuração de modelo, endpoint, chave, temperatura, tokens e instrução de sistema.
- Interface em português brasileiro, tema escuro e layout responsivo.
- Sem framework, build ou dependência externa.

## Começar
1. Abra o site publicado ou baixe/clique em `index.html`.
2. Entre em **Configurações**.
3. Escolha o provedor, modelo e URL base.
4. Informe a chave de API (exceto Ollama local), salve e converse.

| Provedor | URL base padrão | Modelo de exemplo |
|---|---|---|
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| OpenRouter | `https://openrouter.ai/api/v1` | `openai/gpt-4o-mini` |
| Venice | `https://api.venice.ai/api/v1` | `llama-3.3-70b` |
| Ollama | `http://localhost:11434/v1` | `llama3.2` |

Os nomes e permissões dos modelos dependem do provedor e da sua conta.

## GitHub Pages
O workflow em `.github/workflows/pages.yml` publica automaticamente a branch `main`. Em **Settings → Pages**, selecione **GitHub Actions** como fonte. URL esperada: https://sants2tech.github.io/kamufla-ia/

## Segurança importante
- Esta é uma aplicação frontend estática. A chave API é guardada no `localStorage` do navegador e pode ser acessada por alguém com acesso ao mesmo perfil do navegador.
- Não compartilhe o navegador com pessoas não confiáveis e nunca grave chaves em arquivos públicos.
- Para uso multiusuário, adicione backend autenticado, proxy de API e armazenamento de segredos no servidor.
- Ollama pode exigir CORS para a origem do site. Não exponha Ollama diretamente à internet sem proteção.
- O histórico é local e não sincroniza entre dispositivos.

## Referência e licença
A experiência de comparação de modelos, perfis de geração e portabilidade do histórico foi adaptada como conceito de ferramentas presentes no G0DM0D3. A função **Melhorar pedido** apenas melhora clareza e estrutura; não implementa técnicas de evasão de salvaguardas.

Licença declarada: GNU AGPL v3.0. Consulte `LICENSE`. Antes de redistribuir, inclua o texto integral oficial da licença e preserve os avisos aplicáveis a qualquer código derivado.
