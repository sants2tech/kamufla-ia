# Configuração e solução de problemas

## OpenAI, OpenRouter e Venice
Configure a URL base, chave válida e um modelo habilitado na conta. O aplicativo envia uma solicitação `POST /chat/completions` com streaming ativado.

## Free Claude Code hospedado em VPS
1. Implante o FCC conforme [DEPLOY-VPS-GRATUITA.md](DEPLOY-VPS-GRATUITA.md).
2. No painel administrativo do FCC, configure pelo menos um provedor/modelo e habilite **Proxy Authentication**.
3. Acesse o painel somente por túnel SSH; não publique a interface administrativa.
4. No Kamufla IA, abra **Configurações** e escolha **Free Claude Code (VPS)**.
5. Em URL base, informe `https://SEU-DOMINIO/v1`.
6. Em Chave API, informe o bearer token configurado no FCC.
7. Em Modelo, use exatamente o identificador apresentado pelo FCC.
8. Salve e teste uma conversa curta.

O navegador chama `/chat/completions` e o FCC fornece API compatível com OpenAI. A configuração Caddy de exemplo libera CORS apenas para `https://sants2tech.github.io` e encaminha somente `/v1/*`. Não exponha a porta 8082 diretamente.

**Atenção:** o token FCC ficará salvo no `localStorage` do navegador. Use somente dispositivos confiáveis. Modelos gratuitos, quotas e disponibilidade dependem de cada provedor; o FCC não garante uso ilimitado nem transforma modelos pagos em gratuitos.

## NVIDIA NIM
1. Crie uma chave em [NVIDIA Build](https://build.nvidia.com/settings).
2. No Kamufla IA, selecione **NVIDIA NIM**.
3. Use a URL base `https://integrate.api.nvidia.com/v1`.
4. Cole a chave no campo **Chave API** (não a compartilhe nem a publique).
5. Informe o ID exato de um modelo disponível no [catálogo NVIDIA NIM](https://docs.api.nvidia.com/nim/reference/llm-apis), por exemplo `meta/llama-3.1-8b-instruct` se estiver habilitado para sua conta.
6. Salve e envie uma mensagem de teste. A integração usa `POST /v1/chat/completions` com streaming.

A disponibilidade, gratuidade, limites e modelos habilitados variam conforme a NVIDIA e a conta. Consulte o catálogo e os limites atuais antes de uso contínuo.

## Ollama
1. Instale e execute Ollama no computador.
2. Baixe um modelo, por exemplo: `ollama pull llama3.2`.
3. Use `http://localhost:11434/v1` como URL base e o nome exato do modelo.
4. Se ocorrer erro CORS, permita a origem do navegador nas configurações do Ollama ou execute o aplicativo localmente.
5. Não exponha o serviço Ollama diretamente à internet sem autenticação e proteção de rede.

## Erros comuns
- **401/403:** chave/token ausente, inválido ou sem permissão.
- **404:** endpoint ou modelo incorreto.
- **429:** limite de requisições ou créditos atingido.
- **Failed to fetch / CORS:** endpoint indisponível, HTTPS/CORS ou política de rede.
- **Resposta vazia:** verifique compatibilidade com Chat Completions e SSE.

## Comparação
Ative **Comparar modelos** e informe de 2 a 5 IDs separados por vírgula. Cada modelo gera uma chamada individual; o provedor pode cobrar cada uma.

## Limitações
Esta versão continua com histórico local e sem banco remoto ou sincronização entre dispositivos. A integração VPS requer provisionar a VM, configurar domínio/HTTPS e autenticação. O GitHub Pages publica apenas a interface; ele não provisiona nem hospeda o processo FCC.
