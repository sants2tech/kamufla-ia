# Implantar o Free Claude Code em uma VPS gratuita

Este guia prepara o Free Claude Code (FCC) em uma VM Ubuntu 24.04 ARM64, usando como primeira opção a cota Oracle Cloud Always Free. A infraestrutura não é criada pelo GitHub Actions: é necessário criar a conta e a VM no painel do provedor.

## 1. Limites e pré-requisitos

- Oracle Cloud Always Free Ampere A1: até 2 OCPUs e 12 GB de RAM no conjunto, sujeito às cotas e à capacidade da região.
- A1 é ARM64. O projeto FCC declara Python 3.14.10 e possui dependências nativas; a instalação precisa concluir com sucesso na arquitetura escolhida.
- A Oracle pode apresentar erro de falta de capacidade e pode recuperar VMs consideradas ociosas segundo suas regras.
- A conta exige verificação e cartão/débito compatível; não avance para plano pago nem crie recursos fora do Always Free.
- Você precisará de IP público, SSH e um domínio/subdomínio cujo DNS A aponte para o IP da VM. O HTTPS público exige domínio válido.
- A VM hospeda o proxy FCC, não os modelos de IA. Os modelos são fornecidos por provedores externos e podem ter cotas, custos ou requisitos próprios.

Documentação oficial: [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/) e [Always Free Resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm).

## 2. Criar a VM

No painel OCI, crie uma instância Ubuntu 24.04 ARM64 Ampere A1 dentro das cotas Always Free (sugestão inicial: 1 OCPU e 6 GB RAM). Configure uma VCN/sub-rede pública, IP público e regra de entrada TCP 22. Não abra a porta 8082 nem outras portas de administração.

Conecte por SSH:
```bash
ssh ubuntu@IP_PUBLICO_DA_VPS
```

## 3. Instalar FCC

Envie o script `deploy/oracle-cloud/install-fcc.sh` para a VM e execute:
```bash
chmod +x install-fcc.sh
sudo ./install-fcc.sh
```

O script instala Git/uv, baixa o código oficial FCC, sincroniza as dependências e cria o serviço systemd. O serviço escuta apenas em `127.0.0.1:8082`.

Verifique:
```bash
sudo systemctl status fcc
sudo journalctl -u fcc -n 100 --no-pager
```

Se a sincronização falhar por incompatibilidade ARM64 ou indisponibilidade de wheel para alguma dependência, pare aqui: não exponha um serviço parcialmente instalado. Consulte os logs e a documentação oficial do FCC.

## 4. Configurar o FCC com acesso privado

No seu computador, abra um túnel SSH:
```bash
ssh -L 8082:127.0.0.1:8082 ubuntu@IP_PUBLICO_DA_VPS
```

Com o túnel ativo, abra `http://127.0.0.1:8082/admin` no navegador. Configure um ou mais provedores/modelos e habilite **Proxy Authentication**. Gere um token forte e guarde-o em local seguro. Não compartilhe esse token no chat nem o coloque no GitHub.

Mantenha o FCC acessível somente por localhost. O arquivo `fcc.service` já define esse comportamento.

## 5. Configurar domínio e HTTPS

Crie um registro DNS A, por exemplo `ia.seudominio.com`, apontando para o IP público da VM. Instale Caddy seguindo a documentação oficial em [caddyserver.com/docs/install](https://caddyserver.com/docs/install).

Edite `deploy/oracle-cloud/Caddyfile.example`, substituindo o domínio de exemplo. Copie o conteúdo para `/etc/caddy/Caddyfile` e valide/recarregue Caddy:
```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

A configuração de exemplo encaminha somente `/v1/*` para FCC e permite CORS somente da origem GitHub Pages do Kamufla IA. Não adicione uma rota pública para `/admin`. Abra na VCN/firewall somente TCP 22, 80 e 443. A porta 8082 deve continuar fechada externamente.

## 6. Conectar o Kamufla IA

No site `https://sants2tech.github.io/kamufla-ia/`:
- Provedor: **Free Claude Code (VPS)**
- URL base: `https://ia.seudominio.com/v1`
- Chave API: token de Proxy Authentication do FCC
- Modelo: ID exato que o FCC lista para o provedor configurado

Salve e envie uma mensagem de teste. Se houver erro CORS, confirme a origem exata e o Caddyfile. Se houver 401, confira o token. Se houver 404, confira o modelo e a URL base.

## 7. Operação e segurança

- Atualize FCC somente após ler as notas da versão e fazer backup de `/opt/fcc-data/.fcc`.
- Não desative Proxy Authentication.
- Não exponha o painel administrativo FCC nem a porta 8082 na internet.
- Mantenha o sistema e Caddy atualizados.
- Configure alertas de orçamento e confira sempre que todos os recursos estão marcados como Always Free.
- A camada gratuita pode sofrer falta de capacidade ou recuperação de instâncias ociosas; mantenha cópia da configuração e dos dados.

## O que ainda depende de você

A conta OCI, a validação de identidade, a criação da VM, a escolha do domínio/DNS e a configuração dos provedores no FCC exigem acesso à sua conta e não podem ser concluídas pelo commit do GitHub. Este repositório contém a integração e os arquivos-base, mas a VPS só estará online depois desses passos.
