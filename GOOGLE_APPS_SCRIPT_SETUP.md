# 🔧 Como Atualizar o Google Apps Script

## 📋 Problema Identificado

Os campos **Vendas Total**, **Oportunidades**, **Análises** e **Análises Positivas** estavam zerados porque o mapeamento de linhas estava incorreto.

## ✅ Mapeamento Correto (Baseado na Planilha Atual)

| Campo Dashboard | Linha Planilha | Nome na Planilha |
|----------------|----------------|------------------|
| Visitantes | Linha 3 | VISITANTES |
| Cadastros (Leads) | Linha 4 | CADASTROS GERAIS SITE |
| Oportunidades INB | Linha 5 | OPORTUNIDADES INB (MQL) |
| Oportunidades OUT | Linha 6 | OPORTUNIDADES OUTBOUND |
| Ligações Realizadas | Linha 7 | LIGAÇÕES REALIZADAS |
| Ligações Atendidas | Linha 8 | LIGAÇÕES ATENDIDAS |
| Formulário Respondido | Linha 9 | FORMULÁRIO RESPONDIDO |
| **Análises Positivas** | **Linha 10** | **ANÁLISE POSITIVA (TQL)** |
| **Análises** | **Linha 11** | **OPORTUNIDADES QUALIF** |
| Reuniões Agendadas | Linha 12 | PITCHS AGENDADOS |
| Reuniões Realizadas | Linha 13 | PITCHS REALIZADOS |
| **Vendas Total** | **Linha 14** | **QT VENDAS (GERAL)** |
| Qtd Vendas PIN | Linha 15 | QT VENDAS PROJETOS |
| Qtd Vendas Monitoramento | Linha 16 | QT VENDAS MONITORAMENTO |
| Qtd Vendas Inbound | Linha 17 | QT VENDAS INBOUND |
| Qtd Vendas Outbound | Linha 18 | QT VENDAS OUTBOUND |
| Receita Total | Linha 20 | R$ VENDAS |
| Receita PIN | Linha 21 | R$ VENDAS PIN |
| Receita Monitoramento | Linha 22 | R$ VENDAS MONITORAMENTO |
| ROI | Linha 24 | ROI |
| CAC | Linha 25 | CAC |
| Ticket Médio | Linha 26 | TICKET MEDIO |
| Ciclo de Vendas | Linha 27 | CICLO MÉDIO VENDAS |
| **Ticket Médio PIN** | **Linha 28** | **TICKET MEDIO PIN** |
| **Ticket Médio Monitoramento** | **Linha 29** | **TICKET MEDIO MONITORAMENTO** |

## 📝 Passo a Passo para Atualizar

### 1. Abra sua Planilha Google Sheets
Acesse a planilha do Dashboard Emisfera

### 2. Acesse o Apps Script Editor
- Clique em **Extensões** > **Apps Script**
- Isso abrirá o editor de código

### 3. Cole o Novo Código
- Selecione TODO o código antigo e delete
- Abra o arquivo `apps-script-code.gs` deste repositório
- Copie e cole o código completo no editor

### 4. Ajuste o Nome da Aba (se necessário)
Na linha 15 do código, verifique o nome da aba:
```javascript
const sheet = ss.getSheetByName('Dashboard - Performance');
```
Se sua aba tem outro nome, ajuste aqui.

### 5. Salve o Projeto
- Clique no ícone de **disquete** ou `Ctrl+S`
- Dê um nome ao projeto (ex: "Dashboard Emisfera API")

### 6. Implante o Web App
- Clique em **Implantar** > **Nova implantação**
- Em "Tipo", selecione **Aplicativo da Web**
- Configure:
  - **Executar como**: Eu (seu email)
  - **Quem tem acesso**: Qualquer pessoa
- Clique em **Implantar**
- **Copie a URL gerada** (será algo como `https://script.google.com/macros/s/...`)

### 7. Atualize a URL no Projeto (se mudou)
Se você criou uma nova implantação, atualize a URL no arquivo `api/dados.js`:
```javascript
const APPS_SCRIPT_URL = 'SUA_NOVA_URL_AQUI';
```

### 8. Teste
- Abra o dashboard
- Clique em "🔄 Atualizar"
- Verifique se os valores agora aparecem corretamente

## 🔍 Verificação Rápida

Após atualizar, os seguintes valores devem aparecer (exemplo de fevereiro/2026):
- ✅ Vendas Total: **3**
- ✅ Oportunidades: **129** (INB) + **0** (OUT) = **129**
- ✅ Análises: **13**
- ✅ Análises Positivas: **13**
- ✅ Reuniões Agendadas: **20**
- ✅ Reuniões Feitas: **17**

## ❓ Solução de Problemas

**Se ainda aparecer zerado:**
1. Verifique o nome da aba na planilha (linha 15 do código)
2. Confirme que a coluna do mês está correta (ex: "fevereiro/2026")
3. Teste a URL do Apps Script diretamente no navegador - deve retornar JSON
4. Verifique o console do navegador (F12) para erros

**Se der erro de permissão:**
- Vá em Implantar > Gerenciar implantações
- Edite a implantação
- Verifique se "Quem tem acesso" está como "Qualquer pessoa"

## 📞 Suporte

Se continuar com problemas, verifique:
- O console do Apps Script (View > Logs)
- O console do navegador (F12 > Console)
- Se as colunas de meses estão na primeira linha da planilha
