# Como Atualizar o Google Apps Script

## ⚠️ Quando Atualizar?

Você DEVE atualizar o Google Apps Script se:
- Os campos **Vendas Total**, **Oportunidades**, **Análises**, **Análises +** mostram valores **zerados** no dashboard
- O console do navegador (F12) mostra a mensagem: **"⚠ Versão antiga detectada"**
- O console mostra: **"⚠ Google Apps Script está usando formato ANTIGO"**

## 🔍 Como Verificar a Versão Atual

1. Abra a planilha do Google Sheets:
   ```
   https://docs.google.com/spreadsheets/d/13MQbv3f92bZNHeHU9rkNTEvodu3Y1wMTjbw9ZmmNgiY/edit
   ```

2. Vá em: **Extensões > Apps Script**

3. Procure no código por:
   - ✅ **Versão CORRETA**: Contém `vendasTotal`, `oportunidades1`, `analises`, `analisesPositivas`
   - ❌ **Versão ANTIGA**: Contém apenas `vendas`, `mqls`, `formularioRespondido`, `analisePositiva`

## 🛠️ Passo a Passo da Atualização

### 1. Fazer Backup (Opcional mas Recomendado)

- No editor do Google Apps Script, copie todo o código antigo
- Cole em um arquivo de texto no seu computador
- Salve como `backup-apps-script-AAAAMMDD.js`

### 2. Substituir o Código

1. **Abra o arquivo correto no repositório:**
   - Arquivo: `apps-script.gs` (na raiz do repositório)
   - ❌ NÃO use: `docs/GoogleAppsScript-PRONTO.js` (versão antiga!)

2. **Copie TODO o conteúdo de `apps-script.gs`:**
   ```bash
   # Se estiver no terminal:
   cat apps-script.gs | pbcopy  # macOS
   cat apps-script.gs | xclip -selection clipboard  # Linux
   ```

3. **Cole no Google Apps Script:**
   - Vá para: **Extensões > Apps Script**
   - **DELETE todo o código antigo**
   - **Cole o código novo**
   - **Salve** (Ctrl+S ou Cmd+S)

### 3. Testar a Função

1. No editor do Google Apps Script, selecione a função: **`testarLeitura`**
2. Clique em **Executar** (▶️)
3. Autorize as permissões se solicitado
4. Verifique o log de execução:
   - ✅ Deve mostrar dados dos meses sem erros
   - ❌ Se houver erro, verifique o nome da aba: `RESUMO_DADOS`

### 4. Reimplantar o Apps Script

**IMPORTANTE:** Apenas salvar NÃO atualiza a API. Você DEVE reimplantar!

1. Clique em **Implantar** (canto superior direito)
2. Selecione: **Gerenciar implantações**
3. Clique no ícone **⚙️ (Editar)** da implantação ativa
4. Em **Versão**, selecione: **Nova versão**
5. Adicione uma descrição (ex: "Correção mapeamento de dados")
6. Clique em **Implantar**
7. Copie a **URL de implantação** se mudar

### 5. Atualizar a URL (Se Necessário)

Se a URL de implantação mudou, atualize:

**Arquivo:** `api/dados.js`
```javascript
const APPS_SCRIPT_URL = 'NOVA_URL_AQUI';
```

### 6. Verificar no Dashboard

1. **Aguarde 1-2 minutos** para propagação
2. Abra o dashboard no navegador
3. Faça **hard refresh**: Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (macOS)
4. Clique no botão **"🔄 Atualizar"**
5. Abra o console (F12) e verifique:
   - ✅ "✅ Dados recebidos do Google Sheets"
   - ✅ "✅ Versão correta detectada"
   - ❌ **NÃO deve aparecer**: "⚠ Versão antiga detectada"

6. Verifique os valores no dashboard:
   - **Vendas Total** (deve mostrar valor ≠ 0)
   - **Oportunidades** (deve mostrar valor ≠ 0)
   - **Análises** (deve mostrar valor ≠ 0)
   - **Análises +** (deve mostrar valor ≠ 0)

## 🐛 Troubleshooting

### Problema: Valores ainda aparecem zerados

**Causa:** Pode estar usando o cache antigo

**Solução:**
1. Limpar cache do navegador completamente
2. Fechar e reabrir o navegador
3. Acessar o dashboard em aba anônima/privada
4. Verificar se a URL da API está correta em `api/dados.js`

### Problema: Console mostra "⚠ Versão antiga detectada"

**Causa:** O Google Apps Script não foi reimplantado corretamente

**Solução:**
1. Voltar para: **Implantar > Gerenciar implantações**
2. Verificar se a implantação ativa é a **MAIS RECENTE**
3. Se necessário, desativar implantações antigas
4. Aguardar 2-3 minutos para propagação

### Problema: Erro de autorização no Google Apps Script

**Causa:** Permissões não foram concedidas

**Solução:**
1. No editor do Apps Script, clique em **Executar** (▶️)
2. Clique em **Revisar permissões**
3. Escolha sua conta Google
4. Clique em **Avançado** > **Ir para [nome do projeto] (não seguro)**
5. Clique em **Permitir**

### Problema: Erro "RESUMO_DADOS" não encontrada

**Causa:** Nome da aba na planilha está diferente

**Solução:**
1. Abra a planilha do Google Sheets
2. Verifique se existe uma aba chamada exatamente: **`RESUMO_DADOS`**
3. Se o nome for diferente, renomeie a aba OU altere no Apps Script:
   ```javascript
   const sheet = ss.getSheetByName('NOME_DA_SUA_ABA');
   ```

## 📋 Checklist de Verificação

Após a atualização, confirme:

- [ ] Código novo está no Google Apps Script
- [ ] Código contém: `vendasTotal`, `oportunidades1`, `analises`, `analisesPositivas`
- [ ] Função `testarLeitura` executa sem erros
- [ ] Reimplantação foi feita com **Nova versão**
- [ ] Console mostra: "✅ Versão correta detectada"
- [ ] Vendas Total mostra valor ≠ 0
- [ ] Oportunidades mostra valor ≠ 0
- [ ] Análises mostra valor ≠ 0
- [ ] Análises + mostra valor ≠ 0

## 📚 Referências

- **Arquivo correto:** `apps-script.gs` (raiz do repositório)
- **Arquivo antigo:** `docs/GoogleAppsScript-PRONTO.js` (NÃO usar!)
- **Dashboard:** Aba "Resumo" com KPIs principais
- **Linhas da planilha:**
  - Vendas Total: Linha 16
  - Oportunidades: Linhas 6 + 7
  - Análises: Linha 11
  - Análises +: Linha 12

## 🆘 Precisa de Ajuda?

Se após seguir todos os passos o problema persistir:

1. Exporte o log do console (F12 > Console > Botão direito > Save as...)
2. Tire um print do dashboard mostrando os valores zerados
3. Tire um print do código do Google Apps Script
4. Abra uma issue no repositório com esses arquivos
