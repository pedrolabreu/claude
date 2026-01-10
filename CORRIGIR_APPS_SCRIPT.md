# 🔧 CORRIGIR Google Apps Script - URGENTE

## ❌ Problema Identificado

Erro atual: `"Cannot read properties of null (reading 'getSheetByName')"`

**Causa**: O código usa `getActiveSpreadsheet()` que não funciona quando o script é deployado como Web App.

**Solução**: Usar o ID da planilha diretamente com `openById()`.

---

## ✅ Passo a Passo para Corrigir

### 1️⃣ Pegar o ID da Sua Planilha

**Opção A: Pela URL**
1. Abra sua planilha no Google Sheets
2. Olhe a URL no navegador:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz456DEF789/edit
                                          ^^^^ ESTE É O ID ^^^^
   ```
3. **Copie** a parte entre `/d/` e `/edit`

**Opção B: Pelo Script Atual**
1. Abra: Extensões → Apps Script
2. Selecione a função: `pegarIDDaPlanilha`
3. Clique em "Executar" (▶️)
4. Veja o ID nos logs: Visualizar → Logs
5. **Copie o ID**

---

### 2️⃣ Atualizar o Código do Apps Script

1. **Abra seu Google Sheets**
2. **Vá em**: Extensões → Apps Script
3. **Apague TODO o código antigo**
4. **Copie TODO o conteúdo** do arquivo: `GoogleAppsScript-FIXED.js`
5. **Cole** no editor do Apps Script
6. **ENCONTRE a linha 20**:
   ```javascript
   const SPREADSHEET_ID = 'SEU_ID_DA_PLANILHA_AQUI';
   ```
7. **SUBSTITUA** `'SEU_ID_DA_PLANILHA_AQUI'` pelo ID que você copiou:
   ```javascript
   const SPREADSHEET_ID = '1ABC123xyz456DEF789';
   ```
8. **Salve** (Ctrl+S ou ícone de disquete)

---

### 3️⃣ Testar o Código

1. **Selecione a função**: `testarLeitura`
2. **Clique em "Executar"** (▶️)
3. **Autorize** se solicitado
4. **Veja os logs**: Visualizar → Logs (ou Ctrl+Enter)

**✅ Você deve ver:**
```
✅ Dados de Maio/2025:
Investimento: 10000
Visitantes: 5000
Ligações Realizadas: 300
Vendas: 30
```

**❌ Se aparecer erro:**
- Verifique se o ID está correto
- Verifique se a aba se chama exatamente "Resumo de Dados"
- Verifique os logs para ver as abas disponíveis

---

### 4️⃣ Reimplantar o Script

**⚠️ IMPORTANTE: Você precisa criar uma NOVA implantação!**

1. **Clique em**: Implantar → Nova implantação
2. **Clique no ícone de engrenagem** ⚙️
3. **Selecione tipo**: "Aplicativo da Web"
4. **Configure:**
   - Descrição: `Dashboard Emisfera v2 (fixed)`
   - Executar como: **"Eu"**
   - Quem tem acesso: **"Qualquer pessoa"**
5. **Clique em "Implantar"**
6. **COPIE A NOVA URL** gerada
7. **A URL será diferente da anterior!**

---

### 5️⃣ Atualizar a URL no Código

**Me envie a NOVA URL** e eu atualizo o código para você!

Ou você pode atualizar manualmente:
1. Abra o arquivo: `api/dados.js`
2. Linha 7: substitua a URL antiga pela nova
3. Commit e push:
   ```bash
   git add api/dados.js
   git commit -m "fix: atualizar URL do Google Apps Script corrigido"
   git push
   ```

---

## 🧪 Testar se Funcionou

Depois de atualizar a URL:

### 1. Aguarde 1-2 minutos (Vercel fazer redeploy)

### 2. Teste a API:
```
https://claude-omega-azure.vercel.app/api/dados
```

**✅ Deve retornar JSON com dados reais:**
```json
{
  "maio/2025": {
    "investimento": 10000,
    "visitantes": 5000,
    "cadastros": 250,
    ...
  }
}
```

**❌ NÃO deve retornar:**
```json
{"error":"Cannot read properties..."}
```

### 3. Teste o Dashboard:
```
https://claude-omega-azure.vercel.app/
```

1. Abra F12 → Console
2. **Deve ver**: `Dados carregados: { maio/2025: {...}, ... }`
3. **Números devem aparecer** nas duas abas!

---

## 📋 Checklist Completo

- [ ] Peguei o ID da planilha
- [ ] Atualizei o código do Apps Script
- [ ] Colei o ID na linha 20
- [ ] Executei `testarLeitura()` e vi os dados nos logs
- [ ] Criei NOVA implantação
- [ ] Copiei a NOVA URL
- [ ] Atualizei a URL no código (api/dados.js)
- [ ] Fiz commit e push
- [ ] Aguardei 1-2 minutos
- [ ] Testei /api/dados e vi dados reais
- [ ] Testei o dashboard e vi os números

---

## 🆘 Se Ainda Não Funcionar

Me envie:
1. ✅ O ID da sua planilha
2. ✅ O que aparece quando você executa `testarLeitura()`
3. ✅ A nova URL do Apps Script
4. ✅ O que aparece em: https://claude-omega-azure.vercel.app/api/dados
5. ✅ Print da sua planilha mostrando as colunas e linhas

---

## ✨ Por que isso vai funcionar?

**Antes:**
```javascript
// ❌ Não funciona em Web Apps
const sheet = SpreadsheetApp.getActiveSpreadsheet()
```

**Depois:**
```javascript
// ✅ Funciona sempre!
const sheet = SpreadsheetApp.openById('ID_DA_PLANILHA')
```

Quando o script é deployado como Web App, não existe um "spreadsheet ativo". Por isso precisamos especificar qual planilha queremos acessar usando o ID direto!
