# 📋 Instruções para Configurar o Google Apps Script

## 🔧 Passo 1: Instalar o Script no Google Sheets

1. **Abra sua planilha do Google Sheets**
   - Acesse: https://docs.google.com/spreadsheets

2. **Abra o Editor de Apps Script**
   - No menu, clique em: `Extensões` → `Apps Script`

3. **Cole o código**
   - Apague todo o código existente no editor
   - Copie TODO o conteúdo do arquivo `GoogleAppsScript.js`
   - Cole no editor do Apps Script
   - Clique em "Salvar" (ícone de disquete)

4. **Teste o código (IMPORTANTE!)**
   - No topo, selecione a função: `testarLeitura`
   - Clique em "Executar" (▶️)
   - Autorize o script quando solicitado
   - Verifique os logs: `Visualizar` → `Logs` (ou Ctrl+Enter)
   - **Você deve ver os dados de maio/2025 nos logs**

## 🚀 Passo 2: Implantar como Web App

1. **Criar nova implantação**
   - Clique em: `Implantar` → `Nova implantação`

2. **Configurar a implantação**
   - Clique no ícone de engrenagem ⚙️
   - Selecione tipo: **"Aplicativo da Web"**
   - Preencha:
     - **Descrição**: "Dashboard Emisfera API"
     - **Executar como**: **"Eu (seu email)"**
     - **Quem tem acesso**: **"Qualquer pessoa"**

3. **Implantar**
   - Clique em: **"Implantar"**
   - **COPIE A URL GERADA** (algo como: `https://script.google.com/macros/s/...../exec`)

## 🔗 Passo 3: Atualizar a URL no Netlify

1. **Abra o arquivo**: `netlify/functions/dados.js`

2. **Substitua a URL** na linha 2:
   ```javascript
   const APPS_SCRIPT_URL = 'SUA_URL_AQUI';
   ```

3. **Faça commit e push**:
   ```bash
   git add netlify/functions/dados.js
   git commit -m "feat: atualizar URL do Google Apps Script"
   git push
   ```

## ✅ Passo 4: Verificar Estrutura da Planilha

Certifique-se que sua planilha tem a aba **"Resumo de Dados"** com:

### Estrutura de Colunas:

| Coluna | Mês           |
|--------|---------------|
| C      | Maio/2025     |
| D      | Junho/2025    |
| E      | Julho/2025    |
| F      | Agosto/2025   |
| G      | Setembro/2025 |
| H      | Outubro/2025  |
| I      | Novembro/2025 |
| J      | Dezembro/2025 |
| K      | Janeiro/2026  |
| L      | Fevereiro/2026|
| M      | Março/2026    |
| N      | Abril/2026    |
| O      | Maio/2026     |
| P      | Junho/2026    |
| Q      | Julho/2026    |
| R      | Agosto/2026   |
| S      | Setembro/2026 |
| T      | Outubro/2026  |
| U      | Novembro/2026 |
| V      | Dezembro/2026 |

### Estrutura de Linhas:

| Linha | Dado                          | Usado em            |
|-------|-------------------------------|---------------------|
| 3     | Investimento                  | Marketing           |
| 4     | Visitantes                    | Marketing           |
| 5     | Cadastros                     | Marketing           |
| 6     | MQLs (Oportunidades)          | Marketing           |
| 8     | Ligações Realizadas           | Comercial & Vendas  |
| 9     | Ligações Atendidas            | Comercial & Vendas  |
| 11    | Formulário Respondido         | Ambos               |
| 12    | Análise Positiva              | Ambos               |
| 14    | Pitchs Agendados              | Marketing           |
| 15    | Pitchs Realizados             | Marketing           |
| 16    | Vendas                        | Ambos               |

## 🧪 Passo 5: Testar no Dashboard

1. **Abra o dashboard** no navegador
2. **Abra o Console** (F12 → Console)
3. **Verifique os logs**:
   - `Dados carregados:` - deve mostrar todos os meses
   - `Dados do mês atual:` - deve mostrar dados do mês selecionado

## ❌ Se os dados NÃO aparecerem:

1. **Verifique o nome da aba**: Deve ser exatamente `"Resumo de Dados"`
2. **Teste a URL diretamente**: Cole a URL do Apps Script no navegador
   - Deve retornar um JSON com os dados
3. **Verifique as colunas**: Confirme que maio/2025 está na coluna C
4. **Execute `testarLeitura()`** novamente no Apps Script e veja os logs

## 🎯 Exemplo de Resposta Esperada:

```json
{
  "maio/2025": {
    "investimento": 10000,
    "visitantes": 5000,
    "cadastros": 250,
    "mqls": 100,
    "ligacoesRealizadas": 300,
    "ligacoesAtendidas": 200,
    "formularioRespondido": 150,
    "respostaFormulario": 150,
    "analisePositiva": 80,
    "analisePositivaMarketing": 80,
    "pitchsAgendados": 60,
    "pitchsRealizados": 50,
    "vendas": 30,
    "vendasMarketing": 30
  },
  "junho/2025": { ... },
  ...
}
```

## 📞 Dúvidas?

Se os dados ainda não aparecerem:
1. Compartilhe os logs do console
2. Compartilhe a resposta da URL do Apps Script
3. Tire um print da estrutura da planilha
