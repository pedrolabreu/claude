# 🚀 Deploy na Vercel - Dashboard Emisfera

## ✅ Configuração Completa

O projeto já está configurado para funcionar na Vercel! Os arquivos criados foram:

- ✅ `/api/dados.js` - Serverless Function da Vercel
- ✅ `vercel.json` - Configuração de rotas e builds
- ✅ `index.html` - Atualizado para usar `/api/dados`

## 📋 Como Fazer Deploy

### Opção 1: Deploy Automático via GitHub

1. **Conecte seu repositório na Vercel**
   - Acesse: https://vercel.com/
   - Clique em "Add New Project"
   - Conecte seu GitHub e selecione o repositório `pedrolabreu/claude`

2. **Configure o projeto**
   - Framework Preset: **Other** (ou deixe em branco)
   - Root Directory: `.` (raiz do projeto)
   - Build Command: (deixe vazio)
   - Output Directory: `.` (raiz do projeto)

3. **Deploy**
   - Clique em "Deploy"
   - Aguarde o deploy finalizar (1-2 minutos)
   - Sua URL será algo como: `https://claude-omega-azure.vercel.app/`

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 🔧 Como Funciona

### Estrutura de Arquivos:

```
/
├── index.html              # Frontend do dashboard
├── api/
│   └── dados.js           # Serverless function (busca dados do Google Sheets)
├── vercel.json            # Configuração da Vercel
├── GoogleAppsScript.js    # Código para Google Sheets (não deployado)
└── netlify/               # Backup (Netlify Functions)
    └── functions/
        └── dados.js
```

### Fluxo de Dados:

```
Dashboard (index.html)
    ↓ fetch('/api/dados')
Vercel Function (/api/dados.js)
    ↓ fetch(APPS_SCRIPT_URL)
Google Apps Script
    ↓ retorna JSON
Google Sheets (Resumo de Dados)
```

## 🧪 Testar se Está Funcionando

### 1. Testar a API diretamente:

Abra no navegador:
```
https://claude-omega-azure.vercel.app/api/dados
```

**Deve retornar um JSON com dados:**
```json
{
  "maio/2025": {
    "investimento": 10000,
    "visitantes": 5000,
    ...
  }
}
```

### 2. Testar o Dashboard:

1. Abra: https://claude-omega-azure.vercel.app/
2. Abra o Console (F12 → Console)
3. Procure por:
   - `Dados carregados:` - deve mostrar o JSON completo
   - `Dados do mês atual:` - deve mostrar dados do mês

## ❌ Troubleshooting

### Problema: "Failed to fetch data"

**Solução:**
1. Verifique se o Google Apps Script está implantado corretamente
2. Teste a URL do Apps Script diretamente no navegador
3. Verifique os logs da Vercel: https://vercel.com/seu-projeto/logs

### Problema: Dados zerados

**Solução:**
1. Abra `/api/dados` no navegador para ver o JSON
2. Verifique se a planilha tem a aba "Resumo de Dados"
3. Confirme que os dados estão nas colunas corretas (C-V)
4. Execute `testarLeitura()` no Google Apps Script

### Problema: CORS Error

**Solução:**
A função `/api/dados.js` já tem CORS configurado. Se ainda der erro:
1. Limpe o cache do navegador
2. Faça um novo deploy na Vercel
3. Verifique se a URL do Apps Script permite acesso público

## 🔄 Atualizações Automáticas

Toda vez que você fizer push para o GitHub, a Vercel vai:
1. ✅ Detectar as mudanças automaticamente
2. ✅ Fazer novo build e deploy
3. ✅ Atualizar o site em produção (1-2 minutos)

## 📊 Monitoramento

Acesse os logs da Vercel para debug:
```
https://vercel.com/[seu-usuario]/[seu-projeto]/logs
```

Você verá:
- Requisições para `/api/dados`
- Erros de fetch
- Status das requisições ao Google Sheets

## 🎯 URLs do Projeto

- **Dashboard**: https://claude-omega-azure.vercel.app/
- **API de Dados**: https://claude-omega-azure.vercel.app/api/dados
- **Google Apps Script**: [URL do seu deployment]

## 💡 Dicas

1. **Deploy Instantâneo**: A Vercel faz deploy em segundos (muito mais rápido que Netlify)
2. **Edge Functions**: As funções rodam em edge locations próximas ao usuário
3. **Analytics**: Ative Analytics na Vercel para ver métricas de acesso
4. **Preview Deploys**: Cada PR no GitHub gera uma URL de preview automática

## 🆘 Precisa de Ajuda?

Se os dados não aparecerem:
1. Compartilhe a URL: https://claude-omega-azure.vercel.app/api/dados
2. Compartilhe os logs do Console (F12)
3. Compartilhe os logs da Vercel
