# NVIDIA NIM no Kamufla IA (GitHub Pages)

O endpoint hospedado da NVIDIA pode bloquear chamadas diretas do navegador por CORS. Para usar NVIDIA NIM no GitHub Pages, publique o proxy deste repositório como um Cloudflare Worker.

## 1. Criar o Worker

1. Entre em https://dash.cloudflare.com/
2. Abra **Workers & Pages**.
3. Selecione **Create** > **Create Worker**.
4. Dê um nome, por exemplo `kamufla-nvidia-proxy`.
5. Clique em **Deploy**.
6. Abra **Edit code** e substitua todo o código pelo conteúdo de [nvidia-proxy/worker.js](../nvidia-proxy/worker.js).
7. Clique em **Deploy** novamente.

O endereço será parecido com `https://kamufla-nvidia-proxy.SUA-CONTA.workers.dev`.

## 2. Configurar o Kamufla IA

1. Abra https://sants2tech.github.io/kamufla-ia/
2. Entre em **Configurações** e escolha **NVIDIA NIM**.
3. Em **URL base**, informe o endereço do Worker seguido de `/v1`, por exemplo:
   `https://kamufla-nvidia-proxy.SUA-CONTA.workers.dev/v1`
4. Em **Chave API**, cole sua chave NVIDIA (não a envie para ninguém).
5. Escolha um modelo disponível na sua conta NVIDIA. O valor inicial sugerido no app é `meta/llama-3.1-8b-instruct`.
6. Salve e envie uma mensagem de teste.

## Segurança e limites

- O Worker só aceita requisições do domínio GitHub Pages configurado no código: `https://sants2tech.github.io`.
- O Worker encaminha a chave Bearer para a NVIDIA; ele não armazena a chave.
- A chave continua no armazenamento local do navegador do usuário. Não use em computador compartilhado.
- Restrição de Origin não é autenticação: qualquer pessoa que controle um cliente HTTP pode tentar chamar o Worker. Como a chave é enviada pelo navegador, mantenha sua chave privada e regenere-a se for exposta.
- O Worker encaminha apenas `/v1/chat/completions` e `/v1/models`.
- Este arquivo é o código-fonte do proxy; criar o arquivo no GitHub não publica o Worker automaticamente. É necessário fazer o deploy no painel Cloudflare.
