# 📊 Dashboard Emisfera - Comercial & Marketing

Dashboard em tempo real para acompanhamento de métricas de Comercial e Marketing da Emisfera Agro.

## 🌐 URLs do Projeto

- **Dashboard**: https://claude-omega-azure.vercel.app/
- **API**: https://claude-omega-azure.vercel.app/api/dados

## 📁 Estrutura do Projeto

```
/
├── api/                          # Vercel Serverless Functions
│   └── dados.js                  # API que busca dados do Google Sheets
│
├── netlify/                      # Netlify (backup)
│   ├── functions/
│   │   └── dados.js              # Netlify Function (backup)
│   └── netlify.toml              # Configuração Netlify
│
├── docs/                         # Documentação
│   ├── GoogleAppsScript-PRONTO.js    # Script para Google Sheets
│   ├── PASSO_A_PASSO_FINAL.md        # Guia completo de setup
│   └── VERCEL_SETUP.md               # Documentação da Vercel
│
├── index.html                    # Dashboard principal
├── package.json                  # Configuração Node.js
└── vercel.json                   # Configuração Vercel
```

## 🚀 Features

- ✅ **Duas Dashboards**: Comercial & Vendas + Marketing
- ✅ **Dados em Tempo Real**: Atualização automática a cada 5 minutos
- ✅ **20 Meses de Dados**: Maio/2025 - Dezembro/2026
- ✅ **Funis de Conversão**: Visualização de taxas de conversão
- ✅ **Paleta Emisfera**: Cores oficiais da marca
- ✅ **Deploy Automático**: Push para GitHub = Deploy na Vercel

## 🎨 Dashboards

### Comercial & Vendas (Funil de 5 Etapas)
1. Ligações Realizadas
2. Ligações Atendidas
3. Formulário Respondido
4. Análise Positiva
5. Vendas

### Marketing (Funil de 8 Etapas)
1. Visitantes
2. Cadastros
3. Oportunidades (MQLs)
4. Respostas Formulário
5. Análises Positivas
6. Pitchs Agendados
7. Pitchs Realizados
8. Vendas

## 🔧 Tecnologias

- **Frontend**: HTML, Tailwind CSS, JavaScript Vanilla
- **Backend**: Vercel Serverless Functions
- **Dados**: Google Sheets + Google Apps Script
- **Deploy**: Vercel (principal) + Netlify (backup)

## 📊 Fonte de Dados

Os dados são extraídos automaticamente da planilha Google Sheets através do Google Apps Script.

- **Planilha**: [Link](https://docs.google.com/spreadsheets/d/13MQbv3f92bZNHeHU9rkNTEvodu3Y1wMTjbw9ZmmNgiY/)
- **Aba**: `RESUMO_DADOS`
- **Colunas**: C-J (2025) + K-V (2026)

## 🛠️ Como Atualizar Dados

1. Edite a planilha Google Sheets
2. Os dados são atualizados automaticamente no dashboard
3. Atualização manual: Clique no botão "🔄 Atualizar"

## 📖 Documentação Completa

Veja os guias em `docs/`:
- `PASSO_A_PASSO_FINAL.md` - Setup completo do Google Apps Script
- `VERCEL_SETUP.md` - Configuração e deploy na Vercel
- `GoogleAppsScript-PRONTO.js` - Código do Apps Script

## 🔄 Fluxo de Dados

```
Dashboard (index.html)
    ↓ fetch('/api/dados')
Vercel Function (api/dados.js)
    ↓ fetch(APPS_SCRIPT_URL)
Google Apps Script
    ↓ SpreadsheetApp.openById()
Google Sheets (RESUMO_DADOS)
```

## 🎯 Cores da Emisfera

- `#82a002` - Verde principal
- `#b5d909` - Verde limão
- `#d3f328` - Verde claro
- `#98a83f` - Verde oliva
- `#46580f` - Verde escuro

## 📝 Licença

© 2025 Emisfera Agro - Dashboard interno
