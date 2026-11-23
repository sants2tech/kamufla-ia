# Kamufla IA

Assistente multimodelo em **português brasileiro**, com interface de chat responsiva em um único `index.html`.

Projeto independente com referência conceitual ao [G0DM0D3](https://github.com/elder-plinius/G0DM0D3). Não é afiliado à OpenAI, OpenRouter, Venice, Ollama ou ao projeto Free Claude Code.

## Recursos
- Provedores OpenAI, OpenRouter, Venice e Ollama (API compatível com OpenAI).
- Integração opcional com **Free Claude Code hospedado em VPS**, usando API OpenAI Chat Completions.
- Respostas em streaming.
- Comparação paralela de 2 a 5 modelos do provedor selecionado.
- Perfis AutoTune: equilibrado, criativo e preciso.
- Histórico local, exportação e importação JSON.
- Configuração de modelo, endpoint, chave/token, temperatura, tokens e instrução de sistema.
- Interface em português brasileiro, tema escuro e layout responsivo.
- Sem framework, build ou dependência externa.

## Começar
1. Abra o site publicado ou baixe/clique em `index.html`.
2. Entre em **Configurações**.
3. Escolha o provedor, modelo e URL base.
4. Informe a chave/token quando o provedor exigir, salve e converse.

| Provedor | URL base padrão | Modelo de exemplo |
|---|---|---|
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| OpenRouter | `https://openrouter.ai/api/v1` | `openai/gpt-4o-mini` |
| Venice | `https://api.venice.ai/api/v1` | `llama-3.3-70b` |
| Ollama | `http://localhost:11434/v1` | `llama3.2` |
| Free Claude Code (VPS) | `https://SEU-DOMINIO/v1` | ID exibido pelo painel FCC |

Os nomes e permissões dos modelos dependem do provedor e da sua conta.

## Free Claude Code em VPS gratuita

O repositório inclui um instalador-base para Ubuntu 24.04 ARM64, arquivo systemd e exemplo de proxy HTTPS. A implantação **não acontece automaticamente** só por publicar o GitHub Pages: primeiro é necessário criar a conta/VM na Oracle Cloud, obter o IP público e configurar um domínio ou subdomínio com HTTPS.

Consulte [docs/DEPLOY-VPS-GRATUITA.md](docs/DEPLOY-VPS-GRATUITA.md) e os arquivos em `deploy/oracle-cloud/`.

A integração no navegador usa a URL pública HTTPS da VPS e o token de autenticação do proxy FCC. O token fica salvo no armazenamento local deste navegador, portanto não o use em computadores compartilhados. O painel administrativo FCC não deve ser exposto publicamente; acesse-o por túnel SSH.

**Importante sobre custo:** a Oracle Cloud mantém uma oferta Always Free com cotas e disponibilidade sujeitas a região/conta. A criação pode falhar por falta de capacidade; a oferta exige verificação de conta e método de pagamento aceito. Não ultrapasse os limites gratuitos nem ative recursos pagos. A VPS hospeda o proxy, não os modelos grandes: as respostas ainda dependem dos provedores configurados no FCC e das cotas/termos deles.

## GitHub Pages
O workflow ativo em `.github/workflows/static.yml` publica automaticamente a branch `main`. Em **Settings → Pages**, selecione **GitHub Actions** como fonte. URL esperada: https://sants2tech.github.io/kamufla-ia/

## Segurança importante
- Esta é uma aplicação frontend estática. Chaves e tokens são guardados no `localStorage` do navegador e podem ser acessados por alguém com acesso ao mesmo perfil do navegador.
- Não compartilhe o navegador com pessoas não confiáveis e nunca grave chaves em arquivos públicos.
- O endpoint público da VPS deve usar HTTPS e autenticação por bearer token.
- Não exponha a porta administrativa do FCC (8082) à internet. O serviço deve escutar apenas em `127.0.0.1`; o proxy HTTPS encaminha somente `/v1/*`.
- O histórico é local e não sincroniza entre dispositivos.
- Ollama pode exigir CORS para a origem do site. Não exponha Ollama diretamente à internet sem proteção de rede.

## Referência e licença
A experiência de comparação de modelos, perfis de geração e portabilidade do histórico foi adaptada como conceito de ferramentas presentes no G0DM0D3. A função **Melhorar pedido** apenas melhora clareza e estrutura; não implementa técnicas de evasão de salvaguardas.

Licença declarada: GNU AGPL v3.0. Consulte `LICENSE`. Antes de redistribuir, inclua o texto integral oficial da licença e preserve os avisos aplicáveis a qualquer código derivado.
