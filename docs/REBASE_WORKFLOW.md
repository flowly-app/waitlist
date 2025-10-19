# 🔄 Rebase Workflow - Flowly Waitlist

Este documento explica como usar o sistema de rebase automático implementado para manter um histórico Git limpo e linear.

## 📋 Visão Geral

O sistema implementado garante que todas as PRs sejam rebaseadas antes do merge, mantendo um histórico linear e limpo. Isso é feito através de:

1. **Status Checks Automáticos** - Verifica se PR precisa de rebase
2. **Botão de Rebase** - Interface fácil para rebase automático
3. **Comando /rebase** - Comando via comentário na PR
4. **Script Helper** - Ferramentas locais para rebase

## 🚀 Como Usar

### 1. **Criação de Feature Branch**

```bash
# Criar nova feature branch
./scripts/git-workflow.sh start feature-name

# Exemplo
./scripts/git-workflow.sh start add-login
```

### 2. **Desenvolvimento e Commits**

```bash
# Fazer commits normalmente
git add .
git commit -m "feat: add login functionality"

# Continuar desenvolvendo...
git add .
git commit -m "fix: resolve login validation issue"
```

### 3. **Rebase Antes de Finalizar**

```bash
# Rebase automático
./scripts/git-workflow.sh rebase

# Ou rebase interativo para limpar commits
./scripts/git-workflow.sh rebase-interactive

# Ou squash todos os commits em um
./scripts/git-workflow.sh squash
```

### 4. **Finalizar Feature**

```bash
# Finalizar e criar PR
./scripts/git-workflow.sh finish
```

### 5. **Rebase via GitHub**

#### Opção A: Comando /rebase
- Comentar `/rebase` na PR
- O workflow será executado automaticamente

#### Opção B: GitHub Actions UI
- Ir em **Actions** → **Auto Rebase PR**
- Clicar em **Run workflow**
- Inserir número da PR

#### Opção C: Script Local
```bash
# Trigger rebase para PR específica
./scripts/git-workflow.sh trigger-rebase 123
```

## 🔧 Workflows Implementados

### 1. **enforce-rebase.yml**
- **Trigger**: PR opened/synchronized/reopened
- **Função**: Verifica se PR precisa de rebase
- **Ação**: Bloqueia merge se PR não estiver rebaseada

### 2. **auto-rebase.yml**
- **Trigger**: Manual (workflow_dispatch)
- **Função**: Executa rebase automático
- **Ação**: Rebaseia PR e força push

### 3. **rebase-button.yml**
- **Trigger**: Comentário `/rebase` na PR
- **Função**: Trigger automático do rebase
- **Ação**: Chama auto-rebase.yml

## 📊 Status Checks

O sistema adiciona status checks que:

- ✅ **Passam** quando PR está rebaseada e atualizada
- ❌ **Falham** quando PR precisa de rebase
- 🔄 **Mostram botão** para rebase automático

## 🛠️ Comandos Disponíveis

```bash
# Comandos básicos
./scripts/git-workflow.sh start <name>     # Criar feature branch
./scripts/git-workflow.sh finish           # Finalizar feature
./scripts/git-workflow.sh sync             # Sincronizar com develop

# Comandos de rebase
./scripts/git-workflow.sh rebase           # Rebase automático
./scripts/git-workflow.sh rebase-interactive # Rebase interativo
./scripts/git-workflow.sh squash           # Squash commits

# Comandos de gerenciamento
./scripts/git-workflow.sh trigger-rebase <pr#> # Trigger rebase via GitHub
./scripts/git-workflow.sh cleanup          # Limpar branches merged
./scripts/git-workflow.sh status           # Status atual
./scripts/git-workflow.sh help             # Ajuda
```

## 🔒 Configuração do Repositório

Para funcionar corretamente, configure:

1. **Branch Protection Rules** para `develop`:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require linear history

2. **Merge Options**:
   - ✅ Allow rebase merging
   - ❌ Allow merge commits (desabilitado)

## 🎯 Benefícios

1. **📈 Histórico Linear**: Commits organizados em linha reta
2. **🧹 Commits Limpos**: Sem merge commits desnecessários
3. **🔄 Atualização Automática**: PRs sempre atualizadas
4. **📊 Feedback Visual**: Status checks claros
5. **🚀 Deploy Seguro**: Histórico previsível
6. **🤖 Automação**: Menos trabalho manual

## 🚨 Resolução de Conflitos

Se o rebase falhar por conflitos:

```bash
# Resolver conflitos manualmente
git status
# Editar arquivos com conflitos
git add .
git rebase --continue

# Ou abortar rebase
git rebase --abort
```

## 📝 Exemplos de Uso

### Fluxo Completo
```bash
# 1. Criar feature
./scripts/git-workflow.sh start add-user-profile

# 2. Desenvolver
git add .
git commit -m "feat: add user profile form"
git add .
git commit -m "fix: validate email format"

# 3. Rebase antes de finalizar
./scripts/git-workflow.sh rebase

# 4. Finalizar
./scripts/git-workflow.sh finish

# 5. Criar PR
gh pr create --title "Add user profile" --body "Implements user profile functionality"
```

### Rebase via GitHub
```bash
# Após criar PR, comentar:
/rebase

# Ou usar script local
./scripts/git-workflow.sh trigger-rebase 456
```

## 🔍 Troubleshooting

### PR não consegue fazer merge
- Verificar se status checks estão passando
- Executar rebase via `/rebase` ou script
- Verificar se não há merge commits

### Rebase falha
- Resolver conflitos manualmente
- Usar `git rebase --continue` após resolver
- Ou `git rebase --abort` para cancelar

### Script não funciona
- Verificar se está na feature branch
- Verificar se tem GitHub CLI instalado
- Verificar permissões do repositório

## 📚 Recursos Adicionais

- [Git Rebase Documentation](https://git-scm.com/docs/git-rebase)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub CLI Documentation](https://cli.github.com/)
