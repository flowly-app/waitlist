# 🔄 Rebase Workflow - Flowly Waitlist

Este documento explica como usar o sistema de rebase nativo do GitHub para manter um histórico Git limpo e linear.

## 📋 Visão Geral

O sistema utiliza as funcionalidades nativas do GitHub para garantir que todas as PRs sejam rebaseadas antes do merge, mantendo um histórico linear e limpo. Isso é feito através de:

1. **Branch Protection Rules** - Configuração para forçar "Rebase and merge"
2. **GitHub Native Rebase** - Opção "Rebase and merge" nas PRs
3. **Script Helper** - Ferramentas locais para desenvolvimento

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

### 3. **Finalizar Feature**

```bash
# Finalizar e criar PR
./scripts/git-workflow.sh finish
```

### 4. **Rebase via GitHub (Nativo)**

#### Opção A: Rebase and Merge (Recomendado)
1. **Ir na PR** no GitHub
2. **Clicar no botão "Merge pull request"**
3. **Selecionar "Rebase and merge"** no dropdown
4. **Confirmar o merge**

#### Opção B: Squash and Merge
1. **Ir na PR** no GitHub
2. **Clicar no botão "Merge pull request"**
3. **Selecionar "Squash and merge"** no dropdown
4. **Confirmar o merge**

## 🔧 Configuração do Repositório

Para funcionar corretamente, configure as **Branch Protection Rules**:

### **Settings** → **Branches** → **Add rule** para `develop`:

1. **✅ Require a pull request before merging**
2. **✅ Require branches to be up to date before merging**
3. **✅ Restrict pushes that create files larger than 100MB**

### **Merge Options** (Opcional):
- **✅ Allow rebase merging** (recomendado)
- **✅ Allow squash merging** (opcional)
- **❌ Allow merge commits** (desabilitado para histórico linear)

## 📊 Status Checks

O sistema nativo do GitHub:
- ✅ **Verifica conflitos** automaticamente
- ✅ **Mostra "No conflicts with base branch"** quando OK
- ✅ **Permite merge** apenas quando sem conflitos
- ✅ **Mantém histórico linear** com "Rebase and merge"

## 🛠️ Comandos Disponíveis

```bash
# Comandos básicos
./scripts/git-workflow.sh start <name>     # Criar feature branch
./scripts/git-workflow.sh finish           # Finalizar feature
./scripts/git-workflow.sh sync             # Sincronizar com develop

# Comandos de gerenciamento
./scripts/git-workflow.sh cleanup          # Limpar branches merged
./scripts/git-workflow.sh status           # Status atual
./scripts/git-workflow.sh help             # Ajuda
```

## 🎯 Benefícios

1. **📈 Histórico Linear**: Commits organizados em linha reta
2. **🧹 Commits Limpos**: Sem merge commits desnecessários
3. **🔄 Simplicidade**: Usa funcionalidades nativas do GitHub
4. **📊 Feedback Visual**: Interface clara e intuitiva
5. **🚀 Deploy Seguro**: Histórico previsível
6. **🤖 Zero Configuração**: Funciona out-of-the-box

## 🚨 Resolução de Conflitos

Se houver conflitos durante o rebase:

### **Via GitHub:**
1. **GitHub detecta conflitos** automaticamente
2. **Mostra "This branch has conflicts"**
3. **Clique em "Resolve conflicts"**
4. **Edite os arquivos** com conflitos
5. **Marque como resolvido** e confirme

### **Via Local:**
```bash
# Resolver conflitos manualmente
git checkout feature/branch-name
git fetch origin develop
git rebase origin/develop
# Resolver conflitos nos arquivos
git add .
git rebase --continue
git push origin feature/branch-name --force-with-lease
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

# 3. Finalizar
./scripts/git-workflow.sh finish

# 4. Criar PR
gh pr create --title "Add user profile" --body "Implements user profile functionality"

# 5. Fazer merge via GitHub
# - Ir na PR
# - Clicar "Merge pull request"
# - Selecionar "Rebase and merge"
# - Confirmar
```

### Limpeza de Branches
```bash
# Limpar branches merged
./scripts/git-workflow.sh cleanup
```

## 🔍 Troubleshooting

### PR não consegue fazer merge
- Verificar se há conflitos com develop
- Resolver conflitos via GitHub ou localmente
- Verificar se branch está atualizada

### Conflitos durante rebase
- Usar "Resolve conflicts" no GitHub
- Ou resolver localmente e fazer push

### Script não funciona
- Verificar se está na feature branch
- Verificar se tem GitHub CLI instalado
- Verificar permissões do repositório

## 📚 Recursos Adicionais

- [GitHub Rebase and Merge Documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#rebase-and-merge-your-pull-request-commits)
- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Git Rebase Documentation](https://git-scm.com/docs/git-rebase)
- [GitHub CLI Documentation](https://cli.github.com/)

## 🎉 Resumo

Este sistema simplificado utiliza as funcionalidades nativas do GitHub para manter um histórico Git limpo e linear. É mais simples, confiável e não requer configuração complexa de workflows.

**Principais vantagens:**
- ✅ **Zero configuração** de workflows complexos
- ✅ **Interface nativa** do GitHub
- ✅ **Histórico linear** automático
- ✅ **Resolução de conflitos** integrada
- ✅ **Fácil de usar** para toda a equipe